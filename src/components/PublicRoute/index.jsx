import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import authContext from '../../Context/authContext';
import { getCurrentFollower } from '../../api';

const AuthRoute = ({ component: Component, ...props }) => {
  const { user, follower, setAuth } = React.useContext(authContext);
  if (!follower) {
    getCurrentFollower().then((response) => setAuth({ user, follower: { ...follower, ...response } }));
    return 'loading...';
  }
  return (
    <Route
      {...props}
      render={componentProps =>
        follower ? (
          <Component {...componentProps} />
        ) : (
            <Redirect
              to={{
                pathname: '/',
                state: {
                  from: componentProps.location
                }
              }}
            />
          )
      }
    />
  );
};

export default AuthRoute;
