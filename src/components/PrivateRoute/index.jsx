import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import authContext from '../../Context/authContext';

const PrivateRoute = ({ component: Component, ...props }) => {
  const { auth } = React.useContext(authContext);

  console.log(window.location.pathname);
  const renderComponent = componentProps => {
    if (auth && !auth.error) {
      if (!auth.uri && window.location.pathname !== '/introduction') {
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
