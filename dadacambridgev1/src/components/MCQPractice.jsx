import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Papa from "papaparse";
import { motion } from "framer-motion";

const MCQPractice = () => {
  const { year, session, variant } = useParams();
  const [userAnswers, setUserAnswers] = useState({});
  const [correctAnswers, setCorrectAnswers] = useState({});
  const [graded, setGraded] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    fetch("/mcq_answers.csv")
      .then((response) => response.text())
      .then((csvText) => {
        Papa.parse(csvText, {
          header: true,
          complete: (results) => {
            const filteredQuestions = results.data
              .filter((row) => row.year === year)
              .filter(
                (row) => row.session.toLowerCase() === session.toLowerCase()
              )
              .filter((row) => row.variant === variant)
              .filter((row) => row.question && row.answer)
              .map((row) => ({
                question: parseInt(row.question, 10),
                answer: row.answer.trim(),
              }));
            const answers = {};
            filteredQuestions.forEach((question) => {
              answers[question.question] = question.answer;
            });
            setCorrectAnswers(answers);
          },
        });
      });
  }, [year, session, variant]);

  const handleAnswerChange = (questionNumber, answer) => {
    setUserAnswers({ ...userAnswers, [questionNumber]: answer });
  };

  const gradeAnswers = () => {
    let correctCount = 0;
    for (let i = 1; i <= 40; i++) {
      if (userAnswers[i] === correctAnswers[i]) {
        correctCount++;
      }
    }
    setScore(correctCount);
    setGraded(true);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-teal-50 to-teal-70 text-gray-900 px-6 py-20">
    {/* Header */}
    <motion.h1 
      className="text-4xl font-extrabold text-center mb-6 text-gray-800"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      Chemistry {year} {session} {variant}
    </motion.h1>
    <p className="text-lg text-gray-700 mb-8 text-center">
      Select an answer for each question and test your knowledge.
    </p>

    <div className="w-full max-w-4xl space-y-6">
      {Array.from({ length: 40 }, (_, i) => i + 1).map((questionNumber) => (
        <motion.div
          key={questionNumber}
          className="p-5 bg-white rounded-2xl shadow-sm hover:shadow-md"
          whileHover={{ scale: 1.02 }}
        >
          {/* Question Number */}
          <h2 className="text-xl font-semibold mb-3 text-gray-800">
            Question {questionNumber}
          </h2>

          {/* MCQ Options */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {["A", "B", "C", "D"].map((option) => (
              <motion.button
                key={option}
                className={`py-3 px-4 rounded-lg text-lg font-medium transition-all duration-50 ${
                  userAnswers[questionNumber] === option
                    ? "bg-teal-500 text-white shadow-lg scale-105"
                    : "bg-gray-200 text-gray-800 hover:bg-teal-200"
                }`}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleAnswerChange(questionNumber, option)}
              >
                {option}
              </motion.button>
            ))}
          </div>

          {/* Correct Answer Feedback */}
          {graded && (
            <p
              className={`mt-3 text-lg font-semibold ${
                userAnswers[questionNumber] === correctAnswers[questionNumber]
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {userAnswers[questionNumber] === correctAnswers[questionNumber]
                ? "✅ Correct!"
                : `❌ Correct Answer: ${correctAnswers[questionNumber]}`}
            </p>
          )}
        </motion.div>
      ))}

      {/* Grade Answers Button */}
      <motion.button
        className="mt-6 w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-teal-500 to-teal-700 text-white rounded-lg shadow-lg hover:scale-105 transition-all duration-300"
        whileHover={{ scale: 1.05 }}
        onClick={gradeAnswers}
      >
        Grade Answers
      </motion.button>

      {/* Score Display */}
      {graded && (
        <motion.div 
          className="mt-6 text-2xl font-semibold text-center text-teal-600"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          🎯 Your Score: {score} / 40
        </motion.div>
      )}
    </div>
  </div>
);
};
export default MCQPractice;
