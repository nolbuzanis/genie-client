import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  display: block;
  cursor: ${props => props.disabled ? 'default' : 'pointer'};
  width: 100%;
  background: ${props => {
    if (props.disabled) return '#DDDDDD'
    if (props.alt) return 'white'
    return props.color ? props.color : 'linear-gradient(90deg, #8872ff, #4568DC)'
  }};
  height: ${props => props.small ? '30px' : '44px'};
  border: ${props => props.color ? `1px solid ${props.color}` : props.alt ? '1px solid #4568DC' : 'none'};
  color: ${props => props.alt ? (props.color ? props.color : '#4568DC') : 'white'};
  line-height: ${props => props.small ? props.alt ? '28px' : '30px' : '44px'};
  text-align: center;
  font-size: ${props => props.small ? '13px' : '18px'};
  border-radius: 22px;
  font-weight: 600;
  box-shadow: ${props => !props.alt && '0 3px 6px 0 rgba(0, 0, 0, 0.16)'};
`;

export default props => <Button {...props}>{props.children}</Button>;
