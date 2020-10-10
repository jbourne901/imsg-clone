import React from 'react';
import './login.css';
import Button from "@material-ui/core/Button";
import {auth, provider} from "../../firebase";

const Login = () => {
  const signIn = () => {
    auth.signInWithPopup(provider).catch((err) => {
          console.error(err);
        });
  };

  return (
    <div className="login">
      <div className="login-logo">
        <img 
          src="https://i1.wp.com/mac03.ru/wp-content/uploads/2014/12/mac-messages-icon-300x276.jpg?ssl=1" alt=""
          className="login-img"
        />
          
        <h1>iMessage</h1>
      </div>
      <Button
        onClick = {() => signIn()}
      >
          Sign In
      </Button>
    </div>
  );
}

export default Login;
