import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

const Header = styled.h1`
  font-size: 26px;
  font-weight: 600;
  color: #444444;
  //border-bottom: solid 1px rgba(129, 129, 129, 0.25);
  text-align: center;
  padding: 40px 10px 35px;
  margin: 0 20px;
`;
const ArrowImg = styled.img`
  height: 26.7px
  cursor: pointer;
  float: left;
`;

const BackPageHeader = ({ children, returnRoute, backAllways }) => {
  const history = useHistory();

  const handleGoBack = () => {
    if (returnRoute) return history.push(returnRoute);
    if (history.length > 2) return history.goBack();
    else history.push('/home');
  };

  const isMobile = window.innerWidth < 1024;

  return (
    <Header>
      {(isMobile || backAllways) && (
        <ArrowImg
          src='/assets/back-arrow-darkgrey.png'
          onClick={handleGoBack}
        />
      )}
      {children}
    </Header>
  );
};

export default BackPageHeader;
