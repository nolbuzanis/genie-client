import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { privacyPolicy } from '../../legal';

const Header = styled.h1`
  font-size: 30px;
  font-weight: 600;
  color: #444444; 
  padding-top: 25px;
  padding-bottom: 30px;
  border-bottom: solid 1px rgba(129, 129, 129, 0.25); 
  text-align: center;
  margin-bottom: 10px;
`;
const ArrowImg = styled.img`
  height: 40px;
  cursor: pointer;
`;
const Container = styled.div`
  padding: 30px 20px;
`;
const Text = styled.p`
  color: #444444;
  font-size: 12px;
  line-height: 1.67;
  padding-top: 25px;
`;
const TextContainer = styled.div`
  max-width: 700px;
  margin: 0 auto;
`;

const PrivacyPolicy = () => {
  const history = useHistory();

  return <Container>
    <ArrowImg src='/assets/back-arrow-darkgrey.png' onClick={() => history.goBack()} />
    <Header>Privacy Policy</Header>
    <TextContainer>
      {privacyPolicy.content.map((term, i) => (
        <Text key={i}>{term}</Text>
      ))}
    </TextContainer>
  </Container>
};

export default PrivacyPolicy;