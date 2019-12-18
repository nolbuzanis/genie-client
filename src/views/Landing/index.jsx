import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Landing = () => {
  const Mask = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.3);
  `;

  const HeroImage = styled.div`
    position: relative;
    height: 100vh;
    width: 100%;
    background: url('./purple-fireworks.jpg') center center no-repeat;
    background-size: cover;
  `;

  const Attention = styled.h1`
    color: white;
    font-size: 30;
    font-style: 700;
    padding-bottom: 25px;
    @media only screen and (max-width: 767px) {
      font-size: 24px;
    }
  `;
  const AttentionWrapper = styled.div`
    position: absolute;
    left: 10vw;
    bottom: 100px;
    z-index: 1;
    padding-right: 10vw;
  `;

  const Button = styled(Link)`
    display: block;
    text-align: center;
    height: 50px;
    width: 230px;
    color: white;
    background: #8872ff;
    border-radius: 33px;
    line-height: 50px;
    border: none;
    box-shadow: 4px 4px 6px rgba(0, 0, 0, 0.16);
    font-size: 24px;
  `;

  return (
    <HeroImage>
      <AttentionWrapper>
        <Attention>
          Increase engagement on Spotify. Jumpstart your career.
        </Attention>
        <Button to='/signup'>Get Started</Button>
      </AttentionWrapper>
      <Mask />
    </HeroImage>
  );
};

export default Landing;
