import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import Player from "lottie-react";
import loadingAnimation from "../assets/loading.json";

const PastPapersDisplay = () => {
  const [pastPapers, setPastPapers] = useState([]);
  const [filteredPapers, setFilteredPapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState("");
  const [paperType, setPaperType] = useState("");
  const [paperNumber, setPaperNumber] = useState("");
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const level = queryParams.get("level");
  const subject = queryParams.get("subject");

  useEffect(() => {
    const fetchPastPapers = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://sproj-prototype1-1.onrender.com/api/past-papers/past-papers`,
          { params: { level, subject } }
        );
        setPastPapers(response.data);
        setFilteredPapers(response.data);
      } catch (error) {
        console.error("Failed to fetch past papers", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPastPapers();
  }, [level, subject]);

  useEffect(() => {
    const filteredAndSorted = pastPapers
      .filter(
        (paper) =>
          (session ? paper.session === session : true) &&
          (paperType ? paper.paperType === paperType : true) &&
          (paperNumber ? paper.paperNumber.toString() === paperNumber : true)
      )
      .sort((a, b) => parseInt(b.year) - parseInt(a.year));

    setFilteredPapers(filteredAndSorted);
  }, [session, paperType, paperNumber, pastPapers]);

  const uniqueSessions = [...new Set(pastPapers.map((paper) => paper.session))];
  const uniquePaperTypes = [...new Set(pastPapers.map((paper) => paper.paperType))];
  const uniquePaperNumbers = [...new Set(pastPapers.map((paper) => paper.paperNumber))];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-teal-50 to-teal-70 text-gray-900 px-8 py-20">
      {/* Header */}
      <motion.h1
        className="text-4xl font-extrabold text-center mb-6 text-gray-800"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Past Papers for {subject} ({level})
      </motion.h1>

      {/* Loading Animation */}
      {loading ? (
        <div className="flex flex-col items-center">
          <Player src={loadingAnimation} className="w-40 h-40" loop autoplay />
          <p className="text-gray-700 mt-4">Fetching past papers...</p>
        </div>
      ) : (
        <>
          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-6 mb-10">
            <select
              value={session}
              onChange={(e) => setSession(e.target.value)}
              className="w-40 px-4 py-3 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
            >
              <option value="">All Sessions</option>
              {uniqueSessions.map((s, index) => (
                <option key={index} value={s}>
                  {s}
                </option>
              ))}
            </select>

            <select
              value={paperType}
              onChange={(e) => setPaperType(e.target.value)}
              className="w-40 px-4 py-3 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
            >
              <option value="">All Paper Types</option>
              {uniquePaperTypes.map((type, index) => (
                <option key={index} value={type}>
                  {type}
                </option>
              ))}
            </select>

            <select
              value={paperNumber}
              onChange={(e) => setPaperNumber(e.target.value)}
              className="w-40 px-4 py-3 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
            >
              <option value="">All Paper Numbers</option>
              {uniquePaperNumbers.map((num, index) => (
                <option key={index} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>

          {/* Display Past Papers */}
          {filteredPapers.length > 0 ? (
            <motion.div
              className="flex flex-wrap justify-between gap-8 w-full max-w-6xl mt-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              {filteredPapers.map((paper, index) => (
                <motion.div
                  key={index}
                  className="flex flex-col items-center justify-between bg-white rounded-2xl shadow-lg w-72 min-h-[200px] p-6 text-center cursor-pointer transition-all duration-300 hover:scale-105"
                >
                  {/* Subject Code */}
                  <div className="flex-grow flex items-center justify-center mb-3">
                    <h2 className="text-xl font-semibold text-gray-900">{paper.subjectCode}</h2>
                  </div>

                  {/* Paper Details */}
                  <div className="text-gray-600 text-sm py-2 w-full border-t">
                    Year: {paper.year}
                  </div>
                  <div className="text-gray-600 text-sm py-2 w-full border-t">
                    Session: {paper.session}
                  </div>
                  <div className="text-gray-600 text-sm py-2 w-full border-t">
                    Paper Type: {paper.paperType}
                  </div>
                  <div className="text-gray-600 text-sm py-2 w-full border-t">
                    Paper Number: {paper.paperNumber}
                  </div>

                  {/* View PDF Button */}
                  <div className="w-full mt-2">
                    <a
                      href={paper.pdfUrl}
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
            <p className="text-gray-600 text-center mt-10 text-lg">
              No past papers found for {subject}. Stay tuned!
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default PastPapersDisplay;
