import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Player } from '@lottiefiles/react-lottie-player';
import loadingAnimation from '../assets/loading.json'; 

const PastPapers = () => {
  const { code } = useParams();
  const [pastPapers, setPastPapers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPastPapers = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:5000/api/past-papers/subject/${code}`);
        setPastPapers(response.data);
      } catch (error) {
        console.error("Failed to fetch past papers", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPastPapers();
  }, [code]);

  const handleDownload = async (id, name) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/past-papers/download/${id}`, {
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
      console.error("Failed to download past paper", error);
    }
  };

  return (
    <div className="p-6 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-6">Past Papers for Code {code}</h1>
      {loading ? (
        <Player 
          src={loadingAnimation} 
          className="w-40 h-40" 
          loop 
          autoplay 
        />
      ) : pastPapers.length > 0 ? (
        <div className="grid gap-4">
          {pastPapers.map((paper, index) => (
            <div key={index} className="border border-gray-300 p-4 w-64 flex flex-col justify-center items-center shadow-lg rounded-lg bg-white">
              <h2 className="text-xl font-semibold">{paper.name}</h2>
              <p className="text-gray-600">Code: {paper.code}</p>
              <p className="text-gray-600">Year: {paper.year}</p>
              <p className="text-gray-600">Paper Variant: {paper.paper}</p>
              <button onClick={() => handleDownload(paper._id, paper.name)} className="text-blue-500 hover:underline mt-2">
                Download PDF
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600 mt-6">No past papers found. Stay tuned for updates!</p>
      )}
    </div>
  );
};

export default PastPapers;
