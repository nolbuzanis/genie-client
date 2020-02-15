import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  display: block;
  cursor: pointer;
  width: 100%;
  background: ${props => (props.disabled ? '#DDDDDD' : props.alt ? 'white' : 'linear-gradient(90deg, #8872ff, #4568DC)')};
  height: 44px;
  border: ${props => props.alt ? '1px solid #4568DC' : 'none'};
  color: ${props => props.alt ? '#4568DC' : 'white'};
  line-height: 44px;
  text-align: center;
  font-size: 18px;
  border-radius: 22px;
  box-shadow: ${props => !props.alt && '4px 4px 6px rgba(0, 0, 0, 0.16)'};
`;

export default props => <Button {...props}>{props.children}</Button>;
