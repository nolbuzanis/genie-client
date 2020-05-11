import React from 'react';
import styled from 'styled-components';

const Title = styled.h1`
  color: #656ded;
  font-size: 24px;
  font-weight: 600;
  padding-bottom: 10px;
`;

// const Subtitle = styled.h2`
//   padding-top: 8px;
//   font-size: 20;
//   font-weight: 400;
// `;
export default props => (
  <>
    <Title>{props.children}</Title>
    {/* {props.subtitle && <Subtitle>{props.subtitle}</Subtitle>} */}
  </>
);
