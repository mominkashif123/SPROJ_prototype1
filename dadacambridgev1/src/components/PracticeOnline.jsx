import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-800 px-6 pt-20">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-4 text-center">
        Practice Online
      </h1>
      <p className="text-lg text-gray-600 text-center mb-12">
        Get ready for your exams by practicing with a variety of online
        exercises.
      </p>

      {!level ? (
        <div className="w-full max-w-md">
          <button
            className="w-full mb-3 px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 text-lg font-semibold"
            onClick={() => handleLevelSelect("O Level")}
          >
            O Level
          </button>
          <button
            className="w-full mb-3 px-6 py-3 bg-gray-400 text-white rounded-lg text-lg font-semibold"
            disabled
          >
            A Level (Coming Soon, Stay Tuned!)
          </button>
        </div>
      ) : (
        <div className="w-full max-w-md">
          <button
            className="w-full mb-3 px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 text-lg font-semibold"
            onClick={() => handleSubjectSelect("PakStudies")}
          >
            PakStudies
          </button>
          <button
            className="w-full mb-3 px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 text-lg font-semibold"
            onClick={() => handleSubjectSelect("Chemistry")}
          >
            Chemistry
          </button>
          <button
            className="w-full mb-3 px-6 py-3 bg-gray-400 text-white rounded-lg text-lg font-semibold"
            disabled
          >
            Physics (Coming Soon, Stay Tuned!)
          </button>
          <button
            className="w-full mb-3 px-6 py-3 bg-gray-400 text-white rounded-lg text-lg font-semibold"
            disabled
          >
            Biology (Coming Soon, Stay Tuned!)
          </button>
          <button
            className="w-full mb-3 px-6 py-3 bg-gray-400 text-white rounded-lg text-lg font-semibold"
            disabled
          >
            Maths (Coming Soon, Stay Tuned!)
          </button>
          <button
            className="w-full mb-3 px-6 py-3 bg-gray-400 text-white rounded-lg text-lg font-semibold"
            disabled
          >
            Islamic Studies (Coming Soon, Stay Tuned!)
          </button>
          <button
            className="w-full mb-3 px-6 py-3 bg-gray-400 text-white rounded-lg text-lg font-semibold"
            disabled
          >
            English Language (Coming Soon, Stay Tuned!)
          </button>
          <button
            className="w-full mb-3 px-6 py-3 bg-gray-400 text-white rounded-lg text-lg font-semibold"
            disabled
          >
            Computer Science (Coming Soon, Stay Tuned!)
          </button>
        </div>
      )}
    </div>
  );
};

export default PracticeOnline;
