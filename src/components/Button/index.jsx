import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  display: block;
  cursor: pointer;
  width: 100%;
  background-color: ${props => (props.disabled ? '#DDDDDD' : '#8872ff')};
  height: 44px;
  border: none;
  color: white;
  line-height: 44px;
  text-align: center;
  font-size: 20px;
  border-radius: 10px;
  box-shadow: 4px 4px 6px rgba(0, 0, 0, 0.16);
`;

export default props => <Button {...props}>{props.text}</Button>;
