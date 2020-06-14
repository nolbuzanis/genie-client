import React from 'react';
import styled from 'styled-components';

const ErrorMsg = styled.label`
  display: block;
  font-size: 12px;
  color: #bd3200;
  text-align: ${(props) => (props.center ? 'center' : 'left')};
`;
const InputLabel = styled.p`
  padding-top: 20px;
  color: ${(props) => (props.transparent ? '#ffffff' : '#4568dc')};
  text-align: ${(props) => (props.center ? 'center' : 'left')};
`;
const Input = styled.input`
  box-sizing: border-box;
  display: block;
  width: 100%;
  border: ${(props) => {
    if (props.disabled) {
      return '1px solid #D8D8D8';
    }
    if (props.transparent) {
      return 'none';
    } else {
      return props.error ? '1px solid #BD3200' : 'solid 1px #818181';
    }
  }};
  padding: 10px 15px;
  font-size: ${(props) => (props.large ? '36px;' : '16px')};
  border-radius: 10px;
  margin: 5px 0;
  line-height: 26px;
  color: ${(props) =>
    props.transparent ? 'rgba(255,255,255,0.9)' : '#212121'};
  height: ${({ type, large }) =>
    type === 'textarea' ? '100px' : large ? '60px' : '40px'};
  background-color: ${(props) => (props.disabled ? '#D8D8D8' : '#ffffff')};
  background: ${(props) => props.transparent && 'none'};
  &::placeholder {
    color: #818181;
    font-weight: 300;
  }
  text-align: ${(props) => (props.center ? 'center' : 'left')};
  ${(props) =>
    props.transparent &&
    `
  &:hover, &:focus {
    border: 1px solid rgba(255,255,255,0.7);
    border-radius: 0;
    border-width: 0 0 1px;
  }
  `}
`;

const InternalInput = (props) => (
  <div>
    {props.label && (
      <InputLabel transparent={props.transparent} center={props.center}>
        {props.label}
      </InputLabel>
    )}
    <Input
      as={props.type === 'textarea' ? 'textarea' : ''}
      value={props.values[props.name]}
      type={props.type || 'text'}
      onChange={props.handleChange}
      onBlur={props.handleBlur}
      name={props.name}
      error={props.errors[props.name] && props.touched[props.name]}
      disabled={props.name === 'uri'}
      placeholder={props.placeholder}
      transparent={props.transparent}
      large={props.large}
      center={props.center}
    />
    {props.errors[props.name] && props.touched[props.name] && (
      <ErrorMsg center={props.center}>{props.errors[props.name]}</ErrorMsg>
    )}
  </div>
);

export default InternalInput;
