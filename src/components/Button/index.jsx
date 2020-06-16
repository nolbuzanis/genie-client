import React from 'react';
import styled from 'styled-components';
import ClipLoader from 'react-spinners/ClipLoader';
import { css } from '@emotion/core';

const Button = styled.button`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};
  width: 100%;
  background: ${(props) => {
    if (props.disabled && !props.isLoading) return '#DDDDDD';
    if (props.alternate) return 'white';
    return props.color
      ? props.color
      : 'linear-gradient(90deg, #8872ff, #4568DC)';
  }};
  height: ${(props) => (props.small ? '30px' : '44px')};
  border: ${(props) => {
    if (props.disabled) return 'none';
    if (props.color) return `1px solid ${props.color}`;
    return props.alternate ? '1px solid #656ded' : 'none';
  }};
  color: ${(props) =>
    props.alternate ? (props.color ? props.color : '#656ded') : 'white'};
  line-height: ${(props) =>
    props.small ? (props.alternate ? '28px' : '30px') : '44px'};
  text-align: center;
  font-size: ${(props) => (props.small ? '13px' : '18px')};
  border-radius: ${(props) => (props.square ? '10px' : '10px')};
  font-weight: 600;
  box-shadow: ${(props) =>
    !props.alternate && !props.disabled && '0 3px 6px 0 rgba(0, 0, 0, 0.16)'};

  &:hover,
  &:active {
    box-shadow: ${(props) => {
      if (props.disabled) return 'none';
      return props.alternate
        ? 'inset 0 0 0 99999px rgba(128, 128, 128, 0.2)'
        : 'inset 0 0 0 99999px rgba(128, 128, 128, 0.2), 0 3px 6px 0 rgba(0, 0, 0, 0.16)';
    }}
    }
      
  }
`;

const override = css`
  display: inline-block;
  margin-left: 15px;
`;

export default (props) => (
  <Button {...props}>
    {props.children}
    {props.isLoading && (
      <ClipLoader
        css={override}
        size={20}
        color={props.alternate ? '#656ded' : 'white'}
        loading={true}
      />
    )}
  </Button>
);
