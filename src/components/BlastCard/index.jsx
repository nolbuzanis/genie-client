import React from 'react';
import styled from 'styled-components';

const Title = styled.h3`
  width: 100%;
  height: 100%;
  line-height: 150px;
  font-weight: 700;
  font-size: 20px;
  text-align: center;
  color: white;
  background: rgba(0, 0, 0, 0.3);
`;
const Content = styled.div`
  background: #e2e2e2;
  width: 100%;
  height: 100px;
  font-weight: 300;
  padding-left: 20px;
`;

const Saves = styled.p`
  margin: 0;
  padding-top: 15px;
`;
const DateString = styled.p`
  margin: 0;
  font-style: italic;
`;

const Button = styled.button`
  position: absolute;
  bottom: -22px;
  left: 50%;
  margin-left: -100px;
  width: 200px;
  height: 44px;
  color: white;
  background: ${props => props.disabled ? '#C7C7C7' : '#080808'};
  border: none;
  box-shadow: 4px 4px 6px rgba(0, 0, 0, 0.16);
  font-size: 16px;
`;

const Background = styled.div`
  position: relative;
  background: ${props =>
    props.img ? `url('${props.img}') center center no-repeat` : 'black'};
  background-size: cover;
  width: 100%;
  height: 120px;
`;

const BlastCard = props => {
  const created = new Date(props.createdAt);
  const parsed = created.toLocaleString('default', { month: 'short', day: 'numeric', year: 'numeric' }).split(' ');

  return (<div style={{ position: 'relative' }}>
    <Background img={props.img}>
      <Title>{props.title}</Title>
    </Background>
    <Content>
      <Saves>
        <strong>{props.saves}</strong> saves
      </Saves>
      <DateString>Created on {parsed[0] + '. ' + parsed[1] + ' ' + parsed[2]}</DateString>
    </Content>
    <Button disabled>Saved to all followers</Button>
  </div>);
};

export default BlastCard;
