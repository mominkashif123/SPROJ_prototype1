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
    <div className="p-6 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-6">Past Papers for {subject} ({level})</h1>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Player animationData={loadingAnimation} style={{ width: '150px', height: '150px' }} loop autoplay />
        </div>
      ) : (
        <>
          <div className="flex space-x-4 mb-6">
            <select value={year} onChange={(e) => setYear(e.target.value)} className="p-2 border rounded">
              <option value="">All Years</option>
              {uniqueYears.map((y, index) => (
                <option key={index} value={y}>{y}</option>
              ))}
            </select>
            <select value={paperVariant} onChange={(e) => setPaperVariant(e.target.value)} className="p-2 border rounded">
              <option value="">All Paper Variants</option>
              {uniqueVariants.map((variant, index) => (
                <option key={index} value={variant}>{variant}</option>
              ))}
            </select>
          </div>
          {filteredPapers.length > 0 ? (
            <div className="grid gap-4">
              {filteredPapers.map((paper, index) => (
                <div key={index} className="border p-4 w-64 flex flex-col justify-center items-center shadow-lg rounded-lg bg-white">
                  <h2 className="text-xl font-semibold">{paper.name}</h2>
                  <p className="text-gray-600">Code: {paper.code}</p>
                  <p className="text-gray-600">Year: {paper.year}</p>
                  <p className="text-gray-600">Paper Type: {paper.what}</p>
                  <p className="text-gray-600">Paper Variant: {paper.paper}</p>
                  <button onClick={() => handleDownload(paper._id, paper.name)} className="text-blue-500 hover:underline mt-2">
                    Download PDF
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 mt-6">No past papers found for {subject}. Stay tuned!</p>
          )}
        </>
      )}
    </div>
  );
};

export default PastPapersDisplay;
