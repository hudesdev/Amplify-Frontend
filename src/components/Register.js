import React from 'react'
import { useForm } from 'react-hook-form'
import axios from "axios";

const Register = ( { hide } ) => {

  const { register, handleSubmit, reset } = useForm()

  const onSubmit = data => { 
    data.username = data.username.toLowerCase();
    axios.post("https://chat-app-z.herokuapp.com/api/auth/register", data)
    .then(res => {
      console.log("Axios response", res);
      hide();
    })
    .catch(err => console.log("Axios error", err));
    reset();
  }

  return (
    <div className = "register">
      <h2>Register</h2>
    <form onSubmit={handleSubmit(onSubmit)} className = "registerform">
      <input name="username" ref={register} placeholder = "Username" />
      <br/>
      <input name="password" ref={register({ required: true })} placeholder = "Password" type = "password" />
      <br/>
      <button type = "submit">Register</button>
    </form>
    </div>
  )
}

export default Register; 