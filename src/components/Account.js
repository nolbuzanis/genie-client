import React from 'react';
import { connect } from 'react-redux';
import './Account.css';
import axios from 'axios';

class Account extends React.Component {
  state = {
    oldPassword: {
      value: '',
      touched: false
    },
    newPassword: {
      value: '',
      touched: false
    },
    newPassword2: {
      value: '',
      touched: false
    },
    errors: {
      newPassword: 'Please enter a password to continue.',
      newPassword2: 'Please enter a password to continue.'
    },
    success: false
  };

  generateErrorMsg = (name, value) => {
    const errors = this.state.errors;
    switch (name) {
      case 'newPassword': {
        if (value.length === 0 || value === '') {
          errors.newPassword = 'Please enter a password to continue.';
        } else if (value.length < 8) {
          errors.newPassword = 'Your password is too short.';
        } else {
          errors.newPassword = '';
        }
        break;
      }
      case 'newPassword2': {
        if (value.length === 0 || value === '') {
          errors.newPassword2 = 'Please enter a password to continue.';
        } else if (value.length < 8) {
          errors.newPassword2 = 'Your password is too short.';
        } else if (value !== this.state.newPassword.value) {
          errors.newPassword2 = 'Passwords do not match.';
        } else {
          errors.newPassword2 = '';
        }
        break;
      }
      default: {
        break;
      }
    }
    this.setState({ errors: errors });
  };

  validateForm = errors => {
    let valid = true;
    // Convert errors object to array which holds the error messages
    Object.values(errors).forEach(msg => {
      if (msg.length > 0) valid = false;
    });
    return valid;
  };

  onInputChange = (name, value) => {
    if (!this.state[name].touched) {
      this.state[name].touched = true;
    }

    this.generateErrorMsg(name, value);
    this.setState({ [name]: { value } });
  };

  handleSubmit = async e => {
    e.preventDefault();
    // Make axios call to server

    if (!this.validateForm(this.state.errors)) {
      console.error('Invalid form values');
      return;
    }

    const data = JSON.stringify({
      email: this.props.auth.user.email,
      oldPassword: this.state.oldPassword.value,
      newPassword: this.state.newPassword.value
    });
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    try {
      const response = await axios.patch('/user/updatepassword', data, config);
      if (response.status === 200) {
        this.setState({
          success: true,
          oldPassword: { value: '' },
          newPassword: { value: '' },
          newPassword2: { value: '' }
        });
        console.log('Password changed sucessfully!');
      }
    } catch (err) {
      console.error(err);
    }
  };

  render() {
    if (!this.props.auth.user) {
      return null;
    }
    return (
      <div className='account-container'>
        <h1>Account Overview</h1>
        <div className='account-content'>
          <span>Email</span>
          <p>{this.props.auth.user.email}</p>
        </div>
        <form onSubmit={e => this.handleSubmit(e)}>
          <h2>Change Password</h2>
          <div className='account-content'>
            <span>Old password</span>
            <input
              name='oldPassword'
              type='password'
              onChange={e => this.onInputChange(e.target.name, e.target.value)}
              value={this.state.oldPassword.value}
            ></input>
          </div>
          <div className='account-content'>
            <span>New password</span>
            <input
              name='newPassword'
              type='password'
              onChange={e => this.onInputChange(e.target.name, e.target.value)}
              value={this.state.newPassword.value}
            ></input>
          </div>
          <div className='account-content'>
            <span>Confirm new password</span>
            <input
              name='newPassword2'
              type='password'
              onChange={e => this.onInputChange(e.target.name, e.target.value)}
              value={this.state.newPassword2.value}
            ></input>
          </div>
          <button type='submit'>Set New Password</button>
        </form>
        <div
          className='ui black message'
          style={{
            display: `${this.state.success ? '' : 'none'}`,
            position: 'fixed',
            textAlign: 'center',
            bottom: '70px',
            left: '38%'
          }}
        >
          <i
            className='close icon'
            onClick={() => this.setState({ success: false })}
          ></i>
          <p>Password sucessfully changed!</p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { auth: state.auth };
};

export default connect(mapStateToProps)(Account);
