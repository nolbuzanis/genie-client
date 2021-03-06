import React, { useState } from 'react';
import styled from 'styled-components';
import { useAuth } from '../../Context/authContext';
import Modal from 'react-modal';

import PageHeader from '../../components/BackPageHeader';
import Button from '../../components/Button';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import {
  submitSpotifyURI,
  getSpotifyArtistDetails,
  getDeezerArtistDetails,
  submitDeezerArtist,
} from '../../api';
import { useToasts } from 'react-toast-notifications';

const SpotifyImg = styled.img`
  width: 26px;
  height: 26px;
  margin-right: 10px;
`;
const DeezerImg = styled.img`
  width: 32px;
  height: 18px;
  margin-right: 10px;
`;
const Container = styled.div`
  max-width: 530px;
  margin: 0 auto;
  padding: 0 30px 40px;
`;
const AccountContainer = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;
const CenteredDiv = styled.div`
  display: flex;
  align-items: center;
`;
const AccountName = styled.h2`
  font-size: 18px;
  font-weight: 600;
  color: #444444;
  display: inline-block;
`;
const ButtonWrapper = styled.div`
  width: 100px;
`;
const AccountNote = styled.p`
  font-size: 14px;
  font-weight: 500;
  color: #444444;
  padding: 10px 10px 0;
`;
const Input = styled.input`
  display: block;
  text-align: center;
  width: 100%;
  border: 1px solid ${(props) => (props.error ? '#bd3200' : '#979797')};
  height: 40px
  padding: 5px 10px;
  font-size: 16px;
  border-radius: 10px;
  margin: 20px auto 0;
  box-sizing: border-box;
`;
const ErrorMsg = styled.label`
  display: block;
  font-size: 12px;
  color: #bd3200;
  text-align: left;
  padding-top: 5px;
  margin: 0 auto;
`;
const HelpIcon = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 5px;
`;
const HelpContainer = styled(Link)`
  margin: 20px auto 10px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const HelpText = styled.span`
  color: #4568dc;
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
const modalStyles = {
  overlay: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: '100',
    background: 'rgba(255, 255, 255, 0.7)',
  },
  content: {
    position: 'static',
    display: 'flex',
    justifyContent: 'center',
    padding: '10px',
    border: 'none',
    background: 'none',
  },
};
Modal.setAppElement('body');

const ModalContainer = styled.div`
  background: white;
  width: 340px;
  padding: 25px 15px;
  border-radius: 30px;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
  text-align: center;
`;
const ModalText = styled.p`
  color: #444444;
  padding-top: 20px;
`;
const ModalHeader = styled.h2`
  color: #444444;
`;
const Spacing = styled.div`
  height: 15px;
`;

const initialValues = {
  uri: '',
};
const initialDeezerValues = {
  deezer: '',
};
const deezerValidationSchema = Yup.object().shape({
  deezer: Yup.string().trim().required('Please enter a valid link.'),
});
const validationSchema = Yup.object().shape({
  uri: Yup.string().trim().required('Please enter a valid URI.'),
});

const LinkAccounts = () => {
  const { user, setAuth } = useAuth();
  const [spotifyModal, setSpotifyModal] = useState(false);
  const [deezerModal, setDeezerModal] = useState(false);
  const { addToast } = useToasts();
  const [artist, setArtist] = useState();
  const [deezerArtist, setDeezerArtist] = useState();
  const [confirming, setConfirming] = useState();

  const handleDeezerSubmit = async (
    { deezer },
    { setFieldError, setSubmitting }
  ) => {
    setSubmitting(true);

    const parsed = deezer.trim().split('?')[0].split('/');
    const code = parsed[parsed.length - 1];

    const artist = await getDeezerArtistDetails(code);
    if (
      artist.error &&
      artist.error.response &&
      artist.error.response.status === 409
    ) {
      setFieldError('uri', 'That URI is already taken.');
      return setSubmitting(false);
    }
    if (artist.error) {
      addToast(artist.error.message, { appearance: 'error' });
      return setSubmitting(false);
    }
    setSubmitting(false);
    return setDeezerArtist(artist);
  };

  const confirmDeezerArtist = async () => {
    setConfirming(true);
    const response = await submitDeezerArtist(deezerArtist);
    if (
      response.error &&
      response.error.response &&
      response.error.response.status === 409
    ) {
      //TODO: add in text to show artist taken
      return setDeezerArtist(undefined);
    }
    if (response.error) {
      addToast(response.error.message, { appearance: 'error' });
      return setDeezerArtist(undefined);
    }

    setDeezerModal(false);
    setAuth({ ...user, deezerId: response });
    return addToast('Deezer account connected.', { appearance: 'success' });
  };

  const handleSpotifySubmit = async (
    { uri },
    { setFieldError, setSubmitting }
  ) => {
    setSubmitting(true);
    const artistId = uri.includes('spotify')
      ? uri.trim().split(':')[2]
      : uri.trim();

    const artist = await getSpotifyArtistDetails(artistId);
    if (
      artist.error &&
      artist.error.response &&
      artist.error.response.status === 409
    ) {
      setFieldError('uri', 'That URI is already taken.');
      return setSubmitting(false);
    }
    if (artist.error) {
      console.log(artist.error, artist.error.message);
      addToast(artist.error.message, { appearance: 'error' });
      return setSubmitting(false);
    }
    setSubmitting(false);
    return setArtist(artist);
  };

  const confirmArtist = async () => {
    setConfirming(true);
    const response = await submitSpotifyURI(artist);
    if (
      response.error &&
      artist.error.response &&
      artist.error.response.status === 409
    ) {
      //TODO: add in text to show artist taken
      return artist(undefined);
    }
    if (response.error) {
      addToast(response.error.message, { appearance: 'error' });
      return artist(undefined);
    }

    setSpotifyModal(false);
    setAuth({ ...user, uri: response });
    return addToast('Spotify account connected.', { appearance: 'success' });
  };

  const SpotifyModal = ({ isOpen, onClose }) => (
    <Modal style={modalStyles} isOpen={isOpen} onRequestClose={onClose}>
      <ModalContainer>
        <ModalHeader>Connect Spotify</ModalHeader>
        {artist ? (
          <>
            <ModalText>Is this you?</ModalText>
            <Pic src={artist.images[0].url} alt='artist-profile-pic' />
            <Name>{artist.name}</Name>
            <Button
              onClick={confirmArtist}
              disabled={confirming}
              isLoading={confirming}
            >
              {confirming ? 'Confirming' : 'Confirm'}
            </Button>
            <Spacing />
            <Button alternate onClick={() => setArtist(undefined)}>
              Back
            </Button>
          </>
        ) : (
            <>
              <ModalText>Please enter your Spotify Artist URI code.</ModalText>
              <HelpContainer to='/find-artist-uri'>
                <HelpIcon src='/assets/help-icon-blue.png' />
                <HelpText>how do I find this?</HelpText>
              </HelpContainer>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSpotifySubmit}
              >
                {(props) => (
                  <form onSubmit={props.handleSubmit}>
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
                    <Spacing />
                    <Button
                      type='submit'
                      disabled={props.isSubmitting}
                      isLoading={props.isSubmitting}
                    >
                      Continue
                  </Button>
                    <Spacing />
                    <Button type='button' alternate onClick={() => onClose()}>
                      Cancel
                  </Button>
                  </form>
                )}
              </Formik>
            </>
          )}
      </ModalContainer>
    </Modal>
  );

  const DeezerModal = ({ isOpen, onClose }) => (
    <Modal style={modalStyles} isOpen={isOpen} onRequestClose={onClose}>
      <ModalContainer>
        <ModalHeader>Connect Deezer</ModalHeader>
        {deezerArtist ? (
          <>
            <ModalText>Is this you?</ModalText>
            <Pic
              src={deezerArtist.medium_picture || deezerArtist.picture}
              alt='artist-profile-pic'
            />
            <Name>{deezerArtist.name}</Name>
            <Button
              onClick={confirmDeezerArtist}
              disabled={confirming}
              isLoading={confirming}
            >
              {confirming ? 'Confirming' : 'Confirm'}
            </Button>
            <Spacing />
            <Button alternate onClick={() => setDeezerArtist(undefined)}>
              Back
            </Button>
          </>
        ) : (
            <>
              <ModalText>Please enter your Deezer Artist Link.</ModalText>
              <HelpContainer to='/find-deezer-link'>
                <HelpIcon src='/assets/help-icon-blue.png' />
                <HelpText>how do I find this?</HelpText>
              </HelpContainer>
              <Formik
                initialValues={initialDeezerValues}
                validationSchema={deezerValidationSchema}
                onSubmit={handleDeezerSubmit}
              >
                {(props) => (
                  <form onSubmit={props.handleSubmit}>
                    <Input
                      name='deezer'
                      value={props.values['deezer']}
                      type='text'
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      error={props.errors['deezer'] && props.touched['deezer']}
                      placeholder='Deezer Artist Link'
                    />
                    {props.errors['deezer'] && props.touched['deezer'] && (
                      <ErrorMsg>{props.errors['deezer']}</ErrorMsg>
                    )}
                    <Spacing />
                    <Button
                      type='submit'
                      disabled={props.isSubmitting}
                      isLoading={props.isSubmitting}
                    >
                      Continue
                  </Button>
                    <Spacing />
                    <Button type='button' alternate onClick={() => onClose()}>
                      Cancel
                  </Button>
                  </form>
                )}
              </Formik>
            </>
          )}
      </ModalContainer>
    </Modal>
  );

  return (
    <>
      <SpotifyModal
        isOpen={spotifyModal}
        onClose={() => setSpotifyModal(false)}
      />
      <DeezerModal isOpen={deezerModal} onClose={() => setDeezerModal(false)} />
      <PageHeader>Integrations</PageHeader>
      <Container>
        <AccountContainer>
          <CenteredDiv>
            <SpotifyImg src='/assets/spotify-logo-green-sm.png' />
            <AccountName>Spotify</AccountName>
          </CenteredDiv>
          <ButtonWrapper>
            <Button
              small
              alternate={user.uri}
              onClick={() => user.uri || setSpotifyModal(true)}
            >
              {user.uri ? 'Connected' : 'Connect'}
            </Button>
          </ButtonWrapper>
        </AccountContainer>
        <AccountNote>
          ?? Fans will save your song to their Spotify library (on presave release)
        </AccountNote>
        <AccountNote>
          ?? Fans will follow you as an artist on Spotify (on any presave release)
        </AccountNote>
        <AccountContainer>
          <CenteredDiv>
            <DeezerImg src='/assets/deezer-logo-black-sm.png' />
            <AccountName>Deezer</AccountName>
          </CenteredDiv>
          <ButtonWrapper>
            <Button
              small
              alternate={user.deezerId}
              onClick={() => user.deezerId || setDeezerModal(true)}
            >
              {user.deezerId ? 'Connected' : 'Connect'}
            </Button>
          </ButtonWrapper>
        </AccountContainer>
        <AccountNote>
          ?? Fans will save your song to their Deezer library (on presave release)
        </AccountNote>
        <AccountNote>
          ?? Fans will add you to their favourite artists on Deezer (on any presave release)
        </AccountNote>
      </Container>
    </>
  );
};

export default LinkAccounts;
