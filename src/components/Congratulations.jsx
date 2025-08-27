import React, { useEffect, useRef } from "react";
import JSConfetti from "js-confetti";
import Typewriter from "typewriter-effect/dist/core";
import "./Congratulations.css"; // 👉 we'll add new CSS styles here

const Congratulations = () => {
  const h1Ref = useRef(null);

  useEffect(() => {
    const jsConfetti = new JSConfetti();

    // Confetti loop
    const confettiInterval = setInterval(() => {
      jsConfetti.addConfetti();
    }, 2000);

    // Typewriter effect
    if (h1Ref.current) {
      new Typewriter(h1Ref.current, {
        strings: ["🎉 Congratulations! You Won 🎉", "🔥 Great Job 🚀"],
        autoStart: true,
        loop: true,
      });
    }

    return () => clearInterval(confettiInterval);
  }, []);

  return (
    <div className="congrats-wrapper">
      <div className="congrats-card">
        <h1 ref={h1Ref} className="typewriter-text"></h1>
        <p>You have successfully completed the quiz.</p>
      </div>
    </div>
  );
};

export default Congratulations;
