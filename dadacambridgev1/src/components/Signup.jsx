import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';

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
      // const response = await axios.post('https://sproj-prototype1.onrender.com/api/signup', formData);
      setMessage(response.data.message);
      if (response.status === 201) setOtpSent(true);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error signing up');
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/api/verify-otp', { email: formData.email, otp });
      
      setMessage('Your OTP has been verified!');  // Display verification message
  
      // Redirect to login page after a 2-second delay
      setTimeout(() => {
        navigate('/login');
      }, 2000);  // 2000 milliseconds = 2 seconds
  
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error verifying OTP');
    }
  };  

  return (
    <div className="flex flex-col lg:flex-row h-screen relative">
      {/* Left Section */}
      <div className="flex-1 bg-white flex flex-col justify-center items-center px-6 lg:px-10 relative z-20">
        {/* Logo */}
        <div
          className="absolute top-4 left-4 lg:left-8 cursor-pointer z-30"
          onClick={() => navigate('/')}
        >
          <a aria-label="Home" href="/" className="flex items-center gap-4">
            <img
              src={logo}
              alt="DadaCambridge Logo"
              className="w-10 lg:w-12 h-auto"
            />
            <span className="text-base lg:text-lg font-medium font-montserrat text-gray-900 uppercase">
              DADACAMBRIDGE
            </span>
          </a>
        </div>

        <div className="w-full max-w-sm">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 text-center mb-4">
            Create Your Account
          </h2>
          {message && (
            <p className={`text-center mb-4 ${otpSent ? 'text-green-500' : 'text-red-500'}`}>
              {message}
            </p>
          )}
          {!otpSent ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Username"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                required
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                required
              />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                required
              />
              <button
                type="submit"
                className="w-full bg-teal-500 text-white font-medium py-3 rounded-lg hover:bg-teal-600 transition duration-300"
              >
                Sign Up
              </button>
            </form>
          ) : (
            <form onSubmit={handleOtpSubmit} className="space-y-4">
              <input
                type="text"
                value={otp}
                onChange={handleOtpChange}
                placeholder="Enter OTP"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                required
              />
              <button
                type="submit"
                className="w-full bg-teal-500 text-white font-medium py-3 rounded-lg hover:bg-teal-600 transition duration-300"
              >
                Verify OTP
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Right Section */}
      <div className="flex-1 flex flex-col justify-center items-center bg-gradient-to-br from-teal-400 to-blue-500 text-white p-6 lg:p-10 relative">
        <div className="absolute inset-0 hidden lg:flex justify-center items-center z-0 pointer-events-none">
          <div className="w-32 lg:w-48 h-32 lg:h-48 rounded-full bg-white opacity-20"></div>
          <div className="w-48 lg:w-72 h-48 lg:h-72 rounded-full bg-white opacity-10 top-20"></div>
        </div>
        <div className="relative z-10 text-center">
          <h2 className="text-2xl lg:text-3xl font-bold">Welcome Back!</h2>
          <p className="mt-2 text-base lg:text-lg">
            Already have an account? Log in to continue exploring.
          </p>
          <a
            href="/login"
            className="mt-4 lg:mt-6 inline-block bg-white text-teal-500 font-medium py-2 px-4 lg:py-2 lg:px-6 rounded-lg shadow-md hover:bg-gray-100 transition duration-300"
          >
            Log In
          </a>
        </div>
      </div>
    </div>
  );
};

export default Signup;
