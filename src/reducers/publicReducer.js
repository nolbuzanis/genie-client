import { FETCH_ARTIST_PROFILE } from '../actions/types';

export default (state = null, action) => {
  switch (action.type) {
    case FETCH_ARTIST_PROFILE: {
      return { ...state, artist: action.payload };
    }
    default:
      return state;
  }
};
