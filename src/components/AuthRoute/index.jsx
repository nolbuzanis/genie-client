import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import authContext from '../../Context/authContext';
import { getCurrentUser } from '../../api';

const AuthRoute = ({ component: Component, ...props }) => {
  const { user, follower, setAuth } = React.useContext(authContext);
  if (!user) {
    getCurrentUser().then((response) => setAuth({ follower, user: { ...user, ...response } }));
  }
  return (
    <Route
      {...props}
      render={componentProps =>
        user && !user.error ? (
          <Redirect
            to={{
              pathname: '/home',
              state: {
                from: componentProps.location
              }
            }}
          />
        ) : (
            <Component {...componentProps} />
          )
      }
    />
  );
};

export default AuthRoute;
