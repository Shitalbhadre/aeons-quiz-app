import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

const Signup = ({ switchToLogin }) => {
  const { signup } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (signup(email, password)) {
      switchToLogin(); // ✅ redirect to login after successful signup
    }
  };

  return (
    <div className="auth-container">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="email" 
          placeholder="Email"
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        <input 
          type="password" 
          placeholder="Password"
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        <button type="submit">Signup</button>
      </form>
      <p>Already have an account? 
        <span onClick={switchToLogin} style={{cursor:"pointer", color:"yellow"}}>
          Login
        </span>
      </p>
    </div>
  );
};

export default Signup;
