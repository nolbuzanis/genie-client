import {
  USER_SIGNUP,
  USER_SIGNUP_ERROR,
  USER_LOGIN_ERROR,
  USER_LOGOUT,
  AUTH_FAILED,
  ARTIST_URI_ENTERED,
  EDIT_ARTIST
} from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case USER_SIGNUP: {
      return {
        ...state,
        user: action.payload,
        signup_error: '',
        login_error: '',
        isAuthenticated: true
      };
    }
    case USER_SIGNUP_ERROR: {
      return { ...state, signup_error: action.payload };
    }
    case USER_LOGIN_ERROR: {
      return { ...state, login_error: action.payload };
    }
    case USER_LOGOUT: {
      return { ...state, user: null, isAuthenticated: false };
    }
    case AUTH_FAILED: {
      return { ...state, isAuthenticated: false };
    }
    case ARTIST_URI_ENTERED: {
      return { ...state, user: action.payload };
    }
    case EDIT_ARTIST: {
      return { ...state, user: action.payload };
    }
    default:
      return state;
  }
};
