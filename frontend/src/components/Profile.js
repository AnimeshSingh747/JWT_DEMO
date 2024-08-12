import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem("authToken");

      if (!token) {
        navigate("/login"); // Use navigate instead of history.push
        return;
      }

      try {
        const { data } = await axios.get(
          "http://localhost:5000/api/auth/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUser(data);
      } catch (error) {
        console.error(error);
        localStorage.removeItem("authToken");
        navigate("/login"); // Use navigate instead of history.push
      }
    };

    fetchUserProfile();
  }, [navigate]); // Update dependency to navigate

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Profile</h2>
      <p>Username: {user.username}</p>
      <button
        onClick={() => {
          localStorage.removeItem("authToken");
          navigate("/login"); // Use navigate instead of history.push
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default Profile;
