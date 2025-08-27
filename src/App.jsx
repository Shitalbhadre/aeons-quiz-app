import React, { useState } from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import "./App.css";

const AppContent = () => {
  const { user } = useAuth();
  const [showSignup, setShowSignup] = useState(false);

  if (user) return <Home />;

  return showSignup ? (
    <Signup switchToLogin={() => setShowSignup(false)} />
  ) : (
    <Login switchToSignup={() => setShowSignup(true)} />
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
    
  );
}

export default App;
