import React, { useState, useEffect } from "react";
import { CheckCircle, XCircle, RotateCcw, Trophy, Brain } from "lucide-react";

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
  const [showFeedback, setShowFeedback] = useState(false);

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
    setShowFeedback(false);
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
    
    // Show feedback with animation
    setTimeout(() => setShowFeedback(true), 100);
  };

  const handleNextQuestion = () => {
    setFeedback("");
    setShowFeedback(false);
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

  const getScoreMessage = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage === 100) return "Perfect! 🎉";
    if (percentage >= 80) return "Excellent! 🌟";
    if (percentage >= 60) return "Good job! 👍";
    if (percentage >= 40) return "Not bad! 📚";
    return "Keep learning! 💪";
  };

  const progressPercentage = questions.length > 0 ? ((currentQuestionIndex + 1) / questions.length) * 100 : 0;

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
          <div className="flex items-center space-x-3">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            <span className="text-white text-lg font-medium">Loading quiz...</span>
          </div>
        </div>
      </div>
    );
  }

  if (isQuizOver) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 text-center transform animate-in fade-in duration-500">
          <div className="mb-6">
            <Trophy className="h-16 w-16 text-yellow-400 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-white mb-2">Quiz Completed!</h1>
            <p className="text-white/80 text-lg">{getScoreMessage()}</p>
          </div>
          
          <div className="bg-white/10 rounded-2xl p-6 mb-8 border border-white/20">
            <div className="text-4xl font-bold text-white mb-2">
              {score}/{questions.length}
            </div>
            <div className="text-white/80">Final Score</div>
            <div className="mt-4 bg-white/20 rounded-full h-3 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-green-400 to-blue-500 h-full rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${(score / questions.length) * 100}%` }}
              ></div>
            </div>
          </div>
          
          <button
            onClick={handleRestartQuiz}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-200 transform hover:scale-105 hover:shadow-lg flex items-center justify-center space-x-2"
          >
            <RotateCcw className="h-5 w-5" />
            <span>Try Again</span>
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 pt-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Brain className="h-8 w-8 text-purple-300" />
            <h1 className="text-4xl font-bold text-white">Quiz Time!</h1>
          </div>
          
          {/* Progress Bar */}
          <div className="bg-white/20 rounded-full h-3 overflow-hidden mb-4">
            <div 
              className="bg-gradient-to-r from-purple-400 to-blue-400 h-full rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          
          <div className="flex justify-between text-white/80 text-sm">
            <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
            <span>Score: {score}</span>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 mb-6 transform animate-in slide-in-from-right duration-500">
          <h2 className="text-2xl font-semibold text-white mb-8 leading-relaxed">
            {currentQuestion.question}
          </h2>

          {/* Answer Options */}
          <div className="grid gap-4">
            {currentQuestion.options.map((option, index) => {
              const isSelectedUserChoice = selectedAnswer === option;
              const isCorrectAnswer = currentQuestion.correctAnswer === option;
              let buttonClasses = "w-full p-4 rounded-2xl text-left font-medium transition-all duration-300 border-2 ";

              if (selectedAnswer) {
                // If an answer has been selected for the current question
                if (isCorrectAnswer) {
                  buttonClasses += "bg-green-500/20 border-green-400 text-green-100 transform scale-105"; // Correct answer
                } else if (isSelectedUserChoice) {
                  buttonClasses += "bg-red-500/20 border-red-400 text-red-100"; // User's wrong choice
                } else {
                  buttonClasses += "bg-white/5 border-white/20 text-white/60"; // Other options
                }
              } else {
                buttonClasses += "bg-white/10 border-white/20 text-white hover:bg-white/20 hover:border-white/40 hover:transform hover:scale-105 hover:shadow-lg";
              }

              return (
                <button
                  key={option}
                  onClick={() => handleAnswerSelect(option)}
                  disabled={selectedAnswer !== null}
                  className={buttonClasses}
                >
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold">
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span className="flex-1">{option}</span>
                    {selectedAnswer && isCorrectAnswer && (
                      <CheckCircle className="h-6 w-6 text-green-400" />
                    )}
                    {selectedAnswer && isSelectedUserChoice && !isCorrectAnswer && (
                      <XCircle className="h-6 w-6 text-red-400" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Feedback */}
          {feedback && (
            <div className={`mt-6 p-4 rounded-2xl text-center font-medium transform transition-all duration-500 ${
              showFeedback ? 'animate-in slide-in-from-bottom' : 'opacity-0'
            } ${
              feedback.startsWith("Correct") 
                ? "bg-green-500/20 border border-green-400/50 text-green-100" 
                : "bg-red-500/20 border border-red-400/50 text-red-100"
            }`}>
              <div className="flex items-center justify-center space-x-2">
                {feedback.startsWith("Correct") ? (
                  <CheckCircle className="h-5 w-5" />
                ) : (
                  <XCircle className="h-5 w-5" />
                )}
                <span>{feedback}</span>
              </div>
            </div>
          )}

          {/* Next Button */}
          {selectedAnswer && (
            <div className="mt-6 text-center">
              <button
                onClick={handleNextQuestion}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 px-8 rounded-2xl transition-all duration-200 transform hover:scale-105 hover:shadow-lg animate-in slide-in-from-bottom duration-300"
              >
                {currentQuestionIndex < questions.length - 1 ? "Next Question" : "Show Results"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default QuizApp;