import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Landing = () => {

  const HeroImage = styled.div`
    position: relative;
    height: 680px;
    width: 100%;
    background: url('/assets/landing-image.png') center center no-repeat;
    background-size: cover;
  `;

  const Attention = styled.h1`
    color: white;
    font-size: calc(15px + 1.4vw);
    font-style: 700;
    padding-bottom: 20px;
    max-width: 450px;
  `;
  const AttentionWrapper = styled.div`
    padding: 280px calc(5px + 5.4vw) 0;
  `;

  const Button = styled(Link)`
    display: block;
    text-align: center;
    height: 50px;
    width: 230px;
    background: white;
    color: #4568dc;
    border-radius: 33px;
    line-height: 50px;
    border: none;
    box-shadow: 4px 4px 6px rgba(0, 0, 0, 0.3);
    font-size: 24px;
    font-weight: 700;
    background: linear-gradient(to right, #c6b973 50%, white 50%);
    background-size: 200% 100%;
    background-position: right bottom;
    transition: all .5s ease-out;
    &:hover {
      color: white;
       background-position: left bottom;
    }
    
  `;
  const HeadphonesImg = styled.img`
    display: none;
    float: right;
    display: block;
    width: 300px;
    position: absolute;
    right: 160px;
    top: 145px;
    @media only screen and (max-width: 1000px) {
      display: none;
    }
  `
  const BottomWave = styled.img`
    position: absolute;
    bottom: -1px;
    left: 0;
    right: 0;
    height: 120px;
    width: 100%;
  `
  const BodyContainer = styled.div`
    //height: 100%;
    width: 100%;
    background-color: #f3f8ff;
    padding: 25px calc(5px + 5.4vw) 80px;
  `
  const Heading = styled.h1`
    font-size: 40px;
  `
  const Steps = styled.ul`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 65px 0 35px;
  `
  const StepImg = styled.img`
    width: 70px;
    height: 70px;
  `
  const StepsHeading = styled.h2`
    padding-top: 25px;
    font-size: 24px;
    font-weight: 700;
  `
  const StepsContent = styled.p`
    font-size: 18px;
    padding-top: 25px;
  `
  const Step = styled.div`
    width: 240px;
    margin: 10px;
    padding-bottom: 50px;
  `
  const SubHeading = styled.p`
    font-weight: 300;
    font-size: 20px;
    padding-top: 10px;
    padding-bottom: 20px;
  `
  const howItWorksContent = [
    {
      title: 'Set up your profile',
      content: 'Easily import your profile from spotify. Customize things such as your photo, bio, social links, and more!',
      icon: '/assets/profile-landing-icon.png'
    },
    {
      title: 'Build a following',
      content: 'Share your profile alongside song previews and social media posts so your fans can follow you.',
      icon: '/assets/followers-landing-icon.png'
    },
    {
      title: 'Schedule a release',
      content: 'Send your latest release to your followers on release day and save it to their Spotify library.',
      icon: '/assets/calendar-landing-icon.png'
    },
    {
      title: 'Grow on Spotify',
      content: 'The more saves you have on Spotify, the higher chance you have of being recognized by the Spotify Algorithm and getting on those recommended playlists.',
      icon: '/assets/statistics-landing-icon.png'
    },
  ];

  const FAQs = [
    {
      question: 'How much does it cost?',
      answer: 'Absolutely nothing! Not a single penny.'
    },
    {
      question: 'What is a presave?',
      answer: 'Pre-save to Spotify is functionality that allows your fans to connect on Spotify and have an upcoming song automatically added to their Spotify library on release day.'
    },
    {
      question: 'How will this help me?',
      answer: 'Presaving allows artists to acquire listeners on releases much faster than they normally would. As well, followers can be rewarded with exclusive content, discounts on tickets or merch, and stay up to date with every new song you release.'
    },
    {
      question: 'How long does it take to setup?',
      answer: 'It takes less than a minute! After you signup, we ask you to import your artist profile on Spotify which automatically populates fields such as your name & photo, and these can also be customized later.'
    }
  ];

  const renderHowItWorks = () => {
    return howItWorksContent.map((item) => {
      return <Step key={item.icon}>
        <StepImg src={item.icon} />
        <StepsHeading>{item.title}</StepsHeading>
        <StepsContent>{item.content}</StepsContent>
      </Step>
    });
  };

  const FaqItem = styled.div`
    padding: 25px;
    border-bottom: ${props => !props.last && 'solid 1px #4b4b4b'};
    margin-right: 4vw;
    cursor: pointer;
`;
  const FaqQuestion = styled.h3`
    font-size: calc(16px + 0.6vw);
    font-weight: 500;
  `
  const OpenFAQ = styled.img`
    width: 30px;
    height: 30px;
    margin-right: 20px;
  `
  const FaqAnswer = styled.p`
    font-size: 18px;
    padding-top: 20px;
    font-weight: 300;
  `
  const Flex = styled.div`
   display: flex;
    justify-content: space-between;
  `
  const CallToAction = styled(Link)`
    display: block;
    background: #8872ff;
    width: 200px;
    height: 55px;
    line-height: 55px;
    font-size: 24px;
    font-weight: 400;
    margin: 30px auto 0;
    border-radius: 10px;
    border: none;
    color: white;
    text-align: center;
    box-shadow: 4px 4px 6px rgba(0,0,0,0.16);
  `
  const Footer = styled.div`
    width: 100%;
    height: 245px;
    background-color: #8872ff;
    color: white;
    padding: 50px calc(5px + 5.4vw) 0px;
  `
  const FooterLogo = styled.h1`
    font-size: 36px;
    font-weight: 700;
  `

  const FAQ = ({ faq, last }) => {
    const [open, setOpen] = React.useState(false);
    return <FaqItem onClick={() => setOpen(!open)} last={last}>
      <Flex >
        <FaqQuestion>{faq.question}</FaqQuestion>
        <OpenFAQ src={open ? '/assets/purple-minus-icon.png' : '/assets/purple-add-icon.png'} />
      </Flex>
      {open && <FaqAnswer>{faq.answer}</FaqAnswer>}
    </FaqItem>;
  };

  const renderFAQs = () => {
    return FAQs.map((faq, i) => {
      return <FAQ key={i} faq={faq} last={FAQs.length - 1 === i} />;
    });
  };

  return (
    <>
      <HeroImage>
        <AttentionWrapper>
          <Attention>
            Revolutionizing the way music artists engage their followers.
        </Attention>
          <Button to='/signup'>Get Started</Button>
        </AttentionWrapper>
        <HeadphonesImg src='/headphones-white.webp' />
        <BottomWave src='assets/landing-image-bottom.png' />
      </HeroImage>
      <BodyContainer>
        <Heading>How it works...</Heading>
        <Steps>
          {renderHowItWorks()}
        </Steps>
        <Heading>FAQs</Heading>
        <SubHeading>Here are some commonly asked questions about Genie.</SubHeading>
        {renderFAQs()}
        <CallToAction to='/signup'>Sign me up!</CallToAction>
      </BodyContainer>
      <Footer>
        <FooterLogo>Genie</FooterLogo>
      </Footer>
    </>
  );
};

export default Landing;
