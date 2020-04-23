import React from 'react';
import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';
import { logUserOut } from '../../api';

const MenuContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    //background: white;
`;
const MenuItem = styled(Link)`
    //position: relative;
    display: block;
    width: 100%;
    //text-align: left;
    color: #757575;
    &: hover,
    &: visited,
    &: active {
    text-decoration: none;
    color: #757575;
    }
`;
const MenuItemContent = styled.div`
    display: flex;
    ${({ image }) => !image && 'justify-content: space-between;'}
    align-items: center;
    padding: 14px 33px;
    line-height: 16px;
    &: active {
        background-color: #f9f9f9;
    }
`;
// const Divider = styled.div`
//     margin-left: 18px;
//     margin-right: 18px;
//     border-bottom: 1px solid #d6d6d6;
// `;
const Icon = styled.img`
    width: 26px;
    height: 26px;
    margin-right: 18px;
`;
const Header = styled.h1`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 50px 10px 20px 17px;
    margin: 0 18px 14px;
    font-size: 30px;
    font-weight: 600;
    color: #757575;
    border-bottom: solid 1px #818181;
`;
const CloseArrow = styled.img`
    width: 25px;
    height: 25px;
    cursor: pointer;
`;
const ArrowIcon = styled.img`
    //right: 28px;
    width: 26px;
    height: 26px;
`;
const LogoutMenuItem = styled.button`
    width: calc(100% - 36px);
    display: flex;
    align-items: center;
    background: white;
    border: none;
    cursor: pointer;
    padding: 20px 13px;
    line-height: 16px;
    color: #757575;
    border-top: solid 1px #818181;
    margin: 0 18px;
`;
const MenuText = styled.p`
    font-size: 20px;
    font-weight: 500;
`;
const MenuItemContainer = styled.div`
    flex-grow: 1;
`;

const menuItems = [
  // { image: 'notification', title: 'Notifications', route: '/notifications' },
  // { image: "settings", title: "Account Settings", route: '/settings' },
  // { image: "help", title: "Contact Us", route: "/help" },
  // { image: "update", title: "Latest Changes", route: "/help" }
];

const ExtendedMenu = () => {
  const history = useHistory();
  return (
    <MenuContainer>
      <Header>
        Menu
        <CloseArrow onClick={() => history.goBack()} src='/assets/back-arrow-grey.png' />
      </Header>
      <MenuItemContainer>
        {menuItems.map((item, index) => (
          <MenuItem
            key={index}
            to={item.route}
          >
            <MenuItemContent image={item.image}>
              {item.image
                ? <>
                  <Icon src={`/assets/${item.image}-menu-icon.png`} />
                  <MenuText>{item.title}</MenuText>
                </>
                : <>
                  <MenuText>{item.title}</MenuText>
                  <ArrowIcon src='/assets/arrow-right.png' />
                </>
              }
            </MenuItemContent>
            {/* <Divider /> */}
          </MenuItem>
        ))}
      </MenuItemContainer>
      <LogoutMenuItem onClick={logUserOut}>
        <Icon src='/assets/logout-menu-icon.png' />
        <MenuText>Log Out</MenuText>
      </LogoutMenuItem>
    </MenuContainer >
  );
};

export default ExtendedMenu;