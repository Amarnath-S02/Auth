import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.scss"; // Import SCSS

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token
    localStorage.removeItem("username"); // Optional: remove username
    navigate("/login", { replace: true }); // Redirect to login
  };

  const username = localStorage.getItem("username"); // Get username to display

  return (
    <div className="homepage">
      {/* Navbar */}
      <nav className="navbar">
        <h1 className="logo">SkillBridge</h1>
        <div className="nav-buttons">
          {username ? (
            <>
              <span className="welcome">Welcome, {username}</span>
              <button className="logout" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <button className="sign-in" onClick={() => navigate("/login")}>
                Sign In
              </button>
              <button className="join" onClick={() => navigate("/signup")}>
                Join
              </button>
            </>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-text">
          <h2>Connect. Collaborate. Create.</h2>
          <p>
            SkillBridge is the platform where freelancers and clients come
            together to work on amazing projects.
          </p>
          <button className="explore-btn">Explore Services</button>
        </div>
        <div className="hero-image"></div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h3>What You Can Do</h3>
        <div className="feature-cards">
          <div className="card">
            <h4>Post Services</h4>
            <p>Freelancers can showcase their skills and offer services.</p>
          </div>
          <div className="card">
            <h4>Find Experts</h4>
            <p>Clients can search and hire freelancers for projects.</p>
          </div>
          <div className="card">
            <h4>Collaborate</h4>
            <p>Seamless messaging and project management for both sides.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2025 SkillBridge. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
