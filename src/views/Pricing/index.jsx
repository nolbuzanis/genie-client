import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';
import Checkout from '../../components/Checkout';
import Button from '../../components/Button';
import Features from '../../components/Features';
import CancelButton from '../../components/CancelButton';
import { getCurrentUser } from '../../api';
import { useAuth } from '../../Context/authContext';
import { isPremium } from '../../auth/index';

const GenieLogo = styled.img`
  width: 70px;
  height: 73px;
  padding-top: 40px;
`;
const PageContainer = styled.div`
  position: relative;
  padding: 0 30px;
  margin: 0 auto;
  text-align: center;
  background: #FEFEFE;
  width: 100%;
  height: 100%;
`;
const Tagline = styled.h2`
  font-size: 18px;
  font-weight: 500;
  color: #818181;
  padding: 20px 20px 0;
`;
const InnerButton = styled.div`
  width: 100%;
  height: 71px;
  border-radius: 15px;
  border: solid 4px #ffffff;
  color: ${({ active }) => active ? 'white' : '#555555'}
  background: ${({ active }) => active ? 'linear-gradient(to bottom, #4568dc, #8872ff)' : 'white'};
  box-sizing: border-box;
  padding: 15px;
  text-align: left;
`;
const OuterButton = styled.button`
  padding: 2px;
  position: relative;
  width: 100%;
  box-sizing: border-box;
  background: ${({ active }) => active ? 'linear-gradient(to bottom, #4568dc, #8872ff)' : 'white'};
  border-radius: 15px;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
  margin-bottom: 15px;
  border: none;
`;
const SelectorHeading = styled.h3`
  font-size: 15px;
  font-weight: 600;
`;
const SelectorText = styled.div`
font-size: 13px;
`;
const ValueTag = styled.div`
  height: 20px;
  border-radius: 5px;
  background-color: #e55f5f;
  font-size: 11px;
  color: #ffffff;
  position: absolute;
  padding: 3px 5px;
  top: -10px;
  right: 15px;
`;
const Content = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding-bottom: 20px;
`;
const Disclaimer = styled.p`
  font-size: 11px;
`;
const TermsOfService = styled.div`
  padding-top: 9px;
  padding-bottom: 16px;
  font-size: 11px;
  font-weight: 600;
  color: #818181;
  > a{
    color: #818181;
  }
`;
const Heading = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #444444;
`;
const CheckoutContent = styled(Content)`
padding: 0 30px;
max-width: 500px;
`;
const BoldPlan = styled.h3`
  font-size: 18px;
  display: flex;
  align-items: center;
  text-align: left;
  padding-top: 15px;
  padding-left: 20px;
  font-weight: bold;
  color: #444444;
`;
const GenieIcon = styled.img`
  width: 18px;
  height: 19px;
  margin-left: 5px;
`;
const Cost = styled.p`
  font-weight: 500;
  color: #444444;
  padding-top: 5px;
  padding-left: 20px;
  padding-bottom: 15px;
  text-align: left;
  font-size: 16px;
`;
const TopSpacing = styled.div`
  height: 80px;
`;
const SmallSpacing = styled.div`
  height: 15px;
`;

const Selector = ({ active, title, subtitle, valueTag, onClick }) => (
  <OuterButton active={active} onClick={onClick}>
    {valueTag && <ValueTag>BEST VALUE</ValueTag>}
    <InnerButton active={active}>
      <SelectorHeading>{title}</SelectorHeading>
      <SelectorText>{subtitle}</SelectorText>
    </InnerButton>
  </OuterButton>
);

const Pricing = () => {

  const [plan, setPlan] = useState(1);
  const [checkout, setCheckout] = useState(false);
  const { user, setAuth } = useAuth();
  const isPremiumUser = isPremium(user);
  const history = useHistory();

  const refreshUser = async () => {
    const newUser = await getCurrentUser();
    setAuth((prev) => ({ ...prev, user: newUser }));
  };

  if (checkout) {
    return <CheckoutContent>
      <TopSpacing />
      <CancelButton onClick={() => setCheckout(false)} />
      <Heading>Your Plan</Heading>
      <SmallSpacing />
      <OuterButton>
        <BoldPlan>Genie Premium <GenieIcon src='/assets/genie-logo-round.png' /></BoldPlan>
        <Cost>{plan === 1 ? '$83.99 CAD / year' : '$9.99 CAD / month'}</Cost>
      </OuterButton>
      <SmallSpacing />
      <Heading>Add Payment Details</Heading>
      <Checkout yearly={(plan - 1) === 0} monthly={(plan - 1) === 1} onSuccess={refreshUser} />
    </CheckoutContent>;
  }

  if (isPremiumUser) history.push('/billing');

  return <PageContainer>
    <Content>
      <CancelButton />
      <GenieLogo src='/assets/genie-logo-round.png' />
      <Tagline>
        Engage followers, establish your brand, promote your music
    </Tagline>
      <Features />
      <SmallSpacing />
      <Selector
        active={plan === 1}
        onClick={() => setPlan(1)}
        valueTag
        title='$83.99 Annual ($7.00/mo)'
        subtitle='Billed yearly. Cancel anytime.'
      />
      <Selector
        active={plan === 2}
        onClick={() => setPlan(2)}
        title='$9.99 Monthly'
        subtitle='Reoccurring payment. Cancel anytime.'
      />
      <Disclaimer>
        Subscriptions billed as one payment. Reoccurring billing. Cancel anytime for any reason.
      </Disclaimer>
      <TermsOfService>
        <Link to='/privacy-policy'>Privacy Policy </Link>
        •
        <Link to='/terms-of-service'> Terms of Service</Link>
      </TermsOfService>
      <Button onClick={() => setCheckout(true)}>Continue to Payment</Button>
    </Content>
  </PageContainer>;
};

export default Pricing;