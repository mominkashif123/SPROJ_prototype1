import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Player from 'lottie-react';
import loadingAnimation from '../assets/loading.json';

const SubjectsList = () => {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const level = queryParams.get('level'); 

  useEffect(() => {
    const fetchSubjects = async () => {
      setLoading(true);
      try {
        const response = await axios.get(http://localhost:4000/api/past-papers/subjects/${level});
        setSubjects(response.data);
      } catch (error) {
        console.error("Failed to fetch subjects", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubjects();
  }, [level]);

  const handleSubjectClick = (subject) => {
    navigate(/past-papers/display?level=${encodeURIComponent(level)}&subject=${encodeURIComponent(subject)});
  };

  return (
    <div className="p-6 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-6">Subjects for {level}</h1>
      {loading ? (
        <Player src={loadingAnimation} className="w-40 h-40" loop autoplay />
      ) : subjects.length > 0 ? (
        <div className="grid gap-6 grid-cols-3">
          {subjects.map((subject, index) => (
            <div
              key={index}
              onClick={() => handleSubjectClick(subject)}
              className="border border-gray-300 p-8 w-80 h-40 flex justify-center items-center shadow-lg rounded-lg bg-white hover:bg-gray-100 cursor-pointer"
            >
              <h2 className="text-2xl font-semibold">{subject}</h2>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600 mt-6">No subjects found for {level}. Stay tuned!</p>
      )}
    </div>
  );
};

export default SubjectsList;