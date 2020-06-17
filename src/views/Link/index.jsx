import React, { useState } from 'react';
import styled from 'styled-components';
import { useParams, Redirect, Link } from 'react-router-dom';
import {
  getArtistById,
  presaveTrack,
  subscribeToArtist,
  SERVER_URL,
} from '../../api';
//import { useAlert } from 'react-alert';
import { useAuth } from '../../Context/authContext';
import BeatLoader from 'react-spinners/BeatLoader';
import { css } from '@emotion/core';
import Toggle from 'react-toggle';
import './toggle.css';
import Button from '../../components/Button';
import { Transition } from 'react-transition-group';
import { useToasts } from 'react-toast-notifications';
import ReactGA from 'react-ga';

const duration = 300;
// const timeout = {
//   enter: 1000,
//   appear: duration,
//   exit: 0,
// };

const defaultStyle = {
  position: 'relative',
  width: '100%',
  padding: '0 30px',
  transition: `all ${duration}ms ease-in-out`,
  opacity: 0,
  left: '100%',
};

const fadeInoutLeftStyle = {
  entering: { opacity: 0, left: '-100%' },
  entered: { opacity: 1, left: '0%' },
  exiting: { opacity: 0, left: '-100%' },
  exited: { opacity: 0, left: '-100%' },
};

const inRightOutRightStyle = {
  entering: { opacity: 0, left: '100%' },
  entered: { opacity: 1, left: '0%' },
  exiting: { opacity: 0, left: '100%' },
  exited: { opacity: 0, left: '100%' },
};

const loadingStyles = css`
  position: relative;
  display: block;
  margin: 0 auto;
  text-align: center;
  top: 40%;
`;
const SocialLink = styled.a`
  margin-right: 15px;
  > svg path {
    fill: rgba(255, 255, 255, 0.8);
  }
  &:hover svg path {
    fill: #656ded;
  }
`;

const FacebookIcon = ({ href }) => (
  <SocialLink href={href}>
    <svg
      xmlns='http://www.w3.org/2000/svg'
      id='prefix__facebook-logo_copy'
      width='10.666'
      height='19.729'
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
  <SocialLink href={href}>
    <svg
      xmlns='http://www.w3.org/2000/svg'
      id='prefix__twitter_copy'
      width='24.615'
      height={20}
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
  <SocialLink href={href}>
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={20}
      height={20}
      viewBox='0 0 20 20'
    >
      <defs>
        <style
          dangerouslySetInnerHTML={{
            __html: '\n        .prefix__cls-2{fill:#fff}\n        ',
          }}
        />
      </defs>
      <g
        id='prefix__instagram_1_copy'
        data-name='instagram (1) copy'
        transform='translate(0 .475)'
      >
        <path
          id='prefix__Shape'
          fill='#818181'
          d='M6.25 20A6.251 6.251 0 0 1 0 13.75v-7.5A6.251 6.251 0 0 1 6.25 0h7.5A6.251 6.251 0 0 1 20 6.25v7.5A6.25 6.25 0 0 1 13.75 20z'
          transform='translate(0 -.475)'
        />
        <path
          id='prefix__Shape-2'
          d='M0 4.881a4.881 4.881 0 1 1 4.881 4.882A4.881 4.881 0 0 1 0 4.881z'
          className='prefix__cls-2'
          data-name='Shape'
          transform='translate(4.881 4.881)'
          style={{ fill: '#ffffff' }}
        />
        <circle
          id='prefix__Oval'
          cx='.65'
          cy='.65'
          r='.65'
          className='prefix__cls-2'
          transform='translate(14.359 3.865)'
        />
      </g>
    </svg>
  </SocialLink>
);
const WebsiteIcon = ({ href }) => (
  <SocialLink href={href}>
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='20.068'
      height='20.068'
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
  background: linear-gradient(90deg, #373b44 0%, #4286f4 100%);
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
  z-index: 1;
  //padding: 0 30px;
`;
const ArtistName = styled.h1`
  display: flex;
  align-items: center;
  justify-content: center;
  text-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
  font-size: 36px;
  padding: 100px 30px 0;
  font-weight: 600;
  color: white;
`;
const Placeholder = styled.div`
  height: 350px;
`;
const Bio = styled.p`
  font-size: 18px;
  font-weight: 500;
  opacity: 0.9;
  color: white;
  padding-top: 25px;
  padding-bottom: 10px;
`;
const Heading = styled.h2`
  font-size: 20px;
  font-weight: 500;
  padding-top: 30px;
  color: #efefef;
`;
const SongCard = styled.div`
  width: 100%;
  max-width: 400px;
  background: white;
  border-radius: 10px;
  margin: 15px auto 0;
  padding: 10px 15px;
  display: flex;
  text-align: left;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
`;
const AlbumCover = styled.img`
  display: inline-block;
  width: 60px;
  margin-right: 15px;
  height: 60px;
  background-color: grey;
`;
const SongName = styled.p`
  color: #444444;
  font-size: 20px;
  font-weight: 500;
`;
const ReleaseDate = styled.p`
  color: #444444;
  font-size: 14px;
`;
const SongContent = styled.div`
  display: flex;
  align-items: center;
`;
const ForwardArrow = styled.img`
  width: 24px;
  height: 24px;
`;
const SocialMediaLinks = styled.div`
  position: absolute;
  top: 25px;
  right: 30px;
`;
const NoReleasesText = styled.p`
  color: rgba(255, 255, 255, 0.9);
  font-size: 16px;
  text-align: center;
  padding-top: 20px;
`;
const ArrowBack = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 25px;
  cursor: pointer;
`;
const WhiteContainer = styled.div`
  border-radius: 10px;
  max-width: 400px;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
  background-color: #ffffff;
  padding: 25px 20px;
  margin: 15px auto 0;
`;
const LargerAlbum = styled.img`
  width: 100px;
  height: 100px;
  text-align: center;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
`;
const SongTitle = styled.p`
  color: #444444;
  font-size: 20px;
  padding-top: 15px;
`;
const Subtitle = styled.h2`
  font-size: 20px;
  padding-top: 30px;
  font-weight: 500;
  color: #444444;
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
  margin-top: 15px;
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
`;
const Disclaimer = styled.p`
  font-size: 11px;
  font-weight: 500;
  padding-top: 15px;
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
  color: #444444;
  padding-top: 15px;
  padding-bottom: 20px;
`;
const PoweredBy = styled(Link)`
  display: block;
  position: relative;
  padding: 100px 20px 30px;
  margin: 0 auto;
  font-size: 18px;
  > strong {
    font-size: 20px;
  }
`;

const deezerUrl = `${SERVER_URL}/follower/deezer-login`,
  spotifyUrl = `${SERVER_URL}/follower/login`;

let popup;

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

const PublicLink = () => {
  const { id } = useParams();
  const [artist, setArtist] = useState(undefined);
  const { user } = useAuth();
  const [presave, setPresave] = useState(false);
  const [release, setRelease] = useState(false);

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

  const SelectView = () => (
    <>
      <Bio>{artist.bio}</Bio>
      {artist.latest ? (
        <>
          <Heading>Latest</Heading>
          <SongCard
            onClick={() => {
              setRelease(!release);
            }}
          >
            <SongContent>
              <AlbumCover src={artist.latest.img} />
              <div>
                <SongName>{artist.latest.name}</SongName>
                <ReleaseDate>
                  {parseDate(artist.latest.releaseDate)}
                </ReleaseDate>
              </div>
            </SongContent>
            <ForwardArrow src='/assets/arrow-forward-primary.png' />
          </SongCard>
        </>
      ) : (
        !artist.upcoming && (
          <>
            <Heading>Latest</Heading>
            <NoReleasesText>
              This artist has not added any releases. Check back again later!
            </NoReleasesText>
          </>
        )
      )}
      {artist.upcoming && (
        <>
          <Heading>Upcoming</Heading>
          <SongCard
            onClick={() => {
              setPresave(!presave);
            }}
          >
            <SongContent>
              <AlbumCover src={artist.upcoming.img} />
              <div>
                <SongName>{artist.upcoming.name}</SongName>
                <ReleaseDate>
                  {parseDate(artist.upcoming.releaseDate)}
                </ReleaseDate>
              </div>
            </SongContent>
            <ForwardArrow src='/assets/arrow-forward-primary.png' />
          </SongCard>
        </>
      )}
    </>
  );

  const PresaveView = () => {
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
      if (previewMode) return;
      console.log('deezer oauth flow');
      if (follower && !follower.error) {
        handleFollow(follower);
      } else {
        popup = window.open(deezerUrl, 'mywindow', 'width=500,height=400');
      }
    };

    const handleSpotifyLogin = async () => {
      if (previewMode) return;
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
        return addToast('Error pre-saving track: ' + response.error.message, {
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

    return (
      <WhiteContainer>
        <LargerAlbum src={artist.upcoming.img} />
        <SongTitle>{artist.upcoming.name}</SongTitle>
        {follower &&
        follower.presaves &&
        follower.presaves.includes(artist.upcoming.id) ? (
          follower.following && follower.following.includes(artist.id) ? (
            <>
              <Subtitle>Thanks for subscribing!</Subtitle>
              <PresaveText>
                Check out {artist.name}’s other social links for more exciting
                updates!
              </PresaveText>
            </>
          ) : (
            <>
              <Subtitle>Thanks for presaving!</Subtitle>
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
                  previewMode={previewMode}
                >
                  Privacy Policy
                </BoldText>{' '}
                and{' '}
                <BoldText
                  target='_blank'
                  href='/terms-of-service'
                  previewMode={previewMode}
                >
                  Terms of Service
                </BoldText>
                .
              </Disclaimer>
            </>
          )
        ) : (
          <>
            <Subtitle>Presave with</Subtitle>
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
            {/* <Disclaimer>
          * By following you agree to pre-save {artist.name}'s future releases.
          You can opt out anytime.
        </Disclaimer> */}
            <Disclaimer>
              By pre-saving you agree to Genie’s{' '}
              <BoldText
                target='_blank'
                href='/privacy-policy'
                previewMode={previewMode}
              >
                Privacy Policy
              </BoldText>{' '}
              and{' '}
              <BoldText
                target='_blank'
                href='/terms-of-service'
                previewMode={previewMode}
              >
                Terms of Service
              </BoldText>
              .
            </Disclaimer>
          </>
        )}
      </WhiteContainer>
    );
  };

  const linkInfo = [
    {
      type: 'spotify',
      background: '#1db954',
      textColor: '#fff',
      logo: '/assets/spotify-logo-white-sm.png',
      text: 'Spotify',
    },
    {
      type: 'deezer',
      // background: '#fff',
      // textColor: '#000',
      logo: '/assets/deezer-logo-black-sm.png',
      text: 'Deezer',
    },
    {
      type: 'apple',
      background: '#000',
      textColor: '#fff',
      text: 'Apple Music',
    },
    {
      type: 'soundcloud',
      background: '#ff7700',
      textColor: '#fff',
      logo: '/assets/soundcloud-logo-white.png',
      text: 'Soundcloud',
    },
    {
      type: 'tidal',
      background: '#000',
      textColor: '#fff',
      logo: '/assets/tidal-logo-white.png',
      text: 'Tidal',
    },
    {
      type: 'amazon',
      background: '#4300ff',
      textColor: '#fff',
      text: 'Amazon Music',
    },
    {
      type: 'google',
      logo: '/assets/google-play-logo.png',
      text: 'Google Play',
    },
    {
      type: 'pandora',
      background: '#3668ff',
      textColor: '#fff',
      text: 'Pandora',
    },
    {
      type: 'youtube',
      logo: '/assets/youtube-logo-red.png',
      text: 'Youtube',
    },
  ];

  const ReleaseView = () => {
    return (
      <WhiteContainer id='abs'>
        <LargerAlbum src={artist.latest.img} />
        <SongTitle>{artist.latest.name}</SongTitle>
        <Subtitle>Listen on</Subtitle>
        {artist.latest.links &&
          linkInfo.map((item) => {
            const link = artist.latest.links[item.type];
            return (
              link && (
                <ReactGA.OutboundLink
                  to={link}
                  eventLabel={link}
                  target='_blank'
                >
                  <SpotifyButton
                    background={item.background}
                    textColor={item.textColor}
                  >
                    {item.logo && <SpotifyImg src={item.logo} alt='' />}
                    {item.text}
                  </SpotifyButton>
                </ReactGA.OutboundLink>
              )
            );
          })}
      </WhiteContainer>
    );
  };

  return (
    <>
      <Background img={artist.img}>
        <Mask />
        <Content>
          {hasSocialMedia && (
            <SocialMediaLinks>
              {artist.facebook && <FacebookIcon href={artist.facebook} />}
              {artist.twitter && <TwitterIcon href={artist.twitter} />}
              {artist.instagram && <InstagramIcon href={artist.instagram} />}
              {artist.website && <WebsiteIcon href={artist.website} />}
            </SocialMediaLinks>
          )}
          <ArtistName>
            {(presave || release) && (
              <ArrowBack
                src='/assets/arrow-backward-white.png'
                onClick={() => {
                  setPresave(false);
                  setRelease(false);
                }}
              />
            )}
            {artist.name}
          </ArtistName>
          <Transition
            in={!(presave || release)}
            timeout={duration}
            appear
            enter
            unmountOnExit
            mountOnEnter
          >
            {(state) => (
              <>
                <div
                  style={{
                    ...defaultStyle,
                    ...fadeInoutLeftStyle[state],
                    position: 'absolute',
                  }}
                >
                  <SelectView />
                </div>
                <Placeholder />
              </>
            )}
          </Transition>
          {artist.upcoming && (
            <Transition
              in={presave}
              timeout={duration}
              appear
              enter
              unmountOnExit
              mountOnEnter
            >
              {(state) => (
                <div
                  style={{
                    ...defaultStyle,
                    ...inRightOutRightStyle[state],
                  }}
                >
                  <PresaveView />
                </div>
              )}
            </Transition>
          )}
          {artist.latest && (
            <Transition
              in={release}
              timeout={duration}
              appear
              enter
              unmountOnExit
              mountOnEnter
            >
              {(state) => (
                <div
                  style={{
                    ...defaultStyle,
                    ...inRightOutRightStyle[state],
                  }}
                >
                  <ReleaseView />
                </div>
              )}
            </Transition>
          )}
        </Content>
        <PoweredBy to='/'>
          powered by <strong>Genie</strong>
        </PoweredBy>
      </Background>
    </>
  );
};

export default PublicLink;
