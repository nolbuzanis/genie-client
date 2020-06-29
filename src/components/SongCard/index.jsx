import React from 'react';
import styled from 'styled-components';

const SongPic = styled.div`
  width: 100%;
  padding-bottom: 100%;
  background: url(${(props => props.img)}) center center no-repeat;
  background-size: cover;
`;
const SongContainer = styled.div`
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  text-align: center;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
  background-color: #ffffff;
`;
const SongName = styled.p`
  color: #444444;
  font-size: 20px;
  font-weight: 500;
  padding-top: 10px;
`;
const SongDate = styled.p`
  font-size: 14px;
  font-weight: normal;
  color: #444444;
  padding: 5px 0 10px;
`;

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

const SongCard = ({ song }) => {

  console.log('from card: ', song);

  return <SongContainer>
    <SongPic img={song.img} />
    <SongName>{song.name}</SongName>
    <SongDate>{parseDate(song.releaseDate)}</SongDate>
  </SongContainer>
};

export default SongCard;