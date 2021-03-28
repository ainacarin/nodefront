import React from "react";
import "./App.css";

import { Switch, Route, Redirect } from 'react-router-dom';
import { LoginPage, PrivateRoute } from './components/auth';

function App({ isInitiallyLogged }) {
  const [isLogged, setIsLogged] = React.useState(isInitiallyLogged);

  const handleLogin = () => setIsLogged(true);

  const handleLogout = () => setIsLogged(false);

  return (
    <div className="App">
      {/* {isLogged ? (
        <div>Logueado</div>
      ) : (
        <LoginPage onLogin={handleLogin} />
      )} */}
      <Switch>
        <PrivateRoute isLogged={isLogged} path="/advert/:advertId">
          {({ match }) => <div>detalle de anuncio</div>}
        </PrivateRoute>
        <PrivateRoute isLogged={isLogged} path="/advert">
          {({ location }) => <div>Nuevo anuncio</div>}
        </PrivateRoute>
        <Route path="/login">
          {({ history, location }) => <LoginPage onLogin={handleLogin} />}
        </Route>
        <PrivateRoute isLogged={isLogged} exact path="/">
          {({ history }) => (
            <div>Listado de anuncios</div>
          )}
        </PrivateRoute>
        <Route path="/404">
          <div
            style={{
              textAlign: "center",
              fontSize: 48,
              fontWeight: "bold",
            }}
          >
            404 | Not found page
          </div>
        </Route>
        <Route>
          <Redirect to="/404" />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
