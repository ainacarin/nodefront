import React from "react";
import "./App.css";
import { Link } from "react-router-dom";
import { Switch, Route, Redirect } from "react-router-dom";
import { LoginPage, PrivateRoute } from "./components/auth";
import { AuthContextProvider } from "./components/auth/context";
import { AdvertsPage, AdvertPage, NewAdvertPage } from "./components/adverts";

function App({ isInitiallyLogged }) {
  /** Properties */
  const [isLogged, setIsLogged] = React.useState(isInitiallyLogged);

  console.log("App: isLogged", isLogged);

  /** Handlers */
  const handleLogin = () => setIsLogged(true);
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
      <AuthContextProvider value={authContextValue}>
        <Switch>
          <PrivateRoute path="/advert/new">
            <NewAdvertPage />
          </PrivateRoute>
          <PrivateRoute path="/advert/:advertId">
            {(routeProps) => <AdvertPage {...routeProps} />}
          </PrivateRoute>
          <PrivateRoute path="/adverts">
            <AdvertsPage />
          </PrivateRoute>
          <Route path="/login">
            {
              ({ history, location }) => (
                <LoginPage history={history} location={location} />
              )
            }
          </Route>
          <PrivateRoute exact path="/">
            {({ history }) => <Redirect to="/adverts" />}
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
