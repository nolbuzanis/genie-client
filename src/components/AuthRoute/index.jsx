import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import authContext from '../../Context/authContext';

const AuthRoute = ({ component: Component, ...props }) => {
  const { auth } = React.useContext(authContext);
  console.log(auth);
  return (
    <Route
      {...props}
      render={componentProps =>
        auth && !auth.error ? (
          <Redirect
            to={{
              pathname: '/profile',
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
