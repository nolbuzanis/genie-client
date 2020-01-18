import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import authContext from '../../Context/authContext';
import { logUserOut } from '../../api';
import { withRouter } from 'react-router-dom';

const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  z-index: 10;
  position: fixed;
  top: 0;
  left: ${props => (props.open ? '0' : '-270px')};
  bottom: 0;
  height: 100%;
  width: 270px;
  min-width: 270px;
  background: linear-gradient(#8872FF, #4568DC);
  transition: all 0.3s ease;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.2);
  @media (min-width: 920px) {
    left: 0;
    position: relative;
    bottom: 0;
  }
`;
const ProfileSection = styled.div`
  border-bottom: 1px solid #404854;
  display: flex;
  padding: 20px;
  
`
const ProfilePic = styled.div`
  background: url(${props => props.img}) center center no-repeat;
  background-size: cover;
  width: 50px;
  height: 50px;
  border-radius: 25px;
  margin-right: 10px;
`;
const MenuHeader = styled.div`
  border-bottom: 1px solid #404854;
  background-color: rgba(0,0,0,0.2);
`;
const ArtistName = styled.p`
  margin: 0;
  font-size: 18px;
  color: white;
  width: 170px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const UserDate = styled.p`
  margin: 0;
  padding: 0;
  font-weight: 300;
  padding-top: 2px;
  font-size: 14px;
  color: #E1E1E1;
`;
const MenuContent = styled.div`
  display: flex;
  flex-grow: 1;
  justify-content: space-between;
  flex-direction: column;
`;
const StyledLink = styled(Link)`
  display: block;
  font-size: 20px;
  height: 45px;
  line-height: 45px;
  color: #E1E1E1;
  padding-left: 30px;
  &:hover,
  &:active {
    background: rgba(255,255,255,0.2);
    color: #E1E1E1;
  }
  >img {
    height: 20px;
    margin-right: 20px;
    margin-top: 13px;
    margin-bottom: -3px;
  }
`;
const Logo = styled(Link)`
  display: block;
  font-weight: 700;
  color: #9FC7FF;
  font-size: 24px;
  padding-left: 25px;
  padding-top: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #404854;
  &:hover{
    color: #9FC7FF;
  }
`
const HomeLink = styled(Link)`
  display: block;
  padding: 20px 25px;
  font-size: 24px; 
  > img {
    height: 24px;
    margin-right: 9px;
  }
  &:hover {
    background-color: rgba(255,255,255,0.2);
  }
`
const LogoSpan = styled.span`
  color: white;
  font-weight: 400;
  padding-left: 10px;
`

const SideMenu = ({ open, setOpen }) => {
  const { user } = React.useContext(authContext);

  if (!user || user.error) {
    return null;
  }

  const fetchUserDate = () => {
    const createdAt = new Date(user.createdAt);
    const month = createdAt.toLocaleString('default', {
      month: 'short'
    });
    const year = createdAt.toLocaleString('default', { year: 'numeric' });
    return month + '. ' + year;
  };

  const handleLogout = async () => {
    const response = await logUserOut();
    if (response.error) {
      console.log(response.error);
      return;
    }
    //props.setOpen(false);
    window.location.replace('/');
  };

  return (
    <MenuContainer open={open}>
      <MenuHeader>
        <Logo to='/'>g<LogoSpan>Genie</LogoSpan></Logo>
        <ProfileSection>
          <ProfilePic img={user.img ? user.img : '/default-user-256.png'} />
          <div>
            <ArtistName>{user.name ? user.name : ''}</ArtistName>
            <UserDate>
              {user.createdAt ? `Artist since ${fetchUserDate()}` : ''}
            </UserDate>
          </div>
        </ProfileSection>
        <HomeLink to='/profile' onClick={() => setOpen(false)}>
          <img src='/dashboard-icon.png' alt='' />
          Dashboard
          </HomeLink>
      </MenuHeader>
      <MenuContent>
        <div>
          {/* <StyledLink to='/dashboard' onClick={() => props.setOpen()}>
            Dashboard
          </StyledLink> */}
          <StyledLink to='/profile' onClick={() => setOpen(false)}>
            <img src='/profile-icon.png' alt='' />
            Profile
          </StyledLink>
          <StyledLink to='/allsongs' onClick={() => setOpen(false)}>
            <img src='/song-icon.png' alt='' />
            Releases
          </StyledLink>
          {/* <StyledLink to='/myfollowers' onClick={() => props.setOpen()}>
            Followers
          </StyledLink> */}
        </div>
        <div style={{ backgroundColor: 'rgba(0,0,0,0.2)', borderTop: '1px solid #404854' }}>
          {/* <StyledLink to='/account' onClick={() => props.setOpen()}>
            Account Settings
          </StyledLink> */}
          <HomeLink to='#' onClick={handleLogout}>
            Log Out
          </HomeLink>
        </div>
      </MenuContent>
    </MenuContainer>
  );
};

export default withRouter(SideMenu);
