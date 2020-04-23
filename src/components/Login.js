import React from 'react'
import { useForm } from 'react-hook-form'
import axios from "axios";

const Login = () => {

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = data => { 
    data.username = data.username.toLowerCase();
    axios.post("http://localhost:8000/api/auth/login", data)
    .then(res => {
        window.localStorage.setItem("token", JSON.stringify(res.data.token));
    })
    .catch(err => console.log("Axios error", err));
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
    </form>
    </div>
  )
}

export default Login; 