import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    referral_source: '',
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
    <main className="flex min-h-full overflow-hidden pt-16 sm:py-28">
      <div className="mx-auto flex w-full max-w-2xl flex-col px-4 sm:px-6">
        <div className="relative mt-12 sm:mt-16 text-center">
          <h1 className="text-2xl font-medium tracking-tight text-gray-900">Sign up for an account</h1>
          <p className="mt-3 text-lg text-gray-600">
            Already registered? <a className="text-cyan-600" href="/login">Sign in</a> to your account.
          </p>
        </div>
        
        <div className="relative mt-10 flex-auto bg-white px-4 py-10 shadow-2xl shadow-gray-900/10 sm:flex-none sm:rounded-5xl sm:p-24">
          {!otpSent ? (
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label htmlFor="username" className="mb-2 block text-sm font-semibold text-gray-900">Username</label>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    className="block w-full appearance-none rounded-lg border border-gray-200 bg-white py-2 px-3 text-gray-900 placeholder-gray-400 focus:border-cyan-500 focus:outline-none focus:ring-cyan-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-semibold text-gray-900">Email address</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="block w-full appearance-none rounded-lg border border-gray-200 bg-white py-2 px-3 text-gray-900 placeholder-gray-400 focus:border-cyan-500 focus:outline-none focus:ring-cyan-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="mb-2 block text-sm font-semibold text-gray-900">Password</label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="block w-full appearance-none rounded-lg border border-gray-200 bg-white py-2 px-3 text-gray-900 placeholder-gray-400 focus:border-cyan-500 focus:outline-none focus:ring-cyan-500 sm:text-sm"
                  />
                </div>
              </div>
              <button type="submit" className="mt-8 w-full bg-cyan-500 text-white py-2 px-3 rounded-lg text-sm font-semibold hover:bg-cyan-600 transition-colors">
                Get started today
              </button>
            </form>
          ) : (
            <form onSubmit={handleOtpSubmit} className="space-y-4 w-full max-w-sm mx-auto">
              <input
                type="text"
                value={otp}
                onChange={handleOtpChange}
                placeholder="Enter OTP"
                className="border p-2 w-full rounded-lg"
                required
              />
              <button type="submit" className="bg-cyan-500 text-white py-2 px-3 w-full rounded-lg">Verify OTP</button>
            </form>
          )}
          {message && <p className="mt-4 text-center text-sm text-gray-600">{message}</p>}
        </div>
      </div>
    </main>
  );
};

export default Signup;
