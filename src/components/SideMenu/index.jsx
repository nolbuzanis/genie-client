import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import authContext from '../../Context/authContext';

const CloseIcon = props => (
  <CloseIconContianer onClick={() => props.setOpen()}>
    <svg
      version='1.1'
      id='Capa_1'
      xmlns='http://www.w3.org/2000/svg'
      xmlnsXlink='http://www.w3.org/1999/xlink'
      x='0px'
      y='0px'
      width='32px'
      height='32px'
      viewBox='0 0 612 612'
      style={{ enableBackground: 'new 0 0 612 612' }}
      xmlSpace='preserve'
    >
      <g>
        <g id='cross'>
          <g>
            <polygon
              points='612,36.004 576.521,0.603 306,270.608 35.478,0.603 0,36.004 270.522,306.011 0,575.997 35.478,611.397 
				306,341.411 576.521,611.397 612,575.997 341.459,306.011 			'
            />
          </g>
        </g>
      </g>
    </svg>
  </CloseIconContianer>
);

const CloseIconContianer = styled.div`
  position: absolute;
  right: 30px;
  top: 25px;
  width: 32px;
  height: 32px;
  cursor: pointer;
`;

const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: ${props => (props.open ? '0' : '-360px')};
  bottom: 0;
  height: 100%;
  width: 100%;
  max-width: 360px;
  background: white;
  transition: all 0.5s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
`;
const ProfilePic = styled.div`
  background: url(${props => props.img}) center center no-repeat;
  background-size: cover;
  width: 70px;
  height: 70px;
  border-radius: 35px;
`;
const MenuHeader = styled.div`
  margin: 0 30px;
  padding-top: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #666666;
`;
const ArtistName = styled.p`
  padding-top: 12px;
  margin: 0;
  font-size: 20px;
`;
const UserDate = styled.p`
  margin: 0;
  padding: 0;
  font-weight: 300;
  padding-top: 2px;
`;
const MenuContent = styled.div`
  display: flex;
  flex-grow: 1;
  justify-content: space-between;
  flex-direction: column;
  padding-top: 12px;
`;
const StyledLink = styled(Link)`
  color: black;
  display: block;
  font-weight: 300;
  font-size: 24px;
  padding: 10px 0;
  padding-left: 50px;
  &:hover,
  &:active {
    background: #f0f0f0;
    color: black;
  }
`;

const Line = styled.div`
  border-top: 1px solid #666666;
  margin: 0 30px;
  height: 10px;
`;
const Spacing = styled.div`
  height: 10px;
`;

const SideMenu = props => {
  const { auth } = React.useContext(authContext);

  const fetchUserDate = () => {
    const createdAt = new Date(auth.createdAt);
    const month = createdAt.toLocaleString('default', {
      month: 'short'
    });
    const year = createdAt.toLocaleString('default', { year: 'numeric' });
    return month + '. ' + year;
  };

  const handleLogout = () => {
    console.log('Logging user out!');
  };

  return (
    <MenuContainer {...props}>
      <MenuHeader>
        <ProfilePic img={auth.img ? auth.img : '/default-user-256.png'} />
        <ArtistName>{auth.name ? auth.name : ''}</ArtistName>
        <UserDate>
          {auth.createdAt ? `Artist since ${fetchUserDate()}` : ''}
        </UserDate>
      </MenuHeader>
      <CloseIcon {...props} />
      <MenuContent>
        <div>
          {/* <StyledLink to='/dashboard' onClick={() => props.setOpen()}>
            Dashboard
          </StyledLink> */}
          <StyledLink to='/profile' onClick={() => props.setOpen()}>
            Profile
          </StyledLink>
          {/* <StyledLink to='/blasts' onClick={() => props.setOpen()}>
            Blasts
          </StyledLink>
          <StyledLink to='/myfollowers' onClick={() => props.setOpen()}>
            Followers
          </StyledLink> */}
        </div>
        <div>
          <Line />
          <StyledLink to='/account' onClick={() => props.setOpen()}>
            Account Settings
          </StyledLink>
          <StyledLink to='#' onClick={handleLogout}>
            Log Out
          </StyledLink>
          <Spacing />
        </div>
      </MenuContent>
    </MenuContainer>
  );
};

export default SideMenu;
