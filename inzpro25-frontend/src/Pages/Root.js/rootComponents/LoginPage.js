import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const URL = "localhost:3000/";

  useEffect(() => {
    if(isLoggedIn){
      handleRedirect();
    }
  });

  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate('/app');
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
      <h2>Log In</h2>
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
        <button type="submit" className="button">
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
