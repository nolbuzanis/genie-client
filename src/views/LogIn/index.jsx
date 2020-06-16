import React from 'react';
import { Link } from 'react-router-dom';
import { Formik } from 'formik';
import styled from 'styled-components';
import Heading from '../../components/Heading';
import InputSection from '../../components/InputSection';
import Button from '../../components/Button';
import * as Yup from 'yup';
import { userLogin, getCurrentUser } from '../../api';
import authContext from '../../Context/authContext';
import Footer from '../../components/Footer';
import { reportEvent } from '../../analytics';

const Form = styled.form`
  //margin: 0 auto;
  max-width: 400px;
  //min-width: 260px;
  flex-grow: 1;
  padding: 0 calc(5px + 10vw);
`;

const initialValues = {
  email: '',
  password: '',
};

const StyledLink = styled(Link)`
  display: block;
  font-weight: 600;
  color: #656ded;
  margin: 0 auto;
  padding-top: 20px;
  &:hover {
    color: #656ded;
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

const validationSchema = Yup.object({
  email: Yup.string()
    .trim()
    .required('Please enter a valid email.')
    .email('Please enter a valid email.'),
  password: Yup.string().required('Please enter a password.'),
});

const ButtonWraper = styled.div`
  padding: 20px 0;
`;

const BodyContainer = styled.div`
  padding-top: 130px;
  min-height: 100%;
  max-width: 1600px;
  margin: 0 auto;
  //padding-bottom: 40px;
`;

const Login = () => {
  const { setAuth } = React.useContext(authContext);
  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    setSubmitting(true);
    values.email = values.email.trim().toLowerCase();

    const response = await userLogin(values);
    if (response.error) {
      // Wrong password
      console.log(JSON.stringify(response.error));
      setFieldError(
        'email',
        'Email or password is incorrect. Please try again.'
      );
      return setSubmitting(false);
    }
    const newUser = await getCurrentUser();
    reportEvent('login', newUser);
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
                <Heading>Log In</Heading>
                <InputSection
                  {...props}
                  name='email'
                  type='email'
                  label='Email'
                />
                <InputSection
                  {...props}
                  name='password'
                  type='password'
                  label='Password'
                />
                <ButtonWraper>
                  <Button
                    disabled={props.isSubmitting}
                    type='submit'
                    isLoading={props.isSubmitting}
                  >
                    {props.isSubmitting ? 'Logging in' : 'Log In'}
                  </Button>
                  <StyledLink to='/forgot-password'>
                    Forgot password?
                  </StyledLink>
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

export default Login;
