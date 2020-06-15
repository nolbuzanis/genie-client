import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Button from '../../components/Button';
import BackPageHeader from '../../components/BackPageHeader';
import { useAuth } from '../../Context/authContext';
import { useHistory, Link } from 'react-router-dom';
import {
  getDeezerSongDetails,
  getSpotifySongDetails,
  getPresave,
  updatePresave,
} from '../../api';
import { useToasts } from 'react-toast-notifications';
import Modal from '../../components/Modal';
import { Formik } from 'formik';
import InputSection from '../../components/InputSection';
import Calendar from '../../components/Calendar';

const AlbumArt = styled.img`
  width: 120px;
  height: 120px;
`;
const Container = styled.div`
  text-align: center;
  padding: 0 30px 40px;
`;
const AlbumName = styled.p`
  color: #444444;
  font-size: 18px;
  font-weight: 500;
  padding-top: 15px;
`;
const FileInput = styled.input`
  visibility: hidden;
  display: none;
`;

const ButtonWrapper = styled.div`
  width: 80%;
  min-width: 220px;
  padding-top: 20px;
  max-width: 300px;
  margin: 0 auto;
`;
const Releasing = styled.p`
  font-weight: 500;
  color: #444444;
  padding-top: 25px;
`;
const HelpIcon = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 5px;
`;
const HelpContainer = styled(Link)`
  margin: 25px auto 40px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const HelpText = styled.span`
  color: #656ded;
  font-size: 12px;
  text-decoration: underline;
`;
const Centered = styled.div`
  text-align: center;
  padding-top: 20px;
  > div {
    margin: 0 auto;
  }
`;
const SpotifyImg = styled.img`
  width: 20px;
  height: 20px;
  margin-left: 10px;
`;
const SpotifyButton = styled(Button)`
  background: #1db954;
  font-weight: 600;
  border-radius: 10px;
  font-size: 18px;
  display: flex;
  width: 80%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  margin-top: 15px;
`;
const DeezerButton = styled(SpotifyButton)`
  color: black;
  background: #ffffff;
`;
const DeezerImg = styled.img`
  width: 32.5px;
  height: 18.1px;
  margin-left: 10px;
`;
const SongNamePreview = styled.p`
  padding: 15px 0;
  color: #444444;
  font-size: 18px;
`;
const ConfirmedSongId = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #656ded;
  font-size: 14px;
  padding: 13px 0;
  font-weight: 500;
  text-align: center;
`;
const ImagePreview = styled.div`
  width: 120px;
  margin-top: 10px;
  height: 120px;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
  background: ${(props) =>
    props.img && `url(${props.img}) center center no-repeat`};
`;
const ConfirmedLabel = styled.span`
  color: #444444;
  font-size: 14px;
  padding: 0 5px;
`;
const ConfirmImg = styled.img`
  display: inline-block;
  width: 20px;
  height: 20px;
`;
const BackButton = styled(Button)`
  background: none;
  color: #666666;
  padding: 5px;
  height: 24px;
  line-height: 24px;
  border: none;
  width: auto;
  height: inherit;
  margin: 5px auto;
`;
const Subheading = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #444444;
  padding-top: 28px;
  padding-bottom: 15px;
`;

const initialValues = {
  spotify: '',
  deezer: '',
};

// const validationSchema = Yup.object().shape({
//   name: Yup.string().trim().required('Please enter a valid name.'),
//   img: Yup.string().trim().required('Album art is required.'),
// });

const parseDate = (timestamp) => {
  if (!timestamp) return '';
  if (timestamp._seconds) timestamp = timestamp._seconds * 1000;
  const date = new Date(timestamp);
  const parsed = date
    .toLocaleString('default', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
    .split(' ');
  return parsed[0] + '. ' + parsed[1] + ' ' + parsed[2];
};

const EditPresave = () => {
  const { user, setAuth } = useAuth();
  const history = useHistory();
  const [uploading, setUploading] = useState(false);
  const { addToast } = useToasts();
  const [modal, setModal] = useState('');
  const [presave, setPresave] = useState();

  useEffect(() => {
    const fetchPresave = async () => {
      const presaveRes = await getPresave();

      if (presaveRes.error) return;
      setPresave(presaveRes);
    };

    fetchPresave();
  }, []);

  const SpotifyModal = () => {
    const [song, setSong] = useState({});
    const [isSubmitting, setSubmitting] = useState(false);

    const confirmSpotifySong = async ({ values }) => {
      setSubmitting(true);
      const { spotify } = values;

      const id = spotify.includes('spotify')
        ? spotify.trim().split(':')[2]
        : spotify.trim();

      const response = await updatePresave({ spotify: id });
      setSubmitting(false);

      if (response.error) {
        return addToast('Error updating: ' + response.error.response, {
          appearance: 'error',
        });
      }

      setPresave((prevProps) => ({
        ...prevProps,
        ids: { ...prevProps.ids, spotify: id },
      }));
      setModal(undefined);
      addToast('Sucessfully updated!', { appearance: 'success' });
    };

    const submitSpotifySong = async ({ values, setFieldError }) => {
      setSubmitting(true);
      const { spotify } = values;

      const id = spotify.includes('spotify')
        ? spotify.trim().split(':')[2]
        : spotify.trim();

      if (!id || id.length === 0) {
        setSubmitting(false);
        return setFieldError(
          'spotify',
          'Please enter a valid spotify song URI.'
        );
      }
      const response = await getSpotifySongDetails(id);
      setSubmitting(false);
      if (response.error && response.error.response.status === 409) {
        return setFieldError('spotify', 'Spotify song URI already in use.');
      }
      if (response.error) {
        console.log(response.error.response);
        return setFieldError('spotify', 'Spotify song URI not recognized.');
      }

      setSong(response);
    };

    return (
      <Modal
        isOpen={modal === 'spotify'}
        onClose={() => setModal(undefined)}
        title={song.name ? 'Confirm the song' : 'Add Spotify ID'}
      >
        <Formik
          initialValues={initialValues}
          onSubmit={(values) => console.log(values)}
        >
          {(props) => (
            <form>
              {song.name ? (
                <>
                  <Centered>
                    <ImagePreview img={song.img} />
                    <SongNamePreview>{song.name}</SongNamePreview>
                  </Centered>
                  <Button
                    type='button'
                    isLoading={isSubmitting}
                    onClick={() => confirmSpotifySong(props)}
                  >
                    {isSubmitting ? 'Confirming...' : 'Yes, continue'}
                  </Button>
                  <BackButton
                    type='button'
                    alternate
                    onClick={() => setSong({})}
                  >
                    No, go back
                  </BackButton>
                </>
              ) : (
                <>
                  <InputSection
                    {...props}
                    name='spotify'
                    label="What's the Spotify Song URI?"
                  />
                  <HelpContainer to='/find-artist-uri'>
                    <HelpIcon src='/assets/help-icon-blue.png' />
                    <HelpText>how do I find this?</HelpText>
                  </HelpContainer>
                  <Button
                    type='button'
                    isLoading={isSubmitting}
                    onClick={() => submitSpotifySong(props)}
                  >
                    {isSubmitting ? 'Searching...' : 'Continue'}
                  </Button>
                  <BackButton
                    type='button'
                    alternate
                    onClick={() => setModal(undefined)}
                  >
                    Close
                  </BackButton>
                </>
              )}
            </form>
          )}
        </Formik>
      </Modal>
    );
  };

  const DeezerModal = () => {
    const [song, setSong] = useState({});
    const [isSubmitting, setSubmitting] = useState(false);

    const confirmDeezerSong = async ({ values }) => {
      setSubmitting(true);
      const { deezer } = values;

      const parsed = deezer.trim().split('?')[0].split('/');
      const id = parsed[parsed.length - 1];

      const response = await updatePresave({ deezer: id });
      setSubmitting(false);

      if (response.error) {
        return addToast('Error updating: ' + response.error.response, {
          appearance: 'error',
        });
      }

      setPresave((prevProps) => ({
        ...prevProps,
        ids: { ...prevProps.ids, deezer: id },
      }));
      setModal(undefined);
      addToast('Sucessfully updated!', { appearance: 'success' });
    };

    //console.log(props.errors);
    const submitDeezerSong = async ({ values, setFieldError }) => {
      setSubmitting(true);
      const { deezer } = values;

      const parsed = deezer.trim().split('?')[0].split('/');
      const id = parsed[parsed.length - 1];

      if (!id || id.length === 0) {
        setSubmitting(false);
        return setFieldError('deezer', 'Please enter a valid Deezer track Id.');
      }
      const response = await getDeezerSongDetails(id);
      setSubmitting(false);
      if (response.error && response.error.response.status === 409) {
        return setFieldError('deezer', 'Deezer song id already in use.');
      }
      if (response.error) {
        return setFieldError('deezer', 'Deezer song id not recognized.');
      }

      setSong(response);
    };

    return (
      <Modal
        isOpen={modal === 'deezer'}
        onClose={() => setModal(undefined)}
        title={song.name ? 'Confirm the song' : 'Add Deezer ID'}
      >
        <Formik
          initialValues={initialValues}
          onSubmit={(values) => console.log(values)}
        >
          {(props) => (
            <form>
              {song.name ? (
                <>
                  <Centered>
                    <ImagePreview img={song.img} />
                    <SongNamePreview>{song.name}</SongNamePreview>
                  </Centered>
                  <Button
                    type='button'
                    isLoading={isSubmitting}
                    onClick={() => confirmDeezerSong(props)}
                  >
                    {isSubmitting ? 'Confirming...' : 'Yes, continue'}
                  </Button>
                  <BackButton
                    type='button'
                    alternate
                    onClick={() => setSong({})}
                  >
                    No, go back
                  </BackButton>
                </>
              ) : (
                <>
                  <InputSection
                    {...props}
                    name='deezer'
                    label="What's the Deezer Song ID?"
                  />
                  <HelpContainer to='/find-deezer-link'>
                    <HelpIcon src='/assets/help-icon-blue.png' />
                    <HelpText>how do I find this?</HelpText>
                  </HelpContainer>
                  <Button
                    type='button'
                    isLoading={isSubmitting}
                    onClick={() => submitDeezerSong(props)}
                  >
                    {isSubmitting ? 'Searching...' : 'Continue'}
                  </Button>
                  <BackButton
                    type='button'
                    alternate
                    onClick={() => setModal(undefined)}
                  >
                    Close
                  </BackButton>
                </>
              )}
            </form>
          )}
        </Formik>
      </Modal>
    );
  };

  const CalendarModal = () => {
    const formattedDate = user.upcoming.releaseDate._seconds
      ? new Date(user.upcoming.releaseDate._seconds * 1000)
      : user.upcoming.releaseDate;
    const [releaseDate, setReleaseDate] = useState(formattedDate);
    const [isSubmitting, setSubmitting] = useState(false);

    const handleReleaseDate = async () => {
      setSubmitting(true);

      const response = await updatePresave({ releaseDate });

      setSubmitting(false);

      if (response.error) {
        return addToast('Error updating: ' + response.error.response, {
          appearance: 'error',
        });
      }

      setAuth((prevProps) => ({
        user: {
          ...prevProps.user,
          upcoming: {
            ...prevProps.user.upcoming,
            releaseDate,
          },
        },
      }));
      setModal(undefined);
      addToast('Sucessfully updated!', { appearance: 'success' });
    };

    return (
      <Modal
        isOpen={modal === 'calendar'}
        onClose={() => setModal(undefined)}
        title='Change release date'
      >
        <Calendar value={releaseDate} onChange={setReleaseDate} />
        <Button
          type='button'
          isLoading={isSubmitting}
          onClick={handleReleaseDate}
        >
          {isSubmitting ? 'Updating' : 'Update'}
        </Button>
        <BackButton type='button' alternate onClick={() => setModal(undefined)}>
          Close
        </BackButton>
      </Modal>
    );
  };

  const handlePhotoSubmit = async (e) => {
    const photo = e.target.files[0];
    setUploading(true);
    //console.log(photo);

    const response = await updatePresave({ img: photo });

    if (response.error) {
      addToast(response.error.message, { appearance: 'error' });
      return setUploading(false);
    }
    setAuth((prevProps) => ({
      user: {
        ...prevProps.user,
        upcoming: { ...prevProps.user.upcoming, img: response.img },
      },
    }));
    addToast('Album art saved.', { appearance: 'success' });
    return setUploading(false);

    // If success, show success alert
    // If error, show error alert
  };

  if (user && !user.upcoming) return history.push('/releases/new');

  return (
    <Container>
      <SpotifyModal />
      <DeezerModal />
      <CalendarModal />
      <BackPageHeader>Edit Presave</BackPageHeader>
      <AlbumArt src={user.upcoming.img} />
      <AlbumName>{user.upcoming.name}</AlbumName>
      <ButtonWrapper>
        <FileInput
          onChange={(e) => handlePhotoSubmit(e)}
          className='artist-file-input'
          type='file'
          name='img'
          id='img'
        />
        <Button
          as='label'
          htmlFor='img'
          className='artist-file-button'
          disabled={uploading}
          isLoading={uploading}
        >
          {uploading ? 'Uploading' : 'Change Album Art'}
        </Button>
      </ButtonWrapper>
      <Releasing>{parseDate(user.upcoming.releaseDate)}</Releasing>
      <ButtonWrapper>
        <Button onClick={() => setModal('calendar')}>
          Change Release Date
        </Button>
      </ButtonWrapper>
      {presave && (
        <>
          <Subheading>Song IDs</Subheading>
          {presave.ids && presave.ids.spotify ? (
            <ConfirmedSongId>
              {presave.ids.spotify}
              <ConfirmedLabel>Spotify</ConfirmedLabel>
              <ConfirmImg src='/assets/check-circle-sm.png' />
            </ConfirmedSongId>
          ) : (
            <SpotifyButton onClick={() => setModal('spotify')}>
              Spotify
              <SpotifyImg src='/assets/spotify-logo-white-sm.png' alt='' />
            </SpotifyButton>
          )}
          {presave.ids && presave.ids.deezer ? (
            <ConfirmedSongId>
              {presave.ids.deezer}
              <ConfirmedLabel>Deezer</ConfirmedLabel>
              <ConfirmImg src='/assets/check-circle-sm.png' />
            </ConfirmedSongId>
          ) : (
            <DeezerButton onClick={() => setModal('deezer')}>
              Deezer
              <DeezerImg src='/assets/deezer-logo-black-sm.png' alt='' />
            </DeezerButton>
          )}
        </>
      )}
    </Container>
  );
};

export default EditPresave;
