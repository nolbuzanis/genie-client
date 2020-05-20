import React, { useState } from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';
import Button from '../Button';
import { useAuth } from '../../Context/authContext';
import { followArtist, SERVER_URL } from '../../api';
import Toggle from 'react-toggle';
import './toggle.css';
import { useToasts } from 'react-toast-notifications';

const modalStyles = {
  overlay: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: '100',
    background: 'rgba(255, 255, 255, 0.7)'
  },
  content: {
    position: 'static',
    display: 'flex',
    justifyContent: 'center',
    padding: '10px',
    border: 'none',
    background: 'none'
  }
};
Modal.setAppElement('body');

const ModalContainer = styled.div`
  background: white;
  width: 340px;
  padding: 25px 15px;
  border-radius: 30px;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
  text-align: center;
`;
const Logo = styled.h1`
  font-size: 40px;
  font-weight: bold;
  color: #656ded;
`;
const SpotifyImg = styled.img`
  width: 20px;
  height: 20px;
  margin-left: 5px;
`;
const SpotifyButton = styled(Button)`
  background: #1db954;
  font-weight: 600;
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 22px;
`;
const AppleButton = styled(Button)`
  font-size: 16px;
  font-weight: 600;
  background: black;
  margin-top: 15px;
  //opacity: 0.5;
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
  pointer-events: ${props => props.previewMode && 'none'};
`;

const deezerUrl = `${SERVER_URL}/follower/deezer-login`,
  spotifyUrl = `${SERVER_URL}/follower/login`;

let popup;

const FollowModal = ({ isOpen, onClose, previewMode, artist }) => {
  // const [submitting, setSubmitting] = useState(false);
  const { follower, setAuth } = useAuth();
  const [checked, setChecked] = useState(true);
  const { addToast } = useToasts();
  console.log('artist', artist);

  const handleFollow = async follower => {
    //follow artist
    const response = await followArtist(artist, checked);
    // setSubmitting(false);
    if (response.error) {
      return addToast('Error following artist: ' + response.error.message, {
        appearance: 'error'
      });
    }

    follower.following
      ? follower.following.push(artist.id)
      : (follower.following = [artist.id]);

    addToast('Artist followed!', {
      appearance: 'success'
    });
    setAuth({ follower });
    onClose();
  };

  React.useEffect(() => {
    const onlyHandleOAuth = async e => {
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
  }, []);

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

  return (
    <Modal style={modalStyles} isOpen={isOpen} onRequestClose={onClose}>
      <ModalContainer>
        <Logo>Genie</Logo>
        {artist.uri && (
          <SpotifyButton onClick={handleSpotifyLogin}>
            Log in with Spotify
            <SpotifyImg src='/assets/spotify-logo-white.png' alt='' />
          </SpotifyButton>
        )}
        {artist.deezerId && (
          <AppleButton onClick={handleDeezerLogin}>
            Log in with Deezer
          </AppleButton>
        )}
        <ToggleContainer>
          <Toggle
            defaultChecked={checked}
            icons={false}
            onChange={() => setChecked(!checked)}
          />
          <ToggleText>Opt in to {artist.name}'s email updates</ToggleText>
        </ToggleContainer>
        <Disclaimer>
          * By following you agree to pre-save {artist.name}'s future releases.
          You can opt out anytime.
        </Disclaimer>
        <Disclaimer>
          By following you agree to Genie’s{' '}
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
      </ModalContainer>
    </Modal>
  );
};

export default FollowModal;
