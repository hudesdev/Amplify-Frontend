import React from 'react'
import { useForm } from 'react-hook-form'
import axios from "axios";

const Register = () => {

  const { register, handleSubmit, reset } = useForm()

  const onSubmit = data => { 
    console.log("Register data", data)
    axios.post("http://localhost:8000/api/auth/register", data)
    .then(res => console.log("Axios response", res))
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