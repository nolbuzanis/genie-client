import React from 'react';
import styled from 'styled-components';
import ReactModal from 'react-modal';

const modalStyles = {
  overlay: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: '100',
    background: 'rgba(0, 0, 0, 0.1)',
  },
  content: {
    position: 'static',
    display: 'flex',
    justifyContent: 'center',
    padding: '10px',
    border: 'none',
    background: 'none',
  },
};
ReactModal.setAppElement('body');

const ModalContainer = styled.div`
  background: white;
  width: 450px;
  text-align: center;
  padding: 25px;
  border-radius: 5px;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
`;
const ModalTitle = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: #444444;
`;

const Modal = ({ children, isOpen, onClose, title }) => {
  return (
    <ReactModal style={modalStyles} isOpen={isOpen} onRequestClose={onClose}>
      <ModalContainer>
        {title && <ModalTitle>{title}</ModalTitle>}
        {children}
      </ModalContainer>
    </ReactModal>
  );
};

export default Modal;
