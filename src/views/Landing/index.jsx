import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import { Event } from '../../analytics';
import { Link as ScrollLink } from 'react-scroll';

const HeroImage = styled.div`
  position: relative;
  height: 520px;
  width: 100%;
  background: url(${window.innerWidth >= 1024
      ? '/assets/landing-image-2.jpg'
      : '/assets/landing-image-2-sm.jpg'})
    center center no-repeat;
  background-size: cover;
`;
const Overlay = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-image: linear-gradient(
    to bottom,
    rgba(136, 114, 255, 0.8),
    #4568dc
  );
  opacity: 0.8;
`;

const Attention = styled.h1`
  color: white;
  font-size: calc(15px + 1vw);
  font-style: 700;
  padding-bottom: 20px;
  max-width: 600px;
`;
const AttentionWrapper = styled.div`
  position: relative;
  background: none;
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
  font-weight: 600;
  // background: linear-gradient(to right, #c6b973 50%, white 50%);
  // background-size: 200% 100%;
  // background-position: right bottom;
  transition: all 0.5s ease;
  background: rgba(255, 255, 255, 1);
  &:hover {
    background: rgba(255, 255, 255, 0.8);
    //   color: white;
    //   background-position: left bottom;
  }
`;
// const HeadphonesImg = styled.img`
//   display: none;
//   float: right;
//   display: block;
//   width: 300px;
//   position: absolute;
//   right: 160px;
//   top: 145px;
//   @media only screen and (max-width: 1000px) {
//     display: none;
//   }
// `;
// const BottomWave = styled.img`
//   position: absolute;
//   bottom: -1px;
//   left: 0;
//   right: 0;
//   height: 120px;
//   width: 100%;
// `;
const BodyContainer = styled.div`
  //height: 100%;
  width: 100%;
  background-color: #f3f8ff;
  padding: 50px calc(5px + 5.4vw) 80px;
`;
const Heading = styled.h1`
  font-size: 30px;
  text-align: center;
  color: #444444;
  padding-bottom: 30px;
  font-weight: 600;
`;
const Steps = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 30px 0 35px;
  margin: 0;
`;
const StepImg = styled.img`
  width: 50px;
  height: 50px;
`;
const StepsHeading = styled.h2`
  padding-top: 15px;
  font-size: 20px;
  font-weight: 600;
  color: #444444;
`;
const StepsContent = styled.p`
  font-size: 18px;
  padding-top: 20px;
`;
const Step = styled.div`
  width: 240px;
  margin: 10px;
  padding-bottom: 50px;
`;
const SubHeading = styled.p`
  font-weight: 300;
  font-size: 20px;
  padding-top: 10px;
  padding-bottom: 20px;
`;

const FaqItem = styled.div`
  padding: 25px;
  border-bottom: ${props => !props.last && 'solid 1px #4b4b4b'};
  margin-right: 4vw;
  cursor: pointer;
`;
const FaqQuestion = styled.h3`
  font-size: calc(13px + 0.6vw);
  font-weight: 500;
  color: #444444;
`;
const OpenFAQ = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 20px;
`;
const FaqAnswer = styled.p`
  font-size: 18px;
  padding-top: 20px;
  font-weight: 300;
`;
const Flex = styled.div`
  display: flex;
  justify-content: space-between;
`;
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
  box-shadow: 4px 4px 6px rgba(0, 0, 0, 0.16);
`;
const Footer = styled.div`
  width: 100%;
  min-height: 245px;
  background-image: linear-gradient(
    to bottom,
    rgba(136, 114, 255, 0.8),
    #4568dc
  );
  color: white;
  padding: 50px calc(20px + 5.4vw);
`;
const FooterLogo = styled.h1`
  font-size: 36px;
  font-weight: 700;
  margin-right: 140px;
`;
const FooterHeader = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: white;
  padding-bottom: 5px;
  padding-top: 10px;
`;
const FooterLink = styled(Link)`
  display: block;
  padding-top: 5px;
  font-size: 18px;
  font-weight: 400;
`;
const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  flex-direction: row-reverse;
  @media only screen and (max-width: 500px) {
    justify-content: flex-end;
  }
`;
const FooterSection = styled.div`
  margin-bottom: 50px;
`;

const howItWorksContent = [
  {
    title: 'Set up your profile',
    content:
      'Easily import your profile from spotify. Customize things such as your photo, bio, social links, and more!',
    icon: '/assets/profile-landing-icon.png'
  },
  {
    title: 'Build a following',
    content:
      'Share your profile alongside song previews and social media posts so your fans can follow you.',
    icon: '/assets/followers-landing-icon.png'
  },
  {
    title: 'Schedule a release',
    content:
      'Send your latest release to your followers on release day and save it to their Spotify library.',
    icon: '/assets/calendar-landing-icon.png'
  },
  {
    title: 'Grow on Spotify',
    content:
      'The more saves you have on Spotify, the higher chance you have of being recognized by the Spotify Algorithm and getting on those recommended playlists.',
    icon: '/assets/statistics-landing-icon.png'
  }
];

const FAQs = [
  {
    question: 'How much does it cost?',
    answer:
      'Genie is absolutely free to set up an account and build a following, for the first 500 saves. No credit card required. For unlimited presaves and advanced features, Genie Premium is available for $9.99 CAD/month.'
  },
  {
    question: 'What is a presave?',
    answer:
      'Pre-save to Spotify is functionality that allows your fans to connect on Spotify and have an upcoming song automatically added to their Spotify library on release day.'
  },
  {
    question: 'How will this help me?',
    answer:
      'Presaving allows artists to acquire listeners on releases much faster than they normally would. As well, followers can be rewarded with exclusive content, discounts on tickets or merch, and stay up to date with every new song you release!'
  },
  {
    question: 'How long does it take to setup?',
    answer:
      'Roughly 5 minutes! After you signup, we ask you to import your artist profile on Spotify which automatically populates fields such as your name & photo, and these can also be customized later.'
  },
  {
    question: 'I have another question',
    answer:
      "Please reach out to us at purplegenieapp@gmail.com. We're happy to answer any questions you have."
  }
];

const Landing = () => {
  const renderHowItWorks = () => {
    return howItWorksContent.map(item => {
      return (
        <Step key={item.icon}>
          <StepImg src={item.icon} />
          <StepsHeading>{item.title}</StepsHeading>
          <StepsContent>{item.content}</StepsContent>
        </Step>
      );
    });
  };

  const FAQ = ({ faq, last }) => {
    const [open, setOpen] = React.useState(false);
    const handleClick = () => {
      setOpen(!open);
      Event('FAQ', faq.question, 'LANDING_PAGE');
    };

    return (
      <FaqItem onClick={handleClick} last={last}>
        <Flex>
          <FaqQuestion>{faq.question}</FaqQuestion>
          <OpenFAQ
            src={
              open
                ? '/assets/purple-minus-icon.png'
                : '/assets/purple-add-icon.png'
            }
          />
        </Flex>
        {open && <FaqAnswer>{faq.answer}</FaqAnswer>}
      </FaqItem>
    );
  };

  const renderFAQs = () => {
    return FAQs.map((faq, i) => {
      return <FAQ key={i} faq={faq} last={FAQs.length - 1 === i} />;
    });
  };

  return (
    <>
      <Header />
      <HeroImage>
        <Overlay />
        <AttentionWrapper>
          <Attention>
            Helping artists reach their fans anywhere, anytime with genie
            presaves.
          </Attention>
          <Button
            to='/signup'
            onClick={() => Event('ENGAGEMENTS', 'Get Started', 'LANDING_PAGE')}
          >
            Get Started
          </Button>
        </AttentionWrapper>
        {/* <HeadphonesImg src='/headphones-white.webp' /> */}
        {/* <BottomWave src='assets/landing-image-bottom.png' /> */}
      </HeroImage>
      <BodyContainer>
        <Heading>How it works</Heading>
        <Steps>{renderHowItWorks()}</Steps>
        <Heading id='faqs'>FAQs</Heading>
        <SubHeading>
          Here are some commonly asked questions about Genie.
        </SubHeading>
        {renderFAQs()}
        <CallToAction
          to='/signup'
          onClick={() => Event('ENGAGEMENTS', 'Sign me up', 'LANDING_PAGE')}
        >
          Sign me up!
        </CallToAction>
      </BodyContainer>
      <Footer>
        <FlexContainer>
          <FooterSection>
            <FooterHeader>Support</FooterHeader>
            <FooterLink
              as={ScrollLink}
              to='faqs'
              smooth={true}
              duration={500}
              offset={-50}
            >
              FAQs
            </FooterLink>
            <FooterLink to='/terms-of-service'>Terms of Service</FooterLink>
            <FooterLink to='/privacy-policy'>Privacy Policy</FooterLink>
          </FooterSection>
          <FooterLogo>Genie</FooterLogo>
        </FlexContainer>
      </Footer>
    </>
  );
};

export default Landing;
