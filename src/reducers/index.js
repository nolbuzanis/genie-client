import { combineReducers } from 'redux';
import authReducer from './authReducer';
import publicReducer from './publicReducer';
import blastsReducer from './blastsReducer';
import followersReducer from './followersReducer';

export default combineReducers({
  auth: authReducer,
  public: publicReducer,
  blasts: blastsReducer,
  followers: followersReducer
});
