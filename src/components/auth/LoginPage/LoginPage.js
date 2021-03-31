import React from "react";
import LoginForm from "./LoginForm";
import { login } from "../../../api/auth";

import "./LoginPage.css";

import AuthContext from "../context";

function LoginPage({ history, location }) {
  const [error, setError] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const isLogged = React.useRef(false);
  const firstTime = React.useRef(true);

  // const { isLogged, onLogin } = React.useContext(AuthContext);

  const { onLogin } = React.useContext(AuthContext);

  console.log("LoginPage isLogged", isLogged);
  console.log("LoginPage onLogin", onLogin);

  const resetError = () => setError(null);

  // React.useEffect(() => {
  //   if (isLogged) {
  //     // onLogin();
  //     setIsLoading(false);
  //   console.log('loading useEffect', isLoading);
  //     const { from } = location.state || { from: { pathname: "/" } };
  //     history.replace(from);
  //   }
  // }, [isLogged, isLoading, location, history]);


  // const handleSubmit = async (credentials, saveSession) => {
  //   console.log('credentials', credentials);
  //   console.log('flag', saveSession);
  //   resetError();
  //   setIsLoading(true);
  //   console.log('loading submit', isLoading);
  //   try {
  //     await login(credentials, saveSession);
  //     onLogin();
  //     // isLogged.current = true;
  //   } catch (error) {
  //     setIsLoading(false);
  //   console.log('loading error', isLoading);
  //     setError(error);
  //   } finally {
  //     // setIsLoading(false);
  //   }
  // };

  React.useEffect(() => {
    if (isLogged.current) {
      onLogin();
      const { from } = location.state || { from: { pathname: '/' } };
      // const from = location.state ? location.state.from : {pathname: '/'}

      history.replace(from);
    }
  });

  React.useEffect(() => {
    if (firstTime) {
      // Do things only the first time
      firstTime.current = false;
    }
  });

  const handleSubmit = async (credentials, saveSession) => {
    console.log('credentials', credentials);
    console.log('flag', saveSession);
    resetError();
    setIsLoading(true);
    console.log('loading submit', isLoading);
    try {
      await login(credentials, saveSession);
      isLogged.current = true;
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="loginPage">
      <h1 className="loginPage-title">Accede a Nodepop</h1>
      {error && (
        <div onClick={resetError} className="loginPage-error">
          {error.message}
        </div>
      )}
      <LoginForm isLoading={isLoading} onSubmit={handleSubmit} />
    </div>
  );
}

export default LoginPage;
