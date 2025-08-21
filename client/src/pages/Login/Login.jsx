import React from "react";
import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

import "./Login.scss";
const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("https://auth-lqrk.onrender.com/api/login", formData);

      toast.success("Login Successful");

      // Save token and username
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username", res.data.username);

      console.log(res.data);

      setTimeout(() => navigate("/home"), 2000);
    } catch (e) {
      toast.error("Login Failed: " + e.response?.data);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="form-container">
        <h1>LogIn</h1>
        <label> Email:</label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => {
            setFormData({ ...formData, email: e.target.value });
          }}
        />
        <label> Password:</label>
        <input
          type="password"
          value={formData.password}
          onChange={(e) => {
            setFormData({ ...formData, password: e.target.value });
          }}
        />
        <button type="submit">LogIn</button>
        <a href="">Forget Password?</a>
      </form>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        theme="light"
      />
    </div>
  );
};

export default Login;
