import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const IconContainer = styled.div`
  cursor: pointer;
  margin-top: 25px;
  margin-right: 10px;
  display: inline-block;
  height: 25px;
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
  // @media (min-width: 920px) {
  //   height: 0;
  //   ${Logo} {
  //     display: none;
  //   }
  //   ${IconContainer} {
  //     display: none;
  //   }
  // }
  // }
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
const Line = styled.div`
  display: block;
  background: black;
  height: 3px;
  border-radius: 1.5px;
  width: 30px;
  margin-bottom: 8px;
`

const HamburgerIcon = ({ setOpen }) => (
  <IconContainer onClick={() => setOpen(true)}>
    <Line />
    <Line />
    <Line />
  </IconContainer>
);

const InternalHeader = ({ open, setOpen }) => {

  if (window.innerWidth < 1024) return null;

  return <>
    <Container>
      <HamburgerIcon setOpen={setOpen} />
      {/* <Logo to='/'>Genie</Logo> */}
    </Container>
    <Overlay open={open} onClick={() => setOpen(false)} />
  </>
};

export default InternalHeader;