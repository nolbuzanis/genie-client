import React from 'react';
import styled from 'styled-components';
import { Formik } from 'formik';
import { withRouter } from 'react-router-dom';
import { createNewSong } from '../../api';
import Calendar from 'react-calendar';
import { useToasts } from 'react-toast-notifications';
//import { useAuth } from '../../Context/authContext';

const SubHeading = styled.p`
  text-transform: uppercase;
  font-weight: 500;
  font-size: 16px;
  color: #8872ff;
`
const BodyContainer = styled.div`
  margin: 0 auto;
  max-width: 400px;
  padding: 40px 20px;
  @media (min-width: 920px) {
    padding-top: 40px;
  }
`
const Heading = styled.h1`
  font-size: 30px;
  font-weight: 500;
`
const Description = styled.p`
  padding-top: 10px;
  font-size: 18px;
`
const Input = styled.input`
  display: block;
  width: 100%;
  border: 1px solid ${props => (props.error ? '#bd3200' : '#979797')};
  max-width: 420px;
  height: 36px;
  padding: 5px 10px;
  font-size: 16px;
  margin: 20px auto 0;
  box-sizing: border-box;
`
const Button = styled.button`
  display: block;
  margin-top: 25px;
  width: 100%;
  height: 44px;
  color: ${props => props.alt ? '#4568dc' : 'white'};;
  font-weight: 300;
  border-radius: 22px;
  font-size: 20px;
  background: ${props => {
    if (props.alt) return 'white';
    return props.disabled ? '#C7C7C7' : 'linear-gradient(90deg, #8872ff, #4568DC)'
  }};
  border: ${props => props.alt ? '#4568dc 1px solid' : 'none'};
  box-shadow: ${props => !props.alt && '4px 4px 6px rgba(0, 0, 0, 0.16)'};
`;
const ErrorMsg = styled.label`
  display: block;
  font-size: 12px;
  color: #bd3200;
  text-align: left;
  padding-top: 5px;
  max-width: 420px;
  margin: 0 auto;
`;
const HelpLink = styled.a`
  font-size: 12px;
  color: #8872FF;
  text-decoration: underline;
  display: block;
  margin-top: 5px;
  &:hover {
    color: #8872FF;
  }
`
const Spacing = styled.div`
height: 20px;
`
const SmallDescription = styled(Description)`
  font-size: 16px;
  font-weight: 300;
`
const StyledCalendar = styled(Calendar)`
  box-shadow: 4px 4px 6px rgba(0,0,0,0.16);
  border: none !important;
  margin-top: 15px;
  .react-calendar__navigation {
    border-radius: 15px 15px 0 0;
    background: #4568dc !important;
    height: 40px;
    width: 100%;
    margin: 0;
  }
  button.react-calendar__navigation__label, .react-calendar__navigation__arrow{
    color: white;
    font-size: 15px;
    font-weight: 500;
  }
  .react-calendar__navigation button[disabled] {
    background: transparent;
    opacity: 0;
  }
  .react-calendar__navigation button:enabled:hover {
    background: transparent;
  }
  .react-calendar__month-view__days {
    background-color: #f8f8f8;
  }
  .react-calendar__month-view__weekdays__weekday {
    background-color: #ebebeb;
    padding-top: 10px;
    height: 38px;
    > abbr {
      text-decoration: none;
      font-size: 15px;
      font-weight: 400;
    }
  }
  .react-calendar__tile {
    color: black;
    font-size: 15px;
  }
  .react-calendar__tile:disabled {
    color: #aaaaaa;
    background: transparent;
  }
  .react-calendar__tile--active {
    color: white;
    border-radius: 5px;
  }
`
const Toggle = styled.button`
  display: block;
  font-size: 18px;
  border: none;
  background: none;
  margin: 0 auto;
  color: #8872ff;
`

const NewRelease = ({ history }) => {
  const STATES = {
    calendar: 'calendar',
    songName: 'song_name'
  };
  //const { user, setAuth } = useAuth();
  const { addToast } = useToasts();
  const [state, setState] = React.useState(undefined);
  const [releaseDate, setReleaseDate] = React.useState(new Date());
  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  const handleSubmit = async ({ uri, name }, { setSubmitting, setFieldError }) => {
    setSubmitting(true);
    const parsedUri = uri.includes('spotify:track') ? uri.trim().split(':')[2] : uri.trim();
    if (!parsedUri || parsedUri.length === 0) {
      // If uri field empty, check for song name
      if (!name || name.length === 0) {
        // Both are empty, return field error
        setFieldError('uri', 'Song URI or song name is required.');
        return setState(undefined);
      }
    }

    const response = await createNewSong(parsedUri, name, releaseDate);
    if (response.error && response.error.response.status === 401) {
      console.log(response.error.response);
      setFieldError('uri', 'This song does not belong to your Spotify artist account.')
      setSubmitting(false);
      return setState(undefined);
    }
    if (response.error && response.error.response.status === 409) {
      console.log(response.error.response);
      setFieldError('uri', 'This song has already been created.')
      setSubmitting(false);
      return setState(undefined);
    }
    if (response.error) {
      console.log(response.error.response);
      addToast(response.error.message, { appearance: 'error' });
      setSubmitting(false);
      return setState(undefined);
    }
    //setSubmitting(false);
    addToast('Release created!', { appearance: 'success' });
    //setAuth({ user: { ...user, releases: user.releases++ } });
    return history.push('/releases');
  };

  return (
    <BodyContainer>
      <Formik onSubmit={handleSubmit} initialValues={{ uri: '', name: '' }}>
        {(props) => (
          <form onSubmit={props.handleSubmit}>
            {state === STATES.calendar ?
              <>
                <SubHeading>New Release +</SubHeading>
                <Heading>Enter Release Date</Heading>
                <Description>The date you want the song to be pre-saved on.</Description>
                <SmallDescription>(Usually the date this song will be release on Spotify)</SmallDescription>
                <StyledCalendar
                  onChange={setReleaseDate}
                  value={releaseDate}
                  minDate={new Date()}
                  maxDate={new Date(new Date().setFullYear(new Date().getFullYear() + 1))}
                  formatShortWeekday={(locate, date) => days[date.getDay()]}
                />
                <Spacing />
                <Button type='submit' disabled={props.isSubmitting}>{props.isSubmitting ? 'Creating...' : 'Create'}</Button>
              </>
              : state === STATES.songName ?
                <>
                  <SubHeading>New Release +</SubHeading>
                  <Heading>Enter Song Name</Heading>
                  <Description>Enter your song name for now.</Description>
                  <Description>We’ll send you an email or text on release day and you can add it before it’s pre-saved.</Description>
                  <Input
                    name='name'
                    value={props.values['name']}
                    type='text'
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    error={props.errors['name'] && props.touched['name']}
                    placeholder='Song Name'
                  />
                  {props.errors['name'] && props.touched['name'] && (
                    <ErrorMsg>{props.errors['name']}</ErrorMsg>
                  )}
                  <Spacing />
                  <Toggle type='button' onClick={() => setState(undefined)}> Want to enter your URI instead?</Toggle>
                  <Button type='button' onClick={() => setState(STATES.calendar)}>Next</Button>
                </>
                :
                <>
                  <SubHeading>New Release +</SubHeading>
                  <Heading>Enter Spotify URI</Heading>
                  <Description>Please enter the spotify URI of the song you want to import.</Description>
                  <Input
                    name='uri'
                    value={props.values['uri']}
                    type='text'
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    error={props.errors['uri'] && props.touched['uri']}
                    placeholder='spotify:track:6QtGlUje…'
                  />
                  {props.errors['uri'] && props.touched['uri'] && (
                    <ErrorMsg>{props.errors['uri']}</ErrorMsg>
                  )}
                  <HelpLink href='https://community.spotify.com/t5/Spotify-Answers/What-s-a-Spotify-URI/ta-p/919201' target='_blank'>Where do I find this?</HelpLink>
                  <Spacing />
                  {/* <Toggle type='button' onClick={() => setState(STATES.songName)}>Don’t have your URI yet?</Toggle> */}
                  <Button type='button' onClick={() => setState(STATES.calendar)}>Next</Button>
                </>
            }
          </form>
        )}</Formik>
      <Button alt onClick={() => state === STATES.calendar ? setState(undefined) : history.goBack()}>{state === STATES.calendar ? 'Back' : 'Cancel'}</Button>
    </BodyContainer>


  )
};

export default withRouter(NewRelease);