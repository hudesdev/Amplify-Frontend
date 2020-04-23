import React, { useEffect, useState } from "react";
import axios from "axios";
import MessageForm from "./MessageForm";
import CircularProgress from '@material-ui/core/CircularProgress';
import MessageList from "./MessageList";
import ScrollToBottom from 'react-scroll-to-bottom';
import { css } from 'glamor';
const jwt = require("jsonwebtoken");

const Messages = () => {
    const [messages, setMessages] = useState([]);
    const [seconds, setSeconds] = useState(0);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => {      
            setSeconds(seconds + 1);
        }, 500);

        return () => clearInterval(timer);
    });

    // const sleeper = ms => x => new Promise(resolve => setTimeout(() => resolve(x), ms));

    useEffect(() => {
        axios.get("https://chat-app-z.herokuapp.com/api/messages")
        // .then(sleeper(4000))
        .then(res => {
            setMessages(res.data);
            setLoaded(true);
        })
        .catch(err => console.log(err));
    }, [seconds]);

    const ROOT_CSS = css({
        height: "57.5vh"
      });

    return (
        <div>
            {!loaded ? <CircularProgress color="secondary" /> :
            <ScrollToBottom className={ ROOT_CSS } >
            <MessageList messages = {messages} />
            </ScrollToBottom>}
            {window.localStorage.getItem("token") ? <p class = "welcomemessage">Welcome, {jwt.decode(JSON.parse(window.localStorage.getItem("token"))).username}! </p> : null}
            <MessageForm token = {window.localStorage.getItem("token")} />
        </div>
    );
};

export default Messages;