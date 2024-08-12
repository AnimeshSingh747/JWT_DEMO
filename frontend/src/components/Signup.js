// src/components/Signup.js

import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const registerHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("http://localhost:5000/api/auth/register", {
        username,
        password,
      });

      localStorage.setItem("authToken", data.token);
      alert("Registered successfully");
      history.push("/login");
    } catch (error) {
      console.error(error);
      alert("User already exists");
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={registerHandler}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Register</button>
      </form>
      <p>Already have an account? <a href="/login">Login</a></p>
    </div>
  );
};

export default Signup;
