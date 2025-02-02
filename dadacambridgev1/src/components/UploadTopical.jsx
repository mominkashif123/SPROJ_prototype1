import React, { useState } from 'react';
import axios from 'axios';

const TopicalUploadForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    subjectCode: '',
    level: '',
    paperNumber: '', // Added paperNumber field
  });
  const [files, setFiles] = useState([]);
  const [message, setMessage] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);

  // Handle file selection
  const handleFileChange = (e) => {
    setFiles(e.target.files); // Save selected files
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.name || !formData.subjectCode || !formData.level || !formData.paperNumber) {
      setMessage('Please fill out all fields before uploading.');
      return;
    }

    if (!files.length) {
      setMessage('Please select at least one PDF file to upload.');
      return;
    }

    const data = new FormData();
    Object.keys(formData).forEach((key) => data.append(key, formData[key]));

    // Append multiple files
    Array.from(files).forEach((file) => {
      data.append('pdfs', file);
    });

    try {
      // const response = await axios.post('http://localhost:4000/api/topical/upload', data, {
      //   headers: { 'Content-Type': 'multipart/form-data' },
      //   onUploadProgress: (progressEvent) => {
      //     const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
      //     setUploadProgress(progress);
      //   },
      // })
      const response = await axios.post('https://sproj-prototype1-1.onrender.com/api/topical/upload', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (progressEvent) => {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(progress);
        },
      });

      setMessage(response.data.message || 'Files uploaded successfully!');
      setUploadProgress(0);
    } catch (error) {
      console.error('Upload error:', error);
      setMessage(
        error.response?.data?.message || 'Failed to upload files. Please try again.'
      );
      setUploadProgress(0);
    }
  };

  // Handle input change
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Upload Topical Past Papers</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {['name', 'subjectCode', 'paperNumber'].map((field, index) => (
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
          <label className="block font-medium mb-1">PDF Files</label>
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            accept="application/pdf"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Upload
        </button>
      </form>

      {/* Upload progress bar */}
      {uploadProgress > 0 && (
        <div className="mt-4 w-full bg-gray-300 rounded-full h-4">
          <div
            className="bg-blue-500 h-4 rounded-full"
            style={{ width: `${uploadProgress}%` }}
          ></div>
        </div>
      )}

      {/* Status message */}
      {message && <p className="mt-4 text-gray-700">{message}</p>}
    </div>
  );
};

export default TopicalUploadForm;
