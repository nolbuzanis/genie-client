import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import authContext from '../../Context/authContext';
import { getCurrentUser } from '../../api';

const PrivateRoute = ({ component: Component, ...props }) => {
  const { user, follower, setAuth } = React.useContext(authContext);

  console.log(window.location.pathname);
  const renderComponent = componentProps => {
    if (!user) {
      getCurrentUser().then((response) => setAuth({ follower, user: { ...response } }));
      return 'loading...';
    }

    if (user && !user.error) {
      console.log(user.uri);
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
      return <Component {...componentProps} />;
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
