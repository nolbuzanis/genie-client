import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import Button from '../../components/Button';
import Header from '../../components/PageHeader';
import { Formik } from 'formik';
import * as Yup from 'yup';
import InputSection from '../../components/InputSection';
import { useHistory, Link } from 'react-router-dom';
import { useAuth } from '../../Context/authContext';
import InternalInput from '../../components/InternalInput';
import { createNewSong, fetchItunesSong, findSongLinks } from '../../api';
//import Calendar from 'react-calendar';
import Calendar from '../../components/Calendar';
import debounce from 'debounce';
import ClipLoader from 'react-spinners/ClipLoader';
import { css } from '@emotion/core';
import SongCard from '../../components/SongCard';
import PlatformIcons from '../../components/PlatformIcons';
import { useToasts } from 'react-toast-notifications';

const override = css`
  display: inline-block;
  margin-left: 15px;
  position: absolute;
  right: 15px;
  top: 19px;
`;
const midLoaderCss = css`
  display: block;
  height: 50px;
  margin: 0 auto;
`;

const urlRegex = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/;
const links = [
  'spotify',
  'apple',
  'deezer',
  'soundcloud',
  'tidal',
  'amazon',
  'google',
  'pandora',
  'youtube',
];
const validationSchema = Yup.object().shape({
  name: Yup.string().trim().required('Please enter a valid name.'),
  img: Yup.string().trim().required('Album art is required.'),
  spotify: Yup.string().trim().matches(urlRegex, 'Must be a valid URL.'),
  apple: Yup.string().trim().matches(urlRegex, 'Must be a valid URL.'),
  deezer: Yup.string().trim().matches(urlRegex, 'Must be a valid URL.'),
  soundcloud: Yup.string().trim().matches(urlRegex, 'Must be a valid URL.'),
  tidal: Yup.string().trim().matches(urlRegex, 'Must be a valid URL.'),
  amazon: Yup.string().trim().matches(urlRegex, 'Must be a valid URL.'),
  google: Yup.string().trim().matches(urlRegex, 'Must be a valid URL.'),
  pandora: Yup.string().trim().matches(urlRegex, 'Must be a valid URL.'),
  youtube: Yup.string().trim().matches(urlRegex, 'Must be a valid URL.'),
});

const initialValues = {
  name: '',
  img: '',
};
links.forEach((link) => {
  initialValues[link] = '';
});
const LargeSpacing = styled.div`
  height: 50px;
`;
const Spacing = styled.div`
  height: 30px;
`;
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

const StyledLink = styled(Link)`
  color: #656ded;
  &:hover,
  &:active {
    color: #656ded;
  }
`;
const AlbumCover = styled.img`
  display: inline-block;
  width: 60px;
  margin-right: 15px;
  height: 60px;
  background-color: grey;
`;
const SongName = styled.p`
  color: #444444;
  font-size: 15px;
  font-weight: 500;
`;
const ArtistName = styled(SongName)`
  font-size: 14px;
`;
const ReleaseDate = styled.p`
  color: #444444;
  font-size: 12px;
`;
const SongContent = styled.div`
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  box-sizing: border-box;
  margin-top: 6px;
  margin-bottom: 10px;
  border-radius: 5px;
  border: solid 1px ${(props) => (props.error ? '#BD3200' : '#dddddd')};
  background-color: #efefef;
  width: 100%;
  font-size: 16px;
  padding: 0 50px 0 15px;
  line-height: 45px;
  height: 45px;
  &:focus {
    border: solid 2px #656ded;
  }
  &:placeholder {
    color: #818181;
    font-size: 14px;
  }
`;
const Label = styled.label`
  display: block;
  font-size: 16px;
  font-weight: 600;
  color: #656ded;
  padding-top: 20px;
`;
const FlexCenter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px auto;
`;
const NotFound = styled.p`
  margin: 20px auto;
  color: #444444;
  font-size: 15px;
`;
const NotFoundLink = styled.span`
  font-weight: 600;
  color: #656ded;
  cursor: pointer;
  &:hover {
    color: #656ded;
  }
`;
const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const SearchContainer = styled.div`
  flex-grow: 1;
`;
const PlatformHeader = styled.h2`
  padding-top: 40px;
  font-size: 16px;
  font-weight: 500;
  color: #444444;
  text-align: center;
`;

const StepZero = ({ setStep, step, user, setAuth }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [song, setSong] = useState();
  const history = useHistory();
  const [isLoading, setLoading] = useState(false);
  const { addToast } = useToasts();

  const handleSearch = async (q) => {
    const res = await fetchItunesSong(q);
    if (res.error) {
      return;
    }
    const { results } = res;
    setResults(results.filter((item) => item.kind === 'song'));
    setIsSearching(false);
  };

  const delayedQuery = useCallback(
    debounce((q) => handleSearch(q), 300),
    []
  );

  const handleInputChange = (e) => {
    setIsSearching(true);
    const newValue = e.target.value;
    setSearchTerm(newValue);
    delayedQuery(newValue);
  };

  const handleConfirmSong = async () => {
    setLoading(true);


    const response = await createNewSong({ name: song.name, img: song.img, releaseDate: song.releaseDate, ...song.links });

    setLoading(false);
    if (response.error) {
      addToast('Error creating song!', { appearance: 'error' });
      return setSong(undefined);
    }

    setAuth({ user: { ...user, latest: response } });
    return history.push('/profile');

  };

  const handelSelectSong = async (item) => {
    console.log(item);
    const { artistName, artworkUrl100, trackName, trackTimeMillis, releaseDate, trackViewUrl } = item;
    setLoading(true);
    const response = await findSongLinks({ artist: artistName, song: trackName, duration: trackTimeMillis });

    setLoading(false);
    if (response.error) {
      addToast('Error finding links!', { appearance: 'error' });
      return;
    }

    const largerArtwork = artworkUrl100.replace('100x100', '512x512');

    setSong({
      name: trackName,
      releaseDate,
      img: largerArtwork,
      links: { apple: trackViewUrl, ...response }
    });
  }

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

  return (song ? <>
    <Spacing />
    <SongCard song={song} />
    <PlatformHeader>{Object.keys(song.links).length} Links found!</PlatformHeader>
    <PlatformIcons links={song.links} />
    <Button
      type='button'
      disabled={isLoading}
      isLoading={isLoading}
      onClick={handleConfirmSong}
    >
      {isLoading ? 'Creating...' : 'Create'}
    </Button>
    <BackButton alternate type='button' onClick={() => setSong(undefined)}>
      Back
      </BackButton>
  </>
    : isLoading ? <div style={{ height: '50px', paddingTop: '200px' }}><ClipLoader
      css={midLoaderCss}
      size={50}
      color='#656ded'
      loading={true}
    /> </div> : <FlexContainer>
        <SearchContainer>
          <Label>Search</Label>
          <div style={{ position: 'relative' }}>
            <Input
              value={searchTerm}
              onChange={handleInputChange}
              placeholder='Ex. passionfruit drake'
            ></Input>
            {isSearching && (
              <ClipLoader
                css={override}
                size={20}
                color='#656ded'
                loading={true}
              />
            )}
          </div>
          {results.length > 0
            ? results.map((item) => (
              <FlexCenter key={item.trackId}>
                <SongContent>
                  <AlbumCover src={item.artworkUrl100} />
                  <div>
                    {console.log(item)}
                    <SongName>{item.trackName}</SongName>
                    <ArtistName>{item.artistName}</ArtistName>
                    <ReleaseDate>{parseDate(item.releaseDate)}</ReleaseDate>
                  </div>
                </SongContent>
                <Button
                  small
                  style={{ width: '80px' }}
                  type='button'
                  onClick={() => handelSelectSong(item)}>
                  Select
                </Button>
              </FlexCenter>
            ))
            : searchTerm && !isSearching && <div>No results found.</div>}
        </SearchContainer>
        <NotFound>
          Not finding your song?{' '}
          <NotFoundLink onClick={() => setStep(step + 1)}>
            Add yourself
        </NotFoundLink>
        </NotFound>
      </FlexContainer>
  );
};

const NewRelease = () => {
  const [step, setStep] = useState(0);
  const [file, setFile] = useState();
  const [releaseDate, setReleaseDate] = useState(new Date());
  const history = useHistory();
  const { user, setAuth } = useAuth();
  const { addToast } = useToasts();

  const handleFormSubmit = async (formValues, { setSubmitting }) => {
    setSubmitting(true);

    let hasLinks = false;
    links.forEach((type) => {
      if (formValues[type].length !== 0) {
        hasLinks = true;
      }
    });

    if (step === 2 && !hasLinks) {
      //submit links step requires manual check
      return;
    }

    if (step !== 3) {
      return setStep(step + 1);
    }

    const response = await createNewSong({
      ...formValues,
      img: file,
      releaseDate,
    });
    setSubmitting(false);
    if (response.error) {
      addToast('Error creating song!', { appearance: 'error' });
      console.log(response.error);
      return;
    }

    console.log(response);
    setAuth({ user: { ...user, latest: response } });
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

  const StepOne = (props) => {
    return (
      <>
        <SubHeading>Add song details</SubHeading>
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
      <SubHeading>Add song links</SubHeading>
      <Info>
        Enter the links of the song for each music platform your song is
        available on.
      </Info>
      <InternalInput
        {...props}
        name='spotify'
        label='Spotify'
        placeholder='https://open.spotify.com/track/4H78HR8fBjJRWRueFVKo79'
      />
      <InternalInput
        {...props}
        name='apple'
        label='Apple Music'
        placeholder='Optional'
      />
      <InternalInput
        {...props}
        name='deezer'
        label='Deezer'
        placeholder='Optional'
      />
      <InternalInput
        {...props}
        name='soundcloud'
        label='Soundcloud'
        placeholder='Optional'
      />
      <InternalInput
        {...props}
        name='tidal'
        label='Tidal'
        placeholder='Optional'
      />
      <InternalInput
        {...props}
        name='amazon'
        label='Amazon Music'
        placeholder='Optional'
      />
      <InternalInput
        {...props}
        name='google'
        label='Google Play'
        placeholder='Optional'
      />
      <InternalInput
        {...props}
        name='pandora'
        label='Pandora'
        placeholder='Optional'
      />
      <InternalInput
        {...props}
        name='youtube'
        label='Youtube'
        placeholder='Optional'
      />
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
        When was this song released? If it hasn't been released yet, you should{' '}
        <StyledLink to='/presave/new'>Create a Presave</StyledLink> instead.
      </Info>
      <Calendar
        onChange={setReleaseDate}
        value={releaseDate}
        minDate={new Date('1970-01-01Z00:00:00:000')}
        maxDate={new Date()}
      />
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
      case 0:
        return <StepZero setStep={setStep} step={step} user={user} setAuth={setAuth} />;
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
      <Header color='#444444'>Add Release</Header>
      {step > 0 && (
        <Steps>
          Step <strong>{step}</strong> of 3
        </Steps>
      )}
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

export default NewRelease;
