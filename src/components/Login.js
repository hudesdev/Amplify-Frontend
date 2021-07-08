import React, { useState } from 'react';
import { useForm } from 'react-hook-form'
import axios from "axios";

const Login = ({ hide }) => {

  const { register, handleSubmit, reset } = useForm();
  const [loginError, setLoginError] = useState(false);

  const onSubmit = data => { 
    data.username = data.username.toLowerCase();
    axios.post("https://chat-app-z.herokuapp.com/api/auth/login", data)
    .then(res => {
        window.localStorage.setItem("token", JSON.stringify(res.data.token));
        hide();
    })
    .catch(err => {
      console.log("Axios error", err);
      setLoginError(true);
    });
    reset();
  }

  return (
    <div className = "login">
      <h2>Login</h2>
    <form onSubmit={handleSubmit(onSubmit)} className = "loginform">
      <input name="username" ref={register} placeholder = "Username" />
      <br/>
      <input name="password" ref={register({ required: true })} placeholder = "Password" type = "password" />
      <br/>
      <button type = "submit">Login</button>
      {loginError ? <p id = "loginerror">Invalid login.</p> : null}
    </form>
    </div>
  )
}

export default Login; 