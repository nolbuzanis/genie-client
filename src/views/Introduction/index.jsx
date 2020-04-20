import React from 'react';
import styled from 'styled-components';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { submitSpotifyURI, getSpotifyArtistDetails } from '../../api';
import authContext from '../../Context/authContext';
import { withRouter, Link } from 'react-router-dom';
import { useAlert } from 'react-alert';
import Button from '../../components/Button';

const Container = styled.div`
  //margin: 0 auto;
  text-align: center;
  width: 100%;
  padding: 40px 30px;
`;
const WelcomeHeader = styled.h1`
  //font-size: calc(20px + 2.1vw);
  font-size: 24px;
  color: #4568dc;
  font-weight: 600;
`;
const Paragrah = styled.p`
  //font-size: calc(13px + 0.6vw);
  padding-top: 25px;
  padding-bottom: 10px;
  margin: 0 auto;
`;
const Input = styled.input`
  display: block;
  text-align: center;
  width: 100%;
  border: 1px solid ${props => (props.error ? '#bd3200' : '#979797')};
  height: 40px
  padding: 5px 10px;
  font-size: 16px;
  border-radius: 10px;
  margin: 36px auto 0;
  box-sizing: border-box;
`;
const ButtonWrapper = styled.div`
  margin: 25px auto 0;
  max-width: 360px;
`;
const Spacing = styled.div`
  height: 15px;
`;
const ErrorMsg = styled.label`
  display: block;
  font-size: 12px;
  color: #bd3200;
  text-align: left;
  padding-top: 5px;
  margin: 0 auto;
`;
const BoldText = styled.span`
font-weight: 600;
`;
const HelpIcon = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 5px;
`;
const HelpContainer = styled(Link)`
  margin: 25px auto 0;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const HelpText = styled.span`
  color: #4568DC;
  font-size: 12px;
  text-decoration: underline;
`;
const Pic = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  margin: 33px auto 0;
`;
const Name = styled.p`
  color: #212121;
  padding-top: 20px;
  padding-bottom: 20px;
  font-size: 24px;
`;
const Form = styled.form`
max-width: 360px;
margin: 0 auto;
`;

const initialValues = {
  uri: ''
};
const validationSchema = Yup.object().shape({
  uri: Yup.string()
    .trim()
    .required('Please enter a valid URI.')
});



const Introduction = ({ history }) => {
  const alert = useAlert();
  const { follower, setAuth } = React.useContext(authContext);
  const [artist, setArtist] = React.useState();
  const handleSubmit = async ({ uri }, { setFieldError, setSubmitting }) => {
    setSubmitting(true);
    const artistId = uri.includes('spotify') ? uri.trim().split(':')[2] : uri.trim();


    const artist = await getSpotifyArtistDetails(artistId);
    if (artist.error && artist.error.response && artist.error.response.status === 409) {
      setFieldError('uri', 'That URI is already taken.')
      return setSubmitting(false);
    }
    if (artist.error) {
      alert.show('Error submitting URI!');
      return setSubmitting(false);
    }
    setSubmitting(false);
    return setArtist(artist);
  }

  const confirmArtist = async () => {

    const response = await submitSpotifyURI(artist);
    if (response.error && artist.error.response && artist.error.response.status === 409) {
      //TODO: add in text to show artist taken
      return artist(undefined);
    }
    if (response.error) {
      alert.show('Error submitting URI!');
      return artist(undefined);
    }
    setAuth({ follower, user: undefined });
    return history.push('/profile');
  };

  if (artist) {
    return <Container>
      <WelcomeHeader>Is this you?</WelcomeHeader>
      <Pic src={artist.images[0].url} alt='artist-profile-pic' />
      <Name>{artist.name}</Name>
      <ButtonWrapper>
        <Button onClick={confirmArtist}>Confirm</Button>
        <Spacing />
        <Button alt onClick={() => setArtist(undefined)}>Back</Button>
      </ButtonWrapper>
    </Container>
  }

  return <Container>
    <WelcomeHeader>Welcome to Genie</WelcomeHeader>
    <Paragrah>
      Before you get started, please enter your <BoldText>Spotify Artist URI code</BoldText>.
    </Paragrah>
    <Paragrah>
      This will automatically import things like your name, and photo, which can be changed at a later date.
    </Paragrah>
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {props => (
        <Form onSubmit={props.handleSubmit}>
          <Input
            name='uri'
            value={props.values['uri']}
            type='text'
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            error={props.errors['uri'] && props.touched['uri']}
            placeholder='Spotify Artist URI'
          />
          {props.errors['uri'] && props.touched['uri'] && (
            <ErrorMsg>{props.errors['uri']}</ErrorMsg>
          )}
          <HelpContainer to='/find-artist-uri'>
            <HelpIcon src='/assets/help-icon-blue.png' />
            <HelpText>how do I find this?</HelpText>
          </HelpContainer>
          <ButtonWrapper>
            <Button type='submit' disabled={props.isSubmitting}>Continue</Button>
          </ButtonWrapper>
        </Form>
      )}
    </Formik>
  </Container>
};

export default withRouter(Introduction);
