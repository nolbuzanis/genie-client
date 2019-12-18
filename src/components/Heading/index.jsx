import React from 'react';
import styled from 'styled-components';

const Title = styled.h1`
  font-size: 36px;
  font-weight: 700;
  color: #26046a;
`;

const Subtitle = styled.h2`
  padding-top: 8px;
  font-size: 20;
  font-weight: 400;
`;
export default props => (
  <>
    <Title>{props.title}</Title>
    {props.subtitle && <Subtitle>{props.subtitle}</Subtitle>}
  </>
);
