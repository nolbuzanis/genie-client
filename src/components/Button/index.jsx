import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  display: block;
  cursor: ${props => (props.disabled ? 'default' : 'pointer')};
  width: 100%;
  background: ${props => {
    if (props.disabled) return '#DDDDDD';
    if (props.alternate) return 'white';
    return props.color
      ? props.color
      : 'linear-gradient(90deg, #8872ff, #4568DC)';
  }};
  height: ${props => (props.small ? '30px' : '44px')};
  border: ${props => {
    if (props.disabled) return 'none';
    if (props.color) return `1px solid ${props.color}`;
    return props.alternate ? '1px solid #4568DC' : 'none';
  }};
  color: ${props =>
    props.alternate ? (props.color ? props.color : '#4568DC') : 'white'};
  line-height: ${props =>
    props.small ? (props.alternate ? '28px' : '30px') : '44px'};
  text-align: center;
  font-size: ${props => (props.small ? '13px' : '18px')};
  border-radius: ${props => (props.square ? '10px' : '22px')};
  font-weight: 600;
  box-shadow: ${props =>
    !props.alternate && !props.disabled && '0 3px 6px 0 rgba(0, 0, 0, 0.16)'};
`;

export default props => <Button {...props}>{props.children}</Button>;
