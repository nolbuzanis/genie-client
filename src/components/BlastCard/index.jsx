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
const Date = styled.p`
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
  background: #080808;
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

const BlastCard = props => (
  <div style={{ position: 'relative' }}>
    <Background img={props.img}>
      <Title>{props.title}</Title>
    </Background>
    <Content>
      <Saves>
        <strong>2</strong> saves
      </Saves>
      <Date>Created on Nov. 2, 2019</Date>
    </Content>
    <Button>Save to 2 followers</Button>
  </div>
);

export default BlastCard;
