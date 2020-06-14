import React from 'react';
import styled from 'styled-components';

const Header = styled.h1`
  margin: 0;
  text-align: center;
  font-size: 26px;
  padding: 40px 40px 0;
  font-weight: 600;
  color: ${(props) =>
    props.color ? props.color : props.alternate ? '#fff' : '#656ded'};
`;

export default ({ alternate, color, children }) => (
  <Header alternate={alternate} color={color}>
    {children}
  </Header>
);
