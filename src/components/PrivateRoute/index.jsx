import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import authContext from '../../Context/authContext';
import { getCurrentUser } from '../../api';
import styled from 'styled-components';
import SideMenu from '../SideMenu';
import InternalHeader from '../InternalHeader';
import { css } from "@emotion/core";
import ScaleLoader from 'react-spinners/ScaleLoader'

const FlexContainer = styled.div`
  display: flex;
  height: 100%;
`
const ContentContainer = styled.div`
  width: 100%;
  @media (min-width: 920px) {
    flex-grow: 1;
    width: inherit;
    position: relative;
    overflow-x: hidden;
  }
`
const loadingStyles = css`
  position: relative;
  display: block;
  margin: 0 auto;
  text-align: center;
  top: 40%;
`;
const MaxContent = styled.div`
        max-width: 1300px;
        margin: 0 auto;
        position: relative;
      `

const PrivateRoute = ({ component: Component, ...props }) => {
  const { user, follower, setAuth } = React.useContext(authContext);
  const [open, setOpen] = React.useState(false);

  const renderComponent = componentProps => {
    if (!user) {
      getCurrentUser().then((response) => setAuth({ follower, user: { ...response } }));
      return <ScaleLoader
        css={loadingStyles}
        size={100}
        //size={"150px"} this also works
        color='#8872FF'
        loading={true}
      />;
    }
    if (user && !user.error) {
      if (!user.uri && window.location.pathname !== '/introduction') {
        return (
          <Redirect
            to={{
              pathname: '/introduction',
              state: {
                from: componentProps.location
              }
            }}
          />
        );
      }
      if (user.uri && window.location.pathname === '/introduction') {
        return (
          <Redirect
            to={{
              pathname: '/profile',
              state: {
                from: componentProps.location
              }
            }}
          />
        );
      }

      return (
        <FlexContainer>
          <SideMenu open={open} setOpen={setOpen} />
          <ContentContainer>
            <InternalHeader open={open} setOpen={setOpen} />
            <MaxContent>
              <Component {...componentProps} />
            </MaxContent>
          </ContentContainer>
        </FlexContainer>
      );
    } else {
      return (
        <Redirect
          to={{
            pathname: '/login',
            state: {
              from: componentProps.location
            }
          }}
        />
      );
    }
  };

  return <Route {...props} render={renderComponent} />;
};

export default PrivateRoute;
