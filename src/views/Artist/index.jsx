import React from 'react';
import styled from 'styled-components';
import { useParams, Redirect, useHistory, Link } from 'react-router-dom';
import { getArtistById } from '../../api';
//import { useAlert } from 'react-alert';
import { useAuth } from '../../Context/authContext';
import BeatLoader from 'react-spinners/BeatLoader';
import { css } from '@emotion/core';
import {
  getCurrentFollower,
  //logoutFollower
} from '../../api';
import { Logo } from '../../components/Header';
import FollowModal from '../../components/FollowModal';
import Button from '../../components/Button';

const ArtistPic = styled.div`
  width: 100%;
  position: relative;
  display: block;
  background: ${(props) =>
    props.img ? `url('${props.img}') center center no-repeat` : '#000000'};
  background-size: cover;
  box-sizing: border-box;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
  padding: 0 25px;
  height: 250px;
`;
const ArtistName = styled.h2`
  font-size: 32px;
  width: 100%;
  font-weight: 600;
  height: 44px;
  line-height: 44px;
  padding-bottom: 20px;
  margin-top: 20px;
  overflow: hidden;
  max-width: 360px;
  //margin-bottom: 20px;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
`;
const PhotoContent = styled.div`
  position: relative;
  display: flex;
  padding: 0 30px;
  box-sizing: border-box;
  max-width: 800px;
  margin: 0 auto;
  justify-content: space-between;
  position: relative;
  bottom: 84px;
  width: 100%;
  color: white;
  flex-wrap: wrap;
`;
const Mask = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.3);
`;
const FollowerCount = styled.span`
  color: #dddddd;
  font-size: 15px;
  font-weight: 600;
  padding-left: 15px;
  @media (max-width: 657px) {
    color: #444444;
  }
`;
const ArtistContent = styled.div`
  padding: 25px 30px;
  position: relative;
  bottom: 84px;
  box-sizing: border-box;
  max-width: 800px;
  margin: 0 auto;
  font-size: 20px;
  width: 100%;
`;
const Bio = styled.p`
  font-size: 20px;
  font-weight: 500;
  color: #666666;
  line-height: 1.4;
`;
// const SpotifyPlay = styled.div`
//   display: flex;
//   justify-content: space-between;
//   padding: 30px 10px 20px;
//   margin: 0 4.1%;
//   align-items: center;
//   border-bottom: 1px solid #979797;
// `;
// const ListenOnSpotify = styled.a`
//   display: flex;
//   align-items: center;
//   font-weight: 300;
//   color: black;
//   &:hover {
//     color: black;
//   }
//   > img {
//     width 30px;
//     height: 30px;
//     margin-right: 8px;
//   }
// `;
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
  background: ${(props) =>
    props.disabled
      ? '#DDDDDD'
      : props.alternate
      ? 'white'
      : 'linear-gradient(90deg, #8872ff, #4568DC)'};
  height: 30px;
  border: ${(props) => (props.alternate ? '1px solid #4568DC' : 'none')};
  color: ${(props) => (props.alternate ? '#4568DC' : 'white')};
  line-height: 30px;
  text-align: center;
  border-radius: 15px;
  font-size: 14px;
  font-weight: 600;
  box-shadow: ${(props) =>
    !props.alternate && '0 3px 6px 0 rgba(0, 0, 0, 0.16)'};
  margin: 5px 0;
`;
const SocialLink = styled.a`
  margin-right: 15px;
  &:hover svg path {
    fill: #656ded;
  }
`;
const FollowButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
`;
const SocialMediaLinks = styled.div`
  padding-top: 20px;
`;
const FollowButtonContainer = styled.div``;
const BackButton = styled.img`
  width: 24px;
  height: 24px;
`;
const FollowButton = styled(Button)`
  width: 130px;
  color: ${(props) => props.isFollowing && '#dddddd'};
  background-color: ${(props) => props.isFollowing && 'rgba(0,0,0,0)'};
  border: ${(props) => props.isFollowing && 'solid 1px #dddddd'};

  @media (max-width: 657px) {
    color: ${(props) => props.isFollowing && '#656ded'};
    border: ${(props) => props.isFollowing && 'solid 1px #656ded'};
  }
`;

// const SpotifyIcon = () => (
//   <SpotifyIconContainer>
//     <svg enableBackground="new 0 0 56.69 56.69" height="30px" id="Layer_1" version="1.1" viewBox="0 0 56.69 56.69" width="30px" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"><path d="M28.3411,3.813c-13.5932,0-24.613,11.019-24.613,24.6122s11.0198,24.6129,24.613,24.6129  c13.5936,0,24.6133-11.0197,24.6133-24.6129S41.9346,3.813,28.3411,3.813z M38.3264,40.0396c-0.3979,0-0.6699-0.138-1.0418-0.3646  c-3.5675-2.158-8.015-3.2921-12.7356-3.2921c-2.6336,0-5.2842,0.3374-7.7634,0.8533c-0.403,0.0876-0.9103,0.2436-1.2132,0.2436  c-0.9347,0-1.558-0.7431-1.558-1.5468c0-1.0348,0.5966-1.549,1.3389-1.691c3.04-0.6927,6.0676-1.0883,9.2123-1.0883  c5.3857,0,10.1859,1.2357,14.3165,3.7111c0.6147,0.3591,0.975,0.7253,0.975,1.6359C39.8572,39.388,39.1359,40.0396,38.3264,40.0396z   M41.0084,33.5251c-0.5341,0-0.8704-0.2156-1.233-0.4266c-4.0038-2.376-9.5529-3.9546-15.6295-3.9546  c-3.1168,0-5.8066,0.436-8.0333,1.0294c-0.4798,0.1318-0.749,0.2738-1.1977,0.2738c-1.0585,0-1.9226-0.8626-1.9226-1.9296  c0-1.0465,0.5073-1.7671,1.5309-2.0557c2.767-0.7598,5.5921-1.3459,9.7045-1.3459c6.4427,0,12.6751,1.6046,17.5749,4.5368  c0.8215,0.4716,1.124,1.0689,1.124,1.9454C42.9268,32.6641,42.0781,33.5251,41.0084,33.5251z M44.062,25.9488  c-0.5011,0-0.7986-0.1218-1.2683-0.379c-4.4549-2.6711-11.3684-4.1423-18.0547-4.1423c-3.3375,0-6.7274,0.3394-9.8325,1.1818  c-0.3576,0.09-0.8094,0.2692-1.2621,0.2692c-1.3129,0-2.3201-1.0386-2.3201-2.3515c0-1.3378,0.8289-2.0886,1.7232-2.3528  c3.5085-1.0336,7.4247-1.5153,11.6823-1.5153c7.2273,0,14.8312,1.4866,20.3857,4.7489c0.7485,0.424,1.2683,1.0635,1.2683,2.2352  C46.3837,24.9846,45.3051,25.9488,44.062,25.9488z" /></svg>
//   </SpotifyIconContainer>
// );

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

const Artist = () => {
  const { id } = useParams();
  const [artist, setArtist] = React.useState(undefined);
  //const alert = useAlert();
  const { follower, setAuth, user } = useAuth();
  const history = useHistory();
  const [modalOpen, setModalOpen] = React.useState(false);
  const isMobile = window.innerWidth < 500;

  const urlParams = new URLSearchParams(window.location.search);
  const view = urlParams.get('view');
  let previewMode = view === 'preview' && user && user.uri;
  const hasConnectedAccounts = artist && (artist.uri || artist.deezerId);

  React.useEffect(() => {
    if (!follower) {
      getCurrentFollower().then((response) => {
        setAuth({ user, follower: response });
      });
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
    getArtistById(id).then(setArtist);
    return (
      <BeatLoader
        css={loadingStyles}
        size={20}
        //size={"150px"} this also works
        color='#656ded'
        loading={true}
      />
    );
  }
  if (artist.error) {
    return <Redirect to='/' />;
  }

  const isFollowing =
    follower && follower.following && follower.following.includes(id);
  const hasSocialMedia =
    (artist.instagram && artist.instagram.trim().length !== 0) ||
    (artist.twitter && artist.twitter.trim().length !== 0) ||
    (artist.website && artist.website.trim().length !== 0) ||
    (artist.facebook && artist.facebook.trim().length !== 0);

  return (
    <>
      <FollowModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        previewMode={previewMode}
        artist={artist}
      />
      {previewMode && (
        <PreviewBanner>
          <div>
            <PreviewHeader>Preview Mode</PreviewHeader>
            <PreviewText>Buttons and links have been disabled.</PreviewText>
          </div>
          <div>
            <PreviewButton onClick={() => history.goBack()}>Back</PreviewButton>
            <PreviewButton
              alternate
              onClick={() => window.location.replace(history.location.pathname)}
            >
              Disable
            </PreviewButton>
          </div>
        </PreviewBanner>
      )}
      <HeaderContainer>
        {isMobile ? (
          <Link to='/'>
            <BackButton src='/assets/back-arrow-light.png' />
          </Link>
        ) : (
          <Logo to='/' landing={true}>
            Genie
          </Logo>
        )}
      </HeaderContainer>
      <ArtistPic img={artist.img}>
        <Mask />
      </ArtistPic>
      <PhotoContent>
        <ArtistName>{artist.name}</ArtistName>
        <FollowButtonContainer>
          <FollowButtonWrapper>
            {hasConnectedAccounts && (
              <FollowButton
                square
                onClick={() => setModalOpen(true)}
                disabled={isFollowing}
                alternate={isFollowing}
                isFollowing={isFollowing}
              >
                {isFollowing ? 'Following' : 'Follow'}
              </FollowButton>
            )}
            <FollowerCount>{artist.followers} Followers</FollowerCount>
          </FollowButtonWrapper>
        </FollowButtonContainer>
      </PhotoContent>
      <ArtistContent>
        <Bio>{artist.bio}</Bio>
        {hasSocialMedia && (
          <SocialMediaLinks>
            {artist.facebook && <FacebookIcon href={artist.facebook} />}
            {artist.twitter && <TwitterIcon href={artist.twitter} />}
            {artist.instagram && <InstagramIcon href={artist.instagram} />}
            {artist.website && <WebsiteIcon href={artist.website} />}
          </SocialMediaLinks>
        )}
        {/* <ListenOnSpotify
            href={`https://open.spotify.com/artist/${artist.uri}`}
            target='_blank'
          >
            <img src='/play-circle-button.png' alt='play' />
            Listen on Spotify
          </ListenOnSpotify> */}
        {/* <FollowerCount>
            {artist.followers}
            <img src='/follower-black-icon.png' alt='followers' />
          </FollowerCount> */}
      </ArtistContent>
    </>
  );
};

export default Artist;
