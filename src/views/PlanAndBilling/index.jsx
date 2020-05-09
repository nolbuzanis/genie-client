import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import BackPageHeader from '../../components/BackPageHeader';
import Features from '../../components/Features';
import Button from '../../components/Button';
import {
  cancelPremiumSubscription,
  resumePremiumSubscription,
  getCurrentUser,
  fetchPaymentInfo
} from '../../api';
import Modal from 'react-modal';
import { useAuth } from '../../Context/authContext';
import { isPremium } from '../../auth/index';
import moment from 'moment';
import { Link } from 'react-router-dom';

const BodyContainer = styled.div`
  padding: 30px;
  max-width: 500px;
  margin: 0 auto;
`;
const PlanContainer = styled.div`
  width: 100%;
  border-radius: 10px;
  border: solid 2px ${({ color }) => color ? color : '#4568dc'};
`;
const PlanHeader = styled.div`
  height: 100px;
  width: 101%;
  background: ${({ color }) => color ? color : 'linear-gradient(to bottom, #4568dc, #8872ff)'};
  color: white;
  font-size: 24px;
  font-weight: bold;
  line-height: 100px;
  padding-left: 23px;
  border-radius: 10px 10px 0 0;
  margin-top: -1px;
  margin-left: -1px;
`;
const Price = styled.p`
  font-size: 24px;
  font-weight: 600;
  color: #444444;
  padding-left: 23px;
`;
const SubPrice = styled.p`
  font-size: 13px;
  font-weight: 500;
  color: #444444;
  padding-left: 23px;
`;
const ButtonWrapper = styled.div`
  width: 80px;
  padding: 12px 0;
  margin: 0 auto;
`;

const modalStyles = {
  overlay: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: '100',
    background: 'rgba(255, 255, 255, 0.7)'
  },
  content: {
    position: 'static',
    display: 'flex',
    justifyContent: 'center',
    padding: '10px',
    border: 'none',
    background: 'none',
  }
};
Modal.setAppElement('body');

const ModalContainer = styled.div`
  background: white;
  width: 340px;
  padding: 20px 25px 25px;
  border-radius: 10px;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
  text-align: center;
`;
const Spacing = styled.div`
  height: 15px;
`;
const CancelText = styled.h2`
  color: #910505;
  font-size: 20px;
  font-weight: 500;
  padding-bottom: 15px;
`;
const Notice = styled.p`
  font-size: 14px;
  font-weight: 500;
  padding: 15px 20px 0;
`;
const LargeButtonWrapper = styled.div`
  padding: 15px 30px;
`;

const PaymentDetailsCard = styled.div`
  margin-top: 15px;
  border-radius: 5px;
  width: 100%;
  border: solid 1px #dddddd;
  background-color: #ffffff;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 13px;
`;
const CreditCardImg = styled.img`
  height: 25px;
  display: inline-block;
  margin-right: 10px;
`;
const SmButtonWrapper = styled.div`
  width: 80px;
`;
const CardNumber = styled.p`
  font-size: 14px;
  font-weight: 500;
  color: #444444;
`;
const CardDetails = styled.div`
  display: inline-block;
`;
const CardExpiry = styled.p`
  color: #818181;
  font-size: 13px;
  font-weight: 500;
`;
const FlexContainer = styled.div`
  display: flex;
  align-items: center;
`;
const Header = styled.h2`
  font-size: 22px;
  font-weight: 600;
  color: #444444;
  padding-top: 30px;
`;

const freeFeatures = [
  '500 free presaves with Spotify',
  'View followers per day',
  'Custom public artist page'
];

const makeTwoDigits = (number) => {
  if (number < 10) return '0' + number;
  return number;
};

const mapCardIcons = {
  'visa': '/assets/visa-card.png',
  'mastercard': '/assets/mastercard-card.png',
  'american express': '/assets/amex-card.png'
};

const PlanAndBilling = () => {

  const [cancelModal, setCancelModal] = useState(false);
  const { user, setAuth } = useAuth();
  const isPremiumUser = isPremium(user);
  const [submitting, setSubmitting] = useState(false);
  const [paymentInfo, setPaymentInfo] = useState({});
  const isCancelled = useRef(false);
  console.log(isPremium(user), user);

  useEffect(() => {
    const getPaymentInfo = async () => {
      const response = await fetchPaymentInfo();
      if (response.error) return;
      if (isCancelled.current) return;

      setPaymentInfo(response);
    }
    getPaymentInfo();

    return () => isCancelled.current = true;
  }, []);

  // Shown to non-premium members or members without an active subscription
  if (!isPremiumUser) return <>
    <BackPageHeader>Plan & Billing</BackPageHeader>
    <BodyContainer>
      <PlanContainer color='#818181'>
        <PlanHeader color='#818181'>Genie Free</PlanHeader>
        <Features features={freeFeatures} />
        <LargeButtonWrapper>
          <Button as={Link} to='/pricing'>View Plans</Button>
        </LargeButtonWrapper>
      </PlanContainer>
      {paymentInfo && <PaymentDetails />}
    </BodyContainer>
  </>;

  const { status, nextPaymentDate } = user.premium;
  const formattedDate = new moment(nextPaymentDate).format('MMM. M, YYYY');
  const statusMessages = {
    'active': `Next billing date is ${formattedDate}.`,
    'cancelled': `Your premium plan will end on ${formattedDate} and will not renew.`,
    'past_due': `Please update your payment info, otherwise your premium plan will end on ${formattedDate}.`
  };

  const handleSubscriptionResume = async () => {
    setSubmitting(true);
    const response = await resumePremiumSubscription();
    setSubmitting(false);
    if (response.error) {
      // some error
      return;
    }

    const newUser = await getCurrentUser();
    setAuth((prev) => ({ ...prev, user: newUser }));
    console.log('subscription resumed!');
  };

  const handleSubscriptionCancel = async () => {
    setSubmitting(true);
    const response = await cancelPremiumSubscription();
    setSubmitting(false);
    if (response.error) {
      //TODO: handle
      return;
    }
    console.log('subscription cancelled!');
    const newUser = await getCurrentUser();
    setCancelModal(false);
    setAuth((prev) => ({ ...prev, user: newUser }));
  };

  const CancelModal = () => (
    <Modal
      isOpen={cancelModal}
      onRequestClose={() => setCancelModal(false)}
      style={modalStyles}
    >
      <ModalContainer>
        <CancelText>Are you sure you want to cancel Genie Premium?</CancelText>
        <Button color='#910505' onClick={handleSubscriptionCancel} disabled={submitting}>Yes, Cancel</Button>
        <Spacing />
        <Button alt color='#910505' onClick={() => setCancelModal(false)}>Return</Button>
      </ModalContainer>
    </Modal>
  );

  const PaymentDetails = () => (
    <>
      <Header>Payment Information</Header>
      <PaymentDetailsCard>
        <FlexContainer>
          <CreditCardImg src={mapCardIcons[paymentInfo.brand]} />
          <CardDetails>
            <CardNumber>**** **** **** {paymentInfo.last4}</CardNumber>
            <CardExpiry>Expires {makeTwoDigits(paymentInfo.exp_month)}/{paymentInfo.exp_year}</CardExpiry>
          </CardDetails>
        </FlexContainer>
        <SmButtonWrapper>
          <Button small as={Link} to='/update-payment'>Update</Button>
        </SmButtonWrapper>
      </PaymentDetailsCard>
    </>
  );

  return <>
    <CancelModal />
    <BackPageHeader>Plan & Billing</BackPageHeader>
    <BodyContainer>
      <PlanContainer>
        <PlanHeader>Genie Premium</PlanHeader>
        <Features />
        <Price>{user.premium.type === 'monthly' ? '9.99 CAD' : '83.99 CAD'}</Price>
        <SubPrice>{user.premium.type === 'monthly' ? '/month' : '/year'}</SubPrice>
        <Notice>{statusMessages[status]}</Notice>
        <ButtonWrapper>
          {status === 'cancelled'
            ? <Button small onClick={handleSubscriptionResume} disabled={submitting}>Resume</Button>
            : <Button small alt color='#910505' onClick={() => setCancelModal(true)}>Cancel</Button>
          }
        </ButtonWrapper>
      </PlanContainer>
      {paymentInfo && <PaymentDetails />}
    </BodyContainer>
  </>
};

export default PlanAndBilling;