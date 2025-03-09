import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import Player from "lottie-react";
import loadingAnimation from "../assets/loading.json";

const TopicalTopicsList = () => {
  const [topics, setTopics] = useState([]);
  const [filteredTopics, setFilteredTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPaperNumber, setSelectedPaperNumber] = useState('');
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const level = queryParams.get("level");
  const subject = queryParams.get("subject");

  useEffect(() => {
    const fetchTopics = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://sproj-prototype1-1.onrender.com/api/topical/topics/${level}/${encodeURIComponent(subject)}`
        );
        setTopics(response.data);
        setFilteredTopics(response.data);
      } catch (error) {
        console.error("Failed to fetch topics", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopics();
  }, [level, subject]);

  useEffect(() => {
    const filtered = topics.filter((topic) =>
      selectedPaperNumber === "" || topic.paperNumber === parseInt(selectedPaperNumber)
    );
    setFilteredTopics(filtered);
  }, [selectedPaperNumber, topics]);

  const uniquePaperNumbers = [...new Set(topics.map((topic) => topic.paperNumber))];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-teal-50 to-teal-70 text-gray-900 px-8 py-20">
      {/* Header */}
      <motion.h1
        className="text-4xl font-extrabold text-center mb-6 text-gray-800"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Topics for {subject} ({level})
      </motion.h1>

      {/* Loading Animation */}
      {loading ? (
        <div className="flex flex-col items-center">
          <Player src={loadingAnimation} className="w-40 h-40" loop autoplay />
          <p className="text-gray-700 mt-4">Fetching topics...</p>
        </div>
      ) : (
        <>
          {/* Filter Dropdown */}
          <div className="flex justify-center mb-10">
            <select
              value={selectedPaperNumber}
              onChange={(e) => setSelectedPaperNumber(e.target.value)}
              className="w-56 px-5 py-3 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
            >
              <option value="">All Paper Numbers</option>
              {uniquePaperNumbers.map((number, index) => (
                <option key={index} value={number}>
                  Paper {number}
                </option>
              ))}
            </select>
          </div>

          {/* Display Topics */}
          {filteredTopics.length > 0 ? (
            <motion.div
              className="flex flex-wrap justify-between gap-8 w-full max-w-6xl mt-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              {filteredTopics.map((topic, index) => (
                <motion.div
                  key={index}
                  className="flex flex-col items-center justify-between bg-white rounded-2xl shadow-lg w-72 min-h-[200px] p-6 text-center cursor-pointer transition-all duration-300 hover:scale-105"
                >
                  {/* Topic Name */}
                  <div className="flex-grow flex items-center justify-center mb-3">
                    <h2 className="text-xl font-semibold text-gray-900">{topic.topic}</h2>
                  </div>

                  {/* Paper Number */}
                  <div className="text-gray-600 text-sm py-2 w-full border-t">
                    Paper Number: {topic.paperNumber}
                  </div>

                  {/* View PDF Button */}
                  <div className="w-full mt-2">
                    <a
                      href={topic.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full py-3 bg-teal-500 text-white rounded-md shadow-md transition-colors hover:bg-teal-600"
                    >
                      View PDF
                    </a>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <p className="text-gray-600 text-center mt-10 text-lg">No topics found.</p>
          )}
        </>
      )}
    </div>
  );
};

export default TopicalTopicsList;
