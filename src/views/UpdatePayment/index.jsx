import React from 'react';
import styled from 'styled-components';
import CancelButton from '../../components/CancelButton';
import Checkout from '../../components/Checkout';

const Container = styled.div`
margin: 0 auto;
padding: 0 30px;
max-width: 500px;
`;

const Header = styled.h2`
  font-size: 22px;
  font-weight: 600;
  color: #444444;
  padding-top: 90px;
  padding-bottom: 15px;
`;

const UpdatePayment = () => {

  return <Container>
    <CancelButton />
    <Header>Update Payment Details</Header>
    <Checkout
      plan='monthly'
      successMsg='Payment Details Updated!'
      updateCard
    />
  </Container>
};

export default UpdatePayment;