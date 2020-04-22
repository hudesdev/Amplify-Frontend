import React from 'react';
import './App.css';
import Messages from "./components/Messages";
import Register from "./components/Register";
import Login from "./components/Login";

function App() {
  return (
    <div className="App">
      <header className="App-header">
     <p>Messages</p>
      </header>
      <div className = "App-body">
      <div className = "messagescontainer">
      <Messages/>
      <Register />
      <Login />
      </div>
      </div>
    </div>
  );
}

export default App;
