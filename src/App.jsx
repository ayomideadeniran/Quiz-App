import React, { useState, useEffect } from "react";
import "./App.css";

// Define the quiz questions and answers
const initialQuizData = [
  {
    question: "What is the output of `typeof null` in JavaScript?",
    options: ["object", "null", "undefined", "string"],
    correctAnswer: "object",
  },
  {
    question: "Which company developed React?",
    options: ["Google", "Microsoft", "Facebook", "Twitter"],
    correctAnswer: "Facebook",
  },
  {
    question: "What does CSS stand for?",
    options: [
      "Creative Style Sheets",
      "Cascading Style Sheets",
      "Computer Style Sheets",
      "Colorful Style Sheets",
    ],
    correctAnswer: "Cascading Style Sheets",
  },
  {
    question: "Which HTML tag is used to define an unordered list?",
    options: ["<ol>", "<li>", "<ul>", "<list>"],
    correctAnswer: "<ul>",
  },
];

/**
 * Shuffles an array in place using the Fisher-Yates algorithm.
 * @param {Array} array The array to shuffle.
 * @returns {Array} The shuffled array.
 */
const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]]; // Swap elements
  }
  return newArray;
};

function QuizApp() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null); // Stores the selected option string
  const [score, setScore] = useState(0);
  const [isQuizOver, setIsQuizOver] = useState(false);
  const [feedback, setFeedback] = useState(""); // For correct/incorrect messages

  // Function to initialize or restart the quiz
  const loadQuiz = () => {
    const shuffledQuestions = shuffleArray(initialQuizData).map((q) => ({
      ...q,
      options: shuffleArray(q.options), // Randomize options as well
    }));
    setQuestions(shuffledQuestions);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setIsQuizOver(false);
    setFeedback("");
  };

  // Load quiz on initial mount
  useEffect(() => {
    loadQuiz();
  }, []);

  const handleAnswerSelect = (option) => {
    if (selectedAnswer) return; // Prevent re-answering the current question

    setSelectedAnswer(option);
    const currentQuestion = questions[currentQuestionIndex];
    if (option === currentQuestion.correctAnswer) {
      setScore((prevScore) => prevScore + 1);
      setFeedback("Correct!");
    } else {
      setFeedback(
        `Incorrect. The correct answer is: ${currentQuestion.correctAnswer}`
      );
    }
  };

  const handleNextQuestion = () => {
    setFeedback("");
    setSelectedAnswer(null); // Reset selected answer for the next question

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      setIsQuizOver(true); // Quiz ends
    }
  };

  const handleRestartQuiz = () => {
    loadQuiz(); // This will reset all states and shuffle questions/options again
  };

  if (questions.length === 0) {
    return <div className="quiz-container loading">Loading quiz...</div>;
  }

  if (isQuizOver) {
    return (
      <div className="quiz-container score-screen">
        <h2>Quiz Completed!</h2>
        <p>
          Your final score is: {score} out of {questions.length}
        </p>
        <button
          onClick={handleRestartQuiz}
          className="quiz-button restart-button"
        >
          Restart Quiz
        </button>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="quiz-container">
      <header className="quiz-header">
        <h1>Quiz Time!</h1>
      </header>
      <div className="question-section">
        <h2 className="question-count">
          Question {currentQuestionIndex + 1}
          <span>/{questions.length}</span>
        </h2>
        <p className="question-text">{currentQuestion.question}</p>
      </div>

      <div className="answer-section">
        {currentQuestion.options.map((option) => {
          const isSelectedUserChoice = selectedAnswer === option;
          const isCorrectAnswer = currentQuestion.correctAnswer === option;
          let buttonClass = "quiz-button option-button";

          if (selectedAnswer) {
            // If an answer has been selected for the current question
            if (isCorrectAnswer) {
              buttonClass += " correct"; // Highlight the correct answer green
            } else if (isSelectedUserChoice) {
              // If this option was the user's (wrong) choice
              buttonClass += " incorrect"; // Highlight the user's wrong choice red
            }
          }

          return (
            <button
              key={option} // Assuming options within a question are unique strings
              onClick={() => handleAnswerSelect(option)}
              disabled={selectedAnswer !== null} // Disable all options after one is picked
              className={buttonClass}
            >
              {option}
            </button>
          );
        })}
      </div>

      {feedback && (
        <p
          className={`feedback-message ${
            feedback.startsWith("Correct") ? "correct-text" : "incorrect-text"
          }`}
        >
          {feedback}
        </p>
      )}

      {selectedAnswer && (
        <button
          onClick={handleNextQuestion}
          className="quiz-button next-button"
        >
          {currentQuestionIndex < questions.length - 1
            ? "Next Question"
            : "Show Score"}
        </button>
      )}
    </div>
  );
}

export default QuizApp;
