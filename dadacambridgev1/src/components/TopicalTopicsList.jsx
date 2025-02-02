import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
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
        // const response = await axios.get(`http://localhost:4000/api/topical/topics/${level}/${encodeURIComponent(subject)}`);
        const response = await axios.get(`https://sproj-prototype1-1.onrender.com/api/topical/topics/${level}/${encodeURIComponent(subject)}`);
        // console.log("Fetched Topics:", response.data);
        setTopics(response.data);
        setFilteredTopics(response.data); // Show all topics by default
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
    console.log("Filtered Topics:", filtered);
    setFilteredTopics(filtered);
  }, [selectedPaperNumber, topics]);

  const uniquePaperNumbers = [...new Set(topics.map((topic) => topic.paperNumber))];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Topics for {subject} ({level})
          </h1>
          <p className="text-gray-600 text-lg">Browse and download past papers by topic.</p>
        </div>

        {/* Loading Animation */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Player animationData={loadingAnimation} style={{ width: "150px", height: "150px" }} loop autoplay />
          </div>
        ) : (
          <>
            {/* Filter Dropdown */}
            <div className="flex justify-center gap-6 mb-8">
              <select
                value={selectedPaperNumber}
                onChange={(e) => setSelectedPaperNumber(e.target.value)}
                className="w-40 px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
              >
                <option value="">All Paper Numbers</option>
                {uniquePaperNumbers.map((number, index) => (
                  <option key={index} value={number}>
                    {number}
                  </option>
                ))}
              </select>
            </div>

            {/* Display Topics with Paper Number and PDF Links */}
            {filteredTopics.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredTopics.map((topic, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow p-6 flex flex-col items-center text-center">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">{topic.topic}</h2>
                    <p className="text-sm text-gray-600">Paper Number: {topic.paperNumber}</p>
                    <a
                      href={topic.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 px-4 py-2 bg-teal-500 text-white rounded-md shadow-md hover:bg-teal-600 transition-colors"
                    >
                      View PDF
                    </a>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600 text-center mt-10">No topics found.</p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default TopicalTopicsList;
