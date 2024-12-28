import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Player from 'lottie-react';
import loadingAnimation from '../assets/loading.json';

const PastPapersDisplay = () => {
  const [pastPapers, setPastPapers] = useState([]);
  const [filteredPapers, setFilteredPapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(''); // Updated field for filtering
  const [paperType, setPaperType] = useState(''); // Updated field for filtering
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const level = queryParams.get('level');
  const subject = queryParams.get('subject');
  console.log(level, subject);

  useEffect(() => {
    const fetchPastPapers = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:4000/api/past-papers/past-papers`, {
          // const response = await axios.get(`https://sproj-prototype1.onrender.com/api/past-papers/past-papers`, {
          params: { level, subject }, // Matches new schema
        });
        setPastPapers(response.data);
        console.log(response.data);
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
    <div className="p-6 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-6">
        Past Papers for {subject} ({level})
      </h1>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Player
            animationData={loadingAnimation}
            style={{ width: '150px', height: '150px' }}
            loop
            autoplay
          />
        </div>
      ) : (
        <>
          <div className="flex space-x-4 mb-6">
            <select
              value={session}
              onChange={(e) => setSession(e.target.value)}
              className="p-3 text-lg border border-gray-300 rounded-md bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
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
              className="p-3 text-lg border border-gray-300 rounded-md bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              <option value="">All Paper Types</option>
              {uniquePaperTypes.map((type, index) => (
                <option key={index} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          {filteredPapers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredPapers.map((paper, index) => (
                <div
                  key={index}
                  className="border p-6 w-full flex flex-col items-center shadow-lg rounded-lg bg-white"
                >
                  <h2 className="text-xl font-semibold mb-2">
                    {paper.subjectCode}
                  </h2>
                  <p className="text-gray-600">Session: {paper.session}</p>
                  <p className="text-gray-600">Paper Type: {paper.paperType}</p>
                  <p className="text-gray-600">
                    Paper Number: {paper.paperNumber}
                  </p>
                  <a
                    href={paper.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline mt-4"
                  >
                    View PDF
                  </a>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 mt-6">
              No past papers found for {subject}. Stay tuned!
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default PastPapersDisplay;
