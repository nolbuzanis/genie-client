import React from 'react';
import styled from 'styled-components';
import { useParams, Redirect } from 'react-router-dom';
import { getArtistByURI, followArtist, SERVER_URL } from '../../api';
import { useAlert } from 'react-alert';
import authContext from '../../Context/authContext';

const ArtistPic = styled.div`
  width: 100%;
  position: relative;
  max-width: 640px;
  display: block;
  background: ${props => props.img ? `url('${props.img}') center center no-repeat` : '#000000'};
  background-size: cover;
  padding: 0 25px;
  height: 60%;
  @media (min-width: 640px) {
    flex: 1;
    height: 100%;
  }
`
const ArtistName = styled.h2`
  font-size: calc(25px + 1.4vw);
  font-weight: 700;
  text-align: center;
`
const PhotoContent = styled.div`
  position: absolute;
  width: 100%;
  top: 45%;
  color: white;
  text-align: center;
  left: 0;
`
const Mask = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0,0,0,0.3);
`
const FollowButton = styled.button`
  display: block;
  background-color: ${props => props.disabled ? '#333333' : '#8872FF'};
  width: 220px;
  height: 50px;
  border-radius: 25px;
  text-transform: uppercase;
  border: none;
  font-size: 18px;
  letter-spacing: 0.1em;
  margin: 20px auto 0;
  color: white;
  font-weight: 700;
  box-shadow: 2px 2px 4px rgba(0,0,0,0.5);
  transition: all ease 0.3s;
  cursor: ${props => props.disabled ? 'auto' : 'pointer'};
  &:hover {
    background-color: ${props => props.disabled ? '#333333' : '#9986FF'};
  }
`
const FollowerCount = styled.p`
  padding-top: 20px;
  font-size: 24px;
`
const ArtistContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 25px;
  width: 100%;
  @media (min-width: 640px) {
    flex: 1;
    height: 100%;
  }
`
const ContentHeader = styled.h3`
  padding-top: 35px;
  font-size: 24px;
  font-weight: 700;
  text-align: center;
  width: 100%;
`
const Bio = styled.p`
  font-size: calc(16px + 0.7vw);
  font-weight: 300;
  padding-top: 20px;
  text-align: center;
  padding-bottom: 30px;
`
const FlexContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: 100%;
  width: 100%;
  align-items: flex-start;
`

const Artist = () => {

  const { id } = useParams();
  const [artist, setArtist] = React.useState(undefined);
  const alert = useAlert();
  const { follower, setAuth, user } = React.useContext(authContext);

  if (!artist) {
    getArtistByURI(id).then(setArtist);
    return 'loading...';
  }
  if (artist.error) {
    return <Redirect to='/' />
  }
  console.log(artist);

  const handleFollow = async () => {

    if (!follower || follower.error) {
      // No one logged in.. redirect to spotify oauth and will also handle following in this case
      window.location.href = `${SERVER_URL}/follower/login/${artist.uri}/follow`;
      follower.following ? follower.following.push(artist.uri) : follower.follower = [artist.uri];
      setAuth({ user, follower })
      return;
    }
    // If already following then unfollow (in future), for now return

    const response = await followArtist(artist.uri);
    if (response.error) {
      return alert.show('Error following artist!');
    }

    follower.following ? follower.following.push(artist.uri) : follower.follower = [artist.uri];
    setAuth({ user, follower });
    return alert.show('Successfully followed!', { type: 'success' });
  };

  const isFollowing = follower.following && follower.following.includes(id);

  return <FlexContainer><ArtistPic img={artist.img}>
    <Mask />
    <PhotoContent>
      <ArtistName>{artist.name}</ArtistName>
      <FollowButton onClick={handleFollow} disabled={isFollowing}>{isFollowing ? 'Following' : 'Follow'}</FollowButton>
      <FollowerCount>{artist.followers + '  followers'}</FollowerCount>
    </PhotoContent>
  </ArtistPic>
    <ArtistContent>
      <ContentHeader>Bio</ContentHeader>
      <Bio>{artist.bio}</Bio>
    </ArtistContent></FlexContainer>;
};

export default Artist;