import React, { useEffect, useState } from "react";
import axios from "axios";
import MessageForm from "./MessageForm";
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import moment from "moment";

const Messages = () => {
    const [messages, setMessages] = useState([]);
    const [seconds, setSeconds] = useState(0);
    const [loaded, setLoaded] = useState(false);
    const [typing, setTyping] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => {      
            setSeconds(seconds + 1);
        }, 500);

        return () => clearInterval(timer);
    });

    const sleeper = ms => x => new Promise(resolve => setTimeout(() => resolve(x), ms));

    useEffect(() => {
        axios.get("https://wraith-test.herokuapp.com/api/users")
        // .then(sleeper(4000))
        .then(res => {
            res.data.length >= 6 ? setMessages(res.data.slice(res.data.length - 6, res.data.length)) : setMessages(res.data);
            setLoaded(true);
        })
        .catch(err => console.log(err));
    }, [seconds]);

    useEffect(() => {
        setTimeout(() => {
            setTyping(!typing);
          }, Math.floor(Math.random() * (5000 - 2000 + 1)) + 2000);
    }, [typing]);

    return (
        <div>
            {!loaded ? <CircularProgress color="secondary" /> :
            messages.map(message => (
                <div key = {message.id} className = "message">
                    <div className = "timestamp">
                    <p>{moment().format('LT')}</p>
                    </div>
                    <div className = "username">
                    <p>Zahid:</p>
                    </div>
                     <p>{message.name}</p>
                <IconButton aria-label="delete" color = "secondary" size = "small">
                    <DeleteIcon className = "delete" onClick = {() => axios.delete(`https://wraith-test.herokuapp.com/api/users/${message.id}`)} />
                    </IconButton>
                </div>
            ))}
            {typing && loaded ? <p id = "typing">Someone is typing...</p> : <p id = "typing">&nbsp;</p>}
            <MessageForm />
        </div>
    );
};

export default Messages;