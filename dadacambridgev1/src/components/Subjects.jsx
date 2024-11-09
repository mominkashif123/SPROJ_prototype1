// frontend/components/Subjects.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Subjects = () => {
  const subjects = [
    { name: "Islamiyat", code: "2058" },
    { name: "History", code: "1234" },
  ];

  const navigate = useNavigate();

  const handleSubjectClick = (code) => {
    navigate(`/past-papers/${code}`); // Navigate using code
  };

  return (
    <div className="p-6 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-6">Past Paper Subjects</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {subjects.map((subject, index) => (
          <div
            key={index}
            onClick={() => handleSubjectClick(subject.code)} // Pass subject code
            className="border border-gray-300 p-4 w-64 h-32 flex flex-col justify-center items-center shadow-lg rounded-lg bg-white hover:bg-gray-100 cursor-pointer"
          >
            <h2 className="text-xl font-semibold">{subject.name}</h2>
            <p className="text-gray-600">Code: {subject.code}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Subjects;
