import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import styled from 'styled-components';


const HeaderContainer = styled.div`
  position: absolute;
  z-index: 100;
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  top: 0;
  background: ${props => props.landing ? 'transparent' : 'white'};
  margin: 0;
  padding: 0 calc(5px + 5.4vw);
`;

export const Logo = styled(Link)`
  float: left;
  height: 100%;
  font-weight: 900;
  font-size: 30px;
  line-height: 80px;
  color: ${props => (props.landing ? '#ffffff' : '#8872FF')};
  &:hover {
    color: ${props => (props.landing ? '#ffffff' : '#8872FF')};
  }
`;

const StyledLink = styled(Link)`
  display: inline-block;
  line-height: 20px;
  font-size: 20px;
  padding: 5px;
  color: ${props => (props.landing ? '#ffffff' : '#8872ff')};
  &:hover {
    color: ${props => (props.landing ? '#ffffff' : '#8872ff')};
  }
`;
const SignupLink = styled(Link)`
  display: inline-block;
  line-height: 44px;
  font-size: 20px;
  width: 100px;
  height: 44px;
  border-radius: 22px;
  margin-left: 20px;
  text-align: center;
  color: ${props => (props.landing ? '#8872ff' : '#ffffff')};
  background-color: ${props => props.landing ? '#ffffff' : '#8872ff'}
  &:hover {
    color: ${props => (props.landing ? '#8872ff' : '#ffffff')};
  }
`;

const Nav = styled.nav`
  margin: 0;
  height: 100%;
  padding: 0;
  margin-top: 15px;
  align-items: center;
  display: flex;
  justify-content: flex-start;
  margin-left: 40px;
  flex-direction: row-reverse;
  @media screen and (max-width: 480px) {
    flex-wrap: wrap;
    
  }
`;


const Header = ({ history }) => {

  const landing = history.location.pathname === '/' ? true : false;
  // const path = history.location.pathname.split('/')[1];

  // const exclusionArray = ['profile', 'releases', 'home', 'releases', 'introduction', 'get-started', 'find-artist-uri', 'menu', 'artist'];

  // if (exclusionArray.indexOf(history.location.pathname) >= 0) return null;

  return (
    <HeaderContainer landing={landing}>
      <Logo to='/' landing={landing}>Genie</Logo>
      <Nav>
        <SignupLink to='/signup' landing={landing}>Sign Up</SignupLink>
        <StyledLink to='/login' landing={landing}>Log In</StyledLink>
      </Nav>
    </HeaderContainer>
  );
};

export default withRouter(Header);
