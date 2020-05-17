import React from 'react';
import styled from 'styled-components';
import { Link as ScrollLink } from 'react-scroll';
import { Link } from 'react-router-dom';
import { Event } from '../../analytics';

const Container = styled.div`
  width: 100%;
  // background-image: linear-gradient(
  //   to bottom,
  //   rgba(136, 114, 255, 0.8),
  //   #4568dc
  // );
  background-color: #444444;
  color: white;
  padding: 30px calc(20px + 5.4vw);
  padding-right: 0px;
`;
const FooterLogo = styled(Link)`
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
  display: inline-block;
  margin-bottom: 30px;
  margin-right: 10vw;
`;
const LinkSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  @media only screen and (max-width: 500px) {
    flex-direction: column;
  }
`;

const Footer = () => (
  <Container>
    <FlexContainer>
      <LinkSection>
        <FooterSection>
          <FooterHeader>Social</FooterHeader>
          <FooterLink
            as='a'
            href='https://www.facebook.com/geniemusicapp'
            target='_blank'
            onClick={() => Event('ENGAGEMENTS', 'Facebook', 'FOOTER')}
          >
            Facebook
          </FooterLink>
        </FooterSection>
        <FooterSection>
          <FooterHeader>Support</FooterHeader>
          <FooterLink
            as={ScrollLink}
            to='faqs'
            smooth={true}
            duration={500}
            onClick={() => Event('ENGAGEMENTS', 'FAQs', 'FOOTER')}
          >
            FAQs
          </FooterLink>
          <FooterLink
            to='/terms-of-service'
            onClick={() => Event('ENGAGEMENTS', 'Terms of Service', 'FOOTER')}
          >
            Terms of Service
          </FooterLink>
          <FooterLink
            to='/privacy-policy'
            onClick={() => Event('ENGAGEMENTS', 'Privacy Policy', 'FOOTER')}
          >
            Privacy Policy
          </FooterLink>
        </FooterSection>
      </LinkSection>
      <FooterLogo
        to='/'
        onClick={() => Event('ENGAGEMENTS', 'Genie', 'FOOTER')}
      >
        Genie
      </FooterLogo>
    </FlexContainer>
  </Container>
);

export default Footer;
