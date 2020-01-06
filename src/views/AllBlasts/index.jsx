import React from 'react';
import styled from 'styled-components';
import BlastCard from '../../components/BlastCard';
import { getMySongs, createNewSong } from '../../api';
import { useAlert } from 'react-alert';
import Modal from 'react-modal';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';

const Container = styled.div`
  padding: 110px 25px 60px;
`;

const BlastList = styled.div`
  margin: 0 auto;
  max-width: 1100px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  grid-column-gap: 40px;
  grid-row-gap: 60px;
`;

const Header = styled.h1`
  font-weight: 400;
  margin: 0;
  padding-left: 14vw;
  padding-bottom: 40px;
`;
const CreateSongButton = styled.div`
  height: 200px;
  width: 100%;
  background: #F7F7F7;
  text-align: center;
  color: black;
  transition: all 0.2s ease;
  cursor: pointer;
  border: 2px solid #F7F7F7;
  &:hover {
    border: 2px solid #8872FF;
    color: #8872FF;
    #Path {
      fill: #8872FF;
      transition: all 0.2s ease;
    }
  }
`
const CreateButtonText = styled.p`
  font-size: 24px;
  padding-top: 50px;
  padding-bottom: 10px;
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

const AddSvg = () => (
  <svg width="50px" height="50px" viewBox="0 0 50 50" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" >
    <g id="All-Blasts" stroke="none" strokeWidth={1} fillRule="evenodd">
      <g id="Desktop,-Chrome" transform="translate(-615.000000, -515.000000)" fillRule="nonzero">
        <g id="add" transform="translate(615.000000, 515.000000)">
          <polygon id="Path" fill="#000000" points="50 23.8095238 26.1904762 23.8095238 26.1904762 0 23.8095238 0 23.8095238 23.8095238 0 23.8095238 0 26.1904762 23.8095238 26.1904762 23.8095238 50 26.1904762 50 26.1904762 26.1904762 50 26.1904762" />
        </g>
      </g>
    </g>
  </svg>
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

const AllBlasts = () => {

  const [songs, setSongs] = React.useState([]);
  const [modalOpen, setModalOpen] = React.useState(false);
  const alert = useAlert();
  const fetchSongs = async () => {
    const songs = await getMySongs();
    if (songs.error) {
      alert.show('Error fetching songs!');
    }
    setSongs(songs);
  }
  React.useEffect(() => {
    fetchSongs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderSongs = () => {
    return songs.map((song) => {
      return <BlastCard
        key={song.spotifyUri}
        title={song.name}
        img={song.img}
        saves={song.saves}
        createdAt={song.createdAt}
      />
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
    songs.push(response);
    setSongs(songs);
    setSubmitting(false);
    setModalOpen(false);
    return alert.show('Successfully created song!', { type: 'success' });
  };

  return (
    <>
      <Container>
        <Header>All Songs</Header>
        <BlastList>
          {renderSongs()}
          <CreateSongButton onClick={() => setModalOpen(true)}>
            <CreateButtonText>
              Create New Song
          </CreateButtonText>
            <AddSvg />
          </CreateSongButton>
        </BlastList>
      </Container>
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
