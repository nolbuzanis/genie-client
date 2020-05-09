import React from 'react';
import styled from 'styled-components';

const Features = styled.ul`
  padding: 20px 20px 0;
  font-size: 13px;
  font-weight: 500;
  color: #818181;
  text-align: left;
  list-style-type: none;
  margin: 0;
  > li {
    padding-bottom: 10px;
    padding-left: 10px;
  }
`;
const Checkmark = styled.img`
  width: 14.8px;
  height: 11.5px;
  margin-right: 10px;
`;

const premium = [
  'Unlimited presaves with Spotify',
  'Apple Music presaves (soon)',
  'Analytics & data on followers',
  'Followers emailing list',
  'Have a say in future features'
];

export default ({ features = premium }) => (
  <Features>
    {features.map((item, i) => (
      <li key={i}>
        <Checkmark src='/assets/blue-checkmark-icon.png' />
        {item}
      </li>
    ))}
  </Features>
);