import React, { useState } from "react";
import "../css/questions.css";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// This is the Questions component that renders the questions and answers for
// the quiz. It uses React hooks to manage state and handle user interactions.
export default function Questions() {
  // State to manage the current question index and user input
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState(""); // User's answer to the current question
  const [feedback, setFeedback] = useState(""); // Feedback message for the user
  const [showResults, setShowResults] = useState(false); // Flag to show the results of the current question
  const [quizResults, setQuizResults] = useState(null); // Results of the quiz

  // Get the quiz data from the URL location
  const location = useLocation();
  const quizData = location.state;
  const navigate = useNavigate(); // Function to navigate to another page

  // If there is no quiz data available, return a message
  if (!quizData) {
    return <p>No quiz data available.</p>;
  }

  // Get the questions from the quiz data
  const questions = quizData.Questions;

  // Set the topic of the quiz as "Javascript"
  quizData.Topic = "Javascript";

  // Handle changes to the user input
  const handleAnswerChange = (e) => {
    setUserAnswer(e.target.value); // Update the user's answer
  };

  // Handle submission of the user's answer
  const handleSubmitAnswer = async () => {
    if (userAnswer.trim() === "") {
      setFeedback("Please enter an answer."); // Show a feedback message if the answer is empty
      return;
    } else {
      setFeedback(""); // Clear the feedback message if the answer is not empty
    }

    // Log the current question and update the user's answer in the quiz data
    const currentQuestion = questions[currentQuestionIndex];
    quizData.Questions[currentQuestionIndex].UserAnswer = userAnswer;

    // Prepare the quiz data for grading
    const quiz = {
      Topic: quizData.Topic,
      Expertise: quizData.Expertise,
      NumberOfQuestions: quizData.NumberOfQuestions,
      StyleOfQuestion: quizData.StyleOfQuestion,
      Questions: questions.map((q, index) => ({
        Question: q.Question,
        Answer: q.Answer,
        UserAnswer: index === currentQuestionIndex ? userAnswer : q.UserAnswer,
        Source: q.Source,
      })),
    };

    // Send the quiz data to the server to be graded
    try {
      const response = await fetch("/api/gradeQuestion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Quiz: quiz,
          Question: quiz.Questions[currentQuestionIndex],
        }),
      });

      const data = await response.json();
      setQuizResults(JSON.parse(data.results)); // Update the results of the quiz
      setShowResults(true); // Show the results
    } catch (error) {
      setFeedback("An error occurred while grading the answer."); // Show an error message
    }
  };

  // Handle navigation to the next question
  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1); // Move to the next question
      setUserAnswer(""); // Clear the user's answer
      setFeedback(""); // Clear the feedback message
      setShowResults(false); // Hide the results
    }
  };

  // Handle submission of the quiz
  const handleSubmitQuiz = async () => {
    // Navigate to the results page
    navigate("/results");
  };

  // Render the component
  return (
    <div className="questions-container">
      <h1>
        Question {currentQuestionIndex + 1} of {questions.length}
      </h1>
      <h3>Question</h3>
      <p>{questions[currentQuestionIndex].Question}</p>
      <h3>Your Answer</h3>
      <input
        type="text"
        value={userAnswer}
        onChange={handleAnswerChange}
        placeholder="Type your answer here"
      />
      <button
        className="waves-effect waves-light btn"
        onClick={handleSubmitAnswer}
      >
        SUBMIT ANSWER
      </button>
      {feedback && <p>{feedback}</p>}
      <div className={` ${showResults ? "" : "hidden"}`}>
        <h3>Verners Evaluation</h3>
        {showResults && quizResults && (
          <div className="results-section">
            <div className="result">
              <p>{quizResults.Passed ? "Correct" : "Incorrect"}</p>
              <p>{quizResults.Reason}</p>
              <p></p>
            </div>
          </div>
        )}
        <div className="navigation-buttons">
          {currentQuestionIndex < questions.length - 1 ? (
            <>
              <button
                className={`waves-effect waves-light btn ${
                  showResults ? "" : "hidden"
                }`}
                onClick={handleNextQuestion}
                disabled={currentQuestionIndex === questions.length - 1}
              >
                Next
              </button>
            </>
          ) : (
            <button
              className="waves-effect waves-light btn"
              onClick={handleSubmitQuiz}
            >
              Submit Quiz
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
