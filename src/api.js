import axios from 'axios';
//import FormData from 'form-data';

//const SERVER_URL = 'https://us-central1-indepdent-8833f.cloudfunctions.net/api';
const SERVER_URL = 'http://localhost:5000/indepdent-8833f/us-central1/api';

const axiosConfig = {
  withCredentials: true,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
};

export const submitSpotifyURI = async (artistId, email) => {
  const data = JSON.stringify({ artistId, email });
  try {
    const res = await axios.post(`${SERVER_URL}/user/spotify-uri`, data, axiosConfig);
    return res.data;
  } catch (error) {
    console.log(error);
    return { error };
  }
}

export const logUserOut = async () => {
  try {
    const res = await axios.get(`${SERVER_URL}/user/logout`, axiosConfig);
    return res.data;
  } catch (error) {
    console.log(error);
    return { error };
  }
};

export const getCurrentUser = async () => {
  try {
    const res = await axios.get(`${SERVER_URL}/user/me`, axiosConfig);
    return res.data;
  } catch (error) {
    console.log(error);
    return { error };
  }
};

export const userLogin = async formValues => {
  try {
    const res = await axios.post(
      `${SERVER_URL}/user/login`,
      JSON.stringify(formValues),
      axiosConfig
    );

    return res;
  } catch (error) {
    console.log(error);
    return { error };
  }
};

export const userSignup = async formValues => {
  try {
    const res = await axios.post(
      `${SERVER_URL}/user/signup`,
      JSON.stringify(formValues),
      axiosConfig
    );
    //console.log(res);
    return res;
  } catch (error) {
    console.log(error);
    return { error };
  }
};

export const resetPassword = async email => {
  const data = JSON.stringify({ email });

  // Call reset password api route
  try {
    const response = await axios.post(
      `${SERVER_URL}/user/reset`,
      data,
      axiosConfig
    );
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
    return { error };
  }
};

export const uploadUserPhoto = async (file) => {
  console.log(file);
  try {
    let data = new FormData();
    data.append('img', file);
    const config = {
      withCredentials: true,
      headers: {
        'accept': 'application/json',
        'Content-Type': 'multipart/form-data'
      }
    };
    const response = await axios.post(`${SERVER_URL}/user/photo`, data, config);
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
    return { error };
  }
}
