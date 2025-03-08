import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
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
        const response = await axios.get(
          `https://sproj-prototype1-1.onrender.com/api/topical/subjects/${level}`
        );
        setSubjects(response.data);
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-teal-50 to-teal-70 text-gray-900 px-6 py-20">
    {/* Header */}
    <motion.h1
      className="text-4xl font-extrabold text-center mb-6 text-gray-800"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      Subjects for {level}
    </motion.h1>

    {loading ? (
      <div className="flex flex-col items-center">
        <Player src={loadingAnimation} className="w-40 h-40" loop autoplay />
        <p className="text-gray-700 mt-4">Fetching subjects...</p>
      </div>
    ) : subjects.length > 0 ? (
      <motion.div
        className="flex flex-wrap justify-center gap-6 w-full max-w-6xl mt-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {subjects.map((subject, index) => (
          <motion.div
            key={index}
            onClick={() => handleSubjectClick(subject.name)}
            className="relative group flex flex-col items-center justify-center bg-white rounded-2xl shadow-md h-32 w-64 cursor-pointer transition-all duration-300 hover:shadow-lg"
            whileHover={{ scale: 1.02 }}
          >
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 z-10 text-center">
              {subject.name}
            </h2>
            <p className="text-gray-600 text-sm">Code: {subject.subjectCode}</p>
            <div className="absolute inset-0 bg-teal-500 opacity-0 group-hover:opacity-20 transition-opacity"></div>
          </motion.div>
        ))}
      </motion.div>
    ) : (
      <p className="text-gray-600 mt-6 text-lg">No subjects found for {level}. Stay tuned!</p>
    )}
  </div>
);
};

export default TopicalSubjectsList;
