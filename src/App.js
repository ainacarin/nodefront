import React from 'react';
import "./App.css";

import { LoginPage } from "./components/auth";
import { AuthContextProvider } from "./components/auth/context";

function App({ isInitiallyLogged }) {
  const [isLogged, setIsLogged] = React.useState(isInitiallyLogged);

  const handleLogin = () => {
    setIsLogged(true);
  };

  const handleLogout = () => setIsLogged(false);

  const authValue = {
    isLogged,
    onLogout: handleLogout,
    onLogin: handleLogin,
  };

  return (
    <div className="App">
      <AuthContextProvider value={authValue}>
        <LoginPage />
      </AuthContextProvider>
    </div>
  );
}

export default App;
