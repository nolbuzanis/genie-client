import React from 'react';
import styled from 'styled-components';
import { useAuth } from '../../Context/authContext';
import { Link } from 'react-router-dom';
import FollowersGraph from '../../components/FollowersGraph';
import { fetchFollowerCountData } from '../../api';
import moment from 'moment';

const Background = styled.div`
  height: 100%;
  width: 100%;
  background-image: linear-gradient(to bottom, #4568dc, #8872ff 20%, #ffffff 45%);
  //background-attachment: fixed;
`;
const Content = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 40px 20px 60px;
`;
const Title = styled.h1`
  color: white;
  font-size: 24px;
  font-weight: 600;
  text-align: center;
`;
const Graph = styled.div`
  position: relative;
  width: 100%;
  background: white;
  height: 210px;
  border-radius: 5px;
  box-shadow: 3px 5px 10px 0 rgba(0, 0, 0, 0.16);
  margin-top: 40px;
`;
const StatBox = styled.div`
  width: 48%;
  height: 80px;
  border-radius: 5px;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
  background-color: white;
  background-image: ${({ colorOne, colorTwo }) => `linear-gradient(to bottom, ${colorOne}, ${colorTwo})`};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 12px;
`;
const StatsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding-top: 25px;
`;
const StatIcon = styled.img`
  width: 28px;
  height: 28px;
  margin-right: 15px;
`;
const Stat = styled.p`
  font-size: 18px;
  font-weight: bold;
  color: white;
`;
const StatContent = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: white;
`;

const EditContainer = styled.div`
  width: 100%;
  border-radius: 5px;
  box-shadow: 3px 5px 10px 0 rgba(0, 0, 0, 0.16);
  background-color: #ffffff;
  margin-top: 24px;
`;
const Divider = styled.div`
border-bottom: solid 1px rgba(112, 112, 112, 0.24);
`;
const EditBox = styled.div`
  height: 65px;
  width: 100%;
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const CircularNumber = styled.div`
  width: 40px;
  display: inline-block;
  height: 40px;
  line-height: 40px;
  color: white;
  border-radius: 50px;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
  border: solid 1px #ffffff;
  text-align: center;
  font-size: ${props => props.children > 99 ? '12px' : '18px'};
  font-weight: 600;
  background-color: #4568dc;
  background-image: ${({ colorOne, colorTwo }) => `linear-gradient(to bottom, ${colorOne}, ${colorTwo})`};
`;
const EditBoxText = styled.p`
  display: inline;
  font-weight: 600;
  padding: 0 2vw;
  font-size: calc(14px + 0.4vw);
`;
const EditButton = styled(Link)`
  width: 60px;
  line-height: 30px;
  text-align: center;
  height: 30px;
  border-radius: 15px;
  border: solid 1px #818181;
  font-size: 16px;
  font-weight: 600;
  color: #717171;
  background: white;
  cursor: pointer;
`;
const PublicArtistPage = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 25px;
  height: 70px;
  cursor: pointer;
  border-radius: 5px;
  box-shadow: 3px 5px 10px 0 rgba(0, 0, 0, 0.16);
  background-image: linear-gradient(to bottom, rgba(69, 104, 220, 0.7), #8872ff);
  width: 100%;
  font-size: 16px;
  font-weight: 600;
`;
const GlobeIcon = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 10px;
`;
const GraphTitle = styled.h3`
  position: absolute;
  top: 12px;
  left: 20px;
  font-size: 15px;
  font-weight: bold;
  color: #4568dc;
`;

const getLastWeek = (startDate = moment().format('YYYY-MM-DD')) => {
  const week = [startDate];
  const longMonths = [1, 3, 5, 7, 8, 10, 12];

  let day = parseInt(startDate.split('-')[2]) - 1;
  let month = parseInt(startDate.split('-')[1]);
  let year = parseInt(startDate.split('-')[0]);

  for (let i = 0; i < 6; i++) {
    if (day < 1) {
      // change month as well
      month += -1;
      if (month < 1) {
        //change year!!
        year += -1;
        month = 12;
      }
      day = longMonths.includes(month) ? 31 : 30;
    }
    week.push(`${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`);
    day += -1;
  }
  return week.reverse();
};

const Home = () => {

  const { user } = useAuth();
  const [followerData, setFollowerData] = React.useState([[], []]);

  React.useEffect(() => {
    const fetchFollowerData = async () => {
      const data = await fetchFollowerCountData();
      const { followersByDay } = data;

      const daysToPlot = getLastWeek();
      const lastWeeksData = getLastWeek(moment().subtract(7, 'd').format('YYYY-MM-DD'));
      let finalData2 = [];
      const finalData = daysToPlot.map((date, i) => {
        finalData2.push({
          x: parseInt(date.split('-')[2]),
          y: followersByDay ? followersByDay[lastWeeksData[i]] || 0 : 0
        });
        return {
          x: parseInt(date.split('-')[2]),
          y: followersByDay ? followersByDay[date] || 0 : 0
        };
      });

      return setFollowerData([finalData, finalData2]);
    };

    fetchFollowerData();
  }, []);

  const followersData = [
    {
      "id": "Last 7 days",
      "color": "rgba(69,104,220,0.8)",
      "data": followerData[0]
    },
    {
      "id": "Week before",
      "color": "rgba(69,104,220,0.4)",
      "data": followerData[1]
    }
  ];

  return <Background>
    <Content>
      <Title>Genie Dashboard</Title>
      <Graph>
        <GraphTitle>Followers per day</GraphTitle>
        <FollowersGraph data={followersData} />
      </Graph>
      <StatsContainer>
        <StatBox colorOne='#ff9b9b' colorTwo='#f7db65'>
          <StatIcon src='/assets/people-stat-icon.png' />
          <StatContent>
            <Stat>{user.followers}</Stat>
            Followers
        </StatContent>
        </StatBox>
        <StatBox colorOne='#9bcdff' colorTwo='#65f7e6'>
          <StatIcon src='/assets/save-icon-white.png' />
          <StatContent>
            <Stat>{user.saves}</Stat>
            Total Saves
        </StatContent>
        </StatBox>
      </StatsContainer>
      <EditContainer>
        <EditBox>
          <div>
            <CircularNumber colorOne='#4568dc' colorTwo='#8872ff'>{user.releases}</CircularNumber>
            <EditBoxText>Releases</EditBoxText>
          </div>
          <EditButton to='/releases'>Edit</EditButton>
        </EditBox>
        <Divider />
        <EditBox>
          <div>
            <CircularNumber colorOne='#dc4585' colorTwo='#f472ff'>{1000 - user.saves}</CircularNumber>
            <EditBoxText>Saves Remaining</EditBoxText>
          </div>
          {/* <EditButton>Edit</EditButton> */}
        </EditBox>
      </EditContainer>
      <PublicArtistPage to={'/artist/' + user.uri + '?view=preview'}>
        <GlobeIcon src='/assets/globe-icon-white.png' />
        My artist page
      </PublicArtistPage>
    </Content>
  </Background>
};

export default Home;