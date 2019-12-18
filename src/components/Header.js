import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logUserOut } from '../actions';
import styled from 'styled-components';
import AccountIcon from './AccountIcon';
import { withRouter } from 'react-router-dom';
import history from '../history';
import SideMenu from '../components/SideMenu';

const IconContainer = styled.div`
  display: ${props => (props.show ? 'block' : 'none')}
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
    !props.transparent && '2px 2px 4px rgba(0, 0, 0, 0.5)'};
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

const DropDown = styled.div`
  width: 100px;
  height: 100%;
  vertical-align: middle;
  text-align: center;
`;

class Header extends React.Component {
  state = { transparent: false, open: false };

  SvgIcon = () => (
    <IconContainer
      onClick={() => this.setState({ open: true })}
      show={this.props.auth.user.spotifyURI && this.props.auth.user}
    >
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

  render() {
    if (history.location.pathname === '/' && !this.state.transparent) {
      this.setState({ transparent: true });
    }
    if (this.state.transparent && history.location.pathname !== '/') {
      this.setState({ transparent: false });
    }
    return (
      <HeaderContainer transparent={this.state.transparent}>
        <Logo to='/' transparent={this.state.transparent}>
          idpt.
        </Logo>
        {this.props.auth.user ? (
          <>
            {this.SvgIcon()}
            <SideMenu
              open={this.state.open}
              setOpen={() => this.setState({ open: false })}
              onLogout={() => this.props.logUserOut()}
              user={this.props.auth.user}
            />
          </>
        ) : (
          <Nav>
            <StyledLink to='/login' transparent={this.state.transparent}>
              Log In
            </StyledLink>
          </Nav>
        )}
      </HeaderContainer>
    );
  }
}

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

const mapStateToProps = state => {
  return { auth: state.auth };
};

export default connect(
  mapStateToProps,
  { logUserOut }
)(withRouter(Header));
