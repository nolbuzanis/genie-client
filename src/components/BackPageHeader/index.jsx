import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

const Header = styled.h1`
  font-size: 26px;
  font-weight: 600;
  color: #444444; 
  border-bottom: solid 1px rgba(129, 129, 129, 0.25); 
  text-align: center;
  padding: 40px 10px 35px;
  margin: 0 20px;
`;
const ArrowImg = styled.img`
  height: 26.7px
  cursor: pointer;
  float: left;
`;

const BackPageHeader = (props) => {
  const history = useHistory();

  const handleGoBack = () => {
    if (history.length > 2) return history.goBack();
    else history.push('/home');
  };

  return <Header>
    <ArrowImg src='/assets/back-arrow-darkgrey.png' onClick={handleGoBack} />
    {props.children}
  </Header>;

};

export default BackPageHeader;