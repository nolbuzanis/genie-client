import React from 'react';
import styled from 'styled-components';
import Button from '../../components/Button';
import { Link } from 'react-router-dom';

const Background = styled.div`
  background: url('/assets/concert.jpg') center center no-repeat;
  background-size: cover;
  width: 100%;
  height: 100%;
  color: white;
  text-align: center;
`;
const Title = styled.h1`
  font-size: 30px;
  font-weight: bold;
  padding-top: 40px;
`;
const SubTitle = styled.h2`
  font-size: 20px;
  font-weight: 400;
`;

const StyledLink = styled(Link)`
  box-shadow: 0 3px 6px rgba(0,0,0,0.16);
  margin-bottom: 50px;
`;
const Wrapper = styled.div`
max-width: 300px;
margin: 100px auto 0;
`;

const GetStarted = () => {

  return <Background>
    <Title>Genie</Title>
    <SubTitle>for artists</SubTitle>
    <Wrapper>
      <Button alt as={StyledLink} to='/login'>Log in</Button>
      <Button as={Link} to='/signup'>Sign up</Button>
      {/* <StyledLink as={Link} to='/login'>Continue with google</StyledLink>
    <StyledLink as={Link} to='/login'>Continue with facebook</StyledLink> */}
    </Wrapper>
  </Background>

};

export default GetStarted;