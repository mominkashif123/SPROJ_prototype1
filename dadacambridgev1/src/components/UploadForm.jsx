import React, { useState } from 'react';
import axios from 'axios';

const UploadForm = () => {
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [year, setYear] = useState('');
  const [what, setWhat] = useState('');
  const [paper, setPaper] = useState('');
  const [level, setLevel] = useState('');
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false); // Track loading state

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !code || !year || !paper || !file) {
      setMessage('Please fill in all fields and select a file.');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('code', code);
    formData.append('year', year);
    formData.append('what', what);
    formData.append('paper', paper);
    formData.append('level', level);
    formData.append('pdf', file);

    try {
      setLoading(true); // Start loading
      const response = await axios.post('http://localhost:4000/api/past-papers/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (progressEvent) => {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setLoading(progress); // Update loading bar
        },
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Failed to upload file. Please try again.');
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Upload Past Paper</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Subject Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="Enter subject name (e.g., Islamiyat)"
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Subject Code</label>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="Enter subject code (e.g., 2058)"
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Year</label>
          <input
            type="text"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="Enter year (e.g., 2022)"
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-1">QP/MS</label>
          <input
            type="text"
            value={what}
            onChange={(e) => setWhat(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="Enter what this paper is for (e.g., May/June 2022)"
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Paper Variant</label>
          <input
            type="text"
            value={paper}
            onChange={(e) => setPaper(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="Enter paper variant (e.g., Paper 1)"
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Level</label>
          <select
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
            required
          >
            <option value="">Select level</option>
            <option value="O Level">O Level</option>
            <option value="A Level">A Level</option>
          </select>
        </div>
        <div>
          <label className="block font-medium mb-1">File URL</label>
          <input type="file" onChange={handleFileChange} accept="application/pdf" required />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Upload</button>
      </form>

      {loading ? (
        <div className="mt-4 w-full bg-gray-300 rounded-full h-4">
          <div
            className="bg-blue-500 h-4 rounded-full"
            style={{ width: `${loading}%` }}
          ></div>
        </div>
      ) : (
        <p className="mt-4">{message}</p>
      )}
    </div>
  );
};

export default UploadForm;
