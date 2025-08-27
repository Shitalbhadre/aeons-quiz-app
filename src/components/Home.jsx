import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Quiz from "./Quiz";
import Admin from "./Admin"; // Import Admin component
import "./Home.css";

const Home = () => {
  const { user, logout } = useAuth();
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false); // Track if admin panel is open

  const subjects = [
    "Computer",
    "General Knowledge",
    "Physics",
    "Chemistry",
    "History",
    "English",
    "Current Affairs",
    "Sports",
  ];

  // If Admin panel is open, show Admin component
  if (isAdmin) {
    return <Admin onBack={() => setIsAdmin(false)} />;
  }

  return (
    <div className="homepage">
  {/* ✅ Only show welcome if on main dashboard */}
  {!selectedSubject && !isAdmin && (
    <>
      <h1>Welcome {user?.email}</h1>
      <p>You are now logged in 🎉</p>
    </>
  )}

  {/* Show Admin if isAdmin is true */}
  {isAdmin ? (
    <Admin onBack={() => setIsAdmin(false)} />
  ) : !selectedSubject ? (
    <section className="homepage">
      <h1>Welcome to QuizMaster 🎯</h1>
      <p>Select a subject to begin</p>
      <div className="subject-grid">
        {subjects.map((sub, index) => (
          <button
            key={index}
            className="subject-btn"
            onClick={() => setSelectedSubject(sub)}
          >
            {sub}
          </button>
        ))}
      </div>

      {/* Admin Button - visible only for you */}
      {user?.email === "shitalbhadre911@gmail.com" && (
        <button
          className="admin-btn"
          onClick={() => setIsAdmin(true)}
          style={{
            marginTop: "20px",
            backgroundColor: "red",
            color: "white",
            padding: "10px 20px",
            borderRadius: "5px",
          }}
        >
          🛠 Go to Admin Panel
        </button>
      )}
    </section>
  ) : (
    <Quiz subject={selectedSubject} onBack={() => setSelectedSubject(null)} />
  )}

  {/* Logout button always visible */}
  <button
    onClick={logout}
    style={{
      marginTop: "20px",
      backgroundColor: "#555",
      color: "white",
      padding: "10px 20px",
      borderRadius: "5px",
    }}
  >
    Logout
  </button>
</div>

  );
};

export default Home;
