import React from 'react';
import styled from 'styled-components';
import { useParams, Redirect, useHistory } from 'react-router-dom';
import {
  getArtistByURI,
  //SERVER_URL 
} from '../../api';
//import { useAlert } from 'react-alert';
import { useAuth } from '../../Context/authContext';
import BeatLoader from 'react-spinners/BeatLoader';
import { css } from "@emotion/core";
import {
  getCurrentFollower,
  //logoutFollower 
} from '../../api';
import { Logo } from '../../components/Header';
import FollowModal from '../../components/FollowModal';

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
  border-top: solid 1px #a2a2a2;
`;
const SocialMediaMax = styled.div`
  max-width: 360px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 100%;
`;
const loadingStyles = css`
  position: relative;
  display: block;
  margin: 0 auto;
  text-align: center;
  top: 40%;
`;
const HeaderContainer = styled.div`
  position: absolute;
  z-index: 100;
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  top: 0;
  background: transparent;
  margin: 0;
  padding: 0 calc(5px + 5.4vw);
`;
// const SpotifyLogin = styled.a`
//   pointer-events: ${({ disabled }) => disabled && 'none'};
//   display: flex;
//   justify-content: center;
//   font-size: 20px;
//   border: none;
//   padding: 0 5px 0 10px;
//   background: white;
//   border-radius: 22px;
//   height: 44px;
//   align-items: center;
//   line-height: 44px;
//   font-size: 20px;
//   //width: 110px;
//   color: black;
//   &:hover {
//     color: black;
//   }
// `
// const SpotifyIconContainer = styled.div`
//   margin-left: 7px;
//   display: flex;
//   > svg {
//     align-self: center;
//   }
// `
const PreviewBanner = styled.div`
  position: fixed;
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  align-items: center;
  z-index: 101;
  width: 100%;
  left: 0;
  top: 0;
  right: 0;
  height: 90px;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
  background-color: #464646;
  color: white;
`;
const PreviewHeader = styled.h2`
  font-size: 18px;
  font-weight: 600;
`;
const PreviewText = styled.p`
  font-size: 14px;
  font-weight: 500;
  padding-top: 5px;
  color: white;
`;
const PreviewButton = styled.button`
  display: block;
  cursor: pointer;
  width: 80px;
  background: ${props => (props.disabled ? '#DDDDDD' : props.alt ? 'white' : 'linear-gradient(90deg, #8872ff, #4568DC)')};
  height: 30px;
  border: ${props => props.alt ? '1px solid #4568DC' : 'none'};
  color: ${props => props.alt ? '#4568DC' : 'white'};
  line-height: 30px;
  text-align: center;
  border-radius: 15px;
  font-size: 14px;
  font-weight: 600;
  box-shadow: ${props => !props.alt && '0 3px 6px 0 rgba(0, 0, 0, 0.16)'};
  margin: 5px 0;
`;
const SocialMediaLink = styled.a`
  cursor: pointer;
  &:hover{
    opacity: 0.8;
     transition: all ease 0.3s;
  }
`;
const SocialMediaIcon = styled.img`
  height: 30px;
`;

// const SpotifyIcon = () => (
//   <SpotifyIconContainer>
//     <svg enableBackground="new 0 0 56.69 56.69" height="30px" id="Layer_1" version="1.1" viewBox="0 0 56.69 56.69" width="30px" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"><path d="M28.3411,3.813c-13.5932,0-24.613,11.019-24.613,24.6122s11.0198,24.6129,24.613,24.6129  c13.5936,0,24.6133-11.0197,24.6133-24.6129S41.9346,3.813,28.3411,3.813z M38.3264,40.0396c-0.3979,0-0.6699-0.138-1.0418-0.3646  c-3.5675-2.158-8.015-3.2921-12.7356-3.2921c-2.6336,0-5.2842,0.3374-7.7634,0.8533c-0.403,0.0876-0.9103,0.2436-1.2132,0.2436  c-0.9347,0-1.558-0.7431-1.558-1.5468c0-1.0348,0.5966-1.549,1.3389-1.691c3.04-0.6927,6.0676-1.0883,9.2123-1.0883  c5.3857,0,10.1859,1.2357,14.3165,3.7111c0.6147,0.3591,0.975,0.7253,0.975,1.6359C39.8572,39.388,39.1359,40.0396,38.3264,40.0396z   M41.0084,33.5251c-0.5341,0-0.8704-0.2156-1.233-0.4266c-4.0038-2.376-9.5529-3.9546-15.6295-3.9546  c-3.1168,0-5.8066,0.436-8.0333,1.0294c-0.4798,0.1318-0.749,0.2738-1.1977,0.2738c-1.0585,0-1.9226-0.8626-1.9226-1.9296  c0-1.0465,0.5073-1.7671,1.5309-2.0557c2.767-0.7598,5.5921-1.3459,9.7045-1.3459c6.4427,0,12.6751,1.6046,17.5749,4.5368  c0.8215,0.4716,1.124,1.0689,1.124,1.9454C42.9268,32.6641,42.0781,33.5251,41.0084,33.5251z M44.062,25.9488  c-0.5011,0-0.7986-0.1218-1.2683-0.379c-4.4549-2.6711-11.3684-4.1423-18.0547-4.1423c-3.3375,0-6.7274,0.3394-9.8325,1.1818  c-0.3576,0.09-0.8094,0.2692-1.2621,0.2692c-1.3129,0-2.3201-1.0386-2.3201-2.3515c0-1.3378,0.8289-2.0886,1.7232-2.3528  c3.5085-1.0336,7.4247-1.5153,11.6823-1.5153c7.2273,0,14.8312,1.4866,20.3857,4.7489c0.7485,0.424,1.2683,1.0635,1.2683,2.2352  C46.3837,24.9846,45.3051,25.9488,44.062,25.9488z" /></svg>
//   </SpotifyIconContainer>
// );

const Artist = () => {
  const { id } = useParams();
  const [artist, setArtist] = React.useState(undefined);
  //const alert = useAlert();
  const { follower, setAuth, user } = useAuth();
  const history = useHistory();
  const [modalOpen, setModalOpen] = React.useState(false);

  const urlParams = new URLSearchParams(window.location.search);
  const view = urlParams.get('view');
  let previewMode = view === 'preview' && user && user.uri;

  React.useEffect(() => {
    if (!follower) {
      getCurrentFollower().then((response) => setAuth({ user, follower: response }));
    }
    // eslint-disable-next-line
  }, []);


  if (previewMode && !artist) {
    // fetch artistdata from local
    setArtist(user);
  }

  // const handleLogout = async () => {
  //   if (previewMode) return;
  //   const res = await logoutFollower();

  //   if (res.error) {
  //     return alert.show('Error logging out!');
  //   }
  //   setAuth({ user, follower: undefined });
  //   return alert.show('Successfully Logged out!', { type: 'success' });
  // }

  if (!artist) {
    getArtistByURI(id).then(setArtist);
    return <BeatLoader
      css={loadingStyles}
      size={20}
      //size={"150px"} this also works
      color='#4568DC'
      loading={true}
    />;
  }
  if (artist.error) {
    return <Redirect to='/' />
  }

  const isFollowing = follower && follower.following && follower.following.includes(id);
  const hasSocialMedia = (artist.instagram && artist.instagram.trim().length !== 0)
    || (artist.twitter && artist.twitter.trim().length !== 0)
    || (artist.website && artist.website.trim().length !== 0)
    || (artist.facebook && artist.facebook.trim().length !== 0);

  return (
    <PageContainer>
      <FollowModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        previewMode={previewMode}
        artist={artist}
      />
      {previewMode && <PreviewBanner>
        <div>
          <PreviewHeader>Preview Mode</PreviewHeader>
          <PreviewText>Buttons and links have been disabled.</PreviewText>
        </div>
        <div>
          <PreviewButton onClick={() => history.goBack()}>Back</PreviewButton>
          <PreviewButton alt={1} onClick={() => window.location.replace(history.location.pathname)}>Disable</PreviewButton>
        </div>
      </PreviewBanner>}
      <HeaderContainer>
        <Logo to='/' landing={true}>Genie</Logo>
        {/* {follower && !follower.error ? <SpotifyLogin as='button' onClick={handleLogout}>Log Out <SpotifyIcon /></SpotifyLogin>
          : <SpotifyLogin
            disabled={previewMode}
            href={`${SERVER_URL}/follower/login/${window.location.pathname.split('/')[2] ? window.location.pathname.split('/')[2] : '0'}`}>
            Log In
        <SpotifyIcon />
          </SpotifyLogin>} */}
      </HeaderContainer>
      <PageOverlay img={artist.img} />
      <FlexContainer>
        <ArtistPic img={artist.img}>
          <Mask />
          <PhotoContent>
            <ArtistName>{artist.name}</ArtistName>
            <FollowButton onClick={() => setModalOpen(true)} disabled={isFollowing}>{isFollowing ? 'Following' : 'Follow'}</FollowButton>
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
        <SocialMediaMax>
          {artist.instagram && <SocialMediaLink href={artist.instagram}>
            <SocialMediaIcon src='/assets/instagram-icon-blue.png' />
          </SocialMediaLink>}
          {artist.facebook && <SocialMediaLink href={artist.facebook}>
            <SocialMediaIcon src='/assets/facebook-icon-blue.png' />
          </SocialMediaLink>}
          {artist.twitter && <SocialMediaLink href={artist.twitter}>
            <SocialMediaIcon src='/assets/twitter-icon-blue.png' />
          </SocialMediaLink>}
          {artist.website && <SocialMediaLink href={artist.website}>
            <SocialMediaIcon src='/assets/website-icon-blue.png' />
          </SocialMediaLink>}
        </SocialMediaMax>
      </ArtistSocialMedia>}
    </PageContainer>
  );
};

export default Artist;