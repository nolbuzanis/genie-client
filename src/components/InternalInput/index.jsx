import React from 'react';
import styled from 'styled-components';

const ErrorMsg = styled.label`
  display: block;
  font-size: 12px;
  color: #bd3200;
`;
const InputLabel = styled.p`
  padding-top: 20px;
  color: #4568dc;
`;
const Input = styled.input`
  box-sizing: border-box;
  display: block;
  width: 100%;
  border: ${props => {
    if (props.disabled) {
      return '1px solid #D8D8D8';
    } else {
      return props.error ? '1px solid #BD3200' : 'solid 1px #818181';
    }
  }};
  padding: 10px 15px;
  font-size: 16px;
  border-radius: 10px;
  margin: 5px 0;
  line-height: 26px;
  color: #212121;
  height: ${({ type }) => (type === 'textarea' ? '120px' : '40px')};
  background-color: ${props => (props.disabled ? '#D8D8D8' : '')};

  &::placeholder {
    color: #818181;
    font-weight: 300;
  }
`;

const InternalInput = props => (
  <div>
    <InputLabel>{props.label}</InputLabel>
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
    />
    {props.errors[props.name] && props.touched[props.name] && (
      <ErrorMsg>{props.errors[props.name]}</ErrorMsg>
    )}
  </div>
);

export default InternalInput;