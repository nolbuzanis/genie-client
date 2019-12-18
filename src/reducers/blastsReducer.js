import { FETCH_USER_BLASTS, MOST_RECENT_BLAST } from '../actions/types';

export default (state = null, action) => {
  switch (action.type) {
    case FETCH_USER_BLASTS: {
      return { ...state, all: action.payload };
    }
    case MOST_RECENT_BLAST: {
      return { ...state, mostRecent: action.payload };
    }
    default:
      return { ...state };
  }
};
