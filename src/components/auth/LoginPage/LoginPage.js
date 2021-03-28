import React from "react";
import LoginForm from './LoginForm';
import { login } from '../../../api/auth';

import './LoginPage.css';


function LoginPage({ onLogin }) {

  const handleSubmit = async credentials => {
    console.log("on handleSubmit");
    try {
      await login(credentials);
      onLogin();
    } catch (error) {
      console.log(error);
    } finally {
      console.log("credentials value", credentials);
    }
    
  };
  return (
    <div className="loginPage">
      <h1 className="loginPage-title">Accede a Nodepop</h1>
      <LoginForm onSubmit={handleSubmit}/>
    </div>
  );
}

export default LoginPage;
