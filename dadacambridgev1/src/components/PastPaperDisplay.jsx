import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Player from 'lottie-react';
import loadingAnimation from '../assets/loading.json';

const PastPapersDisplay = () => {
  const [pastPapers, setPastPapers] = useState([]);
  const [filteredPapers, setFilteredPapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState('');
  const [paperType, setPaperType] = useState('');
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const level = queryParams.get('level');
  const subject = queryParams.get('subject');

  useEffect(() => {
    const fetchPastPapers = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:4000/api/past-papers/past-papers`, {
          // const response = await axios.get(`https://sproj-prototype1.onrender.com/api/past-papers/past-papers`, {
          params: { level, subject },
        });
        setPastPapers(response.data);
        setFilteredPapers(response.data);
      } catch (error) {
        console.error('Failed to fetch past papers', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPastPapers();
  }, [level, subject]);

  useEffect(() => {
    const filtered = pastPapers.filter((paper) => (
      (session ? paper.session === session : true) &&
      (paperType ? paper.paperType === paperType : true)
    ));
    setFilteredPapers(filtered);
  }, [session, paperType, pastPapers]);

  const uniqueSessions = [...new Set(pastPapers.map((paper) => paper.session))];
  const uniquePaperTypes = [...new Set(pastPapers.map((paper) => paper.paperType))];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Past Papers for {subject} ({level})
          </h1>
          <p className="text-gray-600 text-lg">
            Explore a comprehensive collection of past papers to boost your preparation.
          </p>
        </div>

        {/* Loading Animation */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Player animationData={loadingAnimation} style={{ width: '150px', height: '150px' }} loop autoplay />
          </div>
        ) : (
          <>
            {/* Filters */}
            <div className="flex justify-center gap-6 mb-8">
              <select
                value={session}
                onChange={(e) => setSession(e.target.value)}
                className="w-40 px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
              >
                <option value="">All Sessions</option>
                {uniqueSessions.map((s, index) => (
                  <option key={index} value={s}>{s}</option>
                ))}
              </select>
              <select
                value={paperType}
                onChange={(e) => setPaperType(e.target.value)}
                className="w-40 px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
              >
                <option value="">All Paper Types</option>
                {uniquePaperTypes.map((type, index) => (
                  <option key={index} value={type}>{type}</option>
                ))}
              </select>
            </div>

            {/* Display Past Papers */}
            {filteredPapers.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredPapers.map((paper, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow p-6 flex flex-col items-center text-center"
                  >
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">{paper.subjectCode}</h2>
                    <p className="text-sm text-gray-600">Session: {paper.session}</p>
                    <p className="text-sm text-gray-600">Paper Type: {paper.paperType}</p>
                    <p className="text-sm text-gray-600">Paper Number: {paper.paperNumber}</p>
                    <a
                      href={paper.pdfUrl}
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
              <p className="text-gray-600 text-center mt-10">
                No past papers found for {subject}. Stay tuned!
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PastPapersDisplay;