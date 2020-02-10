import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import authContext from '../../Context/authContext';

const Header = styled.h1`
  font-weight: 400;
  margin: 0;
  font-size: 30px;
  padding: 40px;
  display: flex;
  justify-content: space-between;
  @media (max-width: 920px) {
    padding-top: 0px;
  }
`;
const StatContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr) );
  column-gap: 30px;
  row-gap: 35px;
  max-width: 900px;
  padding: 0 15px;
  margin: 0 auto;
`
const StatCard = styled.div`
  position: relative;
  background: #4568DC;
  border-radius: 32px;
  height: 170px;
  padding-top: 30px;
  padding-left: 30px;
  color: white;
  max-width: 280px;
  width: 100%;
  margin: 0 auto;
`;
const FeatureContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr) );
  column-gap: 40px;
  row-gap: 35px;
  max-width: 900px;
  padding: 45px 15px;
  margin: 0 auto;
`;
const FeatureCard = styled(Link)`
  position: relative;
  background: ${props => props.background ? `linear-gradient(${props.background[0] + ',' + props.background[1]})` : 'rgba(0, 0, 0, 0.5)'};
  border-radius: 32px;
  height: 260px;
  padding-top: 40px;
  padding-left: 28px;
  box-shadow: 4px 4px 6px rgba(0,0,0,0.16);
  transition: all 0.3s ease;
    bottom: 0;
  &:hover {
    bottom: 5px;
    box-shadow: 4px 4px 6px rgba(0,0,0,0.4);
  }
`;
const CardTitle = styled.h3`
position: relative;
  z-index: 1;
text-transform: uppercase;
font-weight: 900;
letter-spacing: 1.6px;
font-size: 40px;
`
const FeatureDescription = styled.p`
opacity: 0.5;
font-size: 20px;
line-height: 1.35;
letter-spacing: 0.8px;
padding-top: 5px;
`
const FeatureArrow = styled.img`
position: absolute;
bottom: 30px;
right: 30px;
width: 40px;
height: 40px;
`
const StatDescription = styled.p`
  position: relative;
  z-index: 1;
  font-size: 20px;
  font-weight: 300;
  letter-spacing: 0.8px;
`
const StatOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 32px;
  background: ${props => props.src ? `url(${props.src}) center center no-repeat` : 'none'};
  background-size: cover;
`

const Dashboard = () => {
  const { user } = React.useContext(authContext);

  return (
    <>
      <Header>Dashboard</Header>
      <StatContainer>
        <StatCard>
          <CardTitle>{user.followers}</CardTitle>
          <StatDescription>Total Followers</StatDescription>
          <StatOverlay src='follower-card-background.png' />
        </StatCard>
        <StatCard>
          <CardTitle>{user.saves}</CardTitle>
          <StatDescription>Total Saves</StatDescription>
          <StatOverlay src='saves-card-background.png' />
        </StatCard>
        <StatCard>
          <CardTitle>{user.releases}</CardTitle>
          <StatDescription>Total Releases</StatDescription>
          <StatOverlay src='releases-card-background.png' />
        </StatCard>
      </StatContainer>
      <FeatureContainer>
        <FeatureCard background={['#ef427c', '#b41c8b']} to='/profile'>
          <CardTitle>Customize</CardTitle>
          <FeatureDescription>your photo, artist name, links, and entire profile!</FeatureDescription>
          <FeatureArrow src='arrow-forward.png' alt='' />
        </FeatureCard>
        <FeatureCard background={['#ffea77', '#fd6a50']} to='/releases'>
          <CardTitle>Release</CardTitle>
          <FeatureDescription>new beats and save them to your follower’s libraries</FeatureDescription>
          <FeatureArrow src='arrow-forward.png' alt='' />
        </FeatureCard>
      </FeatureContainer>
    </>
  );
};

export default Dashboard;