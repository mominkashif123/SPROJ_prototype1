import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Papa from "papaparse";

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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-800 px-6 pt-20">
      <h1 className="text-3xl font-bold text-center mb-6">
        Chemistry {year} {session} {variant}
      </h1>
      <p className="text-lg text-gray-600 mb-6">
        Select an answer for each question.
      </p>
      <div className="w-full max-w-3xl">
        {Array.from({ length: 40 }, (_, i) => i + 1).map((questionNumber) => (
          <div key={questionNumber} className="mb-6">
            <h2 className="text-xl font-semibold mb-2">
              Question {questionNumber}
            </h2>
            <div className="flex space-x-4">
              {["A", "B", "C", "D"].map((option) => (
                <button
                  key={option}
                  className={`px-4 py-2 rounded-lg ${
                    userAnswers[questionNumber] === option
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                  onClick={() => handleAnswerChange(questionNumber, option)}
                >
                  {option}
                </button>
              ))}
            </div>
            {graded && (
              <p
                className={`mt-2 ${
                  userAnswers[questionNumber] === correctAnswers[questionNumber]
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                Correct Answer: {correctAnswers[questionNumber]}
              </p>
            )}
          </div>
        ))}
        <button
          className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          onClick={gradeAnswers}
        >
          Grade Answers
        </button>
        {graded && (
          <div className="mt-6 text-xl font-semibold">
            Your Score: {score} / 40
          </div>
        )}
      </div>
    </div>
  );
};

export default MCQPractice;
