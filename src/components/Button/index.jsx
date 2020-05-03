import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  display: block;
  cursor: ${props => props.disabled ? 'default' : 'pointer'};
  width: 100%;
  background: ${props => {
    if (props.disabled) return '#DDDDDD'
    if (props.alt) return 'white'
    return props.bgColor ? props.bgColor : 'linear-gradient(90deg, #8872ff, #4568DC)'
  }};
  height: 44px;
  border: ${props => props.alt ? '1px solid #4568DC' : 'none'};
  color: ${props => props.alt ? '#4568DC' : 'white'};
  line-height: 44px;
  text-align: center;
  font-size: 18px;
  border-radius: 22px;
  height: 44px;
  font-weight: 600;
  box-shadow: ${props => !props.alt && '0 3px 6px 0 rgba(0, 0, 0, 0.16)'};
`;

export default props => <Button {...props}>{props.children}</Button>;
