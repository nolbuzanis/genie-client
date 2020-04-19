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
    padding-top: 100px;
    background: -webkit-linear-gradient(#FFFFFF 7%, #DFEBFC 60%, #9E8CFF);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(180deg, #FFFFFF 10%, #DFEBFC 60%, #9E8CFF); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    min-height: 100%;
    padding-bottom: 40px;
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
    const response = await resetPassword(email.trim().toLowerCase());

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
          <Button as={Link} to='/login'>Back to login</Button>
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
                <Note>Please enter the email address associated with your Genie account.</Note>
                <InputSection
                  {...props}
                  name='email'
                  type='email'
                  placeholder='Email'
                />
                <Button
                  disabled={props.isSubmitting}
                  type='submit'
                >
                  {props.isSubmitting ? 'Submitting...' : 'Continue'}
                </Button>
              </Form>
            )}
          </Formik>
        )}
    </BodyContainer>
  );
};

export default ResetPassword;
