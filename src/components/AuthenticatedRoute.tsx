import React, { useContext } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { userContext } from '@/stores/userStore';

export default function AuthenticatedRoute({ children, ...rest }: RouteProps) {
  const user = useContext(userContext);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        user.signedIn ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}
