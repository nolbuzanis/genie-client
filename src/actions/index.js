import {
  USER_SIGNUP,
  USER_SIGNUP_ERROR,
  USER_LOGIN_ERROR,
  USER_LOGOUT,
  FETCH_ARTIST_PROFILE,
  FETCH_ALL_BLASTS,
  FETCH_USER_BLASTS,
  MOST_RECENT_BLAST,
  AUTH_FAILED,
  ARTIST_URI_ENTERED,
  UPLOAD_ARTIST_PHOTO,
  FOLLOW_ARTIST,
  EDIT_ARTIST,
  GET_MY_FOLLOWERS
} from './types';
import axios from 'axios';
import history from '../history';
import qs from 'qs';

export const getCurrentUser = () => async dispatch => {
  try {
    const response = await axios.get('/user/me');
    console.log(response);
    localStorage.setItem('authenticated', true);
    dispatch({ type: USER_SIGNUP, payload: response.data.user });
  } catch (err) {
    console.error(err);
    localStorage.setItem('authenticated', false);
    dispatch({ type: AUTH_FAILED });
  }
};

export const userSignup = formValues => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const res = await axios.post(
      '/user/signup',
      JSON.stringify(formValues),
      config
    );
    //console.log(res);
    localStorage.setItem('authenticated', true);
    dispatch({ type: USER_SIGNUP, payload: res.data.user });
    return res;
  } catch (error) {
    console.log(error);
    return { error };
  }
};

export const userLogin = formValues => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  try {
    const res = await axios.post(
      '/user/login',
      JSON.stringify(formValues),
      config
    );
    localStorage.setItem('authenticated', true);
    dispatch({ type: USER_SIGNUP, payload: res.data.user });
    return res;
  } catch (error) {
    console.log(error.response.data.message);
    return { error };
  }
};

export const logUserOut = () => async dispatch => {
  try {
    const response = await axios.get('/user/logout');
    localStorage.setItem('authenticated', false);
    dispatch({ type: USER_LOGOUT, payload: response.data });
  } catch (err) {
    console.error(err);
  }
};

export const fetchArtistProfile = artistId => async dispatch => {
  try {
    const response = await axios.get('/api/artists/' + artistId);

    console.log(response);
    dispatch({ type: FETCH_ARTIST_PROFILE, payload: response.data.artist });
  } catch (err) {
    console.error(err);
    history.push('/');
  }
};

export const newSongBlast = spotifyURI => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const data = JSON.stringify({ spotifyURI: spotifyURI });
    const response = await axios.post('/songs', data, config);

    if (response.status === 201) {
      // Sucessful creation of song
      history.push('/blasts');
    }
    console.log(response);
  } catch (err) {
    console.error(err);
  }
};

export const fetchAllBlasts = () => async dispatch => {
  try {
    const response = await axios.get('/songs');
    console.log(response);
  } catch (err) {
    console.error(err);
  }
};

export const fetchMyBlasts = () => async dispatch => {
  try {
    const response = await axios.get('/songs/me');
    console.log(response);
    dispatch({ type: FETCH_USER_BLASTS, payload: response.data.songs });
  } catch (err) {
    console.error(err);
  }
};

export const recentBlast = () => async dispatch => {
  try {
    const response = await axios.get('/songs/recent');
    console.log(response);
    dispatch({ type: MOST_RECENT_BLAST, payload: response.data.song });
  } catch (err) {
    console.error(err);
  }
};

export const artistURIEntered = uri => async dispatch => {
  try {
    const response = await axios.patch(`/api/artists/uri/${uri}`);
    console.log(response);
    dispatch({ type: ARTIST_URI_ENTERED, payload: response.data.newArtist });
    window.location.reload();
  } catch (err) {
    console.error(err);
  }
};

export const editArtistPhoto = file => async dispatch => {
  try {
    let data = new FormData();
    console.log(file);
    data.append('img', file);
    const config = {
      headers: {
        ContentType: 'multipart/form-data'
      }
    };
    const response = await axios.patch('/api/artists/img', data, config);
    console.log(response);
    dispatch({ type: ARTIST_URI_ENTERED, payload: response.data.newArtist });
    window.location.reload();
  } catch (err) {
    console.error(err);
  }
};

export const editArtistDetails = artist => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const data = JSON.stringify({
      artistName: artist.artistName,
      spotifyURI: artist.spotifyURI,
      desc: artist.desc
    });

    const response = await axios.patch(
      '/api/artists/' + artist.id,
      data,
      config
    );
    dispatch({ type: EDIT_ARTIST, payload: response.data.newArtist });
  } catch (err) {
    console.error(err);
  }
};

export const getMyFollowers = () => async dispatch => {
  try {
    const response = await axios.get('/followers/me');

    console.log(response);
    if (response.status === 200) {
      // Sucessful
      dispatch({ type: GET_MY_FOLLOWERS, payload: response.data });
    }
  } catch (err) {
    console.error(err);
  }
};
