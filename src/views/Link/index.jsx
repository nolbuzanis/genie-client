import React, { useState } from 'react';
import styled from 'styled-components';
import { useParams, Redirect, Link } from 'react-router-dom';
import {
  getArtistById,
  presaveTrack,
  subscribeToArtist,
  SERVER_URL,
} from '../../api';
import { useAuth } from '../../Context/authContext';
import BeatLoader from 'react-spinners/BeatLoader';
import { css } from '@emotion/core';
import Toggle from 'react-toggle';
import './toggle.css';
import Button from '../../components/Button';
import { useToasts } from 'react-toast-notifications';
//import ReactGA from 'react-ga';
import SongCard from '../../components/SongCard';
import PlatformIcons from '../../components/PlatformIcons';

const loadingStyles = css`
  position: relative;
  display: block;
  margin: 0 auto;
  text-align: center;
  top: 40%;
`;
const SocialLink = styled.a`
  margin: 10px;
  > svg path {
    fill: rgba(255, 255, 255, 1);
  }
  &:hover svg path {
    fill: rgba(255, 255, 255, 0.8);
    //fill: #656ded;
  }
`;
const SocialLinks = styled.div`
  margin: 0 auto;
  padding: 20px;
`;

const FacebookIcon = ({ href }) => (
  <SocialLink href={href} target='_blank'>
    <svg
      xmlns='http://www.w3.org/2000/svg'
      id='prefix__facebook-logo_copy'
      width='12.666'
      height='24'
      data-name='facebook-logo copy'
      viewBox='0 0 10.666 19.729'
    >
      <path
        id='prefix__Path'
        fill='#818181'
        d='M10.265 0H7.706a4.493 4.493 0 0 0-4.731 4.855v2.239H.4a.4.4 0 0 0-.4.4v3.246a.4.4 0 0 0 .4.4h2.575v8.184a.4.4 0 0 0 .4.4h3.358a.4.4 0 0 0 .4-.4v-8.182h3.008a.4.4 0 0 0 .4-.4V7.5a.4.4 0 0 0-.4-.4H7.135V5.2c0-.912.217-1.375 1.406-1.375h1.723a.4.4 0 0 0 .4-.4V.406A.4.4 0 0 0 10.265 0z'
      />
    </svg>
  </SocialLink>
);
const TwitterIcon = ({ href }) => (
  <SocialLink href={href} target='_blank'>
    <svg
      xmlns='http://www.w3.org/2000/svg'
      id='prefix__twitter_copy'
      width='26.615'
      height={24}
      data-name='twitter copy'
      viewBox='0 0 24.615 20'
    >
      <path
        id='prefix__Path'
        fill='#818181'
        d='M24.615 2.368a10.521 10.521 0 0 1-2.908.8A5.018 5.018 0 0 0 23.928.375a10.085 10.085 0 0 1-3.2 1.222A5.046 5.046 0 0 0 12 5.048a5.2 5.2 0 0 0 .115 1.152A14.284 14.284 0 0 1 1.714.92a5.048 5.048 0 0 0 1.551 6.745 4.984 4.984 0 0 1-2.28-.622V7.1a5.07 5.07 0 0 0 4.043 4.958 5.037 5.037 0 0 1-1.323.166 4.462 4.462 0 0 1-.955-.086 5.094 5.094 0 0 0 4.715 3.515A10.14 10.14 0 0 1 1.208 17.8 9.452 9.452 0 0 1 0 17.735 14.207 14.207 0 0 0 7.742 20 14.264 14.264 0 0 0 22.1 5.64c0-.223-.008-.438-.018-.652a10.067 10.067 0 0 0 2.533-2.62z'
      />
    </svg>
  </SocialLink>
);
const InstagramIcon = ({ href }) => (
  <SocialLink href={href} target='_blank'>
    {/*?xml version="1.0"?*/}
    <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 512 512" style={{ enableBackground: 'new 0 0 512 512' }} xmlSpace="preserve" width="24px" height="24px" className><g><g>
      <g>
        <path d="M352,0H160C71.648,0,0,71.648,0,160v192c0,88.352,71.648,160,160,160h192c88.352,0,160-71.648,160-160V160    C512,71.648,440.352,0,352,0z M464,352c0,61.76-50.24,112-112,112H160c-61.76,0-112-50.24-112-112V160C48,98.24,98.24,48,160,48    h192c61.76,0,112,50.24,112,112V352z" data-original="#000000" className="active-path" data-old_color="#000000" fill="#FFFFFF" />
      </g>
    </g><g>
        <g>
          <path d="M256,128c-70.688,0-128,57.312-128,128s57.312,128,128,128s128-57.312,128-128S326.688,128,256,128z M256,336    c-44.096,0-80-35.904-80-80c0-44.128,35.904-80,80-80s80,35.872,80,80C336,300.096,300.096,336,256,336z" data-original="#000000" className="active-path" data-old_color="#000000" fill="#FFFFFF" />
        </g>
      </g><g>
        <g>
          <circle cx="393.6" cy="118.4" r="17.056" data-original="#000000" className="active-path" data-old_color="#000000" fill="#FFFFFF" />
        </g>
      </g></g> </svg>
  </SocialLink>
);
const WebsiteIcon = ({ href }) => (
  <SocialLink href={href} target='_blank'>
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 20.068 20.068'
    >
      <g id='prefix__language-24px' transform='translate(49 -9.932)'>
        <path
          id='prefix__Path_246'
          fill='#818181'
          d='M12.024 2a10.034 10.034 0 1 0 10.044 10.034A10.029 10.029 0 0 0 12.024 2zm6.954 6.02h-2.96a15.7 15.7 0 0 0-1.385-3.572 8.057 8.057 0 0 1 4.344 3.572zm-6.944-3.973A14.135 14.135 0 0 1 13.95 8.02h-3.833a14.135 14.135 0 0 1 1.917-3.973zm-7.766 9.994a7.849 7.849 0 0 1 0-4.014h3.391a16.571 16.571 0 0 0-.14 2.007 16.571 16.571 0 0 0 .14 2.007zm.823 2.007H8.05a15.7 15.7 0 0 0 1.385 3.572 8.014 8.014 0 0 1-4.345-3.572zM8.05 8.02H5.09a8.014 8.014 0 0 1 4.345-3.572A15.7 15.7 0 0 0 8.05 8.02zm3.983 12a14.135 14.135 0 0 1-1.916-3.973h3.833a14.135 14.135 0 0 1-1.916 3.974zm2.348-5.98h-4.7a14.763 14.763 0 0 1-.161-2.007 14.634 14.634 0 0 1 .161-2.007h4.7a14.635 14.635 0 0 1 .161 2.007 14.763 14.763 0 0 1-.16 2.008zm.251 5.579a15.7 15.7 0 0 0 1.385-3.572h2.96a8.057 8.057 0 0 1-4.344 3.573zm1.776-5.579a16.571 16.571 0 0 0 .14-2.007 16.571 16.571 0 0 0-.14-2.007H19.8a7.849 7.849 0 0 1 0 4.014z'
          data-name='Path 246'
          transform='translate(-51 7.932)'
        />
      </g>
    </svg>
  </SocialLink>
);

const Background = styled.div`
  //oveflow: hidden;
  position: relative;
  width: 100%;
  min-height: 100%;
  //background: linear-gradient(90deg, #373b44 0%, #4286f4 100%);
  background: linear-gradient(90deg, rgb(70,70,70) 0%, rgb(50,50,50) 100%);
  ${(props) =>
    props.img && `background: url(${props.img}) center center no-repeat;`}
  background-size: cover;
  text-align: center;
  color: white;
`;
const Mask = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  -webkit-backdrop-filter: blur(30px);
  backdrop-filter: blur(30px);
  background-color: rgba(0, 0, 0, 0.3);
`;
const Content = styled.div`
  position: relative;
  padding: 0 30px;
  z-index: 1;
  //padding: 0 30px;
`;
const ArtistName = styled.h1`
  display: flex;
  align-items: center;
  justify-content: center;
  text-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
  font-size: 36px;
  padding: 40px 0 0;
  font-weight: 500;
  color: white;
`;
const PoweredBy = styled(Link)`
  display: block;
  position: relative;
  //padding: 100px 20px 30px;
  margin: 0 auto;
  font-size: 14px;
  padding: 5px;
`;
// const About = styled.p`
//   font-size: 14px;
//   font-weight: 500;
//   padding: 5px;
//   margin: 10px 0 20px;
//   color: white;
//   cursor: pointer;
// `;
const Header = styled.h2`
  font-size: 18px;
  font-weight: 500;
  color: white;
  padding-top: 35px;
`;
const ArrowBack = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 25px;
  cursor: pointer;
`;
const Spacing = styled.div`
  height: 25px;
`;
const SpotifyButton = styled(Button)`
  background: ${(props) => (props.background ? props.background : '#fff')};
  font-weight: 600;
  border-radius: 10px;
  font-size: 18px;
  color: ${(props) => (props.textColor ? props.textColor : '#000')};
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  height: 44px;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);

  &:hover,
  &:active {
    box-shadow: inset 0 0 0 99999px rgba(128, 128, 128, 0.2), 0 3px 6px 0 rgba(0, 0, 0, 0.16);
    }
  }
`;
const DeezerButton = styled(SpotifyButton)`
  color: white;
  background: #1db954;
`;
const DeezerImg = styled.img`
  width: 32.5px;
  height: 18.1px;
  margin-right: 10px;
`;
const ToggleContainer = styled.label`
  display: flex;
  margin-top: 24px;
  color: #818181;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  justify-content: center;
  align-items: center;
`;
const ToggleText = styled.span`
  padding-left: 5px;
  text-align: left;
  color: white;
`;
const Disclaimer = styled.p`
  padding-top: 30px;
  font-size: 11px;
  color: white;
`;
const BoldText = styled.a`
  font-weight: 700;
  cursor: pointer;
  color: inherit;
  pointer-events: ${(props) => props.previewMode && 'none'};
`;
const SpotifyImg = styled.img`
  //width: 20px;
  height: 20px;
  margin-right: 10px;
`;
const PresaveText = styled.p`
  line-height: 1.4;
  color: white;
  padding-top: 15px;
  padding-bottom: 20px;
`;
const deezerUrl = `${SERVER_URL}/follower/deezer-login`,
  spotifyUrl = `${SERVER_URL}/follower/login`;

let popup;

const PresaveView = ({ artist, hasSocialMedia }) => {
  const { follower, setAuth } = useAuth();
  const [checked, setChecked] = useState(true);
  const { addToast } = useToasts();
  const [isSubscribing, setSubscribing] = useState(false);

  const handleFollow = async (follower) => {
    //follow artist
    console.log('presaving..');
    const response = await presaveTrack(artist, checked);
    // setSubmitting(false);
    if (response.error) {
      return addToast('Error pre-saving track: ' + response.error.message, {
        appearance: 'error',
      });
    }

    const { id } = artist.upcoming;
    follower.presaves
      ? follower.presaves.push(id)
      : (follower.presaves = [id]);

    addToast('Sucessfully presaved!', {
      appearance: 'success',
    });

    setAuth({ follower });
  };

  React.useEffect(() => {
    const onlyHandleOAuth = async (e) => {
      console.log(e.data);
      if (e.data && (e.data.deezerId || e.data.spotifyId)) {
        //close popup
        popup && (await popup.close());
        handleFollow(e.data);
      }
    };

    window.addEventListener('message', onlyHandleOAuth);
    return () => {
      window.removeEventListener('message', onlyHandleOAuth);
    };
    // eslint-disable-next-line
  }, [checked]);

  const handleDeezerLogin = () => {
    //if (previewMode) return;
    console.log('deezer oauth flow');
    if (follower && !follower.error) {
      handleFollow(follower);
    } else {
      popup = window.open(deezerUrl, 'mywindow', 'width=500,height=400');
    }
  };

  const handleSpotifyLogin = async () => {
    //if (previewMode) return;
    console.log('spotify oauth flow');

    if (follower && !follower.error) {
      handleFollow(follower);
    } else {
      popup = window.open(spotifyUrl, 'mywindow', 'width=500,height=400');
    }
  };

  const handleSubscribe = async () => {
    if (!follower) return;
    setSubscribing(true);
    const response = await subscribeToArtist(artist);
    setSubscribing(false);
    if (response.error) {
      return addToast('Error subscribing: ' + response.error.message, {
        appearance: 'error',
      });
    }

    const { id } = artist;
    follower.following
      ? follower.following.push(id)
      : (follower.following = [id]);

    addToast('Sucessfully subscribed!', {
      appearance: 'success',
    });
    return setAuth({ follower });
  };

  if (follower &&
    follower.presaves &&
    follower.presaves.includes(artist.upcoming.id)) {
    return <>
      <Spacing />
      <Spacing />
      <SongCard song={artist.upcoming} />
      {follower && follower.following && follower.following.includes(artist.id) ? (
        <>
          <Header>Thanks for subscribing!</Header>
          <PresaveText>
            Check out {artist.name}’s other social links for more exciting
            updates!
        </PresaveText>
          {hasSocialMedia && <>
            <SocialLinks>
              {artist.facebook && <FacebookIcon href={artist.facebook} />}
              {artist.twitter && <TwitterIcon href={artist.twitter} />}
              {artist.instagram && <InstagramIcon href={artist.instagram} />}
              {artist.website && <WebsiteIcon href={artist.website} />}
            </SocialLinks>
          </>}
          <Spacing />
          <Spacing />
        </>
      ) : (
          <>
            <Header>Thanks for presaving!</Header>
            <PresaveText>
              Consider yourself a big fan? Presave all {artist.name}’s future
              releases and stay up to date!
              </PresaveText>
            <Button
              onClick={handleSubscribe}
              isLoading={isSubscribing}
              disabled={isSubscribing}
            >
              {isSubscribing ? 'Subscribing' : 'Subscribe'}
            </Button>
            <Disclaimer>
              * By subscribing you agree to pre-save all {artist.name}'s
              future releases. You can opt out anytime.
              </Disclaimer>
            <Disclaimer>
              By subscribing you agree to Genie’s{' '}
              <BoldText
                target='_blank'
                href='/privacy-policy'
              //previewMode={previewMode}
              >
                Privacy Policy
                </BoldText>{' '}
              and{' '}
              <BoldText
                target='_blank'
                href='/terms-of-service'
              //previewMode={previewMode}
              >
                Terms of Service
                </BoldText>
              .
              </Disclaimer>
            <Spacing />
            <Spacing />
          </>
        )}</>
  }


  return <>
    <Spacing />
    <Spacing />
    <SongCard song={artist.upcoming} />
    <Header>Presave with</Header>
    <DeezerButton onClick={handleSpotifyLogin}>
      <SpotifyImg src='/assets/spotify-logo-white-sm.png' alt='' />
      Spotify
            </DeezerButton>
    <SpotifyButton onClick={handleDeezerLogin}>
      <DeezerImg src='/assets/deezer-logo-black-sm.png' alt='' />
      Deezer
            </SpotifyButton>
    <ToggleContainer>
      <Toggle
        defaultChecked={checked}
        icons={false}
        onChange={() => setChecked(!checked)}
      />
      <ToggleText>Opt in to {artist.name}'s email updates</ToggleText>
    </ToggleContainer>
    <Disclaimer>
      By pre-saving you agree to Genie’s{' '}
      <BoldText
        target='_blank'
        href='/privacy-policy'
      //previewMode={previewMode}
      >
        Privacy Policy
              </BoldText>{' '}
      and{' '}
      <BoldText
        target='_blank'
        href='/terms-of-service'
      //previewMode={previewMode}
      >
        Terms of Service
              </BoldText>
      .
            </Disclaimer>
    <Spacing />
    <Spacing />
  </>;
};

const PublicLink = () => {
  const { id } = useParams();
  const [artist, setArtist] = useState(undefined);
  const { user } = useAuth();
  const [presave, setPresave] = useState(false);

  const urlParams = new URLSearchParams(window.location.search);
  const view = urlParams.get('view');
  let previewMode = view === 'preview' && user && user.uri;

  if (previewMode && !artist) {
    // fetch artistdata from local
    setArtist(user);
  }

  if (!artist) {
    getArtistById(id).then(setArtist);
    return (
      <BeatLoader
        css={loadingStyles}
        size={20}
        color='#656ded'
        loading={true}
      />
    );
  }
  if (artist.error) {
    console.log(artist.error);
    return <Redirect to='/' />;
  }

  const hasSocialMedia =
    (artist.instagram && artist.instagram.trim().length !== 0) ||
    (artist.twitter && artist.twitter.trim().length !== 0) ||
    (artist.website && artist.website.trim().length !== 0) ||
    (artist.facebook && artist.facebook.trim().length !== 0);

  return (
    <>
      <Background img={artist.img}>
        <Mask />
        <Content>
          <ArtistName>{presave && <ArrowBack
            src='/assets/arrow-backward-white.png'
            onClick={() => setPresave(false)}
          />}{artist.name}</ArtistName>
          {presave ? <PresaveView artist={artist} hasSocialMedia={hasSocialMedia} /> :
            <>
              {/* <About>about</About> */}
              <Spacing />
              {artist.latest && <>
                <SongCard song={artist.latest} />
                <Header>Listen</Header>
                <PlatformIcons links={artist.latest.links} color='#fff' clickable />
              </>
              }
              {artist.upcoming && <>
                <Header>Presave</Header>
                <Spacing />
                <SongCard song={artist.upcoming} presave action={() => setPresave(true)} />
              </>}
              {hasSocialMedia && <>
                <Spacing />
                <Header>Share</Header>
                <SocialLinks>
                  {artist.facebook && <FacebookIcon href={artist.facebook} />}
                  {artist.twitter && <TwitterIcon href={artist.twitter} />}
                  {artist.instagram && <InstagramIcon href={artist.instagram} />}
                  {artist.website && <WebsiteIcon href={artist.website} />}
                </SocialLinks>
              </>}
              <Spacing />
              <Spacing />
            </>
          }
        </Content>
        <PoweredBy to='/'>
          powered by <strong>Genie</strong>
        </PoweredBy>
        <Spacing />
      </Background>
    </>
  );
};

export default PublicLink;
