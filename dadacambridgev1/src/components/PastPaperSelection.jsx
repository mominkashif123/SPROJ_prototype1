import React from 'react';
import { useNavigate } from 'react-router-dom';

const PastPapersSelection = () => {
  const navigate = useNavigate();

  const handleLevelSelect = (level) => {
    navigate(`/past-papers/subjects?level=${encodeURIComponent(level)}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-12 text-center">
        Select Level for Past Papers
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <div
          onClick={() => handleLevelSelect("O Level")}
          className="border border-gray-200 p-8 w-64 h-40 flex items-center justify-center shadow-lg rounded-lg bg-white hover:bg-blue-100 cursor-pointer transform hover:scale-105 transition-transform duration-300 ease-out text-center"
        >
          <h2 className="text-2xl font-semibold text-gray-800">O Level</h2>
        </div>
        <div
          onClick={() => handleLevelSelect("A Level")}
          className="border border-gray-200 p-8 w-64 h-40 flex items-center justify-center shadow-lg rounded-lg bg-white hover:bg-blue-100 cursor-pointer transform hover:scale-105 transition-transform duration-300 ease-out text-center"
        >
          <h2 className="text-2xl font-semibold text-gray-800">A Level</h2>
        </div>
      </div>
    </div>
  );
};

export default PastPapersSelection;
