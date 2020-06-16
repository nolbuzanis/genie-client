import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../../components/Button';
import Header from '../../components/PageHeader';
import { Formik } from 'formik';
import * as Yup from 'yup';
import InputSection from '../../components/InputSection';
import { useHistory, Link } from 'react-router-dom';
import { useAuth } from '../../Context/authContext';
import InternalInput from '../../components/InternalInput';
import { createNewSong } from '../../api';
//import Calendar from 'react-calendar';
import Calendar from '../../components/Calendar';

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

const NewRelease = () => {
  const [step, setStep] = useState(1);
  const [file, setFile] = useState();
  const [releaseDate, setReleaseDate] = useState(new Date());
  const history = useHistory();
  const { user, setAuth } = useAuth();

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

export default NewRelease;
