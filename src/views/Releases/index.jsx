import React from 'react';
import styled from 'styled-components';
import { getMySongs } from '../../api';
import { useAlert } from 'react-alert';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import { Formik } from 'formik';
import Button from '../../components/Button';
import * as Yup from 'yup';

const BlastList = styled.div`
  margin: 0 auto;
  padding: 0 30px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-column-gap: 40px;
  //grid-row-gap: 30px;
  max-width: 500px;
  width: 100%;
  @media (max-width: 360px) {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  }
`;

const Header = styled.h1`
  margin: 0;
  text-align: center;
  font-size: 24px;
  padding: 40px 40px 25px;
  font-weight: 600;
  color: #4568dc;
  //align-items: center;
  //display: flex;
  //justify-content: space-between;
  @media (max-width: 920px) {
    padding-top: 0px;
  }
`;
// const CreateSongButton = styled(Link)`
//   position: relative;
//   background: #8872ff;
//   width: 50px;
//   height: 50px;
//   border-radius: 25px;
//   border: none;
//   box-shadow: 4px 4px 6px 0 rgba(0, 0, 0, 0.16);
//   margin-bottom: 2.5px;
//   margin-left: 2.5px;
//   > img {
//     position: absolute;
//     width: 20px;
//     height: 20px;
//     top: 15px;
//     left: 15px;
//   }
//   &:hover {
//     width: 55px;
//     height: 55px;
//     border-radius: 27.5px;
//     margin-right: -2.5px;
//     margin-top: -2.5px;
//     margin-bottom: 0;
//     margin-left: 0;
//     box-shadow: 4px 4px 6px 0 rgba(0, 0, 0, 0.36);
//     > img {
//     width: 22.5px;
//     height: 22.5px;
//     top: 16px;
//     left: 16px;
//   }
//   }
// `
const Pic = styled.div`
  width: 60px;
  height 60px;
  display: inline-block;
  border-radius: 50%;
  background: url('${props => props.src}') center center no-repeat;
  background-size: cover;
  box-shadow: 0px 3px 6px rgba(0,0,0,0.16);
  @media (max-width: 360px) {
    width: 45px;
    height 45px;
  }
  
`
const SongName = styled.p`
  //font-weight: 500;
  font-size: calc(14px + 0.4vw);
  color: #000000;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
  overflow: hidden;
  //border-bottom: solid 3px ${props => props.released ? '#b4b4b4' : '#4568dc'};
`
const ReleasedOn = styled.p`
  font-size: 13px;
  font-weight: 300;
  //padding-top: 3px;
`
const ReleaseCard = styled.div`
  position: relative;
  padding: 10px 0;
  //border-bottom: 1px solid #979797;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin: 0 auto;
  width: 100%;
`
const Content = styled.div`
  display: inline-block;
  padding-left: 10px;
  width: 60%;
  overflow-x: hidden;

`
const ReleaseIconContainer = styled.div`
  cursor: ${props => props.edit && 'pointer'};
  position: absolute;
  right: 10px;
  width: 60px;
  text-align: center;
`;
const ReleaseIcon = styled.img`
  display: block;
  width: 30px;
  height: 30px;
  margin: 0 auto;
`;
const Span = styled.span`
  font-weight: 500;
  font-size: 11px;
  letter-spacing: -0.31px;
`
const AddURI = styled.button`
  background: linear-gradient(90deg, #8872ff, #4568DC);
  width: 60px;
  height: 44px;
  border-radius: 22px;
  border: none;
  font-size: 14px;
  font-weight: 500;
  color: white;
  box-shadow: 4px 4px 6px rgba(0,0,0,0.16);
  margin: 0 auto;
`
const modalStyles = {
  overlay: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: '100',
    background: 'rgba(0, 0, 0, 0.5)'
  },
  content: {
    position: 'static',
    display: 'flex',
    justifyContent: 'center',
    padding: 'none',
    border: 'none',
    background: 'none',
  }
};
const ModalContainer = styled.div`
  background: white;
  border-radius: 20px;
  max-width: 300px;
  padding: 20px;
  box-shadow: 4px 4px 6px rgba(0,0,0,0.16);
`
const ModalHeader = styled.h3`
  font-size: 20px;
  padding-top: 10px;
  font-weight: 500;
  text-align: center;
`
const ModalText = styled.p`
  padding-top: 20px;
  font-size: 14px;
  font-weight: 300;
`
const Input = styled.input`
  display: block;
  width: 100%;
  border: 1px solid ${props => (props.error ? '#bd3200' : '#979797')};
  background: ${props => props.error && 'rgb(250, 229, 236)'};
  max-width: 420px;
  height: 36px;
  padding: 5px 10px;
  border-radius: 15px;
  font-size: 16px;
  margin: 20px auto 0;
  box-sizing: border-box;
`
const ErrorMsg = styled.label`
  display: block;
  font-size: 12px;
  color: #bd3200;
  text-align: left;
  padding-top: 5px;
  padding-left: 10px;
  max-width: 420px;
  margin: 0 auto;
`;
const ButtonContainer = styled.div`
  width: 140px;
  padding: 20px 0;
  margin: 0 auto;
`
const Spacing = styled.div`
  height: 15px;
`
const HelpLink = styled.a`
  font-size: 12px;
  color: #8872FF;
  text-decoration: underline;
  display: block;
  margin-top: 5px;
  margin-left: 5px;
  &:hover {
    color: #8872FF;
  }
`
// const EditIcon = styled.img`
//   width: 25px;
//   height: 25px;
//   margin-left: 10px;
//   cursor: pointer;
// `
const Delete = styled.p`
  color: #910505;
  font-size: 12px;
  font-weight: 500;
`
const AddImg = styled.img`
  width: 22px;
  height: 22px;
  @media (max-width: 360px) {
    width: 15px;
    height 15px;
  }
`;
const AddContainer = styled.div`
  background: #4b4b4b;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  @media (max-width: 360px) {
    width: 45px;
    height 45px;
  }
`;
const AddText = styled.p`
font-weight: 500;
color: black;
font-size: calc(15px + 0.5vw);
padding-left: 20px;
`;

const validationSchema = Yup.object().shape({
  uri: Yup.string().trim().required('Invalid URI.')
});

const parseDate = (timestamp) => {
  if (!timestamp) return '';
  const date = new Date(timestamp);
  const parsed = date.toLocaleString('default', { month: 'short', day: 'numeric', year: 'numeric' }).split(' ');
  return parsed[0] + '. ' + parsed[1] + ' ' + parsed[2];
}
const timeUntilRelease = (releaseDate) => {
  const now = new Date();

  const timeRemaining = Math.round((releaseDate.getTime() - now.getTime()) / 1000);
  const hours = Math.floor(timeRemaining / 3600);
  const minutes = Math.floor(timeRemaining / 60) - hours * 60;
  const seconds = timeRemaining - (hours * 60 + minutes) * 60;

  const parsedHours = hours < 10 ? '0' + hours.toString() : hours.toString()
  const parsedMinutes = minutes < 10 ? '0' + minutes.toString() : minutes.toString();
  const parsedSeconds = seconds < 10 ? '0' + seconds.toString() : seconds.toString();

  return parsedHours + ' : ' + parsedMinutes + ' : ' + parsedSeconds;
};

const Release = ({ song, setURIModal, edit }) => {
  const now = new Date();

  const releaseDate = new Date(song.releaseDate);
  const [time, setTime] = React.useState('-- : -- : --');
  const [confirm, setConfirm] = React.useState(false);

  React.useEffect(() => {
    if (song.status === 'scheduled' && song.spotifyUri) {
      const interval = setInterval(() => {
        return setTime(timeUntilRelease(releaseDate));
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [releaseDate, song.spotifyUri, song.status]);
  const released = now > releaseDate && song.status === 'released';

  if (!edit && confirm) {
    setConfirm(false);
  }

  const handleDeleteClick = () => {
    if (confirm) {
      // Delete song
    }
    return setConfirm(true);
  }

  return (
    <ReleaseCard>
      <Pic src={song.img || '/rec.png'} />
      <Content>
        <SongName released={released}>{song.name}</SongName>
        <ReleasedOn>{(released ? 'Released ' : 'Releasing ') + parseDate(song.releaseDate)}</ReleasedOn>
      </Content>
      <ReleaseIconContainer edit={edit} onClick={handleDeleteClick}>
        {edit ?
          <>
            <ReleaseIcon src={confirm ? '/assets/confirm_delete_icon.png' : '/assets/delete_icon.png'} />
            <Delete >{confirm ? 'are you sure?' : 'delete'}</Delete>
          </>
          :
          song.spotifyUri ?
            <>
              <ReleaseIcon released={released} src={released ? '/assets/save-icon-blue.png' : '/clock-icon.png'} />
              <Span released={released}>{released ? song.saves + ' saves' : time}</Span>
            </>
            :
            <AddURI onClick={() => setURIModal(song)}>Add URI</AddURI>

        }
      </ReleaseIconContainer>
    </ReleaseCard>)
};

const Releases = () => {
  const [URIModal, setURIModal] = React.useState(false);
  const [songs, setSongs] = React.useState([]);
  const [edit, setEdit] = React.useState(true);
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
    return setEdit(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderSongs = () => {
    return songs.map((song, i) => {
      return <Release key={i} song={song} setURIModal={setURIModal} edit={edit} />
    });
  };
  const handleAddUri = (values, { setSubmitting }) => {
    setSubmitting(true);
    console.log(values);
  }
  Modal.setAppElement('#modal');

  return (
    <>
      <Modal style={modalStyles} isOpen={URIModal} onRequestClose={() => setURIModal(false)}>
        <ModalContainer>
          <ModalHeader>Add Spotify URI</ModalHeader>
          <ModalText>Please enter the spotify URI of the song before it can be released.</ModalText>
          <Formik
            initialValues={{ uri: '' }}
            onSubmit={handleAddUri}
            validationSchema={validationSchema}
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
                  placeholder='Spotify Song URI'
                />
                {props.errors['uri'] && props.touched['uri'] && <ErrorMsg>{props.errors['uri']}</ErrorMsg>}
                <HelpLink href='https://community.spotify.com/t5/Spotify-Answers/What-s-a-Spotify-URI/ta-p/919201' target='_blank'>Where do I find this?</HelpLink>
                <ButtonContainer>
                  <Button type='submit' disabled={props.isSubmitting}>{props.isSubmitting ? 'Adding' : 'Add'}</Button>
                  <Spacing />
                  <Button type='button' alt onClick={() => setURIModal(false)}>Cancel</Button>
                </ButtonContainer>
              </form>
            )}
          </Formik>
        </ModalContainer>
      </Modal>
      <Header>
        Releases
        {/* <CreateSongButton to='/releases/new'>
          <img src='/add-icon.png' alt='Add' />
        </CreateSongButton> */}
      </Header>
      <BlastList>
        <ReleaseCard as={Link} to='/releases/new'>
          <AddContainer>
            <AddImg src='/add-icon.png' />
          </AddContainer>
          <AddText>
            Create Release
          </AddText>
        </ReleaseCard>
        {renderSongs()}
      </BlastList>
    </>
  );
}


export default Releases;
