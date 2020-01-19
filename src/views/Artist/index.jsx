import React from 'react';
import styled from 'styled-components';
import { useParams, Redirect } from 'react-router-dom';
import { getArtistByURI, followArtist, SERVER_URL } from '../../api';
import { useAlert } from 'react-alert';
import authContext from '../../Context/authContext';

const ArtistPic = styled.div`
  width: 100%;
  position: relative;
  display: block;
  background: ${props => props.img ? `url('${props.img}') center center no-repeat` : '#000000'};
  background-size: cover;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
  padding: 0 25px;
  height: 380px;
  @media (min-width: 750px) {
   width: 360px;
  }
`
const ArtistName = styled.h2`
  font-size: 30px;
  font-weight: 900;
  text-align: center;
`
const PhotoContent = styled.div`
  position: absolute;
  width: 100%;
  bottom: 30px;
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
  width: 180px;
  height: 40px;
  border-radius: 20px;
  text-transform: uppercase;
  border: none;
  font-size: 14px;
  letter-spacing: 2.77px;
  margin: 10px auto 0;
  line-height: 40px;
  color: white;
  font-weight: 900;
  box-shadow: 2px 2px 4px rgba(0,0,0,0.5);
  transition: all ease 0.3s;
  cursor: ${props => props.disabled ? 'auto' : 'pointer'};
  &:hover {
    background-color: ${props => props.disabled ? '#333333' : '#9986FF'};
  }
`
const FollowerCount = styled.div`
  font-size: 24px;
  font-weight: 900;
  > img {
    width: 20px;
    height: 15px;
    margin-left: 5px;
  }
`
const ArtistContent = styled.div`
  flex: 1;
  padding: 0 25px;
  font-size: 20px;
  //height: 100%;
  background: #f2f2f2;
`
const ContentHeader = styled.h3`
  font-size: 20px;
  font-weight: 600;
  padding: 35px 25px 0;
`
const Bio = styled.p`
  font-size: 18px;
  padding: 15px 25px 30px;
`
const FlexContainer = styled.div`
  position: relative;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background: #f2f2f2;
  height: 100%;
  flex-direction: column;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  @media (min-width: 750px) {
    flex-direction: row;
    padding: 15px;
    height: 410px;
    //margin-top: 100px;
    box-shadow: 4px 4px 6px 0 rgba(0, 0, 0, 0.3);
    margin-bottom: 30px;
  }
`
const SpotifyPlay = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 30px 10px 20px;
  margin: 0 4.1%;
  align-items: center;
  border-bottom: 1px solid #979797;
`
const ListenOnSpotify = styled.a`
  display: flex;
  align-items: center;
  font-weight: 300;
  color: black;
  &:hover {
    color: black;
  }
  > img {
    width 30px;
    height: 30px;
    margin-right: 8px;
  }
`;
const PageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,1);;
  
  @media (min-width: 750px) {
   padding-top: 100px;
  }
`;
const PageOverlay = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  opacity: 0.5;
  height: 100%;
  background: ${props => props.img ? `url('${props.img}') center center no-repeat` : '#000000'};
  background-size: cover;
  filter: blur(2px);
  -webkit-filter: blur(2px);
`;
const ArtistSocialMedia = styled.div`
  position: relative;
  background: white;
  max-width: 800px;
  margin: 0 auto;
  box-shadow: 4px 4px 6px 0 rgba(0, 0, 0, 0.3);
  z-index: 10;
  height: 70px;
  width: 100%;
  display: flex;
  justify-content: center;
`

const Artist = () => {

  const { id } = useParams();
  const [artist, setArtist] = React.useState(undefined);
  const alert = useAlert();
  const { follower, setAuth, user } = React.useContext(authContext);
  console.log(follower);
  if (!artist) {
    getArtistByURI(id).then(setArtist);
    return 'loading...';
  }
  if (artist.error) {
    return <Redirect to='/' />
  }

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

  const isFollowing = follower && follower.following && follower.following.includes(id);
  const hasSocialMedia = (artist.instagram && artist.instagram.trim().length !== 0)
    || (artist.twitter && artist.twitter.trim().length !== 0)
    || (artist.website && artist.website.trim().length !== 0)
    || (artist.facebook && artist.facebook.trim().length !== 0);

  return (
    <PageContainer img={artist.img}>
      <PageOverlay img={artist.img} />
      <FlexContainer>
        <ArtistPic img={artist.img}>
          <Mask />
          <PhotoContent>
            <ArtistName>{artist.name}</ArtistName>
            <FollowButton onClick={handleFollow} disabled={isFollowing}>{isFollowing ? 'Following' : 'Follow'}</FollowButton>
          </PhotoContent>
        </ArtistPic>
        <ArtistContent>
          <SpotifyPlay>
            <ListenOnSpotify href={`https://open.spotify.com/artist/${artist.uri}`} target='_blank'>
              <img src='/play-circle-button.png' alt='play' />
              Listen on Spotify
        </ListenOnSpotify>
            <FollowerCount>{artist.followers}<img src='/follower-black-icon.png' alt='followers' /></FollowerCount>
          </SpotifyPlay>
          <ContentHeader>Bio</ContentHeader>
          <Bio>{artist.bio}</Bio>
        </ArtistContent>
      </FlexContainer>
      {hasSocialMedia && <ArtistSocialMedia>

      </ArtistSocialMedia>}
    </PageContainer>
  );
};

export default Artist;