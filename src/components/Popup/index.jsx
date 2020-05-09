import React from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';
import Button from '../Button';
import { useAuth } from '../../Context/authContext';
import { freeUser } from '../../config';
import { useHistory } from 'react-router-dom';

const modalStyles = {
  overlay: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center',
    zIndex: '100',
    background: 'rgba(255, 255, 255, 0)'
  },
  content: {
    position: 'static',
    display: 'flex',
    justifyContent: 'center',
    padding: '0 30px 20px',
    border: 'none',
    background: 'none',
    width: '100%',
    maxWidth: '400px'
  }
};
Modal.setAppElement('body');

const ModalBackground = styled.div`
  width: 100%;
  min-width: 300px;
  border-radius: 10px;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
  background-image: linear-gradient(114deg, #4568dc 4%, #8872ff 96%);
  color: white;
  padding: 20px 25px;
  text-align: center;
      -webkit-animation: fadein 0.5s; /* Safari, Chrome and Opera > 12.1 */
       -moz-animation: fadein 0.5s; /* Firefox < 16 */
        -ms-animation: fadein 0.5s; /* Internet Explorer */
         -o-animation: fadein 0.5s; /* Opera < 12.1 */
            animation: fadein 0.5s;
}

@keyframes fadein {
    from { opacity: 0; }
    to   { opacity: 1; }
}

/* Firefox < 16 */
@-moz-keyframes fadein {
    from { opacity: 0; }
    to   { opacity: 1; }
}

/* Safari, Chrome and Opera > 12.1 */
@-webkit-keyframes fadein {
    from { opacity: 0; }
    to   { opacity: 1; }
}

/* Internet Explorer */
@-ms-keyframes fadein {
    from { opacity: 0; }
    to   { opacity: 1; }
}

/* Opera < 12.1 */
@-o-keyframes fadein {
    from { opacity: 0; }
    to   { opacity: 1; }
}
`;
const MainOffering = styled.p`
  font-weight: 600;
  line-height: 1.5;
  color: white;
  padding-top: 15px;
`;
const FadedText = styled.p`
  font-size: 14px;
  font-weight: 500;
  opacity: 0.7;
  color: white;
`;
const StyledButton = styled(Button)`
  width: 130px;
  margin: 0 auto;
  border: none;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
  margin-bottom: 15px;
  margin-top: 10px;
`;
const CloseButton = styled.button`
  font-size: 14px;
  font-weight: 500;
  opacity: 0.7;
  color: white;
  background: none;
  border: none;
`;

const Popup = ({ open, setOpen }) => {
  const { user } = useAuth();
  const history = useHistory();

  const handleClick = () => {
    setOpen(false);
    history.push('/billing');
  };

  const savesRemaining = freeUser.maxSaves - user.saves;
  return (
    <Modal
      style={modalStyles}
      isOpen={open}
      onRequestClose={() => setOpen(false)}
    >
      <ModalBackground>
        <FadedText>
          {savesRemaining < 0 ? 0 : savesRemaining} / {freeUser.maxSaves}{' '}
          presaves remaining
        </FadedText>
        <MainOffering>
          Unlock unlimited presaves and advanced features.
        </MainOffering>
        <StyledButton alternate onClick={handleClick}>
          View Plans
        </StyledButton>
        <CloseButton onClick={() => setOpen(false)}>Not now</CloseButton>
      </ModalBackground>
    </Modal>
  );
};

export default Popup;
