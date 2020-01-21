import React from 'react';
import styled from 'styled-components';
import { getMySongs, createNewSong } from '../../api';
import { useAlert } from 'react-alert';
import Modal from 'react-modal';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';

const BlastList = styled.div`
  margin: 0 auto;
  padding: 0 20px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  grid-column-gap: 40px;
  //grid-row-gap: 30px;
  max-width: 1000px;
  width: 100%;
`;

const Header = styled.h1`
  font-weight: 400;
  margin: 0;
  font-size: 30px;
  padding: 40px;
  display: flex;
  justify-content: space-between;
  @media (max-width: 920px) {
    padding-top: 0px;
  }
`;
const CreateSongButton = styled.button`
  background: #8872ff;
  width: 50px;
  height: 50px;
  border-radius: 25px;
  border: none;
  box-shadow: 4px 4px 6px 0 rgba(0, 0, 0, 0.16);
  margin-bottom: 2.5px;
  margin-left: 2.5px;
  > img {
    width: 20px;
    height: 20px;
  }
  &:hover {
    width: 55px;
    height: 55px;
    border-radius: 27.5px;
    margin-right: -2.5px;
    margin-top: -2.5px;
    margin-bottom: 0;
    margin-left: 0;
    box-shadow: 4px 4px 6px 0 rgba(0, 0, 0, 0.36);
    > img {
    width: 22.5px;
    height: 22.5px;
  }
  }
`
const ModalHeader = styled.h2`
  font-size: calc(24px + 2vw);
`
const ModalText = styled.p`
padding-top: 35px;
font-size: 20px;
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
  margin-top: 25px;
  width: 200px;
  height: 44px;
  color: white;
  font-weight: 300;
  font-size: 20px;
  background: ${props => props.disabled ? '#C7C7C7' : 'linear-gradient(90deg, #8872ff, #4568DC)'};
  border: none;
  box-shadow: 4px 4px 6px rgba(0, 0, 0, 0.16);
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
const CloseSvg = () => (
  <svg width="31px" height="30px" viewBox="0 0 31 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" >
    <g id="All-Blasts" stroke="none" strokeWidth={1} fill="none" fillRule="evenodd" strokeLinecap="square">
      <g id="Desktop,-Chrome-Copy" transform="translate(-934.000000, -177.000000)" stroke="#060606">
        <g id="Group" transform="translate(935.000000, 178.000000)">
          <path d="M0.227822093,1.5197107e-13 L29.1549177,26.7857143" id="Line" />
          <path d="M28.125,0 L0,28.125" id="Line" />
        </g>
      </g>
    </g>
  </svg >
);

const modalStyles = {
  overlay: {
    backgroundColor: 'rgba(51,51,51,0.7)',
    position: 'fixed',
    zIndex: '100',
    display: 'flex',
    top: '0',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '15px'
  },
  content: {
    display: 'block',
    position: 'relative',
    border: 'none',
    boxShadow: '0 3px 6px rgba(0,0,0,0.16)',
    textAlign: 'center',
    padding: '80px 15px 50px',
    borderRadius: '0px',
    maxWidth: '700px',
    top: '0',
    bottom: '0',
    left: '0',
    right: '0',
    width: '100%'
  }
}
const CloseDiv = styled.div`
  position: absolute;
  right: 30px;
  top: 30px;
  cursor: pointer;
`
const HelpLink = styled(Link)`
  font-size: 12px;
  color: #8872FF;
  text-decoration: underline;
  display: block;
  margin-top: 5px;
  &:hover {
    color: #8872FF;
  }
`

const validationSchema = Yup.object().shape({
  uri: Yup.string().trim().required('Please enter a valid URI')
});
const Pic = styled.div`
  width: 60px;
  height 60px;
  display: inline-block;
  border-radius: 8px;
  background: url('${props => props.src}') center center no-repeat;
  background-size: cover;
`
const SongName = styled.p`
  display: inline-block;
  font-size: 16px;
  margin-left: 10px;
  font-weight: 500;
  border-bottom: solid 3px ${props => props.released ? '#b4b4b4' : '#4568dc'};
`
const ReleasedOn = styled.p`
  padding-left: 10px;
  font-size: 13px;
  font-weight: 500;
  padding-right: 20px;
  padding-top: 3px;
`
const ReleaseCard = styled.div`
  position: relative;
  padding: 15px 0;
  border-bottom: 1px solid #979797;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin: 0 auto;
  width: 100%;
`
const Content = styled.div`
  display: inline-block;
`
const ReleaseIconContainer = styled.div`
  position: absolute;
  right: 10px;
  
`;
const ReleaseIcon = styled.img`
  display: block;
  width: 30px;
  height: 30px;
  margin: 0 auto;
`;
const Span = styled.span`
  font-weight: ${props => props.released ? '500' : '900'};
  font-size: ${props => props.released ? '12px' : '11px'};
`

const parseDate = (timestamp) => {
  if (!timestamp) return '';
  const date = new Date(timestamp);
  const parsed = date.toLocaleString('default', { month: 'short', day: 'numeric', year: 'numeric' }).split(' ');
  return parsed[0] + '. ' + parsed[1] + ' ' + parsed[2];
}
const timeUntilRelease = (releaseDate) => {
  const now = new Date();
  releaseDate.setHours(24, 0, 0, 0); // Set to next midnight
  const timeRemaining = Math.round((releaseDate.getTime() - now.getTime()) / 1000);

  const hours = Math.floor(timeRemaining / 3600);
  const minutes = Math.floor(timeRemaining / 60) - hours * 60;
  const seconds = timeRemaining - (hours * 60 + minutes) * 60;

  const parsedHours = hours < 10 ? '0' + hours.toString() : hours.toString()
  const parsedMinutes = minutes < 10 ? '0' + minutes.toString() : minutes.toString();
  const parsedSeconds = seconds < 10 ? '0' + seconds.toString() : seconds.toString();

  return parsedHours + ':' + parsedMinutes + ':' + parsedSeconds;
};

const Release = ({ song }) => {
  const now = new Date();
  const releaseDate = new Date(song.releaseDate);
  const [time, setTime] = React.useState('--:--:--');

  React.useEffect(() => {
    setTimeout(() => {
      setTime(timeUntilRelease(releaseDate));
    }, 1000);
  });

  const released = now > releaseDate;
  return (
    <ReleaseCard>
      <Pic src={song.img} />
      <Content>
        <SongName released={released}>{song.name}</SongName>
        <ReleasedOn>{(released ? 'Released ' : 'Releasing ') + parseDate(song.releaseDate)}</ReleasedOn>
      </Content>
      <ReleaseIconContainer>
        <ReleaseIcon released={released} src={released ? '/saves-green-icon.png' : '/clock-icon.png'} />
        <Span released={released}>{released ? song.saves + ' saves' : time}</Span>
      </ReleaseIconContainer>
    </ReleaseCard>)
};

const AllBlasts = () => {

  const [songs, setSongs] = React.useState([]);
  const [modalOpen, setModalOpen] = React.useState(false);
  const alert = useAlert();
  const fetchSongs = async () => {
    const songs = await getMySongs();
    if (songs.error) {
      return alert.show('Error fetching songs!');
    }
    setSongs(songs);
  }
  React.useEffect(() => {
    fetchSongs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderSongs = () => {
    return songs.map((song) => {
      return <Release key={song.spotifyUri} song={song} />
    });
  };
  Modal.setAppElement('#modal')

  const handleSubmit = async ({ uri }, { setSubmitting, setFieldError }) => {
    setSubmitting(true);
    const parsedUri = uri.includes('spotify:track') ? uri.trim().split(':')[2] : uri.trim();

    const response = await createNewSong(parsedUri);
    if (response.error && response.error.response.status === 401) {
      console.log(response.error.response);
      setFieldError('uri', 'This song does not belong to your Spotify artist account.')
      return setSubmitting(false);
    }
    if (response.error && response.error.response.status === 409) {
      console.log(response.error.response);
      setFieldError('uri', 'This song has already been created.')
      return setSubmitting(false);
    }
    if (response.error) {
      console.log(response.error.response);
      alert.show('Error creating song!');
      setSubmitting(false);
      return setModalOpen(false);
    }
    songs.unshift(response);
    setSongs(songs);
    setSubmitting(false);
    setModalOpen(false);
    return alert.show('Successfully created song!', { type: 'success' });
  };

  return (
    <>
      <Header>
        Releases
        <CreateSongButton onClick={() => setModalOpen(true)}>
          <img src='/add-icon.png' alt='Add' />
        </CreateSongButton>
      </Header>
      <BlastList>
        {renderSongs()}
      </BlastList>
      <Modal style={modalStyles} isOpen={modalOpen} onRequestClose={() => setModalOpen(false)} shouldCloseOnOverlayClick shouldCloseOnEsc>
        <ModalHeader>Create a new song</ModalHeader>
        <ModalText>Please enter the spotify URI of the song you want to import.</ModalText>
        <CloseDiv onClick={() => setModalOpen(false)}>
          <CloseSvg />
        </CloseDiv>
        <Formik onSubmit={handleSubmit} validationSchema={validationSchema} initialValues={{ uri: '' }}>
          {(props) => (
            <form onSubmit={props.handleSubmit}>
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
              <HelpLink to='#'>Where do I find this?</HelpLink>
              <Button type='submit' disabled={props.isSubmitting}>{props.isSubmitting ? 'Creating...' : 'Create'}</Button>
            </form>
          )}
        </Formik>
      </Modal>
    </>
  );
}


export default AllBlasts;
