import React, { useEffect, useState } from "react";
import axios from "axios";
import MessageForm from "./MessageForm";
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

const Messages = () => {
    const [messages, setMessages] = useState([]);
    const [seconds, setSeconds] = useState(0);
    const [loaded, setLoaded] = useState(false);

    // useEffect(() => {
    //     const timer = setInterval(() => {      
    //         setSeconds(seconds + 1);
    //     }, 1000);

    //     return () => clearInterval(timer);
    // });

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
                    <div className = "timestamp">
                    <p>3:05 PM</p>
                    </div>
                     <p>{message.name}</p>
                <IconButton aria-label="delete" color = "secondary" size = "small">
                    <DeleteIcon className = "delete" onClick = {() => axios.delete(`https://wraith-test.herokuapp.com/api/users/${message.id}`)} />
                    </IconButton>
                </div>
            ))}
            <p id = "typing">Someone is typing...</p>
            <MessageForm />
        </div>
    );
};

export default Messages;