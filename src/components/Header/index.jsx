import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import SideMenu from '../SideMenu';
import authContext from '../../Context/authContext';
import { SERVER_URL } from '../../api';

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
const SpotifyLogin = styled.a`
  font-size: 20px;
  margin-top: 25px;
  border: none;
  padding: 0;
  background: none;
  height: 30px;
  line-height: 30px;
  color: black;
  &:hover {
    color: black;
  }
`

const SpotifyIcon = () => (
  <div style={{ float: 'right', marginLeft: '10px' }}>
    <svg enableBackground="new 0 0 56.69 56.69" height="30px" id="Layer_1" version="1.1" viewBox="0 0 56.69 56.69" width="30px" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"><path d="M28.3411,3.813c-13.5932,0-24.613,11.019-24.613,24.6122s11.0198,24.6129,24.613,24.6129  c13.5936,0,24.6133-11.0197,24.6133-24.6129S41.9346,3.813,28.3411,3.813z M38.3264,40.0396c-0.3979,0-0.6699-0.138-1.0418-0.3646  c-3.5675-2.158-8.015-3.2921-12.7356-3.2921c-2.6336,0-5.2842,0.3374-7.7634,0.8533c-0.403,0.0876-0.9103,0.2436-1.2132,0.2436  c-0.9347,0-1.558-0.7431-1.558-1.5468c0-1.0348,0.5966-1.549,1.3389-1.691c3.04-0.6927,6.0676-1.0883,9.2123-1.0883  c5.3857,0,10.1859,1.2357,14.3165,3.7111c0.6147,0.3591,0.975,0.7253,0.975,1.6359C39.8572,39.388,39.1359,40.0396,38.3264,40.0396z   M41.0084,33.5251c-0.5341,0-0.8704-0.2156-1.233-0.4266c-4.0038-2.376-9.5529-3.9546-15.6295-3.9546  c-3.1168,0-5.8066,0.436-8.0333,1.0294c-0.4798,0.1318-0.749,0.2738-1.1977,0.2738c-1.0585,0-1.9226-0.8626-1.9226-1.9296  c0-1.0465,0.5073-1.7671,1.5309-2.0557c2.767-0.7598,5.5921-1.3459,9.7045-1.3459c6.4427,0,12.6751,1.6046,17.5749,4.5368  c0.8215,0.4716,1.124,1.0689,1.124,1.9454C42.9268,32.6641,42.0781,33.5251,41.0084,33.5251z M44.062,25.9488  c-0.5011,0-0.7986-0.1218-1.2683-0.379c-4.4549-2.6711-11.3684-4.1423-18.0547-4.1423c-3.3375,0-6.7274,0.3394-9.8325,1.1818  c-0.3576,0.09-0.8094,0.2692-1.2621,0.2692c-1.3129,0-2.3201-1.0386-2.3201-2.3515c0-1.3378,0.8289-2.0886,1.7232-2.3528  c3.5085-1.0336,7.4247-1.5153,11.6823-1.5153c7.2273,0,14.8312,1.4866,20.3857,4.7489c0.7485,0.424,1.2683,1.0635,1.2683,2.2352  C46.3837,24.9846,45.3051,25.9488,44.062,25.9488z" /></svg>
  </div>
);

const Header = ({ history }) => {
  const { auth } = React.useContext(authContext);
  const [open, setOpen] = React.useState(false);


  const landing = history.location.pathname === '/' ? true : false;

  if (history.location.pathname.includes('artist')) {
    return <HeaderContainer landing={true}>
      <Logo to='/' landing={true}>Genie</Logo>
      <SpotifyLogin href={`${SERVER_URL}/follower/login/${window.location.pathname.split('/')[2] ? window.location.pathname.split('/')[2] : '0'}`}>Log In <SpotifyIcon /></SpotifyLogin>
    </HeaderContainer>
  };

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
      <Logo to='/' landing={landing}>Genie</Logo>
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
