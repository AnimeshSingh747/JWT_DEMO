// src/App.js

import React from "react";
import { Routes, Route } from 'react-router-dom';
import Signup from "./components/Signup";
import Login from "./components/Login";
import Profile from "./components/Profile";

const App = () => {
  return (
    <Routes>
      <div className="container">
        <h1>MERN Auth App</h1>
        <Routes>
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/profile" component={Profile} />
        </Routes>
      </div>
    </Routes>
  );
};

export default App;
