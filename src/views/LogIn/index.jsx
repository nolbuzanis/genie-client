import React from 'react';
import { userLogin } from '../../actions';
import { Link } from 'react-router-dom';
import { Formik } from 'formik';
import styled from 'styled-components';
import Heading from '../../components/Heading';
import Input from '../../components/Input';
import Button from '../../components/Button';
import * as Yup from 'yup';
import history from '../../history';
import { connect } from 'react-redux';

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
  email: Yup.string()
    .email('Please enter a valid email.')
    .required('Please enter a valid email.'),
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

class Login extends React.Component {
  handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    setSubmitting(true);

    const response = await this.props.userLogin(values);
    if (response.error) {
      // Wrong password
      console.log(response.error);
      setFieldError(
        'email',
        'Email or password is incorrect. Please try again.'
      );
      return setSubmitting(false);
    }
    console.log(response);
    history.push('/profile');
  };

  render() {
    return (
      <BodyContainer>
        <Formik
          initialValues={initialValues}
          onSubmit={this.handleSubmit}
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
              <StyledLink to='/reset'>Forgot password?</StyledLink>
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
}

export default connect(
  null,
  { userLogin }
)(Login);

// componentDidUpdate = () => {
//   if (this.props.auth.user) {
//     // Redirect to dashboard...
//     this.props.history.push('/dashboard');
//   }
// };

// state = {
//   email: {
//     value: '',
//     touched: false
//   },
//   password: {
//     value: '',
//     touched: false
//   },
//   errors: {
//     email: 'Please enter your email.',
//     password: 'Please enter a password to continue.'
//   }
// };

// generateErrorMsg = (name, value) => {
//   const errors = this.state.errors;
//   switch (name) {
//     case 'email': {
//       if (value.length === 0 || value === '') {
//         errors.email = 'Please enter your email.';
//       } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
//         errors.email = 'The email address you supplied is invalid.';
//       } else {
//         errors.email = '';
//       }
//       break;
//     }
//     case 'password': {
//       if (value.length === 0 || value === '') {
//         errors.password = 'Please enter a password to continue.';
//       } else if (value.length < 8) {
//         errors.password = 'Your password is too short.';
//       } else {
//         errors.password = '';
//       }
//       break;
//     }
//     default: {
//       break;
//     }
//   }
//   this.setState({ errors: errors });
// };

// validateForm = errors => {
//   let valid = true;
//   // Convert errors object to array which holds the error messages
//   Object.values(errors).forEach(msg => {
//     if (msg.length > 0) valid = false;
//   });
//   return valid;
// };

// changeHandler = event => {
//   const { name, value } = event.target;

//   let currentInput = this.state[name];
//   this.generateErrorMsg(name, value);
//   currentInput.value = value;

//   if (!this.state[name].touched) {
//     currentInput.touched = true;
//   }

//   // Call set state once at end with changed values since it is an async function
//   this.setState({ [name]: currentInput });
// };

// handleSubmit = e => {
//   e.preventDefault();
//   // Make axios call to server

//   if (!this.validateForm(this.state.errors)) {
//     console.error('Invalid form values');
//     return;
//   }

//   const formValues = {
//     email: this.state.email.value,
//     password: this.state.password.value
//   };

//   this.props.userLogin(formValues);
// };
