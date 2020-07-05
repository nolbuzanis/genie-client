import React, { useState } from 'react';
import styled from 'styled-components';
import { useAuth } from '../../Context/authContext';
//import { Link } from 'react-router-dom';
import FollowersGraph from '../../components/FollowersGraph';
import { getAnalyticsOverview } from '../../api';
import moment from 'moment';
//import { freeUser } from '../../config';
//import { isPremium } from '../../auth/index';
import PageHeader from '../../components/PageHeader';
import ChoroplethMap from '../../components/ChoroplethMap';
import { scaleLinear } from 'd3-scale';
import { mapCountryIOS2 } from '../../utils/helpers';
import BarGraph from '../../components/BarGraph';

const Background = styled.div`
  background-color: #f5f6fa;
  min-height: 100%;
  padding: 0 30px;
  @media only screen and (max-width: 500px) {
    padding: 0;
  }
`;
const Svg = styled.svg`
    margin-right: 10px;
  `;

const VisitorSvg = () => (
  <Svg xmlns="http://www.w3.org/2000/svg" id="prefix__Icon" width={45} height={45} viewBox="0 0 45 45">
    <defs>
      <linearGradient id="prefix__linear-gradient" x2={0} y2={1} gradientUnits="objectBoundingBox">
        <stop offset={0} stopColor="#4981fd" />
        <stop offset={1} stopColor="#7e96ff" />
      </linearGradient>
    </defs>
    <path id="prefix__Icon_BG" fill="rgba(73,129,253,0.34)" d="M22.5 0A22.5 22.5 0 1 1 0 22.5 22.5 22.5 0 0 1 22.5 0z" />
    <g id="prefix__users_together" fill="url(#prefix__linear-gradient)" data-name="users together" transform="translate(-3 1)">
      <path id="prefix__New_customer_Icon" d="M8 16v-2h5.626a2.834 2.834 0 0 0-2.716-2H8v-2h2.91a4.878 4.878 0 0 1 4.85 5v1zM4 5V4a4 4 0 1 1 8 0v1a4 4 0 0 1-8 0zm2-1v1a2 2 0 0 0 4 0V4a2 2 0 1 0-4 0z" data-name="New customer Icon" opacity="0.69" transform="translate(20.463 11.5)" />
      <path id="prefix__New_customer_Icon-2" d="M8 16v-2h5.626a2.831 2.831 0 0 0-2.716-2H8v-2h2.91a4.878 4.878 0 0 1 4.85 5v1zm-8 0v-1a4.951 4.951 0 0 1 5-5h3v2H5a2.91 2.91 0 0 0-2.8 2H8v2zM4 5V4a4 4 0 0 1 8 0v1a4 4 0 0 1-8 0zm2-1v1a2 2 0 0 0 4 0V4a2 2 0 0 0-4 0z" data-name="New customer Icon" transform="translate(14.463 14.5)" />
    </g>
  </Svg>
);

const BounceSvg = () => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={45} height={45} viewBox="0 0 45 45">
    <g id="prefix__Icon" transform="translate(-235 -994)">
      <path id="prefix__Icon_BG" fill="rgba(86,217,254,0.32)" d="M22.5 0A22.5 22.5 0 1 1 0 22.5 22.5 22.5 0 0 1 22.5 0z" transform="translate(235 994)" />
      <path id="prefix__ic_call_missed_24px" fill="#11c8fc" d="M19.59 7L12 14.59 6.41 9H11V7H3v8h2v-4.59l7 7 9-9z" transform="translate(247 1007)" />
    </g>
  </Svg>
);

const OutboundSvg = () => (
  <Svg xmlns="http://www.w3.org/2000/svg" id="prefix__Icon" width={45} height={45} viewBox="0 0 45 45">
    <path id="prefix__Icon_BG" fill="rgba(255,8,8,0.3)" d="M22.5 0A22.5 22.5 0 1 1 0 22.5 22.5 22.5 0 0 1 22.5 0z" />
    <path id="prefix__ic_trending_down_24px" fill="#fff" d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z" transform="translate(12 12)" />
  </Svg>
);

const StatCard = styled.div`
    display: flex;
    align-items: center;
    background: white;
    padding: 15px 10px;
    box-shadow: 3px 3px 6px 0 rgba(0, 0, 0, 0.04);
  `;
const Stat = styled.p`
  color: #4d4f5c;
  font-size: 25px;
  font-weight: bold;
  `;
const StatSub = styled.p`
    color: #6a7284;
    font-size: 15px;
  `;
const StatGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    column-gap: 50px;
    row-gap: 20px;
    margin: 0 auto;
    padding: 0;
    @media only screen and (max-width: 500px) {
    padding: 0 30px;
    }
  `;
const Content = styled.div`
    max-width: 900px;
    margin: 0 auto;
    padding-bottom: 80px;
  `;
const Graph = styled.div`
  position: relative;
  width: ${({ half }) => half ? '47%' : '100%'};
  background: white;
  height: ${({ height }) => height || '340px'};
  box-shadow: 3px 3px 6px 0 rgba(0, 0, 0, 0.04);
  margin-top: 20px;
  overflow: hidden;
  @media only screen and (max-width: 500px) {
    width: 100%;
    }
`;
const GraphTitle = styled.h3`
  position: ${({ normal }) => normal ? 'static' : 'absolute'};
  ${({ normal }) => normal && 'padding: 30px;'};
  top: 20px;
  left: 20px;
  font-size: 17px;
  color: #4d4f5c;
  font-weight: 500;
`;
const GraphContainer = styled.div`
    position: relative;
    padding: 10px;
    height: 340px;
    overflow: hidden;
    @media only screen and (max-width: 500px) {
    height: 260px;
  }
  @media only screen and (max-width: 400px) {
    height: 230px;
  }
  `;
const Flex = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: flex-start;
    padding-bottom: 30px;
  `;
const minColor = '#CFD8DC';
const maxColor = '#37474F';
const GeoCircle = styled.div`
    width: 20px;
    height: 20px;
    border: solid 3px ${({ color }) => color || minColor};
    border-radius: 50%;
    margin-right: 10px;
  `;
const GeoItem = styled.div`
    display: flex;
    align-items: center;
    padding: 0 20px 10px 40px;
  `;
const GeoText = styled.p`
    color: #43425d;
    font-size: 14px;
    margin-right: 15px;
  `;
const GeoStat = styled.p`
    color: #43425d;
    font-size: 12px;
    opacity: 0.5;
  `;
const GeoTop = styled.div`
    padding: 20px 10px;
`;
const DoubleGraph = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const getLastWeek = (startDate = moment().subtract(6, 'd')) => {
  const week = [];
  for (let i = 0; i < 7; i++) {
    week.push(new moment(startDate));
    startDate.add(1, 'd');
  }
  return week;
};

const sumArray = (arr) => {
  return arr.reduce((a, b) => a + b, 0);
}

const Home = () => {
  //const { user } = useAuth();
  const [error, setError] = useState();
  const [graphData, setGraphData] = useState({});
  //const isUserPremium = isPremium(user);
  const [totals, setTotals] = useState({ visitors: 0, bounced: 0, outbound: 0 });
  const [geoData, setGeoData] = useState({});
  const [topGeo, setTopGeo] = useState({});
  const [deviceData, setDeviceData] = useState([]);
  const [referrerData, setReferrerData] = useState([]);
  console.log(error);

  React.useEffect(() => {
    const topTenGeo = (data) => {
      const geoCopy = { ...data };
      let keys = Object.keys(geoCopy);
      if (keys.length === 0) return;

      let sorted = [];
      return new Promise((res, rej) => {
        do {
          const highest = keys.reduce((a, b) => geoCopy[a] > geoCopy[b] ? a : b);
          sorted.push(highest);
          delete geoCopy[highest];
          keys = Object.keys(geoCopy);
        } while (keys.length !== 0);

        res(sorted);
      });
    }

    const fetchData = async () => {
      const data = await getAnalyticsOverview();
      if (data.error) {
        return setError(data.error);
      }

      const { visitors, bounced, totalVisitor, totalOutbound, bouncedCount, countries, devices, referrers } = data;
      setTotals({ visitors: totalVisitor, bounced: bouncedCount, outbound: totalOutbound });
      const top = await topTenGeo({ ...countries });
      const total = sumArray(Object.values(countries));
      setGeoData(countries);
      setTopGeo({ top, total });
      setDeviceData([{
        "index": "mobile",
        "Visitors": devices.mobile,
        "VisitorsColor": "hsl(241, 70%, 50%)"
      },
      {
        "index": "desktop",
        "Visitors": devices.browser,
        "VisitorsColor": "hsl(241, 70%, 50%)"
      }]);

      const referrals = [];
      //referrer data parsing
      Object.keys(referrers).forEach((key) => {
        referrals.push({
          "index": key === '' ? 'Direct' : key,
          "Visitors": referrers[key]
        });
      });
      setReferrerData(referrals);

      const daysToPlot = getLastWeek();
      const parsedVisitors = [], parsedBounced = [];

      daysToPlot.forEach((date) => {
        parsedVisitors.push({
          x: date.format('DD MMM'),
          y: visitors[date.format('DD-MM-YYYY')] || 0
        });
        parsedBounced.push({
          x: date.format('DD MMM'),
          y: bounced[date.format('DD-MM-YYYY')] || 0
        });
      });

      return setGraphData({ visitors: parsedVisitors, bounced: parsedBounced });


    };
    fetchData();

  }, []);

  const followersData = [
    {
      id: 'Visitors (All Visitors)',
      color: '#4981fd',
      data: graphData.visitors || []
    },
    {
      id: 'Visitors (Bounced Session)',
      color: '#56d9fe',
      data: graphData.bounced || []
    }
  ];

  const values = Object.values(geoData);
  const minValue = 0;
  const maxValue = Math.max(...values);

  const customScale = scaleLinear()
    .domain([minValue, maxValue])
    .range([minColor, maxColor]);

  return (
    <Background>
      <Content>
        <PageHeader color='#444444'>Your Dashboard</PageHeader>
        <p>All Time</p>
        <StatGrid>
          <StatCard>
            <VisitorSvg />
            <div>
              <Stat>{totals.visitors}</Stat>
              <StatSub>All Visitors</StatSub>
            </div>
          </StatCard>
          <StatCard>
            <BounceSvg />
            <div>
              <Stat>{totals.bounced}</Stat>
              <StatSub>Bounced Session</StatSub>
            </div>
          </StatCard>
          <StatCard>
            <OutboundSvg />
            <div>
              <Stat>{totals.outbound}</Stat>
              <StatSub>Outbound Clicks</StatSub>
            </div>
          </StatCard>
        </StatGrid>
        <Graph>
          <GraphTitle>Visitors</GraphTitle>
          <FollowersGraph data={followersData} />
        </Graph>
        <DoubleGraph>
          <Graph half>
            <GraphTitle>Devices</GraphTitle>
            <BarGraph data={deviceData} keys={['Visitors']} />
          </Graph>
          <Graph half>
            <GraphTitle>Referrers</GraphTitle>
            <BarGraph data={referrerData} keys={['Visitors']} />
          </Graph>
        </DoubleGraph>
        <Graph height='auto'>
          <GraphTitle normal>Demographic</GraphTitle>
          <Flex>
            <GraphContainer>
              <ChoroplethMap data={geoData} customScale={customScale} />
            </GraphContainer>
            <GeoTop>
              {topGeo.top && topGeo.total && topGeo.top.map(country => (
                <GeoItem key={country}>
                  <GeoCircle color={customScale(geoData[country])} />
                  <GeoText>{mapCountryIOS2[country] || country}</GeoText>
                  <GeoStat>{`${geoData[country]}(${Math.round((geoData[country] / topGeo.total * 100) * 10) / 10}%)`}</GeoStat>
                </GeoItem>
              ))}
            </GeoTop>
          </Flex>
        </Graph>
      </Content>
    </Background>
  );
};

export default Home;
