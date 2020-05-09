import React from 'react';
import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';

const MenuContainer = styled.div`
    width: 100%;
    height: 100%;
    //display: flex;
    //flex-direction: column;
    //justify-content: space-between;
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
    padding: 7px 33px;
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
    text-align: center;
    font-weight: 600;
    color: #444444;
    border-bottom: solid 1px #818181;
`;
const CloseArrow = styled.img`
    //width: 25px;
    height: 40px;
    cursor: pointer;
    //float: left;
    //padding-top: 6px;
`;
const ArrowIcon = styled.img`
    width: 26px;
    height: 26px;
`;
const MenuText = styled.p`
    font-size: 20px;
    font-weight: 500;
`;

const SubMenu = ({ menuItems, title }) => {
  const history = useHistory();

  // const handleGoBack = () => {
  //   if (history.length > 2) return history.goBack();
  //   else history.push('/home');
  // };

  return (
    <MenuContainer>
      <Header>
        <CloseArrow onClick={() => history.push('/menu')} src='/assets/back-arrow-darkgrey.png' />
        {title}
        <div style={{ width: '25px' }} />
      </Header>
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
                <ArrowIcon src='/assets/arrow-forward-grey.png' />
              </>
            }
          </MenuItemContent>
          {/* <Divider /> */}
        </MenuItem>
      ))}
    </MenuContainer >
  );
};

export default SubMenu;