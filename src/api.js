import axios from 'axios';

export const userLogin = async formValues => {
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

    return res;
  } catch (error) {
    console.log(error.response.data.message);
    return { error };
  }
};

export const userSignup = async formValues => {
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
    return res;
  } catch (error) {
    console.log(error);
    return { error };
  }
};

export const resetPassword = async email => {
  const data = JSON.stringify({ email });
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  // Call reset password api route
  try {
    const response = await axios.post('/user/reset', data, config);
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
    return { error };
  }
};
