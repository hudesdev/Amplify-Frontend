import React, { useEffect, useState } from "react";
import axios from "axios";
import MessageForm from "./MessageForm";
import CircularProgress from '@material-ui/core/CircularProgress';
// import IconButton from '@material-ui/core/IconButton';
// import DeleteIcon from '@material-ui/icons/Delete';
import moment from "moment";
import "moment-timezone";
import UserForm from "./UserForm";

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
        axios.get("https://chat-app-z.herokuapp.com/api/messages")
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
            {window.localStorage.getItem("username") ? <h3 id = "welcome" >Welcome, {window.localStorage.getItem("username")}! <br/> <button onClick = {() => localStorage.removeItem("username")} className = "signout">Not {window.localStorage.getItem("username")}?</button></h3> : 
            <div className = "userform"> <UserForm /> </div>}
            {!loaded ? <CircularProgress color="secondary" /> :
            messages.map(message => (
                <div key = {message.id} className = "message">
                    <div className = "timestamp">
                    <p>{moment.tz(message.created_at, "UTC").clone().tz(moment.tz.guess()).format('LT')}</p>
                    </div>
                    <div className = "username">
                    <p id = "writer">{message.username}:</p>
                    </div>
                     <p id = "usermessage">{message.message}</p>
                     <div className = "delete">
                 {/* <IconButton aria-label="delete" color = "secondary" size = "small">
                     <DeleteIcon onClick = {() => axios.delete(`https://chat-app-z.herokuapp.com/api/messages/${message.id}`)} />
                     </IconButton> */}
                     </div>
                </div>
            ))}
            {typing && loaded ? <p id = "typing">&nbsp;</p> : <p id = "typing">&nbsp;</p>}
            <MessageForm userid = {window.localStorage.getItem("username")} />
        </div>
    );
};

export default Messages;