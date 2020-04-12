import React from 'react';
import './App.css';
import Messages from "./components/Messages";

function App() {
  return (
    <div className="App">
      <header className="App-header">
     <p>Messages</p>
      </header>
      <div className = "App-body">
      <div className = "messagescontainer">
      <Messages/>
      </div>
      </div>
    </div>
  );
}

export default App;
