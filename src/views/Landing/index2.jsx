import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';

import Button from '../../components/Button';
import Header from '../../components/Header';
import { FAQs } from './index';
import Footer from '../../components/Footer';
import { Event, TrackPixelEvent } from '../../analytics';

const Hero = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  //height: 665px;
  background: url('/assets/landing-image-crowd.png') center center no-repeat;
  background-size: cover;
  padding-top: 240px;
  flex-wrap: wrap;
  //overflow-x: hidden;
  //height: auto;
`;

const Attention = styled.div`
  padding-left: calc(5px + 8vw);
  color: white;
  width: 56%;
  min-width: 300px;
  //flex-grow: 1;
  @media only screen and (max-width: 500px) {
    width: 80%;
  }
`;
const HeroTitle = styled.h1`
  font-size: calc(24px + 0.7vw);
  color: white;
  font-weight: bold;
`;
const HeroText = styled.p`
  font-size: calc(12px + 0.7vw);
  color: white;
  padding-top: 25px;
  max-width: 520px;
`;

const LandingButton = styled(Button)`
  display: inline-block;
  text-align: center;
  font-weight: 600;
  height: 50px;
  ${({ hero }) => hero && `margin-right: 20px;`}
  width: 230px;
  border-radius: 10px;
  line-height: 50px;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
  color: ${({ alternate }) => (alternate ? 'white' : '#656ded')};
  font-size: 24px;
  background: ${({ alternate }) => (alternate ? '#656ded' : 'white')};
`;
const LearnMore = styled.span`
  display: inline-block;
  font-size: 24px;
  font-weight: 600;
  padding: 10px 0;
`;
const ButtonWrapper = styled.div`
  padding-top: 20px;
`;
const Disclaimer = styled.p`
  color: #dddddd;
  padding-top: 12px;
`;
const Banner = styled.div`
  width: 100%;
  background-color: #444444;
  font-size: 18px;
  font-weight: 600;
  padding: 50px calc(5px + 8vw);
  color: white;
  display: flex;
  margin-top: -1px;
  align-items: center;
  flex-wrap: wrap;
`;
const LaptopImg = styled.img`
  height: 450px;
  padding-top: 40px;
  margin-bottom: -40px;
  max-width: 100%;
  align-self: flex-end;
  margin-left: auto //flex-grow: 1;
    // @media only screen and (max-width: 1280px) {
    //       height: 400px;
    //       //display: none;
    //     }
    @media only screen and (max-width: 700px) {
    height: 300px;
    //display: none;
  }
`;
const SpotifyLogo = styled.img`
  width: 141px;
  margin: 15px 20px 0 24px;
`;
const AppleLogo = styled.img`
  width: 200px;
  margin-left: 22px;
  margin-top: 15px;
`;
const Features = styled.section`
  background: white;
  text-align: center;
  width: 100%;
  box-sizing: border-box;
  padding: 70px calc(5px + 8vw) 40px;
`;
const SectionHeader = styled.h2`
  font-size: calc(24px + 1vw);
  font-weight: 600;
  color: #444444;
  text-align: center;
`;
const FeaturesList = styled.ul`
  display: flex;
  list-style: none;
  flex-wrap: wrap;
  padding: 0;
  padding-top: 80px;
  box-sizing: border-box;
  justify-content: space-around;
  max-width: 1250px;
  margin: 0 auto;
`;
const FeatureContainer = styled.li`
  color: #444444;
  width: 280px;
  margin: 0 10px 50px;
`;
const FeatureIcon = styled.img`
  height: ${({ height }) => height || '40'}px;
  width: ${({ width }) => width || '40'}px;
`;
const FeatureTitle = styled.h3`
  font-size: 24px;
  font-weight: 600;
  padding-top: 10px;
`;
const FeatureText = styled.p`
  font-size: 18px;
  font-weight: 500;
  padding-top: 9px;
`;
const features = [
  {
    title: 'Compounded growth',
    text:
      'Saves on each release compound over time so you don’t have to start from scratch.',
    icon: 'growth',
    width: 37,
    height: 38
  },
  {
    title: 'Affordable',
    text:
      'Low funds? No problem! Genie is the most affordable pre-save platform on the market. Try it out for free for as long as you like!',
    icon: 'card',
    width: 41,
    height: 30
  },
  {
    title: 'No ads ever',
    text:
      'You should never have to compete with 3rd party ads when it comes to your branding.  We will never place ads on your public page.',
    icon: 'ad',
    width: 41,
    height: 35
  },
  {
    title: 'Direct access to your most loyal fans',
    text:
      'Use emailing lists of followers that opt-in to send thank you messages, exclusive content, or giveaways.',
    icon: 'mail',
    width: 39,
    height: 33
  },
  {
    title: 'Be heard',
    text:
      'We only work on new features and changes that are most important to you. Have a direct say in future features by voting on our roadmap.',
    icon: 'collaboration'
  },
  {
    title: '24/7 Support',
    text:
      'Need help with something? Contact us anytime in app for support or at purplegenieapp@gmail.com',
    icon: 'support'
  }
];

// const Testimonial = styled.section`
//   padding: 80px calc(5px + 8vw) 40px;
//   background-color: #efefef;
//   width: 100%;
// `;
// const TestimonialPicture = styled.img`
//   width: 120px;
//   height: 120px;
//   border-radius: 60px;
// `;

// const LargeQuotes = styled.span`
//   color: #656ded;
//   font-size: 100px;
//   font-weight: 500;
//   padding-top: ${({top}) => top || 0}px;
// `;
// const TestimonialContent = styled.div`
//   display: flex;
//   align-items: center;
//   display: inline-block;
// `;
const StepSection = styled.section`
  background-color: #efefef;
  width: 100%;
  box-sizing: border-box;
  padding: 70px calc(5px + 8vw) 40px;
`;
const StepSub = styled.p`
  font-size: 20px;
  font-weight: 500;
  text-align: center;
  color: #444444;
  padding-top: 23px;
`;
const Steps = styled.ul`
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  padding: 0;
  padding-top: 80px;
  box-sizing: border-box;
  justify-content: space-around;
  max-width: 700px;
  margin: 0 auto;
`;
const StepIcon = styled.img`
  height: 62px;
`;
const StepContainer = styled(FeatureContainer)`
  //margin: 0 30px 50px;
`;
const stepList = [
  {
    title: '1. Set up your profile',
    text:
      'Easily import your profile from spotify. Customize things such as your photo, bio, social links, and more!',
    icon: 'profile'
  },
  {
    title: '2. Build a following',
    text:
      'Share your public artist page on social media so your fans can follow you on Genie. More fans on release day means more saves.',
    icon: 'followers'
  },
  {
    title: '3. Schedule a release',
    text:
      'Once you’ve scheduled a release on Spotify, create the release in Genie and choose the day you want it to be saved to your follower’s song libraries.',
    icon: 'hourglass'
  },
  {
    title: '4. Grow on Spotify',
    text:
      'The more saves you have on Spotify, the higher chance  of being recognized by the Spotify Algorithm and getting on curated playlists. ',
    icon: 'rocket'
  }
];

const Plan = styled.div`
  width: 320px;
  border-radius: 10px;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
  background-color: #ffffff;
  //margin: 0 25px;
  padding-bottom: 30px;
  text-align: center;
  margin-bottom: 60px;
`;
const Plans = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  max-width: 800px;
  margin: 0 auto;
  padding-top: 70px;
`;
const PlanTitle = styled.h3`
  color: #444444;
  font-size: 36px;
  font-weight: bold;
  padding-top: 23px;
`;
const PlanSubtitle = styled.p`
  padding-top: 8px;
  font-size: 18px;
  font-weight: 500;
  color: #444444;
  padding-bottom: 20px;
  border-bottom: solid 1px #dddddd;
  margin: 0 10px;
`;
const PlanFeatures = styled.ul`
  padding: 20px 15px;
  margin: 0;
  text-align: left;
  min-height: 360px;
`;
const PlanIcon = styled.img`
  width: 14.8px;
  float: left;
  margin-top: 5px;
  height: 11.5px;
  margin-right: 10px;
`;

const freePlanFeatures = [
  '1000 presaves with Spotify',
  'Customize your public artist page',
  'Link social media accounts',
  'Daily followers breakdown',
  'In-app help & support'
];
const premiumPlanFeatures = [
  'Unlimited pre-saves with Spotify and Apple Music',
  'Customize your public artist page',
  'Link Social media accounts',
  'Daily followers breakdown',
  'Followers emailing marketing list',
  'Contribute to new features roadmap',
  'In-app help & support',
  'Dark mode (coming soon)'
];

const PlanItem = styled.div`
  display: inline-block;
  width: 240px;
  font-size: 16px;
  font-weight: 500;
  color: #444444;
  line-height: 1.44;
  padding-bottom: 8px;
`;
const FreeButton = styled(LandingButton)`
  border: solid 2px #656ded;
  box-shadow: none;
  line-height: 46px;
  width: 230px;
  margin: 0 auto;
`;
const FAQContainer = styled.div`
  max-width: 900px;
  padding-top: 60px;
  margin: 0 auto;
  padding-bottom: 40px;
`;
const FaqItem = styled.div`
  padding: 25px;
  border-bottom: ${props => !props.last && 'solid 1px #dddddd'};
  margin-right: 4vw;
  text-align: left;
  cursor: pointer;
`;
const Flex = styled.div`
  display: flex;
  justify-content: space-between;
`;
const FaqQuestion = styled.h3`
  font-size: calc(13px + 0.6vw);
  font-size: 20px;
  font-weight: 500;
  color: #444444;
`;
const OpenFAQ = styled.img`
  width: 30px;
  text-align: left;
  height: 30px;
  margin-right: 20px;
`;
const FaqAnswer = styled.p`
  font-size: 18px;
  padding-top: 20px;
  font-weight: 300;
`;

const CTAContainer = styled.div`
  background-color: #656ded;
  border-radius: 10px;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
  padding: 35px 20px 45px;
  text-align: center;
`;
const CTAText = styled(HeroText)`
  text-align: center;
  width: 100%;
  padding-bottom: 25px;
  margin: 0 auto;
  max-width: inherit;
`;
const CTASection = styled.div`
  background: linear-gradient(#ffffff 50%, #444444 50%);
  padding: 80px calc(5px + 8vw);
  //margin-bottom: -1px;
`;

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

const Feature = ({ icon, title, text, width, height }) => (
  <FeatureContainer>
    <FeatureIcon
      src={`/assets/${icon}-feature-icon.png`}
      width={width}
      height={height}
    />
    <FeatureTitle>{title}</FeatureTitle>
    <FeatureText>{text}</FeatureText>
  </FeatureContainer>
);

const Step = ({ icon, title, text }) => (
  <StepContainer>
    <StepIcon src={`/assets/${icon}-step-icon.png`} />
    <FeatureTitle>{title}</FeatureTitle>
    <FeatureText>{text}</FeatureText>
  </StepContainer>
);

const Landing = () => {
  return (
    <>
      <Header />
      <Hero>
        <Attention>
          <HeroTitle>Make a big splash using pre-saves</HeroTitle>
          <HeroText>
            Genie is the optimal way for musicians to become featured on curated
            playlists and discovered on Spotify, Deezer, & other music
            platforms.
          </HeroText>
          <ButtonWrapper>
            <LandingButton
              hero
              as={Link}
              to='/signup'
              onClick={() => {
                Event('ENGAGEMENTS', 'Hero - Try for free', 'LANDING_PAGE');
                TrackPixelEvent('Hero - Try for free (Landing)', { v: 1 });
              }}
            >
              Try for free
            </LandingButton>
            <LearnMore
              as={ScrollLink}
              to='features'
              smooth={true}
              duration={500}
              onClick={() => {
                Event('ENGAGEMENTS', 'Hero - Learn More', 'LANDING_PAGE');
                TrackPixelEvent('Hero - Learn More (Landing)', { v: 1 });
              }}
            >
              Learn More
            </LearnMore>
            <Disclaimer>No Credit card required</Disclaimer>
          </ButtonWrapper>
        </Attention>
        <LaptopImg src='/assets/half-laptop.png' />
      </Hero>
      <Banner>
        integrates with
        <SpotifyLogo src='/assets/spotify-logo-white-full.png' />
        <AppleLogo src='/assets/apple-music-logo-full.png' />
      </Banner>
      <Features id='features'>
        <SectionHeader>Release and grow seamlessly</SectionHeader>
        <FeaturesList>
          {features.map((item, i) => {
            return <Feature {...item} key={i} />;
          })}
        </FeaturesList>
      </Features>
      {/* <Testimonial>
    <TestimonialPicture />
    <TestimonialContent>
    <LargeQuotes>“</LargeQuotes>
    <span>dawdawdaw</span>
    <LargeQuotes top={120}>”</LargeQuotes>
    </TestimonialContent>
  </Testimonial> */}
      <StepSection>
        <SectionHeader>Built with simplicity</SectionHeader>
        <StepSub>
          We want you to spend your time creating music so here’s the
          step-by-step
        </StepSub>
        <Steps>
          {stepList.map((item, i) => {
            return <Step {...item} key={i} />;
          })}
        </Steps>
      </StepSection>
      <StepSection>
        <SectionHeader>Pick your plan</SectionHeader>
        <Plans>
          <Plan>
            <PlanTitle>Free</PlanTitle>
            <PlanSubtitle>Free forever</PlanSubtitle>
            <PlanFeatures>
              {freePlanFeatures.map((item, i) => {
                return (
                  <div key={i}>
                    <PlanIcon src='/assets/purple-checkmark.png' />
                    <PlanItem>{item}</PlanItem>
                  </div>
                );
              })}
            </PlanFeatures>
            <FreeButton
              as={Link}
              to='/signup'
              onClick={() => {
                Event('ENGAGEMENTS', 'Plan - Free', 'LANDING_PAGE');
                TrackPixelEvent('Plan - Free (Landing)', { v: 1 });
              }}
            >
              Get Started
            </FreeButton>
          </Plan>
          <Plan>
            <PlanTitle>Premium</PlanTitle>
            <PlanSubtitle>$9.99 CAD / month</PlanSubtitle>
            <PlanFeatures>
              {premiumPlanFeatures.map((item, i) => {
                return (
                  <div key={i}>
                    <PlanIcon src='/assets/purple-checkmark.png' />
                    <PlanItem>{item}</PlanItem>
                  </div>
                );
              })}
            </PlanFeatures>
            <LandingButton
              alternate
              as={Link}
              to='/signup'
              onClick={() => {
                Event('ENGAGEMENTS', 'Plan - Premium', 'LANDING_PAGE');
                TrackPixelEvent('Plan - Premium (Landing)', { v: 1 });
              }}
            >
              Try for free
            </LandingButton>
          </Plan>
        </Plans>
      </StepSection>
      <Features id='faqs'>
        <SectionHeader>Frequently Asked Questions</SectionHeader>
        <StepSub>Looking for more info? We got you covered.</StepSub>
        <FAQContainer>
          {FAQs.map((faq, i) => {
            return <FAQ key={i} faq={faq} last={FAQs.length - 1 === i} />;
          })}
        </FAQContainer>
      </Features>
      <CTASection>
        <CTAContainer>
          <HeroTitle>Ready to grow?</HeroTitle>
          <CTAText>
            Try it for free. We’ll even throw in 1000 pre-saves on us.
          </CTAText>
          <LandingButton
            as={Link}
            to='/signup'
            onClick={() => {
              Event('ENGAGEMENTS', 'Footer - Try for free', 'LANDING_PAGE');
              TrackPixelEvent('Footer - Try for free (Landing)', { v: 1 });
            }}
          >
            Try for free
          </LandingButton>
          <Disclaimer>No Credit card required</Disclaimer>
        </CTAContainer>
      </CTASection>
      <Footer />
    </>
  );
};

export default Landing;
