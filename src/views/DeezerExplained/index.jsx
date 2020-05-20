import React from 'react';
import styled from 'styled-components';
import Button from '../../components/Button';
import { withRouter } from 'react-router-dom';

const Container = styled.div`
  margin: 0 auto;
  width: 100%;
  max-width: 400px;
  padding: 20px;
`;
const WelcomeHeader = styled.h1`
  //font-size: calc(20px + 2.1vw);
  font-size: 24px;
  color: #4568dc;
  font-weight: 600;
`;
const BackArrow = styled.img`
  margin-top: 20px;
  margin-left: 30px;
  width: 30px;
  height: 30px;
  display: block;
  cursor: pointer;
`;
const Text = styled.li`
  color: #707070;
  padding-bottom: 15px;
  padding-left: 10px;
`;
const BoldText = styled.span`
  font-weight: 700;
`;
const Pic = styled.img`
  width: 100%;
  max-width: 400px;
`;
const ButtonWrapper = styled.div`
  max-width: 140px;
  padding: 20px 0;
  margin: 0 auto;
`;

const DeezerExplained = ({ history }) => {
  return (
    <>
      <BackArrow
        src='/assets/back-arrow-grey.png'
        onClick={() => history.goBack()}
      />
      <Container>
        <WelcomeHeader>Finding your Deezer Artist Link</WelcomeHeader>
        <ol>
          <Text>Go to your artist page on Deezer.</Text>
          <Text>
            Click the three dots <BoldText>. . .</BoldText>
          </Text>
          <Text>
            Click <BoldText>Share</BoldText>
          </Text>
          <Text>
            Click <BoldText>Copy</BoldText> to copy your artist link.
          </Text>
        </ol>
        <Pic src='/assets/find-deezer-artist-1.png' />
        <Pic src='/assets/find-deezer-artist-2.png' />
        <ButtonWrapper>
          <Button alternate onClick={() => history.goBack()}>
            Return
          </Button>
        </ButtonWrapper>
      </Container>
    </>
  );
};

export default withRouter(DeezerExplained);
