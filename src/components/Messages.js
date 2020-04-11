import React, { useEffect, useState } from "react";
import axios from "axios";
import MessageForm from "./MessageForm";
import HighlightOffOutlinedIcon from '@material-ui/icons/HighlightOffOutlined';
import CircularProgress from '@material-ui/core/CircularProgress';

const Messages = () => {
    const [messages, setMessages] = useState([]);
    const [seconds, setSeconds] = useState(0);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => {      
            setSeconds(seconds + 1);
        }, 1000);

        return () => clearInterval(timer);
    });

    function sleeper(ms) {
        return function(x) {
          return new Promise(resolve => setTimeout(() => resolve(x), ms));
        };
      }

    useEffect(() => {
        axios.get("https://wraith-test.herokuapp.com/api/users")
        // .then(sleeper(2000))
        .then(res => {
            res.data.length >= 7 ? setMessages(res.data.slice(res.data.length - 7, res.data.length)) : setMessages(res.data);
            setLoaded(true);
        })
        .catch(err => console.log(err));
    }, [seconds]);

    return (
        <div>
            {!loaded ? <CircularProgress color="secondary" /> :
            messages.map(message => (
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