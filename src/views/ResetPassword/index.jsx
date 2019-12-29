import React from 'react';
import { resetPassword } from '../../api';
import { Formik } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';
import Input from '../../components/Input';
import Heading from '../../components/Heading';
import Button from '../../components/Button';
import { Link } from 'react-router-dom';

const ResetPassword = () => {
  const Form = styled.form`
    margin: 0 auto;
    padding: 0 30px;
    max-width: 450px;
  `;

  const Label = styled.label`
    display: block;
    height: 26px;
    color: #bd3200;
    font-size: 12px;
    padding-top: 4px;
  `;

  const initialValues = {
    email: '',
    password: ''
  };

  const validationSchema = Yup.object({
    email: Yup.string().trim()
      .email('Please enter a valid email.')
      .required('Please enter a valid email.')
  });

  const BodyContainer = styled.div`
    padding-top: 140px;
  `;
  const Note = styled.p`
    color: #666666;
    padding: 20px 0;
    margin: 0;
  `;

  const InputSection = props => {
    return (
      <>
        <Input
          id={props.name}
          name={props.name}
          type={props.type}
          onChange={props.handleChange}
          onBlur={props.handleBlur}
          value={props.values[props.name]}
          error={props.errors[props.name] && props.touched[props.name]}
          placeholder={props.placeholder}
        />
        <Label>
          {props.errors[props.name] &&
            props.touched[props.name] &&
            props.errors[props.name]}
        </Label>
      </>
    );
  };

  const [success, setSuccess] = React.useState(false);
  const handleSubmit = async ({ email }, { setSubmitting }) => {
    setSubmitting(true);
    const response = await resetPassword(email.trim());

    if (response.error) {
      return setSubmitting(false);
    }
    console.log(response);
    setSubmitting(false);
    return setSuccess(true);
  };

  return (
    <BodyContainer>
      {success ? (
        <Form>
          <Heading title='Check your email' />
          <Note>Check your email for a link to reset your password.</Note>
          <Button as={Link} to='/login' text='Back to login' />
        </Form>
      ) : (
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            {props => (
              <Form onSubmit={props.handleSubmit}>
                <Heading title='Reset password' />
                <Note>Please enter the email address associated with your IDPT account.</Note>
                <InputSection
                  {...props}
                  name='email'
                  type='email'
                  placeholder='Email'
                />
                <Button
                  text={props.isSubmitting ? 'Submitting...' : 'Continue'}
                  disabled={props.isSubmitting}
                  type='submit'
                />
              </Form>
            )}
          </Formik>
        )}
    </BodyContainer>
  );
};

export default ResetPassword;
