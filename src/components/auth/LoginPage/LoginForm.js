import React from "react";
import Button from "../../shared/Button";
import FormField from "../../shared/FormField";
import "./LoginForm.css";

function LoginForm({ isLoading, onSubmit }) {
  const [credentials, setCredentials] = React.useState({
    email: "",
    password: "",
  });
  const [saveSession, setSaveSession] = React.useState(false);

  const handleChangeCredentials = (event) => {
    setCredentials((oldCredentials) => {
      const newCredentials = {
        ...oldCredentials,
        [event.target.name]: event.target.value,
      };
      return newCredentials;
    });
  };

  const handleChangeCheckbox = (event) => {
    const newSaveSession = !saveSession;
    setSaveSession(newSaveSession);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(credentials, saveSession);
  };

  const { email, password } = credentials;

  return (
    <form className="loginForm" onSubmit={handleSubmit}>
      <FormField
        type="email"
        name="email"
        label="email"
        className="loginForm-field"
        value={email}
        onChange={handleChangeCredentials}
      />
      <FormField
        type="password"
        name="password"
        label="contraseña"
        className="loginForm-field"
        value={password}
        onChange={handleChangeCredentials}
      />
      <FormField
        type="checkbox"
        name="flag_password"
        label="Recordar contraseña"
        className="loginForm-checkbox"
        value="flag_password"
        checked={saveSession}
        onChange={handleChangeCheckbox}
      />
      <Button
        type="submit"
        className="loginForm-submit"
        variant="primary"
        disabled={isLoading || !email || !password}
      >
        Acceder
      </Button>
    </form>
  );
}

LoginForm.defaultProps = {
  isLoading: false,
};

export default LoginForm;
