import React from "react";
import "./App.css";

import { LoginPage } from "./components/auth";

function App() {
  const [isLogged, setIsLogged] = React.useState(false);

  const handleLogin = () => setIsLogged(true);

  const handleLogout = () => setIsLogged(false);


  return (
    <div className="App">
      {isLogged ? (
        <div>Logueado</div>
      ) : (
        <LoginPage onLogin={handleLogin} />
      )}

    </div>
  );
}

export default App;
