import React, { useState } from 'react';
import axios from 'axios';

const UploadForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    subjectCode: '', // Updated: corresponds to the new schema
    year: '',       // Updated: corresponds to the new schema
    session: '',     // Updated: corresponds to the new schema
    paperType: '',   // Updated: corresponds to the new schema
    paperNumber: '',  // Updated: corresponds to the new schema
    level: '',      // Updated: corresponds to the new schema
  });
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach((key) => data.append(key, formData[key]));
    data.append('pdf', file);

    try {
      // const response = await axios.post('http://localhost:4000/api/past-papers/upload', data, {
      const response = await axios.post('https://sproj-prototype1-1.onrender.com/api/past-papers/upload', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (progressEvent) => {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(progress);
        },
      });
      setMessage(response.data.message);
      setUploadProgress(0);
    } catch (error) {
      setMessage('Failed to upload file. Please try again.');
      setUploadProgress(0);
    }
  };

  // console.log(formData);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Upload Past Paper</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {['name', 'subjectCode', 'year', 'paperNumber'].map((field, index) => (
          <div key={index}>
            <label className="block font-medium mb-1 capitalize">{field}</label>
            <input
              type="text"
              name={field}
              value={formData[field]}
              onChange={handleInputChange}
              className="w-full border border-gray-300 p-2 rounded"
              placeholder={`Enter ${field}`}
              required
            />
          </div>
        ))}
        <div>
          <label className="block font-medium mb-1 capitalize">Session</label>
          <select
            name="session"
            value={formData.session}
            onChange={handleInputChange}
            className="w-full border border-gray-300 p-2 rounded"
            required
          >
            <option value="">Select Session</option>
            <option value="Summer">Summer</option>
            <option value="Winter">Winter</option>
          </select>
        </div>
        <div>
          <label className="block font-medium mb-1 capitalize">Paper Type</label>
          <select
            name="paperType"
            value={formData.paperType}
            onChange={handleInputChange}
            className="w-full border border-gray-300 p-2 rounded"
            required
          >
            <option value="">Select Paper Type</option>
            <option value="QP">QP</option>
            <option value="MS">MS</option>
          </select>
        </div>
        <div>
          <label className="block font-medium mb-1 capitalize">Level</label>
          <select
            name="level"
            value={formData.level}
            onChange={handleInputChange}
            className="w-full border border-gray-300 p-2 rounded"
            required
          >
            <option value="">Select Level</option>
            <option value="O Level">O Level</option>
            <option value="A Level">A Level</option>
          </select>
        </div>
        <div>
          <label className="block font-medium mb-1">PDF File</label>
          <input type="file" onChange={handleFileChange} accept="application/pdf" required />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Upload</button>
      </form>

      {uploadProgress > 0 && (
        <div className="mt-4 w-full bg-gray-300 rounded-full h-4">
          <div
            className="bg-blue-500 h-4 rounded-full"
            style={{ width: `${uploadProgress}%` }}
          ></div>
        </div>
      )}
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
};

export default UploadForm;
