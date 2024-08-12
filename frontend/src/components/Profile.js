// src/components/Profile.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem("authToken");

      if (!token) {
        history.push("/login");
        return;
      }

      try {
        const { data } = await axios.get("http://localhost:5000/api/auth/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(data);
      } catch (error) {
        console.error(error);
        localStorage.removeItem("authToken");
        history.push("/login");
      }
    };

    fetchUserProfile();
  }, [history]);

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Profile</h2>
      <p>Username: {user.username}</p>
      <button onClick={() => {
        localStorage.removeItem("authToken");
        history.push("/login");
      }}>Logout</button>
    </div>
  );
};

export default Profile;
