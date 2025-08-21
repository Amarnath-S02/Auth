import React from "react";
import Home from "./pages/Home/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp/SignUp";
import Login from "./pages/Login/Login";
import { Navigate } from "react-router-dom";
const App = () => {
  const token = localStorage.getItem("token");
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/login" element={<Login />} />

          <Route
            path="/home"
            element={token ? <Home /> : <Navigate to="/login" />}
          />
          <Route path="*" element={<Navigate to="/signup" />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
