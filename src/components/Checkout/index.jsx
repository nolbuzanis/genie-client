import React, { useState } from 'react';
import { useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js';
import { createPremiumSubscription, updatePaymentInfo } from '../../api';
import { useAuth } from '../../Context/authContext';
import styled from 'styled-components';
import Button from '../Button';
import { useHistory } from 'react-router-dom';

const ELEMENT_OPTIONS = {
  style: {
    base: {
      fontSize: '16px',
      color: '#444444',
      fontFamily: "'Montserrat', sans-serif",
      letterSpacing: '0.025em',
      backgroundColor: '#efefef',
      '::placeholder': {
        color: '#818181',
        fontWeight: '300'
      },
    },
    invalid: {
      color: '#9e2146',
    },
  },
};
const Label = styled.label`
  font-size: 16px;
  color: #444444;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-bottom: 6px;
  padding-top: 14px;
`;
const Form = styled.form`
  //max-width: 500px;
  //margin: 0 auto;
`;
const HalfField = styled.div`
  width: 45%;
  display: inline-block;
`;
const InputContainer = styled.div`
  background-color: #efefef;
  padding: 12px 15px;
  border-radius: 5px;
`;
const Input = styled.input`
  background-color: #efefef;
  padding: 12px 15px;
  border-radius: 5px;
  border: none;
  line-height: 19.2px;
  font-size: 16px;
  letter-spacing: 0.025em;
  width: 100%;
  box-sizing: border-box;
  color: #444444;
  &::placeholder {
    color: #818181;
    font-weight: 300;
  }
  &:-webkit-autofill {
        color: #444444;
        background-color: #efefef;
      }
`;
const Flex = styled.div`
  display: flex;
  justify-content: space-between;
`;
const LockIcon = styled.img`
  width: 20px;
  height: 20px;
  margin-left: 5px;
`;
const Spacing = styled.div`
  height: 30px;
`;
const ErrorMsg = styled.p`
  color: #bd3200;
  padding-top: 10px;
`;
const SuccessImg = styled.img`
  width: 180px;
  height: 180px;
  margin: 30px auto 0;
  display: block;
`;
const SuccessText = styled.h3`
  font-size: 20px;
  font-weight: 600;
  text-align: center;
  color: #444444;
  padding-bottom: 30px;
`;

const Checkout = ({ onSuccess, successMsg, updateCard, yearly, monthly }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
  const [postal, setPostal] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const history = useHistory();

  const paymentButtonText = yearly ? 'Start Yearly Plan' : monthly ? 'Start Monthly Plan' : 'Update Payment Details';

  const handleSubmit = async (e) => {
    setSubmitting(true);
    e.preventDefault();

    if (!stripe || !elements) {
      // disabled form submission until stripe components has loaded
      return;
    }
    const cardElement = elements.getElement(CardNumberElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
      billing_details: {
        name: user.name,
        address: {
          postal_code: postal,
        },
      },
    });

    if (error) {
      console.error('[error]', error);
      setErrorMessage(error.message);
      setSubmitting(false);
      // show error ui to customer
      return;
    }

    const planType = yearly ? 'yearly' : 'monthly';

    const apiCall = updateCard ? () => updatePaymentInfo(paymentMethod) : () => createPremiumSubscription(paymentMethod, planType);
    const serverResponse = await apiCall();
    setSubmitting(false);
    if (serverResponse.error) {
      console.log('[error]', serverResponse.error);
      setErrorMessage(serverResponse.error.message);
      return;
    }
    console.log('[PaymentMethod]', serverResponse.paymentMethod);
    setErrorMessage(null);

    //check response for subscription status
    const { client_secret, status } = serverResponse;

    if (status === 'requires_action') {
      stripe.confirmCardPayment(client_secret).then(function (result) {
        if (result.error) {
          // Display error message in your UI.
          console.error(result.error);
          setErrorMessage(result.error.message);
          // The card was declined (i.e. insufficient funds, card has expired, etc)
        } else {
          // Show a success message to your customer
          console.log('Payment confirmed successfully - subscription created!');
          onSuccess && onSuccess();
          setSuccess(true);
        }
      });
    } else {
      // No additional information was needed
      // Show a success message to your customer
      console.log('Subscription created!');
      onSuccess && onSuccess();
      setSuccess(true);
    }
  }

  if (success) {
    return <>
      <SuccessImg src='/assets/blue-success-icon-large.png' />
      <SuccessText>{successMsg || 'Payment processed. Thank you!'}</SuccessText>
      <Button onClick={() => history.goBack()}>Return</Button>
    </>
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Label htmlFor="cardNumber">Card Number <LockIcon src='/assets/lock-icon.png' /></Label>
      <InputContainer>
        <CardNumberElement
          id="cardNumber"
          options={ELEMENT_OPTIONS}
        />
      </InputContainer>
      <Flex>
        <HalfField>
          <Label htmlFor="expiry">Expiry</Label>
          <InputContainer>
            <CardExpiryElement
              id="expiry"
              options={ELEMENT_OPTIONS}
            />
          </InputContainer>
        </HalfField>
        <HalfField>
          <Label htmlFor="cvc">CVC</Label>
          <InputContainer>
            <CardCvcElement
              id="cvc"
              options={ELEMENT_OPTIONS}
            />
          </InputContainer>
        </HalfField>
      </Flex>
      <div>
        <Label htmlFor="postal">Postal Code</Label>
        <Input
          id="postal"
          required
          placeholder="M2D 4R5"
          value={postal}
          onChange={(e) => setPostal(e.target.value)}
        />
      </div>
      {errorMessage && <ErrorMsg>{errorMessage}</ErrorMsg>}
      <Spacing />
      <Button type="submit" disabled={submitting}>
        {submitting ? 'Processing...' : paymentButtonText || 'Pay'}
      </Button>
    </Form>
    // <form onSubmit={handleSubmit}>
    //   <CardElement />
    //   <button type="submit" disabled={!stripe}>
    //     Pay
    //   </button>
    // </form>
  );
};

export default Checkout;