import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../../Context/authContext';
import { getCurrentUser } from '../../api';
import styled from 'styled-components';
import SideMenu from '../SideMenu';
//import InternalHeader from '../InternalHeader';
import { css } from "@emotion/core";
import ScaleLoader from 'react-spinners/ScaleLoader';
import MobileNavigation from '../../components/MobileNavigation';

const FlexContainer = styled.div`
  display: flex;
  height: 100%;
`
const ContentContainer = styled.div`
  width: 100%;
  @media (min-width: 920px) {
    flex-grow: 1;
    width: inherit;
    position: relative;
    overflow-x: hidden;
  }
`
const loadingStyles = css`
  position: relative;
  display: block;
  margin: 0 auto;
  text-align: center;
  top: 40%;
`;

const lockedRoutes = ['/introduction', '/find-artist-uri'];

const PrivateRoute = ({ component: Component, render, ...rest }) => {
  const { user, follower, setAuth } = useAuth();

  if (!user) {
    getCurrentUser().then((response) => setAuth({ follower, user: { ...response } }));
    return <ScaleLoader
      css={loadingStyles}
      size={100}
      //size={"150px"} this also works
      color='#8872FF'
      loading={true}
    />;
  }
  if (user && user.error) {
    return <Redirect to='/login' />
  }

  if (!user.uri && !lockedRoutes.includes(window.location.pathname)) {
    return <Redirect to='/introduction' />
  }
  if (user.uri && window.location.pathname === '/introduction') {
    return <Redirect to='/dashboard' />
  }

  return ((Component)
    ? <Route {...rest} render={(props) => (
      <FlexContainer>
        <SideMenu open={true} lockedRoutes={lockedRoutes} />
        <ContentContainer>
          <Component {...props} />
          <MobileNavigation lockedRoutes={lockedRoutes} />
        </ContentContainer>
      </FlexContainer>
    )} />
    : <Route {...rest} render={() => (
      <FlexContainer>
        <SideMenu open={true} lockedRoutes={lockedRoutes} />
        <ContentContainer>
          {render()}
          <MobileNavigation lockedRoutes={lockedRoutes} />
        </ContentContainer>
      </FlexContainer>
    )} />
  );
};

export default PrivateRoute;
