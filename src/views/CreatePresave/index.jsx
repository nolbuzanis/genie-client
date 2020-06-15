import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../../components/Button';
import Header from '../../components/PageHeader';
import { Formik } from 'formik';
import * as Yup from 'yup';
import InputSection from '../../components/InputSection';
import { useHistory, Link } from 'react-router-dom';
import Modal from '../../components/Modal';
import { useAuth } from '../../Context/authContext';
import {
  getSpotifySongDetails,
  getDeezerSongDetails,
  createPresave,
} from '../../api';
//import Calendar from 'react-calendar';
import Calendar from '../../components/Calendar';

const validationSchema = Yup.object().shape({
  name: Yup.string().trim().required('Please enter a valid name.'),
  img: Yup.string().trim().required('Album art is required.'),
});

const initialValues = {
  name: '',
  img: '',
  spotify: '',
  deezer: '',
};
const BodyContainer = styled.div`
  padding: 0 30px 40px;
  margin: 0 auto;
  max-width: 500px;
`;
const Steps = styled.div`
  color: #757575;
  padding: 7px 0;
  font-size: 14px;
  text-align: center;
`;
const SubHeading = styled.h2`
  color: #656ded;
  font-size: 22px;
  padding-top: 5px;
  font-weight: 500;
  text-align: center;
`;
const FileInput = styled.input`
  visibility: hidden;
  display: none;
`;
const ImagePreview = styled.div`
  width: 120px;
  margin-top: 10px;
  height: 120px;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
  background: ${(props) =>
    props.img && `url(${props.img}) center center no-repeat`};
`;
const Question = styled.p`
  color: #656ded;
  padding-top: 25px;
  font-size: 16px;
  font-weight: 600;
`;
const PhotoButtonWrapper = styled.div`
  width: 120px;
  padding-top: 15px;
  padding-bottom: 25px;
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
const ErrorLabel = styled.p`
  display: block;
  color: #9b2335;
  font-size: 12px;
  padding-top: 6px;
`;
const Info = styled.p`
  font-size: 16px;
  color: #757575;
  line-height: 1.44;
  padding-top: 15px;
  padding-bottom: 20px;
  text-align: center;
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
const LargeSpacing = styled.div`
  height: 50px;
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

const CreatePresave = () => {
  const [step, setStep] = useState(1);
  const [modal, setModal] = useState();
  const [file, setFile] = useState();
  const [releaseDate, setReleaseDate] = React.useState(new Date());
  const history = useHistory();
  const { user, setAuth } = useAuth();

  const handleFormSubmit = async (formValues, { setSubmitting }) => {
    setSubmitting(true);
    const { spotify, deezer, name } = formValues;

    if (step === 2 && !spotify.id && !deezer.id) {
      //submit ids step requires manual check
      return;
    }

    if (step !== 3) {
      return setStep(step + 1);
    }

    const response = await createPresave(
      { name, spotify: spotify.id, deezer: deezer.id, releaseDate },
      file
    );
    setSubmitting(false);
    if (response.error) {
      //set error notification
      console.log(response.error);
      return;
    }

    console.log(response);
    setAuth({ user: { ...user, upcoming: response } });
    return history.push('/profile');
    //pass back updated artist and save to context, route to link
  };

  const handlePhotoChange = (e, { setFieldValue, setFieldError }) => {
    const photo = e.target.files[0];
    if (!photo.type.includes('image')) {
      return setFieldError('img', 'File must be of type image.');
    }
    var reader = new FileReader();

    reader.onload = (e) => {
      setFieldValue('img', e.target.result);
      setFile(photo);
    };

    reader.readAsDataURL(photo);
  };

  const SpotifyModal = ({ props }) => {
    const [song, setSong] = useState({});
    const [isSubmitting, setSubmitting] = useState(false);

    const confirmSpotifySong = async () => {
      setSubmitting(true);

      props.setFieldValue('spotify', song);

      setModal(undefined);
      setSubmitting(false);
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
        {song.name ? (
          <>
            <Centered>
              <ImagePreview img={song.img} />
              <SongNamePreview>{song.name}</SongNamePreview>
            </Centered>
            <Button
              type='button'
              isLoading={isSubmitting}
              onClick={() => confirmSpotifySong()}
            >
              {isSubmitting ? 'Confirming...' : 'Yes, continue'}
            </Button>
            <BackButton
              type='button'
              alternate
              onClick={() => setModal(undefined)}
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
      </Modal>
    );
  };

  const DeezerModal = ({ props }) => {
    const [song, setSong] = useState({});
    const [isSubmitting, setSubmitting] = useState(false);

    const confirmDeezerSong = async () => {
      setSubmitting(true);

      props.setFieldValue('deezer', song);

      setModal(undefined);
      setSubmitting(false);
    };

    //console.log(props.errors);
    const submitDeezerSong = async ({ values }) => {
      setSubmitting(true);
      const { deezer } = values;

      const parsed = deezer.trim().split('?')[0].split('/');
      const id = parsed[parsed.length - 1];

      if (!id || id.length === 0) {
        console.log('submitting');
        setSubmitting(false);
        return props.setFieldError(
          'deezer',
          'Please enter a valid Deezer track Id.'
        );
      }
      const response = await getDeezerSongDetails(id);
      setSubmitting(false);
      if (response.error && response.error.response.status === 409) {
        return props.setFieldError('deezer', 'Deezer song id already in use.');
      }
      if (response.error) {
        return props.setFieldError('deezer', 'Deezer song id not recognized.');
      }

      setSong(response);
    };

    return (
      <Modal
        isOpen={modal === 'deezer'}
        onClose={() => setModal(undefined)}
        title={song.name ? 'Confirm the song' : 'Add Deezer ID'}
      >
        {song.name ? (
          <>
            <Centered>
              <ImagePreview img={song.img} />
              <SongNamePreview>{song.name}</SongNamePreview>
            </Centered>
            <Button
              type='button'
              isLoading={isSubmitting}
              onClick={() => confirmDeezerSong()}
            >
              {isSubmitting ? 'Confirming...' : 'Yes, continue'}
            </Button>
            <BackButton
              type='button'
              alternate
              onClick={() => setModal(undefined)}
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
      </Modal>
    );
  };

  const StepOne = (props) => {
    return (
      <>
        <SubHeading>Add song Details</SubHeading>
        <InputSection
          {...props}
          name='name'
          label="What's the name of the song?"
        />
        <Question>Add the album art</Question>
        {props.values['img'] && <ImagePreview img={props.values['img']} />}
        <FileInput
          onChange={(e) => handlePhotoChange(e, props)}
          className='artist-file-input'
          type='file'
          name='img'
          id='img'
        />
        <ErrorLabel>{props.errors['img']}</ErrorLabel>
        <PhotoButtonWrapper>
          <Button as='label' htmlFor='img' className='artist-file-button' small>
            {props.values['img'] ? 'Change' : 'Upload'}
          </Button>
        </PhotoButtonWrapper>
        <Button type='submit'>Continue</Button>
        <BackButton alternate type='button' onClick={() => history.goBack()}>
          Cancel
        </BackButton>
      </>
    );
  };

  const StepTwo = (props) => (
    <>
      <SpotifyModal props={props} />
      <DeezerModal props={props} />
      <SubHeading>Add song IDs</SubHeading>
      <Info>
        Please enter the <strong>IDs or links</strong> of the song for each
        music platform you would like to pre-save on.
      </Info>
      {props.values['spotify'].id ? (
        <ConfirmedSongId>
          {props.values['spotify'].id}
          <ConfirmedLabel>Spotify</ConfirmedLabel>
          <ConfirmImg src='/assets/check-circle-sm.png' />
        </ConfirmedSongId>
      ) : (
        <SpotifyButton onClick={() => setModal('spotify')}>
          Spotify
          <SpotifyImg src='/assets/spotify-logo-white-sm.png' alt='' />
        </SpotifyButton>
      )}
      {props.values['deezer'].id ? (
        <ConfirmedSongId>
          {props.values['deezer'].id}
          <ConfirmedLabel>Deezer</ConfirmedLabel>
          <ConfirmImg src='/assets/check-circle-sm.png' />
        </ConfirmedSongId>
      ) : (
        <DeezerButton onClick={() => setModal('deezer')}>
          Deezer
          <DeezerImg src='/assets/deezer-logo-black-sm.png' alt='' />
        </DeezerButton>
      )}
      <LargeSpacing />
      <Button type='submit'>Continue</Button>
      <BackButton type='button' alternate onClick={() => setStep(step - 1)}>
        Back
      </BackButton>
    </>
  );

  const StepThree = (props) => (
    <>
      <SubHeading>Select release date</SubHeading>
      <Info>
        Choose the date you want this song to be saved to your fans’ music
        libraries.
      </Info>
      <Calendar onChange={setReleaseDate} value={releaseDate} />
      <Button
        type='submit'
        disabled={props.isSubmitting}
        isLoading={props.isSubmitting}
      >
        {props.isSubmitting ? 'Creating...' : 'Create'}
      </Button>
      <BackButton alternate type='button' onClick={() => setStep(step - 1)}>
        Back
      </BackButton>
    </>
  );

  const renderStep = (props) => {
    switch (step) {
      case 1:
        return <StepOne {...props} />;
      case 2:
        return <StepTwo {...props} />;
      case 3:
        return <StepThree {...props} />;
      default:
        return <StepOne {...props} />;
    }
  };

  return (
    <BodyContainer>
      <Header color='#444444'>Create Presave</Header>
      <Steps>
        Step <strong>{step}</strong> of 3
      </Steps>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleFormSubmit}
      >
        {(props) => {
          return <form onSubmit={props.handleSubmit}>{renderStep(props)}</form>;
        }}
      </Formik>
    </BodyContainer>
  );
};

export default CreatePresave;
