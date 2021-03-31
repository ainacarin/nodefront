import React from "react";
import "./App.css";
import { Link } from 'react-router-dom';
import { Switch, Route, Redirect } from "react-router-dom";
import { LoginPage, PrivateRoute } from "./components/auth";
import { AuthContextProvider } from "./components/auth/context";
import AuthButton from "./components/auth/AuthButton";

function App({ isInitiallyLogged }) {
  /** Properties */
  const [isLogged, setIsLogged] = React.useState(isInitiallyLogged);

  console.log("App: isLogged", isLogged);

  /** Handlers */
  const handleLogin = () =>setIsLogged(true);
  const handleLogout = () => setIsLogged(false);

  /** Context */
  const authContextValue = {
    isLogged,
    onLogin: handleLogin,
    onLogout: handleLogout,
  };

  /** Display */
  return (
    <div className="App">
      {/* {isLogged ? (
        <div>Logueado</div>
      ) : (
        <LoginPage onLogin={handleLogin} />
      )} */}
      <AuthContextProvider value={authContextValue}>
        <Switch>
          <PrivateRoute  path="/advert/new">
            {({ location }) => (
              <div>
                Nuevo anuncio
                <Link to="/adverts">Listado</Link>
                <AuthButton className="header-button" />
              </div>
            )}
          </PrivateRoute>
          <PrivateRoute  path="/advert/:id">
            {({ match }) => (
              <div>
                detalle de anuncio
                <Link to="/adverts">Listado</Link>
                <Link to="/advert/new">Nuevo anuncio</Link>
                <AuthButton className="header-button" />
              </div>
            )}
          </PrivateRoute>
          <PrivateRoute path="/adverts">
            {({ history }) => (
              <div>
                Listado de anuncios
                <Link to="/advert/4">Detalle 4</Link>
                <Link to="/advert/new">Nuevo anuncio</Link>
                <AuthButton className="header-button" />
              </div>
            )}
          </PrivateRoute>
          <Route path="/login">
            {
              // isLogged ? (
              //   <Redirect to="/" />
              // ) : (
              // ({ history, location }) => <LoginPage onLogin={handleLogin} />
              // )

              ({ history, location }) => (
                <LoginPage history={history} location={location} />
              )
            }
          </Route>
          <PrivateRoute exact path="/">
          {({ history }) => (
            <Redirect to="/adverts" />
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
              <Link to="/adverts">Listado</Link>
            </div>
          </Route>
          <Route>
            <Redirect to="/404" />
          </Route>
        </Switch>
      </AuthContextProvider>
    </div>
  );
}

export default App;
