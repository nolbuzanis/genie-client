import React from 'react';
import styled from 'styled-components';
import { Link as ScrollLink } from 'react-scroll';
import { Link } from 'react-router-dom';

const Container = styled.div`
  width: 100%;
  background-image: linear-gradient(
    to bottom,
    rgba(136, 114, 255, 0.8),
    #4568dc
  );
  color: white;
  padding: 30px calc(20px + 5.4vw);
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
  margin-bottom: 30px;
`;

const Footer = () => (
<Container>
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
      </Container>
);

export default Footer;