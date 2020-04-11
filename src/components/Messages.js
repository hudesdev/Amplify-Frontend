import React, { useEffect, useState } from "react";
import axios from "axios";
import MessageForm from "./MessageForm";
import HighlightOffOutlinedIcon from '@material-ui/icons/HighlightOffOutlined';

const Messages = () => {
    const [messages, setMessages] = useState([]);
    const [seconds, setSeconds] = useState(0);

    // useEffect(() => {
    //     const timer = setInterval(() => {      
    //         setSeconds(seconds + 1);
    //     }, 1000);

    //     return () => clearInterval(timer);
    // });

    useEffect(() => {
        axios.get("https://wraith-test.herokuapp.com/api/users")
        .then(res => res.data.length >= 7 ? setMessages(res.data.slice(res.data.length - 7, res.data.length)) : setMessages(res.data))
        .catch(err => console.log(err));
    }, [seconds]);

    return (
        <div>
            {messages.map(message => (
                <div key = {message.id} className = "message">
                     <p>{message.name}</p>
                <HighlightOffOutlinedIcon onClick = {() => axios.delete(`https://wraith-test.herokuapp.com/api/users/${message.id}`)} color = "secondary" className = "delete"></HighlightOffOutlinedIcon>
                </div>
            ))}
            <MessageForm />
        </div>
    );
};

export default Messages;