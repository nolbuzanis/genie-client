import React from 'react';
import InputSection from './InputSection';
import { connect } from 'react-redux';
import axios from 'axios';

class NewPassword extends React.Component {
  componentDidUpdate = () => {
    if (this.props.auth.user) {
      // Redirect to dashboard...
      this.props.history.push('/dashboard');
    }
  };

  state = {
    password: {
      value: '',
      touched: false,
      error: 'Please enter a new password.'
    }
  };

  generateErrorMsg = (name, value) => {
    let currentState = this.state.password;
    if (value.length === 0 || value === '') {
      currentState.error = 'Please enter a password.';
    } else if (value.length < 8) {
      currentState.error = 'Your password is too short.';
    } else {
      currentState.error = '';
    }
    this.setState({ password: currentState });
  };

  changeHandler = event => {
    const { name, value } = event.target;

    let currentInput = this.state[name];
    this.generateErrorMsg(name, value);
    currentInput.value = value;

    if (!this.state[name].touched) {
      currentInput.touched = true;
    }

    // Call set state once at end with changed values since it is an async function
    this.setState({ [name]: currentInput });
  };

  handleSubmit = async e => {
    e.preventDefault();
    // Make axios call to server

    if (this.state.password.error.length > 0) {
      console.error('Invalid form values');
      return;
    }
    console.log('Submitting new password...');

    const data = JSON.stringify({
      password: this.state.password.value,
      token: this.props.match.params.token
    });
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    try {
      const response = await axios.post('/user/newpassword', data, config);
      console.log(response);
      if (response.status === 200) {
        this.props.history.push('/login');
      }
    } catch (err) {
      console.error(err);
    }
    // Call new password api route
  };

  render() {
    return (
      <div
        style={{
          paddingTop: '150px',
          maxWidth: '450px',
          display: 'block',
          margin: '0 auto',
          padding: '150px 20px 0'
        }}
      >
        <h3>Enter your new password</h3>
        <form className='ui form' onSubmit={e => this.handleSubmit(e)}>
          <InputSection
            name='password'
            type='password'
            value={this.state.password.value}
            onChangeHandler={e => this.changeHandler(e)}
            placeholder='New Password'
            errorMsg={this.state.password.error}
            touched={this.state.password.touched}
          />
          <button type='submit' className='ui button secondary'>
            Submit
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { auth: state.auth };
};

export default connect(mapStateToProps)(NewPassword);
