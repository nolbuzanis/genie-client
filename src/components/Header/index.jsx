import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import SideMenu from '../SideMenu';
import authContext from '../../Context/authContext';
import { withRouter } from 'react-router-dom';

const IconContainer = styled.div`
  cursor: pointer;
  margin-top: 25px;
  margin-right: 10px;
  position: relative;
  height: 30px;
  width: 30px;
  > svg {
    height: 30px;
    width: 30px;
  }
`;

const HeaderContainer = styled.div`
  z-index: 10;
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-between;
  position: absolute;
  background: ${props => props.landing ? 'transparent' : 'white'};
  margin: 0;
  padding: 0 calc(5px + 5.4vw);
`;

const Logo = styled(Link)`
  float: left;
  height: 100%;
  font-weight: 900;
  font-size: 36px;
  line-height: 80px;
  color: ${props => (props.landing ? '#ffffff' : '#8872FF')};
  &:hover {
    color: ${props => (props.landing ? '#ffffff' : '#8872FF')};
  }
`;

const StyledLink = styled(Link)`
  display: inline-block;
  margin: 25px 0 0 0;
  line-height: 20px;
  font-size: 20px;
  padding: 5px;
  color: ${props => (props.landing ? '#ffffff' : '#000000')};
  &:hover {
    color: ${props => (props.landing ? '#ffffff' : '#000000')};
  }
`;

const Nav = styled.ul`
  margin: 0;
  height: 100%;
  padding: 0;
`;
const Overlay = styled.div`
  visibility: ${props => props.open ? 'visible' : 'hidden'};
  opacity: ${props => props.open ? '1' : '0'};
  background-color: rgba(255,255,255,0.8);
  transition: all 0.3s ease;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`

const Header = ({ history }) => {
  const { auth } = React.useContext(authContext);
  const [open, setOpen] = React.useState(false);

  const landing = history.location.pathname === '/' ? true : false;

  const SvgIcon = () =>
    history.location.pathname === '/introduction' ? null : (
      <IconContainer onClick={() => setOpen(!open)}>
        <svg
          fill='#000000'
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
          width='96px'
          height='96px'
        >
          <path d='M 0 2 L 0 4 L 24 4 L 24 2 Z M 0 11 L 0 13 L 24 13 L 24 11 Z M 0 20 L 0 22 L 24 22 L 24 20 Z' />
        </svg>
      </IconContainer>
    );

  return (
    <HeaderContainer landing={landing}>
      <Logo to='/' landing={landing}>idpt</Logo>
      {auth && !auth.error ? (
        <>
          <SvgIcon history={history} />
          <SideMenu open={open} setOpen={setOpen} />
          <Overlay open={open} onClick={() => setOpen(!open)} />
        </>
      ) : (
          <Nav>
            <StyledLink to='/login' landing={landing}>Log In</StyledLink>
          </Nav>
        )}
    </HeaderContainer>
  );
};

export default withRouter(Header);
