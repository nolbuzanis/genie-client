import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../Context/authContext';
import { createNewArtist, switchArtist, logUserOut } from '../../api';
import { withRouter } from 'react-router-dom';
import * as menuIcons from './menuIcons';
import Modal from '../Modal';
import InputSection from '../../components/InputSection';
import Button from '../../components/Button';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useToasts } from 'react-toast-notifications';

const initialValues = {
  name: '',
};

const validationSchema = Yup.object().shape({
  name: Yup.string().trim().required('Please enter a valid name.'),
});

const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  z-index: 10;
  position: fixed;
  top: 0;
  //left: ${(props) => (props.open ? '0' : '-270px')};
  left: 0;
  bottom: 0;
  height: 100%;
  width: 270px;
  min-width: 270px;
  background-color: #e3e6ee;
  transition: all 0.3s ease;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.2);
  padding: 15px;
`;
const MenuPlaceholder = styled.div`
  height: 100%;
  width: 270px;
  min-width: 270px;
  display: inline-block;
`;

const ProfileSection = styled.div`
  display: flex;
  padding: 10px 20px;
  align-items: center;
  cursor: pointer;
  position: relative;
`;
const ProfilePic = styled.div`
  background: url(${(props) => props.img}) center center no-repeat;
  background-size: cover;
  background-color: white;
  width: 40px;
  height: 40px;
  border-radius: 25px;
  margin-right: 10px;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
`;
const ArtistName = styled.p`
  display: inline-block;
  margin: 0;
  font-size: 16px;
  color: #444444;
  max-width: 170px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const DownArrow = styled.img`
  width: 13px;
  height: 7.7px;
  margin-left: 10px;
`;
const AccountDropdown = styled.div`
  background: white;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  overflow: hidden;
  border-radius: 5px;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
  > {
    &:hover {
      background-color: #656ded;
      > p {
        color: white;
      }
    }
  }
`;
const AddButton = styled.img`
  width: 30px;
  height: 30px;
  margin: 5px 15px 5px 5px;
`;
const MenuItem = styled(Link)`
  display: flex;
  align-items: center;
  font-size: 15px;
  font-weight: ${({ active }) => (active ? '600' : '500')};
  color: ${({ active }) => (active ? '#656ded' : '#444444')};
  padding: 10px 10px 10px 0;
`;
const MenuContent = styled.div`
  display: flex;
  flex-grow: 1;
  //justify-content: space-between;
  flex-direction: column;
  padding: 20px 30px 0;
`;
const PicOutline = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 25px;
  background: white;
  margin-right: 10px;
`;
const MenuItemChild = styled(Link)`
  display: block;
  padding: 5px 0 5px 40px;
  font-size: 14px;
  font-weight: ${({ active }) => (active ? '500' : '400')};
  color: ${({ active }) => (active ? '#656ded' : '#444444')};
`;
const ChildContainer = styled.ul`
  margin: 0;
  padding: 0;
  max-height: ${({ showChildren }) => (showChildren ? '300px' : '0')};
  transition: ${({ showChildren }) =>
    showChildren
      ? 'all 0.3s cubic-bezier(1,0,1,0)'
      : 'all 0.3s cubic-bezier(0,1,0,1)'};
  overflow: hidden;
`;
const Spacing = styled.div`
  height: 15px;
`;

const ProfileDropdown = ({ user, onClose, setCreateModal }) => {
  const menuRef = useRef();
  const { addToast } = useToasts();

  const handleDropdownClick = (e) => {
    // if (!e.composedPath().includes(menuRef.current)) {
    //   // outside click
    //   return onClose();
    // }
    setTimeout(onClose, 10);
  };

  const handleAccountChange = async (id) => {
    const response = await switchArtist(id);

    if (response.error) {
      return addToast(response.error.message, { appearance: 'error' });
    }
    // else assume success and reload
    window.location.reload();
  };

  useEffect(() => {
    // add when mounted
    window.addEventListener('mousedown', handleDropdownClick);
    // return function to be called when unmounted
    return () => {
      window.removeEventListener('mousedown', handleDropdownClick);
    };
    // eslint-disable-next-line
  }, []);

  return (
    <AccountDropdown ref={menuRef}>
      <ProfileSection>
        <ProfilePic img={user.img ? user.img : '/default-user-256.png'} />
        <ArtistName>{user.name}</ArtistName>
      </ProfileSection>
      {user.accounts.map((account, i) => (
        <ProfileSection key={i} onClick={() => handleAccountChange(account.id)}>
          <ProfilePic
            img={account.img ? account.img : '/default-user-256.png'}
          />
          <ArtistName>{account.name}</ArtistName>
        </ProfileSection>
      ))}
      <ProfileSection onClick={() => setCreateModal(true)}>
        <PicOutline>
          <AddButton src='/assets/add-darkgrey-round.png' />
        </PicOutline>
        <ArtistName>New Artist</ArtistName>
      </ProfileSection>
    </AccountDropdown>
  );
};

const menu = [
  {
    name: 'Home',
    route: '/home',
    icon: menuIcons.HomeIcon,
  },
  {
    name: 'Your Link',
    route: '/profile',
    icon: menuIcons.LinkIcon,
  },
  {
    name: 'Releases',
    route: '/releases',
    icon: menuIcons.ReleaseIcon,
  },
  // {
  //   name: 'Followers',
  //   route: '/followers',
  //   icon: menuIcons.FollowerIcon
  // },
  // {
  //   name: 'Guides',
  //   route: '/guides',
  //   icon: menuIcons.GuidesIcon,
  // },
  // {
  //   name: 'Roadmap',
  //   route: '/roadmap',
  //   icon: menuIcons.RoadmapIcon
  // },
  {
    name: 'Legal & Privacy',
    route: '/legal',
    icon: menuIcons.PolicyIcon,
    children: [
      {
        name: 'Terms of Service',
        route: '/terms-of-service',
      },
      {
        name: 'Privacy Policy',
        route: '/privacy-policy',
      },
    ],
  },
  {
    name: 'Contact Us',
    route: '/help',
    icon: menuIcons.HelpIcon,
  },
  {
    name: 'Settings',
    route: '/settings',
    icon: menuIcons.SettingsIcon,
    children: [
      {
        name: 'Integrations',
        route: '/accounts',
      },
      {
        name: 'Plans & Billing',
        route: '/billing',
      },
      {
        name: 'Log Out',
        route: '#',
        onClick: logUserOut,
      },
    ],
  },
];

const MenuItemComponent = ({ route, name, icon, children }) => {
  const [showChildren, setShowChildren] = useState(false);
  const location = useLocation();

  let active = location.pathname === route;
  let childActive = false;
  if (children) {
    children.forEach((child) => {
      if (child.route === location.pathname) {
        childActive = child.route;
        showChildren || setShowChildren(true);
      }
    });
  }

  const handleClick = (e) => {
    e.preventDefault();
    setShowChildren(!showChildren);
  };

  return (
    <div>
      <MenuItem to={route} active={active} onClick={children && handleClick}>
        {icon({ active })}
        {name}
      </MenuItem>
      {children && (
        <ChildContainer showChildren={showChildren}>
          {children.map(({ route, name, onClick }, j) => (
            <MenuItemChild
              key={j}
              to={route}
              active={childActive === route}
              onClick={onClick}
            >
              {name}
            </MenuItemChild>
          ))}
        </ChildContainer>
      )}
    </div>
  );
};

const SideMenu = ({ lockedRoutes }) => {
  const { user } = useAuth();
  const [dropdown, setDropdown] = useState(false);
  const [createModal, setCreateModal] = useState(false);
  const location = useLocation();
  const { addToast } = useToasts();

  if (!user || user.error) {
    return null;
  }

  // const handleLogout = async () => {
  //   const response = await logUserOut();
  //   if (response.error) {
  //     console.log(response.error);
  //     return;
  //   }
  //   //props.setOpen(false);
  //   window.location.replace('/');
  // };

  const path = location.pathname;
  if (window.innerWidth < 1024 || lockedRoutes.includes(path)) return null;

  const handleSubmit = async ({ name }, { setSubmitting }) => {
    setSubmitting(true);

    const parsed = name.trim();

    const artist = await createNewArtist(parsed);
    if (artist.error) {
      addToast(artist.error.message, { appearance: 'error' });
      return setSubmitting(false);
    }
    console.log(artist);
    //success, reload page with new cookie
    window.location.reload();
  };

  const CreateArtistModal = ({ isOpen, onClose }) => (
    <Modal isOpen={isOpen} onClose={onClose} title='Create New Artist'>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {(props) => (
          <form onSubmit={props.handleSubmit}>
            <InputSection
              {...props}
              name='name'
              label='What do your fans call you?'
            />
            <Spacing />
            <Spacing />
            <Button disabled={props.isSubmitting} type='submit' square>
              {props.isSubmitting ? 'Creating...' : 'Create'}
            </Button>
            <Spacing />
            <Button type='button' alternate square onClick={() => onClose()}>
              Cancel
            </Button>
          </form>
        )}
      </Formik>
    </Modal>
  );

  return (
    <>
      <CreateArtistModal
        isOpen={createModal}
        onClose={() => setCreateModal(false)}
      />
      <MenuPlaceholder />
      <MenuContainer>
        <ProfileSection
          onClick={() => {
            setDropdown(true);
          }}
        >
          {dropdown && (
            <ProfileDropdown
              user={user}
              onClose={() => setDropdown(false)}
              setCreateModal={setCreateModal}
            />
          )}
          <ProfilePic img={user.img ? user.img : '/default-user-256.png'} />
          <ArtistName>{user.name ? user.name : ''}</ArtistName>
          <DownArrow src='/assets/down-arrow-grey.png' />
        </ProfileSection>
        <MenuContent>
          {menu.map((props, i) => (
            <MenuItemComponent {...props} key={i} />
          ))}
        </MenuContent>
        {/* <MenuHeader>
        <Logo to='/'>
          <LogoSpan>Genie</LogoSpan>
        </Logo>
        <HomeLink to='/home'>
          <img src='/dashboard-icon.png' alt='' />
          Dashboard
        </HomeLink>
      </MenuHeader>
      <MenuContent>
        <div>
          <StyledLink to='/dashboard' onClick={() => props.setOpen()}>
            Dashboard
          </StyledLink>
          <StyledLink to='/profile'>
            <img src='/profile-icon.png' alt='' />
            Profile
          </StyledLink>
          <StyledLink to='/releases'>
            <img src='/song-icon.png' alt='' />
            Releases
          </StyledLink>
          <StyledLink to='/billing'>
            <img src='/assets/card-icon.png' alt='' />
            Plans & Pricing
          </StyledLink>
          <StyledLink to='/help'>
            <img src='/assets/help-icon-grey.png' alt='' />
            Contact Us
          </StyledLink>
          <StyledLink to='/myfollowers' onClick={() => props.setOpen()}>
            Followers
          </StyledLink>
        </div>
        <div
          style={{
            backgroundColor: 'rgba(0,0,0,0.2)',
            borderTop: '1px solid #404854'
          }}
        >
          {/* <StyledLink to='/account' onClick={() => props.setOpen()}>
            Account Settings
          </StyledLink>
          <HomeLink to='#' onClick={handleLogout}>
            Log Out
          </HomeLink>
        </div>
      </MenuContent> */}
      </MenuContainer>
    </>
  );
};

export default withRouter(SideMenu);
