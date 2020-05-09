import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

const CancelButton = styled.img`
  width: 60px;
  height: 60px;
  position: absolute;
  top: 20px;
  left: 30px;
  cursor: pointer;
`;

export default ({ onClick }) => {

  const history = useHistory();

  const handleGoBack = () => {
    if (history.length > 2) return history.goBack();
    else history.push('/home');
  };
  return <CancelButton src='/assets/cancel-button.png' onClick={onClick || handleGoBack} />
};