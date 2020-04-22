import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
const jwt = require("jsonwebtoken");

const MessageForm = ({ token }) => {
    const { handleSubmit, register, errors, reset } = useForm();

    useEffect(() => {
      // This is a default, generic token - not sensitive
      window.localStorage.setItem("token", JSON.stringify("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjcsInVzZXJuYW1lIjoiR3Vlc3QiLCJpYXQiOjE1ODc1Njg1NzJ9.eOqAdf-ud-X35bs3Xzj-FySYDEmGYIxMMJUQzYadXIA"));
    }, []);

    const onSubmit = (values, e) => {
        if(token) {
        let decoded = jwt.decode(JSON.parse(token));
        values.username = decoded.username;
        axios.post("http://localhost:8000/api/messages", values, {headers: { authorization : JSON.parse(window.localStorage.getItem("token")) }})
        .then(res => console.log(res))
        .catch(err => console.log(err));
        reset();
        }
    };

    return (
        <div className = "messageform">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className = "fieldcontainer">
          <div style={{position: 'relative', display: 'inline-block'}} className = "field">
            <TextField
            fullWidth = "true"
            variant="outlined"
            name="message"
            type="text"
            inputRef={register({
              required: " ",
              validate: value =>
              value.length <= 250 || "No more than 250 characters."
            })}
            placeholder="Enter a message"
          />
          <ArrowDownwardIcon className = "arrow"onClick = {handleSubmit(onSubmit)} style = {{ position: 'absolute', right: 15, top: 15, width: 25, height: 25, color: "RGB(245,0,87)", transform: "scaleY(-1" }} />
          </div>
          </div>
          <p>{errors.message && errors.message.message}</p>

            </form>
            </div>
    )
};

export default MessageForm;