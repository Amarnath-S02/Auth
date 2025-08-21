import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

import "./SignUp.scss";

const SignUp = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({ username: "", email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic form validation
    if (!userData.username || !userData.email || !userData.password) {
      return toast.error("All fields are required");
    }

    try {
      const res = await axios.post(
        "https://auth-lqrk.onrender.com/api/signup",
        userData
      );

      toast.success("Registration Successful");

      console.log(res.data);

      // Redirect to login after 1 second
      setTimeout(() => navigate("/login", { replace: true }), 1000);
    } catch (e) {
      // Show server error message if exists
      toast.error(e.response?.data?.message || "SignUp Failed");
    }
  };

  return (
    <div className="signup-container">
      <form onSubmit={handleSubmit} className="form-container">
        <h1>Sign Up</h1>

        <label>Username:</label>
        <input
          type="text"
          value={userData.username}
          onChange={(e) => setUserData({ ...userData, username: e.target.value })}
        />

        <label>Email:</label>
        <input
          type="email"
          value={userData.email}
          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
        />

        <label>Password:</label>
        <input
          type="password"
          value={userData.password}
          onChange={(e) => setUserData({ ...userData, password: e.target.value })}
        />

        <button type="submit">Sign Up</button>
      </form>

      <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} />
    </div>
  );
};

export default SignUp;
