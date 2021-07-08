import React from "react";
import moment from "moment";
import "moment-timezone";

const MessageList = ({ messages }) => {
    return (
        <div className = "messagelist">
              {messages.map(message => (
                <div key = {message.id} className = "message">
                    <div className = "timestamp">
                    <p>{moment.tz(message.created_at, "UTC").clone().tz(moment.tz.guess()).format('LT')}</p>
                    </div>
                    <div className = "username">
                    <p id = "writer">{message.username}:</p>
                    </div>
                     <p id = "usermessage">{message.message}</p>
                </div>))}
        </div>
    )
}

export default MessageList;