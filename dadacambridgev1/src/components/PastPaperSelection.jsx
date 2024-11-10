import React from 'react';
import { useNavigate } from 'react-router-dom';

const PastPapersSelection = () => {
  const navigate = useNavigate();

  const handleLevelSelect = (level) => {
    navigate(`/past-papers/subjects?level=${encodeURIComponent(level)}`);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-8">
      <h1 className="text-2xl font-bold mb-4">Select Level for Past Papers</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div
          onClick={() => handleLevelSelect("O Level")}
          className="border border-gray-300 p-8 w-64 h-32 flex items-center justify-center shadow-lg rounded-lg bg-white hover:bg-gray-100 cursor-pointer"
        >
          <h2 className="text-xl font-semibold">O Level</h2>
        </div>
        <div
          onClick={() => handleLevelSelect("A Level")}
          className="border border-gray-300 p-8 w-64 h-32 flex items-center justify-center shadow-lg rounded-lg bg-white hover:bg-gray-100 cursor-pointer"
        >
          <h2 className="text-xl font-semibold">A Level</h2>
        </div>
      </div>
    </div>
  );
};

export default PastPapersSelection;
