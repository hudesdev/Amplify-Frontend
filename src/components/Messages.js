import React, { useEffect, useState } from "react";
import axios from "axios";
import MessageForm from "./MessageForm";
import CircularProgress from '@material-ui/core/CircularProgress';
import MessageList from "./MessageList";
import ScrollToBottom from 'react-scroll-to-bottom';
import { css } from 'glamor';

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
        height: "65vh"
      });

    return (
        <div>
            {!loaded ? <CircularProgress color="secondary" /> :
            <ScrollToBottom className={ ROOT_CSS } >
            <MessageList messages = {messages} />
            </ScrollToBottom>}
            {loaded ? <p id = "temp">&nbsp;</p> : <p id = "temp">&nbsp;</p>}
            <MessageForm userid = {window.localStorage.getItem("username")} />
             {/* {window.localStorage.getItem("username") ? <h3 id = "welcome" >Welcome, {window.localStorage.getItem("username")}! <br/> <button onClick = {() => localStorage.removeItem("username")} className = "signout">Not {window.localStorage.getItem("username")}?</button></h3> : 
            <div className = "userform"> <UserForm /> </div>} */}
        </div>
    );
};

export default Messages;