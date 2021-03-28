import React from "react";
import LoginForm from './LoginForm';
import './LoginPage.css';


function LoginPage({ onLogin }) {

  const handleSubmit = () => {
    console.log("on handleSubmit");
    
  };
  return (
    <div className="loginPage">
      <h1 className="loginPage-title">Accede a Nodepop</h1>
      <LoginForm onSubmit={handleSubmit}/>
    </div>
  );
}

export default LoginPage;
