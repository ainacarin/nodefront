import React from "react";
import Button from "../../shared/Button";
import FormField from "../../shared/FormField";
import "./LoginForm.css";

function LoginForm({ onSubmit }) {
  const [credentials, setCredentials] = React.useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    setCredentials((oldCredentials) => {
      const newCredentials = {
        ...oldCredentials,
        [event.target.name]: event.target.value,
      };
      return newCredentials;
    });
    console.log("event",event)
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(credentials);
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
        onChange={handleChange}
      />
      <FormField
        type="password"
        name="password"
        label="contraseña"
        className="loginForm-field"
        value={password}
        onChange={handleChange}
      />
      <Button
        type="submit"
        className="loginForm-submit"
        variant="primary"
        disabled={!email || !password}
      >
        Acceder
      </Button>
    </form>
  );
}

export default LoginForm;
