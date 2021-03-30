import React from "react";
import LoginForm from "./LoginForm";
import { login } from "../../../api/auth";

import "./LoginPage.css";

import AuthContext from "../context";

function LoginPage({ history, location }) {
  const [error, setError] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  // const isLogged = React.useRef(false);

  const { isLogged, onLogin } = React.useContext(AuthContext);

  console.log("LoginPage isLogged", isLogged);
  console.log("LoginPage onLogin", onLogin);

  const resetError = () => setError(null);

  // React.useEffect(() => {
  //   if (isLogged.current) {
  //     onLogin();
  //     const { from } = location.state || { from: { pathname: '/' } };
  //     history.replace(from);
  //   }
  // });

  React.useEffect(() => {
    if (isLogged) {
      onLogin();
      const { from } = location.state || { from: { pathname: "/" } };
      history.replace(from);
    }
  });

  const handleSubmit = async (credentials, flagPassword) => {
    resetError();
    setIsLoading(true);
    try {
      await login(credentials);
      onLogin();
      // isLogged.current = true;
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
