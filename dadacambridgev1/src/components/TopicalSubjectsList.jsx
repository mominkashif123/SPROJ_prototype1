import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Player from "lottie-react";
import loadingAnimation from "../assets/loading.json";

const TopicalSubjectsList = () => {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const level = queryParams.get("level");

  useEffect(() => {
    const fetchSubjects = async () => {
      setLoading(true);
      try {
        // const response = await axios.get(`http://localhost:4000/api/topical/subjects/${level}`); // Fetch subjects
        const response = await axios.get(`https://sproj-prototype1-1.onrender.com/api/topical/subjects/${level}`); // Fetch subjects
        setSubjects(response.data); // Response is an array of { name, subjectCode }
      } catch (error) {
        console.error("Failed to fetch subjects", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubjects();
  }, [level]);

  const handleSubjectClick = (subjectName) => {
    navigate(
      `/topical-papers/topics?level=${encodeURIComponent(level)}&subject=${encodeURIComponent(subjectName)}`
    );
  };

  return (
    <div className="p-6 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-6">Subjects for {level}</h1>
      {loading ? (
        <Player src={loadingAnimation} className="w-40 h-40" loop autoplay />
      ) : subjects.length > 0 ? (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {subjects.map((subject, index) => (
            <div
              key={index}
              onClick={() => handleSubjectClick(subject.name)} // Navigate with subject name
              className="border border-gray-300 p-4 w-full h-40 flex flex-col justify-center items-center shadow-lg rounded-lg bg-white hover:bg-gray-100 cursor-pointer"
            >
              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-center mb-2">
                {subject.name}
              </h2>
              <p className="text-sm text-gray-600">Code: {subject.subjectCode}</p> {/* Show subjectCode */}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600 mt-6">No subjects found for {level}. Stay tuned!</p>
      )}
    </div>
  );
};

export default TopicalSubjectsList;
