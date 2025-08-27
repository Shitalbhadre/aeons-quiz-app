import React, { useState } from "react";
import "./Admin.css";

const Admin = ({ onBack }) => {
  const [subject, setSubject] = useState("Computer");
  const [question, setQuestion] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("");
  const [ans, setAns] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Get old questions
    const existing = JSON.parse(localStorage.getItem("customQuestions")) || {};

    if (!existing[subject]) existing[subject] = [];

    const newQuestion = {
      question,
      option1,
      option2,
      option3,
      option4,
      ans: Number(ans),
    };

    existing[subject].push(newQuestion);
    localStorage.setItem("customQuestions", JSON.stringify(existing));

    alert("✅ Question added successfully!");

    // Reset form
    setQuestion("");
    setOption1("");
    setOption2("");
    setOption3("");
    setOption4("");
    setAns(1);
  };

  return (
    <div className="container">
      <h1>Admin Panel - Add Question</h1>
      <button onClick={onBack}>⬅ Back</button>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 mt-4">
        <label>
          Subject:
          <select value={subject} onChange={(e) => setSubject(e.target.value)}>
            <option>Computer</option>
            <option>General Knowledge</option>
            <option>Physics</option>
            <option>Chemistry</option>
            <option>History</option>
            <option>English</option>
            <option>Current Affairs</option>
            <option>Sports</option>
          </select>
        </label>
        <div className="options-group">
  <input value={option1} onChange={(e) => setOption1(e.target.value)} placeholder="Option 1" required />
  <input value={option2} onChange={(e) => setOption2(e.target.value)} placeholder="Option 2" required />
  <input value={option3} onChange={(e) => setOption3(e.target.value)} placeholder="Option 3" required />
  <input value={option4} onChange={(e) => setOption4(e.target.value)} placeholder="Option 4" required />
</div>
        <input type="number" min="1" max="4" value={ans} onChange={(e) => setAns(e.target.value)} placeholder="Correct Answer (1-4)" required />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Add Question</button>
      </form>
    </div>
  );
};

export default Admin;
