import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Landing = () => {

  const HeroImage = styled.div`
    position: relative;
    height: 680px;
    width: 100%;
    background: url('/landing-image.webp') center center no-repeat;
    background-size: cover;
  `;

  const Attention = styled.h1`
    color: white;
    font-size: calc(15px + 1.4vw);
    font-style: 700;
    padding-bottom: 20px;
    max-width: 650px;
  `;
  const AttentionWrapper = styled.div`
    padding: 280px calc(5px + 5.4vw) 0;
  `;

  const Button = styled(Link)`
    display: block;
    text-align: center;
    height: 50px;
    width: 230px;
    background: #F9C349;
    color: black;
    border-radius: 33px;
    line-height: 50px;
    border: none;
    box-shadow: 4px 4px 6px rgba(0, 0, 0, 0.3);
    font-size: 24px;
    transition: all ease 0.3s;
    &:hover {
      color: black;
      background: #FFD473;
    }
  `;
  // const HeadphonesImg = styled.img`
  // display: none;
  //   float: right;
  //   display: block;
  //   width: 300px;
  //   position: absolute;
  //   left: 800px;
  //   top: 145px;
  // `

  return (
    <HeroImage>
      <AttentionWrapper>
        <Attention>
          Revolutionize the way you engage your followers with Spotify Presaves.
        </Attention>
        <Button to='/signup'>Get Started</Button>
      </AttentionWrapper>
      {/* <HeadphonesImg src='/headphones-white.webp' /> */}
    </HeroImage>
  );
};

export default Landing;
