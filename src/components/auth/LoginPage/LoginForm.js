import React from "react";
import Button from '../../shared/Button';
import FormField from '../../shared/FormField';
import './LoginPage.css';

function LoginForm() {
  return (
    <form className="loginForm">
      <FormField
        type="text"
        name="username"
        label="phone, email or username"
        className="loginForm-field"
        autofocus
      />
      <FormField
        type="password"
        name="password"
        label="password"
        className="loginForm-field"
      />
      <Button
        type="submit"
        className="loginForm-submit"
        variant="primary"
        disabled
      >
        Acceder
      </Button>
    </form>
  );
}

export default LoginForm;
