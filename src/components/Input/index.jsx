import React from 'react';
import styled from 'styled-components';

const Input = styled.input`
  box-sizing:border-box
  border-radius: 10px;
  border: solid 1px ${props => (props.error ? '#BD3200' : '#d6d6d6')};
  width: 100%;
  height: 40px;
  font-size: 20px;
  padding: 10px 15px;
`;

export default props => (
  <Input {...props} name={props.name} placeholder={props.placeholder}></Input>
);
