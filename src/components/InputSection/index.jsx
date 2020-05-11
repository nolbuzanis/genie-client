import React from 'react';
import styled from 'styled-components';

const ErrorLabel = styled.p`
  display: block;
  color: #9b2335;
  font-size: 12px;
  padding-top: 6px;
`;
const Input = styled.input`
  box-sizing: border-box;
  margin-top: 6px;
  border-radius: 5px;
  border: solid 1px ${props => (props.error ? '#BD3200' : '#dddddd')};
  background-color: #efefef;
  width: 100%;
  font-size: 20px;
  padding: 0 15px;
  line-height: 45px;
  height: 45px;
  &:focus {
    border: solid 2px #656ded;
  }
`;
const Label = styled.label`
  display: block;
  font-size: 16px;
  font-weight: 600;
  color: #656ded;
  padding-top: 20px;
`;
const BottomLabel = styled.p`
font-size: 12px;
color: #444444;
padding-top: 6px;
`;

const InputSection = props => {
  const isError = props.errors[props.name] && props.touched[props.name];
  return (<>
  {props.label && <Label>{props.label}</Label>}
    <Input
      id={props.name}
      name={props.name}
      type={props.type}
      onChange={props.handleChange}
      onBlur={props.handleBlur}
      value={props.values[props.name]}
      error={props.errors[props.name] && props.touched[props.name]}
      //placeholder={props.placeholder}
    />
    {isError 
    ? 
    <ErrorLabel>{props.errors[props.name]}</ErrorLabel>
    :
    props.secondary && <BottomLabel>{props.secondary}</BottomLabel>
  }
  </>);
};

export default InputSection;
