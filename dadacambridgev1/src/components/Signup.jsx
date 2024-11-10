import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/api/signup', formData); 
      setMessage(response.data.message);
      if (response.status === 201) setOtpSent(true);
    } catch (error) {
      if (error.response?.data?.message === "User already exists") setOtpSent(false);
      setMessage(error.response?.data?.message || 'Error signing up');
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/api/verify-otp', { email: formData.email, otp });
      setMessage(response.data.message);
      navigate('/login');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error verifying OTP');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen px-4">
      <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
      {!otpSent ? (
        <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-sm">
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
            className="border p-2 w-full rounded"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="border p-2 w-full rounded"
            required
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="border p-2 w-full rounded"
            required
          />
          <button type="submit" className="bg-blue-500 text-white p-2 w-full rounded">Sign Up</button>
        </form>
      ) : (
        <form onSubmit={handleOtpSubmit} className="space-y-4 w-full max-w-sm">
          <input
            type="text"
            value={otp}
            onChange={handleOtpChange}
            placeholder="Enter OTP"
            className="border p-2 w-full rounded"
            required
          />
          <button type="submit" className="bg-blue-500 text-white p-2 w-full rounded">Verify OTP</button>
        </form>
      )}
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
};

export default Signup;
