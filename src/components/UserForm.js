import React from "react";
import { useForm } from "react-hook-form";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const UserForm = () => {
    const { handleSubmit, register, errors, reset } = useForm();

    const onSubmit = (values, e) => {
        console.log(values);
        window.localStorage.setItem("username", values.username);
        e.target.reset();
    };

    return (
        <div className = "userform">
            <form onSubmit={handleSubmit(onSubmit)}>
          <div className = "userfield">
            <TextField
            variant="outlined"
            size = "small"
            name="username"
            type="text"
            inputRef={register({
              required: null,
              validate: value =>
              value.length <= 10 || "No more than 10 characters."
            })}
            placeholder="Set a username"
          />
              <Button type="submit" size = "small" variant = "contained" color = "secondary">
            Set
          </Button>
          </div>
            </form>
            </div>
    )
};

export default UserForm;