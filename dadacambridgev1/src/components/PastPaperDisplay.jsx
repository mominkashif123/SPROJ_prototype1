import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Player from 'lottie-react';
import loadingAnimation from '../assets/loading.json';

const PastPapersDisplay = () => {
  const [pastPapers, setPastPapers] = useState([]);
  const [filteredPapers, setFilteredPapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [year, setYear] = useState('');
  const [paperVariant, setPaperVariant] = useState('');
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const level = queryParams.get('level');
  const subject = queryParams.get('subject');

  useEffect(() => {
    const fetchPastPapers = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:4000/api/past-papers/past-papers`, {
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
      (year ? paper.year === year : true) &&
      (paperVariant ? paper.paper === paperVariant : true)
    ));
    setFilteredPapers(filtered);
  }, [year, paperVariant, pastPapers]);

  const handleDownload = async (id, name) => {
    try {
      const response = await axios.get(`http://localhost:4000/api/past-papers/download/${id}`, {
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${name}.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Failed to download past paper', error);
    }
  };

  const uniqueYears = [...new Set(pastPapers.map((paper) => paper.year))];
  const uniqueVariants = [...new Set(pastPapers.map((paper) => paper.paper))];

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

        {/* Filters */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Player animationData={loadingAnimation} style={{ width: '150px', height: '150px' }} loop autoplay />
          </div>
        ) : (
          <>
            <div className="flex justify-center gap-6 mb-8">
              <select
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="w-40 px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
              >
                <option value="">All Years</option>
                {uniqueYears.map((y, index) => (
                  <option key={index} value={y}>{y}</option>
                ))}
              </select>
              <select
                value={paperVariant}
                onChange={(e) => setPaperVariant(e.target.value)}
                className="w-40 px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
              >
                <option value="">All Paper Variants</option>
                {uniqueVariants.map((variant, index) => (
                  <option key={index} value={variant}>{variant}</option>
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
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">{paper.name}</h2>
                    <p className="text-sm text-gray-600">Code: {paper.code}</p>
                    <p className="text-sm text-gray-600">Year: {paper.year}</p>
                    <p className="text-sm text-gray-600">Type: {paper.what}</p>
                    <p className="text-sm text-gray-600">Variant: {paper.paper}</p>
                    <button
                      onClick={() => handleDownload(paper._id, paper.name)}
                      className="mt-4 px-4 py-2 bg-teal-500 text-white rounded-md shadow-md hover:bg-teal-600 transition-colors"
                    >
                      Download PDF
                    </button>
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
