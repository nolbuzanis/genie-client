import React from 'react';
import { resetPassword } from '../../api';
import { Formik } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';
import InputSection from '../../components/InputSection';
import Heading from '../../components/Heading';
import Button from '../../components/Button';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const ResetPassword = () => {
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

  const validationSchema = Yup.object({
    email: Yup.string()
      .trim()
      .email('Please enter a valid email.')
      .required('Please enter a valid email.'),
  });

  const BodyContainer = styled.div`
    padding-top: 130px;
    min-height: 100%;
    max-width: 1600px;
    margin: 0 auto;
    //padding-bottom: 40px;
  `;
  const Note = styled.p`
    color: #666666;
    padding: 20px 0;
    margin: 0;
  `;
  const ButtonWrapper = styled.div`
    padding-top: 30px;
  `;

  const [success, setSuccess] = React.useState(false);
  const handleSubmit = async ({ email }, { setSubmitting }) => {
    setSubmitting(true);
    const response = await resetPassword(email.trim().toLowerCase());

    if (response.error) {
      return setSubmitting(false);
    }
    console.log(response);
    setSubmitting(false);
    return setSuccess(true);
  };

  return (
    <>
      <Header />
      <BodyContainer>
        {success ? (
          <Form>
            <Heading>Check your email</Heading>
            <Note>Check your email for a link to reset your password.</Note>
            <Button as={Link} to='/login'>
              Back to login
            </Button>
          </Form>
        ) : (
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            {(props) => (
              <Form onSubmit={props.handleSubmit}>
                <Heading>Forgot Password</Heading>
                <Note>
                  Please enter the email address associated with your Genie
                  account.
                </Note>
                <InputSection
                  {...props}
                  name='email'
                  type='email'
                  placeholder='Email'
                />
                <ButtonWrapper>
                  <Button
                    disabled={props.isSubmitting}
                    type='submit'
                    isLoading={props.isSubmitting}
                  >
                    {props.isSubmitting ? 'Submitting' : 'Continue'}
                  </Button>
                </ButtonWrapper>
              </Form>
            )}
          </Formik>
        )}
      </BodyContainer>
      <Footer />
    </>
  );
};

export default ResetPassword;
