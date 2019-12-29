import React from 'react';
import { Link } from 'react-router-dom';
import { Formik } from 'formik';
import styled from 'styled-components';
import Heading from '../../components/Heading';
import Input from '../../components/Input';
import Button from '../../components/Button';
import * as Yup from 'yup';
import { userLogin } from '../../api';

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

const StyledLink = styled(Link)`
  color: #8872ff;
  font-weight: 500;
  &:hover {
    color: #8872ff;
  }
`;

const validationSchema = Yup.object({
  email: Yup.string().trim()
    .required('Please enter a valid email.')
    .email('Please enter a valid email.'),
  password: Yup.string().required('Please enter a password.')
});

const Spacing = styled.div`
  height: 35px;
`;
const ButtonWraper = styled.div`
  padding: 20px 0;
`;

const BodyContainer = styled.div`
  padding-top: 140px;
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

const Login = () => {
  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    setSubmitting(true);
    values.email = values.email.trim();

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
    setSubmitting(false);
    window.location.reload();
  };

  return (
    <BodyContainer>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {props => (
          <Form onSubmit={props.handleSubmit}>
            <Heading title='Log in' subtitle='Welcome back!' />
            <Spacing />
            <InputSection
              {...props}
              name='email'
              type='email'
              placeholder='Email'
            />
            <InputSection
              {...props}
              name='password'
              type='password'
              placeholder='Password'
            />
            <StyledLink to='/forgot-password'>Forgot password?</StyledLink>
            <ButtonWraper>
              <Button
                text={props.isSubmitting ? 'Submitting...' : 'Log In'}
                disabled={props.isSubmitting}
                type='submit'
              />
            </ButtonWraper>
            <StyledLink to='/signup'>Don't have an account?</StyledLink>
          </Form>
        )}
      </Formik>
    </BodyContainer>
  );
}


export default Login;
