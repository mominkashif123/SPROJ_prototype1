import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const subjects = {
  "O Level": [
    { name: "PakStudies", available: true },
    { name: "Chemistry", available: true },
    { name: "Physics", available: false },
    { name: "Biology", available: false },
    { name: "Maths", available: false },
    { name: "Islamic Studies", available: false },
    { name: "English Language", available: false },
    { name: "Computer Science", available: false },
  ],
  "A Level": [
    { name: "Business", available: false },
    { name: "Economics", available: false },
    { name: "Accounting", available: false },
    { name: "Psychology", available: false },
    { name: "Law", available: false },
    { name: "Sociology", available: false },
    { name: "Further Maths", available: false },
    { name: "Computer Science", available: false },
  ],
};

const PracticeOnline = () => {
  const [level, setLevel] = useState(null);
  const navigate = useNavigate();

  const handleLevelSelect = (selectedLevel) => {
    setLevel(selectedLevel);
  };

  const handleSubjectSelect = (selectedSubject) => {
    navigate(`/practice/${selectedSubject.toLowerCase()}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-teal-50 to-teal-70 text-gray-800 px-6 py-20">
      <h1 className="text-5xl font-extrabold text-gray-900 mb-6 text-center">
        Practice Online
      </h1>
      <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl">
      Get ready for your exams by practicing with a variety of online
      exercises.
      </p>

      {!level ? (
        <div className="w-full max-w-md">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full mb-4 px-6 py-4 bg-teal-600 text-white rounded-xl text-xl font-semibold shadow-lg hover:bg-teal-700 transition duration-300"
            onClick={() => handleLevelSelect("O Level")}
          >
            O Level
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            className="w-full mb-4 px-6 py-4 bg-gray-400 text-white rounded-xl text-xl font-semibold shadow-lg cursor-not-allowed"
            disabled
          >
            A Level (Coming Soon, Stay Tuned!)
          </motion.button>
        </div>
      ) : (
        <div className="w-full max-w-5xl">
          <h2 className="text-3xl font-semibold text-gray-900 mb-6 text-center">
            Choose a Subject ({level})
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {subjects[level].map((subject) => (
              <motion.div
                key={subject.name}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`h-40 p-6 bg-white rounded-2xl shadow-lg flex items-center justify-between ${
                  subject.available ? "cursor-pointer hover:bg-teal-100" : "opacity-60 cursor-not-allowed"
                }`}
                onClick={() => subject.available && handleSubjectSelect(subject.name)}
              >
                <span className="text-xl font-semibold text-gray-800">
                  {subject.name}
                </span>
                <span className={`px-3 py-1 text-sm font-medium rounded-lg ${subject.available ? "bg-teal-500 text-white" : "bg-gray-400 text-white"}`}>
                  {subject.available ? "Available" : "Coming Soon"}
                </span>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <button
              className="px-6 py-3 bg-gray-300 text-gray-800 rounded-xl text-lg font-semibold hover:bg-gray-400 transition duration-300"
              onClick={() => setLevel(null)}
            >
              Back to Levels
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PracticeOnline;
