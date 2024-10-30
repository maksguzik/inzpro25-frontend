import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

function LoginPage({isLoggedIn, setIsLoggedIn}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if(isLoggedIn){
      handleRedirect();
    }
  },[isLoggedIn]);

  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate('/');
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoggedIn(true);
  }

  const handleUsernameChange = (e) =>{
    setUsername(e.target.value);
  }

  const handlePasswordChange = (e) =>{
    setPassword(e.target.value);
  }

  return (
    <div className="loginContainer">
      <div>
      <svg viewBox="0 0 720 1440" class="waveLeft">
        <path fill="#ffffff" d="M0,0 C360,360 360,1080 0,1440 L0,1440 L360,1440 C720,1080 720,360 360,0 Z"></path>
    </svg>
    <svg viewBox="0 0 720 1440" class="waveRight">
        <path fill="#ffffff" d="M720,0 C360,360 360,1080 720,1440 L720,1440 L360,1440 C0,1080 0,360 360,0 Z"></path>
    </svg>
      </div>
      <h2 className = "LoginText">Login</h2>
      <form onSubmit={handleLogin} className="form">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={handleUsernameChange}
          className="input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
          className="input"
        />
        <button type="submit" className="LoginButton">
          Login
        </button>
        
      </form>
    </div>
  );
}

export default LoginPage;
