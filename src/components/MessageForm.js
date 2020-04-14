import React from "react";
import { useForm } from "react-hook-form";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axios from "axios";

const MessageForm = () => {
    const { handleSubmit, register, errors, reset } = useForm();

    const onSubmit = (values, e) => {
        console.log(values);
        axios.post("https://chat-app-z.herokuapp.com/api/messages", values)
        .then(res => console.log(res))
        .catch(err => console.log(err));
        e.target.reset();
    };

    return (
        <div className = "messageform">
            <form onSubmit={handleSubmit(onSubmit)}>
          <div className = "field">
            <TextField
            fullWidth = "true"
            variant="outlined"
            name="message"
            type="text"
            inputRef={register({
              required: "Please enter a message.",
              validate: value =>
              value.length <= 30 || "No more than 30 characters."
            })}
            placeholder="New Message"
          />
          </div>
          <p>{errors.message && errors.message.message}</p>
          <Button type="submit" variant = "contained" color = "secondary">
            Send
          </Button>

            </form>
            </div>
    )
};

export default MessageForm;