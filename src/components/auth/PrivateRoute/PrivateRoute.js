import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import AuthContext from '../context';

const PrivateRoute = ({...props }) => {
  const { isLogged } = React.useContext(AuthContext);
  const value = React.useContext(AuthContext);

  console.log('PrivateRoute value', value);
  console.log('PrivateRoute ...props', props);

  return isLogged ? 
  (
    <Route {...props}>
    </Route>
  ) : (
    <Route>
      {({ location }) => (
        <Redirect to={{ pathname: '/login', state: { from: location } }}>
        </Redirect>
      )}
    </Route>
  );
};

export default PrivateRoute;
