import React from 'react';
import ReactDOM from 'react-dom';

const Modal = props => {
  return ReactDOM.createPortal(
    <div className='ui modals active visible'>
      <div className='ui standard visible modal active'>
        <div>wdawdawd</div>
      </div>
    </div>,
    document.getElementById('modal')
  );
};

export default Modal;
