import React, { useState } from "react";
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

    if (!formData.email || !formData.password) {
      return toast.error("All fields are required");
    }

    try {
      const res = await axios.post(
        "https://auth-lqrk.onrender.com/api/login",
        formData
      );

      toast.success("Login Successful");

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username", res.data.username);

      // Navigate to home after 1s
      setTimeout(() => navigate("/home", { replace: true }), 1000);
    } catch (e) {
      toast.error(e.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="form-container">
        <h1>LogIn</h1>
        <label>Email:</label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <label>Password:</label>
        <input
          type="password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
        <button type="submit">LogIn</button>
        <a href="/signup">Don't have an account? Sign Up</a>
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
