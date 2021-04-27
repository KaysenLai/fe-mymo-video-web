import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { RouteProps } from '../types';
import { useSelector } from 'react-redux';
import { State } from '../types/state';

function ProtectedRoute({ component: Component, redirectTo = '/', ...rest }: RouteProps) {
  const userLogin = useSelector((state: State) => state.userLogin);
  const { isAuthenticated } = userLogin;

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: redirectTo,
              state: { redirect: props.location.pathname, isAuthenticated },
            }}
          />
        )
      }
    />
  );
}

export default ProtectedRoute;
