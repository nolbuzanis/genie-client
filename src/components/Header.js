import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import SideMenu from '../components/SideMenu';
import authContext from '../Context/authContext';
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
  box-shadow: ${props =>
    !props.transparent && '4px 4px 6px rgba(0, 0, 0, 0.16)'};
  position: fixed;
  background: ${props => !props.transparent && 'white'};
  margin: 0;
  padding: 0 20px;
`;

const Logo = styled(Link)`
  float: left;
  height: 100%;
  font-weight: 900;
  font-size: 36px;
  margin-left: 20px;
  line-height: 80px;
  color: ${props => (props.transparent ? '#ffffff' : '#000000')};
  &:hover {
    color: ${props => (props.transparent ? '#ffffff' : '#000000')};
  }
`;

const StyledLink = styled(Link)`
  display: inline-block;
  padding: 0 25px;
  margin: 0;
  line-height: 80px;
  height: 80px;
  font-size: 20px;
  color: ${props => (props.transparent ? '#ffffff' : '#000000')};
  &:hover {
    color: ${props => (props.transparent ? '#ffffff' : '#000000')};
  }
  &:active {
    background-color: ${props => !props.transparent && '#eeeeee'};
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
  transition: all 0.5s ease;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`

const Header = ({ history }) => {
  const { auth } = React.useContext(authContext);
  const [open, setOpen] = React.useState(false);

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
    <HeaderContainer>
      <Logo to='/'>idpt.</Logo>
      {auth && !auth.error ? (
        <>
          <SvgIcon history={history} />
          <SideMenu open={open} setOpen={setOpen} />
          <Overlay open={open} onClick={() => setOpen(!open)} />
        </>
      ) : (
          <Nav>
            <StyledLink to='/login'>Log In</StyledLink>
          </Nav>
        )}
    </HeaderContainer>
  );
};

//<StyledLink to='/dashboard' transparent={this.state.transparent}>
//     Dashboard
//   </StyledLink>
//   <StyledLink to='/myartist' transparent={this.state.transparent}>
//     My Artist
//   </StyledLink>
//   <StyledLink to='/blasts' transparent={this.state.transparent}>
//     Blasts
//   </StyledLink>
//   <StyledLink
//     to='/myfollowers'
//     transparent={this.state.transparent}
//   >
//     Followers
//   </StyledLink>
//   <DropDown className='ui dropdown simple'>
//     <AccountIcon />
//     <div className='menu'>
//       <Link className='item' to='/account'>
//         Account
//       </Link>
//       <div className='item' onClick={() => this.props.logUserOut()}>
//         Log Out
//       </div>
//     </div>
//   </DropDown>
// </>

export default withRouter(Header);
