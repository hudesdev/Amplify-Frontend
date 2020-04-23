import React from 'react';
import './App.css';
import Messages from "./components/Messages";
import RegisterModal from "./components/RegisterModal";
import LoginModal from "./components/LoginModal";
import useLoginModal from "./components/hooks/useLoginModal";
import useRegisterModal from "./components/hooks/useRegisterModal";

function App() {
  const {isRegister, toggleRegister} = useRegisterModal();
  const {isLogin, toggleLogin} = useLoginModal();
  return (
    <div className="App">
      <div className = "authbuttons">
      <button className = "authbutton" onClick={toggleRegister}>Register</button>
      <RegisterModal isRegister = {isRegister} hide = {toggleRegister} />
      <button className = "authbutton" onClick={toggleLogin}>Login</button>
      <LoginModal isLogin = {isLogin} hide = {toggleLogin} />
      </div>
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
