import React from 'react';
import styled from 'styled-components';
import { Formik } from 'formik';
import * as Yup from 'yup';

const Container = styled.div`
  //margin: 0 auto;
  text-align: center;
  width: 100%;
  padding: 140px 20px 0;
`;
const WelcomeHeader = styled.h1`
  font-size: calc(20px + 2.1vw);
  padding-bottom: 30px;
`;
const Paragrah = styled.p`
  font-size: calc(13px + 0.6vw);
  padding-bottom: 25px;
  max-width: 600px;
  margin: 0 auto;
  font-weight: 300;
`;
const Input = styled.input`
  display: block;
  width: 100%;
  border: 1px solid ${props => (props.error ? '#bd3200' : '#979797')};
  max-width: 420px;
  height: 36px;
  padding: 5px 10px;
  font-size: 16px;
  margin: 0 auto;
  box-sizing: border-box;
`;
const Button = styled.button`
  margin-top: 25px;
  width: 200px;
  height: 44px;
  color: white;
  font-weight: 300;
  font-size: 20px;
  background-color: #8872ff;
  border: none;
  box-shadow: 4px 4px 6px rgba(0, 0, 0, 0.16);
`;
const ErrorMsg = styled.label`
  display: block;
  font-size: 12px;
  color: #bd3200;
  text-align: left;
  padding-top: 5px;
  max-width: 420px;
  margin: 0 auto;
`;

const initialValues = {
  uri: ''
};
const validationSchema = Yup.object().shape({
  uri: Yup.string()
    .trim()
    .required('Please enter a valid URI.')
});

const Introduction = () => (
  <Container>
    <WelcomeHeader>Welcome to Independent</WelcomeHeader>
    <Paragrah>
      Before we get started, please enter your spotify artist URI.
    </Paragrah>
    <Paragrah>
      This will automatically import things like your name, and photo, which can
      be changed at a later date.
    </Paragrah>
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={console.log}
    >
      {props => (
        <form onSubmit={props.handleSubmit}>
          <Input
            name='uri'
            value={props.values['uri']}
            type='text'
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            error={props.errors['uri'] && props.touched['uri']}
            placeholder='Spotify Artist URI'
          />
          {props.errors['uri'] && props.touched['uri'] && (
            <ErrorMsg>{props.errors['uri']}</ErrorMsg>
          )}
          <Button>Get Started</Button>
        </form>
      )}
    </Formik>
  </Container>
);

export default Introduction;
