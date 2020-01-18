import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const IconContainer = styled.div`
  cursor: pointer;
  margin-top: 25px;
  margin-right: 10px;
  display: inline-block;
  height: 30px;
  width: 30px;
  > svg {
    height: 30px;
    width: 30px;
  }
`;
const Logo = styled(Link)`
  display: inline-block;
  height: 100%;
  font-weight: 900;
  font-size: 36px;
  line-height: 80px;
    color: #8872FF;
  &:hover {
    color: #8872FF;
  }
`;

const Container = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-between;
  margin: 0;
  padding: 0 calc(5px + 5.4vw);
  @media (min-width: 920px) {
    height: 0;
    ${Logo} {
      display: none;
    }
    ${IconContainer} {
      display: none;
    }
  }
  }
`
const Overlay = styled.div`
  z-index: 1;
  position: absolute;
  top: 0;
  cursor: pointer;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0,0,0,0.7);
  visibility: ${props => props.open ? 'visible' : 'hidden'};
  opacity: ${props => props.open ? '1' : '0'};
  transition: all ease 0.3s;
`

const SvgIcon = ({ setOpen }) => (
  <IconContainer onClick={() => setOpen(true)}>
    <svg
      fill='#000000'
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      width='96px'
      height='96px'
    >
      <path d='M 0 2 L 0 4 L 24 4 L 24 2 Z M 0 11 L 0 13 L 24 13 L 24 11 Z M 0 20 L 0 22 L 24 22 L 24 20 Z' />
    </svg>
  </IconContainer>
);

const InternalHeader = ({ open, setOpen }) => (
  <>
    <Container>
      <SvgIcon setOpen={setOpen} />
      <Logo to='/'>Genie</Logo>
    </Container>
    <Overlay open={open} onClick={() => setOpen(false)} />
  </>
);

export default InternalHeader;