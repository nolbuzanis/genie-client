import axios from 'axios';

export let SERVER_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:5000/indepdent-8833f/us-central1/api'
    : 'https://purplegenie.ca/api';
//export let SERVER_URL = 'https://purplegenie.ca/api';

const axiosConfig = {
  withCredentials: true,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
};

export const submitSpotifyURI = async (artist) => {
  const data = JSON.stringify({ artist });
  try {
    const res = await axios.post(
      `${SERVER_URL}/artist/spotify-uri`,
      data,
      axiosConfig
    );
    return res.data;
  } catch (error) {
    console.log(error);
    return { error };
  }
};

export const getSpotifyArtistDetails = async (id) => {
  //const data = JSON.stringify({ artistId });
  try {
    const res = await axios.get(
      `${SERVER_URL}/artist/spotify-uri/${id}`,
      axiosConfig
    );
    return res.data;
  } catch (error) {
    console.log(error);
    return { error };
  }
};

export const submitDeezerArtist = async (artist) => {
  const data = JSON.stringify({ artist });
  try {
    const res = await axios.post(
      `${SERVER_URL}/artist/deezer-id`,
      data,
      axiosConfig
    );
    return res.data;
  } catch (error) {
    console.log(error);
    return { error };
  }
};

export const getDeezerArtistDetails = async (id) => {
  try {
    const res = await axios.get(
      `${SERVER_URL}/artist/deezer-id/${id}`,
      axiosConfig
    );
    return res.data;
  } catch (error) {
    console.log(error);
    return { error };
  }
};

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

export const userLogin = async (formValues) => {
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

export const userSignup = async (formValues) => {
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

export const resetPassword = async (email) => {
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
        accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    };
    const response = await axios.post(
      `${SERVER_URL}/artist/photo`,
      data,
      config
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
    return { error };
  }
};

export const updateUserProfile = async (formValues) => {
  try {
    const res = await axios.post(
      `${SERVER_URL}/artist/update`,
      JSON.stringify(formValues),
      axiosConfig
    );

    return res;
  } catch (error) {
    console.log(error);
    return { error };
  }
};

export const getArtistById = async (id) => {
  try {
    const res = await axios.get(`${SERVER_URL}/artist/${id}`);

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
};

export const followArtist = async (artist, mailingList) => {
  const data = JSON.stringify({ artist, mailingList });
  try {
    const response = await axios.post(
      `${SERVER_URL}/follower/follow`,
      data,
      axiosConfig
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
    return { error };
  }
};

export const getCurrentFollower = async () => {
  try {
    const res = await axios.get(`${SERVER_URL}/follower/me`, axiosConfig);
    return res.data;
  } catch (error) {
    console.log(error);
    return { error };
  }
};

export const logoutFollower = async () => {
  try {
    const res = await axios.get(`${SERVER_URL}/follower/logout`, axiosConfig);
    return res.data;
  } catch (error) {
    console.log(error);
    return { error };
  }
};

export const getMySongs = async () => {
  try {
    const res = await axios.get(`${SERVER_URL}/songs/me`, axiosConfig);
    return res.data;
  } catch (error) {
    console.log(error);
    return { error };
  }
};

export const createNewSong = async (values) => {
  try {
    let formData = new FormData();
    Object.keys(values).forEach((key) => formData.append(key, values[key]));
    const config = {
      withCredentials: true,
      headers: {
        accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    };
    const { data } = await axios.post(
      `${SERVER_URL}/songs/create`,
      formData,
      config
    );
    return data;
  } catch (error) {
    console.log(error);
    return { error };
  }
};

export const fetchFollowerCountData = async () => {
  try {
    const { data } = await axios.get(
      `${SERVER_URL}/artist/followers/count`,
      axiosConfig
    );
    return data;
  } catch (error) {
    console.error(error);
    return { error };
  }
};

export const createPremiumSubscription = async (paymentMethod, planType) => {
  const bodyData = JSON.stringify({
    payment_method: paymentMethod.id,
    planType,
  });
  try {
    const { data } = await axios.post(
      `${SERVER_URL}/artist/premium-subscription/create`,
      bodyData,
      axiosConfig
    );
    return data;
  } catch (error) {
    console.error(error);
    return { error };
  }
};

export const cancelPremiumSubscription = async () => {
  try {
    const { data } = await axios.post(
      `${SERVER_URL}/artist/premium-subscription/cancel`,
      {},
      axiosConfig
    );
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
    return { error };
  }
};

export const resumePremiumSubscription = async () => {
  try {
    const { data } = await axios.post(
      `${SERVER_URL}/artist/premium-subscription/resume`,
      {},
      axiosConfig
    );
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
    return { error };
  }
};

export const fetchPaymentInfo = async () => {
  try {
    const { data } = await axios.get(
      `${SERVER_URL}/artist/payment-information`,
      axiosConfig
    );
    return data;
  } catch (error) {
    console.error(error);
    return { error };
  }
};

export const updatePaymentInfo = async (paymentMethod) => {
  const bodyData = JSON.stringify({
    payment_method: paymentMethod.id,
  });
  try {
    const { data } = await axios.post(
      `${SERVER_URL}/artist/payment-information/update`,
      bodyData,
      axiosConfig
    );
    return data;
  } catch (error) {
    console.error(error);
    return { error };
  }
};

export const sendHelpMessage = async ({ subject, description }) => {
  const bodyData = JSON.stringify({
    subject,
    description,
  });
  try {
    const { data } = await axios.post(
      `${SERVER_URL}/artist/help`,
      bodyData,
      axiosConfig
    );
    return data;
  } catch (error) {
    console.error(error);
    return { error };
  }
};

export const fetchAllArticles = async () => {
  try {
    const { data } = await axios.get(`${SERVER_URL}/articles`, axiosConfig);
    return data;
  } catch (error) {
    console.error(error);
    return { error };
  }
};

export const fetchArticle = async (id) => {
  try {
    const { data } = await axios.get(
      `${SERVER_URL}/articles/${id}`,
      axiosConfig
    );
    return data;
  } catch (error) {
    console.error(error);
    return { error };
  }
};

export const createNewArtist = async (name) => {
  const bodyData = JSON.stringify({ name });
  try {
    const { data } = await axios.post(
      `${SERVER_URL}/user/artist/create`,
      bodyData,
      axiosConfig
    );
    return data;
  } catch (error) {
    console.error(error);
    return { error };
  }
};

export const switchArtist = async (id) => {
  const bodyData = JSON.stringify({ artistId: id });
  try {
    const { data } = await axios.post(
      `${SERVER_URL}/user/artist`,
      bodyData,
      axiosConfig
    );
    return data;
  } catch (error) {
    console.error(error);
    return { error };
  }
};

export const getSpotifySongDetails = async (id) => {
  //const data = JSON.stringify({ artistId });
  try {
    const { data } = await axios.get(
      `${SERVER_URL}/songs/spotify/${id}`,
      axiosConfig
    );
    return data;
  } catch (error) {
    console.log(error);
    return { error };
  }
};

export const getDeezerSongDetails = async (id) => {
  //const data = JSON.stringify({ artistId });
  try {
    const { data } = await axios.get(
      `${SERVER_URL}/songs/deezer/${id}`,
      axiosConfig
    );
    return data;
  } catch (error) {
    console.log(error);
    return { error };
  }
};

export const createPresave = async (
  { name, spotify, deezer, releaseDate },
  file
) => {
  try {
    let data = new FormData();
    data.append('img', file);
    data.append('name', name);
    if (spotify) data.append('spotify', spotify);
    if (deezer) data.append('deezer', deezer);
    data.append('releaseDate', releaseDate);
    const config = {
      withCredentials: true,
      headers: {
        accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    };
    const response = await axios.post(
      `${SERVER_URL}/songs/presave/create`,
      data,
      config
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
    return { error };
  }
};

export const presaveTrack = async (artist, mailingList) => {
  console.log(mailingList);
  const data = JSON.stringify({ artist, mailingList });
  try {
    const response = await axios.post(
      `${SERVER_URL}/follower/presave`,
      data,
      axiosConfig
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
    return { error };
  }
};

export const subscribeToArtist = async (artist) => {
  const data = JSON.stringify({ artist });
  try {
    const response = await axios.post(
      `${SERVER_URL}/follower/subscribe`,
      data,
      axiosConfig
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
    return { error };
  }
};

export const getPresave = async () => {
  try {
    const { data } = await axios.get(
      `${SERVER_URL}/songs/presave`,
      axiosConfig
    );
    return data;
  } catch (error) {
    console.log(error);
    return { error };
  }
};

export const updatePresave = async (updates) => {
  try {
    let formData = new FormData();
    Object.keys(updates).forEach((key) => formData.append(key, updates[key]));
    const config = {
      withCredentials: true,
      headers: {
        accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    };
    const { data } = await axios.post(
      `${SERVER_URL}/songs/presave/edit`,
      formData,
      config
    );
    return data;
  } catch (error) {
    console.log(error);
    return { error };
  }
};

export const getReleases = async () => {
  try {
    const { data } = await axios.get(
      `${SERVER_URL}/songs/releases`,
      axiosConfig
    );

    return data;
  } catch (error) {
    console.log(error);
    return { error };
  }
};

export const getGeo = async () => {
  try {
    const { data } = await axios.get('https://ipapi.co/json/');
    return { city: data.city, country: data.country_code };
  } catch (error) {
    console.log('error getting geo', error);
    return undefined;
  }
};

export const fetchItunesSong = async (searchTerm) => {
  try {
    let country;
    try {
      const geo = JSON.parse(localStorage.getItem('geo'));
      country = geo.country;
    } catch (err) {
      country = 'US';
    }

    const { data } = await axios.get('https://itunes.apple.com/search', {
      params: {
        term: searchTerm,
        entity: 'song,album,podcast',
        country,
      },
    });
    return data;
  } catch (error) {
    console.log('error fetching song: ', error);
    return { error };
  }
};

export const findSongLinks = async (songData) => {
  try {
    const sentData = JSON.stringify({ ...songData });
    const { data } = await axios.post(`${SERVER_URL}/songs/find`, sentData, axiosConfig);

    return data;

  } catch (error) {
    console.log(error);
    return { error };
  }

};

export const getAnalyticsOverview = async () => {
  try {

    const { data } = await axios.post(`${SERVER_URL}/artist/analytics`, {}, axiosConfig);
    return data;

  } catch (error) {
    console.log(error);
    return { error };
  }
};