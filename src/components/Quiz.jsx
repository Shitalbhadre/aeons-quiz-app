// src/components/Quiz.jsx
import { useState, useRef, useEffect } from "react";
import Congratulations from "./Congratulations";
import "./Quiz.css";

import {
  quizzes,
  gkData,
  physicsData,
  chemistryData,
  historyData,
  englishData,
  currentAffairsData,
  sportsData
} from "../assets/data"; // ✅ fixed path

// ✅ Map subjects to their data
const subjectMap = {
  Computer: quizzes,
  "General Knowledge": gkData,
  Physics: physicsData,
  Chemistry: chemistryData,
  History: historyData,
  English: englishData,
  "Current Affairs": currentAffairsData,
  Sports: sportsData,
};

const Quiz = ({ subject, onBack }) => {
  const [data, setData] = useState([]);
  const [index, setIndex] = useState(0);
  const [question, setQuestion] = useState(null);
  const [lock, setLock] = useState(false);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const Option1 = useRef(null);
  const Option2 = useRef(null);
  const Option3 = useRef(null);
  const Option4 = useRef(null);

  const option_array = [Option1, Option2, Option3, Option4];

  // Load subject data when Quiz starts
// Load subject data when Quiz starts
useEffect(() => {
  if (subject && subjectMap[subject]) {
    // Static data
    let baseData = subjectMap[subject];

    // Custom questions from localStorage
    const custom = JSON.parse(localStorage.getItem("customQuestions")) || {};
    if (custom[subject]) {
      baseData = [...baseData, ...custom[subject]];
    }

    setData(baseData);
    setIndex(0);
    setQuestion(baseData[0]);
    setScore(0);
    setLock(false);
    setShowResult(false);
  }
}, [subject]);


  const checkAns = (e, ans) => {
    if (!lock) {
      if (question.ans === ans) {
        e.target.classList.add("correct");
        setScore((prev) => prev + 1);
      } else {
        e.target.classList.add("wrong");
        option_array[question.ans - 1].current.classList.add("correct");
      }
      setLock(true);
    }
  };

  const next = () => {
    if (lock) {
      const newIndex = index + 1;
      if (newIndex < data.length) {
        setIndex(newIndex);
        setQuestion(data[newIndex]);
        setLock(false);
        option_array.forEach((option) => {
          option.current.classList.remove("wrong");
          option.current.classList.remove("correct");
        });
      } else {
        setShowResult(true);
      }
    }
  };

  const resetQuiz = () => {
    setIndex(0);
    setQuestion(data[0]);
    setScore(0);
    setLock(false);
    setShowResult(false);
    option_array.forEach((option) => {
      option.current.classList.remove("wrong");
      option.current.classList.remove("correct");
    });
  };

  if (!question) return <h2>Loading quiz...</h2>;

  return (
    <div className="container">
      <h1>{subject} Quiz</h1>
      <hr />

      {!showResult ? (
        <>
          <h2>
            {index + 1}. {question.question}
          </h2>
          <ul>
            <li ref={Option1} onClick={(e) => checkAns(e, 1)}>
              {question.option1}
            </li>
            <li ref={Option2} onClick={(e) => checkAns(e, 2)}>
              {question.option2}
            </li>
            <li ref={Option3} onClick={(e) => checkAns(e, 3)}>
              {question.option3}
            </li>
            <li ref={Option4} onClick={(e) => checkAns(e, 4)}>
              {question.option4}
            </li>
          </ul>
          <button onClick={next}>Next</button>
          <div className="index">
            {index + 1} of {data.length} questions
          </div>
        </>
      ) : (
        <>
          {score >= Math.ceil(data.length / 2) ? (
            <div className="result">
              <Congratulations />
              <h2>🏆 You Won!</h2>
              <p>
                You scored <strong>{score}</strong> out of{" "}
                <strong>{data.length}</strong> 🎯
              </p>
              <button onClick={resetQuiz}>Restart Quiz</button>
              <button onClick={onBack}>⬅ Back to Home</button>
            </div>
          ) : (
            <div className="result">
              <h2>🎉 Quiz Finished!</h2>
              <p>
                You scored <strong>{score}</strong> out of{" "}
                <strong>{data.length}</strong> 🎯
              </p>
              <p className="try-again">😅 Better Luck Next Time!</p>
              <button onClick={resetQuiz}>Restart Quiz</button>
              <button onClick={onBack}>⬅ Back to Home</button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Quiz;
