import React from 'react';
import { Link } from 'react-router-dom';
import Heading from '../../components/Heading';
import styled from 'styled-components';
import InputSection from '../../components/InputSection';
import Button from '../../components/Button';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { userSignup, getCurrentUser } from '../../api';
import authContext from '../../Context/authContext';
import Footer from '../../components/Footer';

const Form = styled.form`
  //margin: 0 auto;
  max-width: 400px;
  //min-width: 260px;
  flex-grow: 1;
  padding: 0 calc(5px + 10vw);
`;

const ButtonWraper = styled.div`
  padding: 20px 0;
`;

const initialValues = {
  email: '',
  phone: '',
  name: '',
  password: '',
};

const BodyContainer = styled.div`
  padding-top: 130px;
  min-height: 100%;
  max-width: 1600px;
  margin: 0 auto;
  //padding-bottom: 40px;
`;
const TermsAndConditions = styled.p`
  font-size: 12px;
  color: #444444;
  padding-top: 30px;
`;
const BoldLink = styled(Link)`
  font-weight: 600;
  color: #444444;
  &:hover {
    color: #444444;
  }
`;
const Smoke = styled.img`
  width: 100%;
  margin-bottom: -100px;
`;
const SmokeContainer = styled.div`
  position: relative;
  overflow: hidden;
  width: 45%;
  min-height: 360px;
  flex-grow: 1;
`;
const FlexWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: space-between;
`;
const Extra = styled.p`
  font-weight: 600;
  color: #656ded;
  text-align: center;
  padding-top: 13px;
`;

//const phoneRegEx = /^(\+\d{1,2})?[\s.-]?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
const phoneRegEx = /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/;
const validationSchema = Yup.object({
  email: Yup.string()
    .trim()
    .email('Please enter a valid email.')
    .required('Please enter a valid email.'),
  // email2: Yup.string()
  //   .trim()
  //   .oneOf([Yup.ref('email')], 'Emails do not match.')
  //   .required('Please enter a valid email.'),
  phone: Yup.string()
    .trim()
    .matches(phoneRegEx, 'Please enter a valid phone number.')
    .required('Please enter a valid phone number.'),
  name: Yup.string().trim().required('Please enter a valid name.'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters long.')
    .required('Password is required.'),
});

const Signup = () => {
  const { setAuth } = React.useContext(authContext);
  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    console.log('Submitting!');
    setSubmitting(true);
    values.email = values.email.trim().toLowerCase();

    const response = await userSignup(values);
    if (response.error) {
      if (response.error.response.status === 409) {
        setFieldError('email', 'Email is already taken.');
      }
      return setSubmitting(false);
    }

    const newUser = await getCurrentUser();
    setAuth({ user: newUser });
  };

  return (
    <>
      <BodyContainer>
        <FlexWrapper>
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            {(props) => (
              <Form onSubmit={props.handleSubmit}>
                <Heading>Sign Up</Heading>
                <InputSection
                  {...props}
                  name='email'
                  type='email'
                  label='What’s your email?'
                  secondary='You’ll need to confirm this email later.'
                />
                {/* <InputSection
              {...props}
              name='email2'
              type='email'
            /> */}
                <InputSection
                  {...props}
                  name='phone'
                  //type='phone'
                  label='Your phone number?'
                  secondary='Used if you can’t access your account.'
                />
                <InputSection
                  {...props}
                  name='name'
                  label='What do your fans call you?'
                  secondary='Your band or artist name.'
                />
                <InputSection
                  {...props}
                  name='password'
                  type='password'
                  label='Pick a password'
                  secondary='At least 8 characters, 1 capital, and 1 number.'
                />
                <TermsAndConditions>
                  By creating an account you agree to Genie's{' '}
                  <BoldLink to='/terms-of-service'>Terms of Service</BoldLink>{' '}
                  and <BoldLink to='/privacy-policy'>Privacy Policy.</BoldLink>
                </TermsAndConditions>
                <ButtonWraper>
                  <Button
                    disabled={props.isSubmitting}
                    type='submit'
                    isLoading={props.isSubmitting}
                  >
                    {props.isSubmitting ? 'Submitting' : 'Sign Up'}
                  </Button>
                  <Extra>and recieve 1000 free presaves</Extra>
                </ButtonWraper>
              </Form>
            )}
          </Formik>
          <SmokeContainer>
            <Smoke src='/assets/purple-smoke.png' />
          </SmokeContainer>
        </FlexWrapper>
      </BodyContainer>
      <Footer />
    </>
  );
};

export default Signup;
