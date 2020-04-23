import axios from 'axios';

export let SERVER_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:5000/indepdent-8833f/us-central1/api' : 'https://purplegenie.ca/api';
//SERVER_URL = 'https://us-central1-indepdent-8833f.cloudfunctions.net/api';

const axiosConfig = {
  withCredentials: true,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
};

export const submitSpotifyURI = async (artist) => {
  const data = JSON.stringify({ artist });
  try {
    const res = await axios.post(`${SERVER_URL}/user/spotify-uri`, data, axiosConfig);
    return res.data;
  } catch (error) {
    console.log(error);
    return { error };
  }
}

export const getSpotifyArtistDetails = async (id) => {
  //const data = JSON.stringify({ artistId });
  try {
    const res = await axios.get(`${SERVER_URL}/user/spotify-uri/${id}`, axiosConfig);
    return res.data;
  } catch (error) {
    console.log(error);
    return { error };
  }
}

export const logUserOut = async () => {
  try {
    const res = await axios.get(`${SERVER_URL}/user/logout`, axiosConfig);
    window.location.reload();
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
      `${SERVER_URL}/user/reset-password`,
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

export const updateUserProfile = async formValues => {
  try {
    const res = await axios.post(
      `${SERVER_URL}/user/update`,
      JSON.stringify(formValues),
      axiosConfig
    );

    return res;
  } catch (error) {
    console.log(error);
    return { error };
  }
}

export const getArtistByURI = async (uri) => {
  try {
    const res = await axios.get(
      `${SERVER_URL}/user/${uri}`);

    return res.data;
  } catch (error) {
    console.log(error);
    return { error };
  }

};

export const followerLogin = async () => {
  try {
    const res = await axios.get(`${SERVER_URL}/follower/login`);
    console.log(res);

  } catch (error) {
    console.log(error);
  }
}

export const followArtist = async (artist) => {

  const data = JSON.stringify({ artist });
  try {
    const response = await axios.post(`${SERVER_URL}/follower/follow`, data, axiosConfig);
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
    return { error };
  }
}

export const getCurrentFollower = async () => {
  try {
    const res = await axios.get(`${SERVER_URL}/follower/me`, axiosConfig);
    return res.data;
  } catch (error) {
    console.log(error);
    return { error };
  }
}

export const logoutFollower = async () => {
  try {
    const res = await axios.get(`${SERVER_URL}/follower/logout`, axiosConfig);
    return res.data;
  } catch (error) {
    console.log(error);
    return { error };
  }
}

export const getMySongs = async () => {
  try {
    const res = await axios.get(`${SERVER_URL}/songs/me`, axiosConfig);
    return res.data;
  } catch (error) {
    console.log(error);
    return { error };
  }
}

export const createNewSong = async (uri, songName, releaseDate) => {
  const nextDay = new Date(releaseDate).getTime() + 1000 * 60 * 60 * 24;
  try {
    const res = await axios.post(`${SERVER_URL}/songs/create`, JSON.stringify({ uri, songName, releaseDate: nextDay }), axiosConfig);
    return res.data;
  } catch (error) {
    console.log(error);
    return { error };
  }
};

export const fetchFollowerCountData = async () => {

  try {
    const { data } = await axios.get(`${SERVER_URL}/user/followers/count`, axiosConfig);
    return data;
  } catch (error) {
    console.error(error);
    return { error };
  }

};