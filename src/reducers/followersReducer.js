import { GET_MY_FOLLOWERS } from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case GET_MY_FOLLOWERS: {
      return {
        ...state,
        followersData: action.payload.followers,
        total: action.payload.totalFollowers
      };
    }
    default: {
      return state;
    }
  }
};
