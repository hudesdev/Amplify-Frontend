import React from "react";
import { useForm } from "react-hook-form";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

const MessageForm = ({ userid }) => {
    const { handleSubmit, register, errors, reset } = useForm();

    const onSubmit = (values, e) => {
        if(userid) {
        values.username = userid;
        } 
        axios.post("https://chat-app-z.herokuapp.com/api/messages", values)
        .then(res => console.log(res))
        .catch(err => console.log(err));
        reset();
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
              value.length <= 35 || "No more than 35 characters."
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