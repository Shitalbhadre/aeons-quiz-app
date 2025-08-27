import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Load user from localStorage when app starts
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("currentUser"));
    if (savedUser) setUser(savedUser);
  }, []);

 const signup = (email, password) => {
  let users = JSON.parse(localStorage.getItem("users")) || [];

  // check if already exists
  if (users.find((u) => u.email === email)) {
    alert("User already exists! Please login.");
    return false;
  }

  const newUser = { email, password };
  users.push(newUser);

  localStorage.setItem("users", JSON.stringify(users));
  alert("Signup successful! Please login now.");
  return true; // ✅ don't setUser here
};


  const login = (email, password) => {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    const existingUser = users.find(
      (u) => u.email === email && u.password === password
    );

    if (existingUser) {
      localStorage.setItem("currentUser", JSON.stringify(existingUser));
      setUser(existingUser);
      return true;
    } else {
      alert("Invalid credentials! Please signup first.");
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("currentUser");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
