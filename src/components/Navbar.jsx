import React from "react";
import { Link } from "react-router-dom";


const Navbar = () => {
  return (
    <nav className="navbar">
      <h2 className="logo">QuizMaster 🎯</h2>
      <div className="nav-links">
        <Link to="/" className="nav-btn">Home</Link>
        <Link to="/login" className="nav-btn">Login</Link>
        <Link to="/signup" className="nav-btn">Signup</Link>
      </div>
    </nav>
  );
};

export default Navbar;
