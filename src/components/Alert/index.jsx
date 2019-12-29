import React from 'react';
import styled from 'styled-components';


export default ({ message, options, style, close }) => {
  const alertStyle = {
    backgroundColor: options.type === 'success' ? '#9FC7FF' : '#BD3200',
    color: 'white',
    padding: '10px',
    borderRadius: '3px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0px 2px 2px 2px rgba(0, 0, 0, 0.03)',
    width: '-webkit-fill-available',
    height: '70px',
    fontSize: '24px',
    boxSizing: 'border-box'
  };

  const Icon = styled.div`
        background: url(${props => props.icon}) no-repeat;
        background-position: ${props => props.exit ? 'left' : 'right'}
        background-size: 38px 38px;
        width: 51px;
        height: 38px;
    `

  let icon = options.type === 'success' ? '/checkmark-white.png' : '/error-white-icon.png';

  return (
    <div style={{ ...alertStyle, ...style }}>
      <Icon icon={icon} />
      <span style={{ flex: 2, textAlign: 'center' }}>{message}</span>
      <div onClick={close}>
        <Icon icon={'/close-white-icon.png'} exit={true} />
      </div>
    </div>
  )
}