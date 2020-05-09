import React from 'react';
import styled from 'styled-components';
import { privacyPolicy } from '../../legal';
import BackPageHeader from '../../components/BackPageHeader';

const Text = styled.p`
  color: #444444;
  font-size: 12px;
  line-height: 1.67;
  padding-top: 25px;
`;
const TextContainer = styled.div`
  max-width: 700px;
  margin: 0 auto;
  padding: 0 20px 30px;
`;

const PrivacyPolicy = () => {
  return (
    <>
      <BackPageHeader backAllways>Privacy Policy</BackPageHeader>
      <TextContainer>
        {privacyPolicy.content.map((term, i) => (
          <Text key={i}>{term}</Text>
        ))}
      </TextContainer>
    </>
  );
};

export default PrivacyPolicy;
