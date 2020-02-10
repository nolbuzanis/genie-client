import React from 'react';
import styled from 'styled-components';
import { getMySongs } from '../../api';
import { useAlert } from 'react-alert';
import Modal from 'react-modal';
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
  padding: 40px 40px 25px;
  align-items: center;
  display: flex;
  justify-content: space-between;
  @media (max-width: 920px) {
    padding-top: 0px;
  }
`;
const CreateSongButton = styled(Link)`
  position: relative;
  background: #8872ff;
  width: 50px;
  height: 50px;
  border-radius: 25px;
  border: none;
  box-shadow: 4px 4px 6px 0 rgba(0, 0, 0, 0.16);
  margin-bottom: 2.5px;
  margin-left: 2.5px;
  > img {
    position: absolute;
    width: 20px;
    height: 20px;
    top: 15px;
    left: 15px;
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
    top: 16px;
    left: 16px;
  }
  }
`
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
  const timer = React.useRef(false)
  // React.useEffect(() => {
  //   return clearTimeout(timer.current)
  // }, [])
  React.useEffect(() => {
    timer.current = setTimeout(() => {
      setTime(timeUntilRelease(releaseDate));
    }, 1000);

  });


  const released = now > releaseDate;
  return (
    <ReleaseCard>
      <Pic src={song.img || '/rec.png'} />
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
    return songs.map((song, i) => {
      return <Release key={i} song={song} />
    });
  };
  Modal.setAppElement('#modal')

  return (
    <>
      <Header>
        Releases
        <CreateSongButton to='/releases/new'>
          <img src='/add-icon.png' alt='Add' />
        </CreateSongButton>
      </Header>
      <BlastList>
        {renderSongs()}
      </BlastList>
    </>
  );
}


export default AllBlasts;
