import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../../Context/authContext';
import { Event, TrackPixelEvent } from '../../analytics';

const HeaderContainer = styled.div`
  position: absolute;
  z-index: 100;
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  top: 0;
  background: ${props => (props.landing ? 'transparent' : 'white')};
  margin: 0;
  padding: 20px calc(5px + 8vw);
`;

export const Logo = styled(Link)`
  //float: left;
  //height: 100%;
  font-weight: 700;
  font-size: 36px;
  line-height: 80px;
  color: ${props => (props.landing ? '#ffffff' : '#656ded')};
  &:hover {
    color: ${props => (props.landing ? '#ffffff' : '#656ded')};
  }
`;

const StyledLink = styled(Link)`
  display: inline-block;
  line-height: 44px;
  font-size: 20px;
  border: ${props => props.landing || 'solid 1px #656ded'};
  width: 120px;
  height: 44px;
  font-weight: 600;
  border-radius: 22px;
  text-align: center;
  color: ${props => (props.landing ? '#ffffff' : '#656ded')};
  &:hover {
    color: ${props => (props.landing ? '#ffffff' : '#656ded')};
  }
`;
const SignupLink = styled(StyledLink)`
  border: ${props =>
    props.landing ? 'solid 1px #ffffff' : 'solid 1px #656ded'};
`;

const Nav = styled.nav`
  margin: 0;
  height: 100%;
  padding: 0;
  //margin-top: 15px;
  align-items: center;
  display: flex;
  justify-content: flex-start;
  //margin-left: 40px;
  flex-direction: row-reverse;
  @media screen and (max-width: 480px) {
    flex-wrap: wrap;
  }
`;
const DashboardLink = styled(SignupLink)`
  width: inherit;
  padding: 0 15px;
`;

const Header = ({ history }) => {
  const landing =
    history.location.pathname === '/' ||
    history.location.pathname === '/landing';
  const path = history.location.pathname;
  const { user } = useAuth();
  // const path = history.location.pathname.split('/')[1];

  // const exclusionArray = ['profile', 'releases', 'home', 'releases', 'introduction', 'get-started', 'find-artist-uri', 'menu', 'artist'];

  // if (exclusionArray.indexOf(history.location.pathname) >= 0) return null;

  return (
    <HeaderContainer landing={landing ? 1 : 0}>
      <Logo to='/' landing={landing ? 1 : 0}>
        Genie
      </Logo>
      {user && !user.error ? (
        <Nav>
          <DashboardLink to='/home' landing={landing ? 1 : 0}>
            Go to dashboard
          </DashboardLink>
        </Nav>
      ) : (
        <Nav>
          {path === '/signup' || path === '/forgot-password' || (
            <SignupLink
              to='/signup'
              landing={landing ? 1 : 0}
              onClick={() => {
                Event('ENGAGEMENTS', 'Sign up', 'HEADER');
                TrackPixelEvent('Sign up (Header)', { v: 1 });
              }}
            >
              Sign Up
            </SignupLink>
          )}
          {path === '/login' || (
            <StyledLink
              to='/login'
              landing={landing ? 1 : 0}
              onClick={() => {
                Event('ENGAGEMENTS', 'Log In', 'HEADER');
                TrackPixelEvent('Log In (Header)', { v: 1 });
              }}
            >
              Log In
            </StyledLink>
          )}
        </Nav>
      )}
    </HeaderContainer>
  );
};

export default withRouter(Header);
