import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const Login = ({ setUser }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // const response = await axios.post('http://localhost:4000/api/login', formData);
      const response = await axios.post('https://sproj-prototype1.onrender.com/api/login', formData);
      const { token, message } = response.data;

      sessionStorage.setItem('token', token);

      const decodedToken = jwtDecode(token);
      const { username, role } = decodedToken;

      sessionStorage.setItem('role', role);
      setUser({ username, role });

      setMessage(message);
      navigate('/welcome');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error logging in');
    }
  };

  const handleForgotPassword = async () => {
    setShowForgotPassword(true);
  };

  const handleSendOtp = async () => {
    try {
      // const response = await axios.post('http://localhost:4000/api/forgot-password', { email: formData.email });
      const response = await axios.post('https://sproj-prototype1.onrender.com/api/forgot-password', { email: formData.email });
      setMessage(response.data.message);
      setOtpSent(true);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error sending OTP');
    }
  };

  const handleVerifyOtp = async () => {
    try {
      // const response = await axios.post('http://localhost:4000/api/verify-otp-for-reset', { email: formData.email, otp });
      const response = await axios.post('https://sproj-prototype1.onrender.com/api/verify-otp-for-reset', { email: formData.email, otp });
      setMessage(response.data.message);
      setOtpVerified(true);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error verifying OTP');
    }
  };

  const handleResetPassword = async () => {
    try {
      // const response = await axios.post('http://localhost:4000/api/reset-password', { email: formData.email, newPassword });
      const response = await axios.post('https://sproj-prototype1.onrender.com/api/reset-password', { email: formData.email, newPassword });
      setMessage(response.data.message);
      setOtpSent(false);
      setOtpVerified(false);
      setShowForgotPassword(false);
      setNewPassword('');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error resetting password');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen px-4">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      {!showForgotPassword ? (
        <>
          <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-sm">
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
            <button type="submit" className="bg-blue-500 text-white p-2 w-full rounded">Login</button>
          </form>
          <button
            onClick={handleForgotPassword}
            className="text-sm text-blue-500 mt-4 underline"
          >
            Forgot Password?
          </button>
        </>
      ) : (
        <>
          {otpSent ? (
            otpVerified ? (
              <>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  className="border p-2 w-full rounded mt-4"
                  required
                />
                <button
                  onClick={handleResetPassword}
                  className="bg-blue-500 text-white p-2 w-full rounded mt-4"
                >
                  Reset Password
                </button>
              </>
            ) : (
              <>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter OTP"
                  className="border p-2 w-full rounded mt-4"
                  required
                />
                <button
                  onClick={handleVerifyOtp}
                  className="bg-blue-500 text-white p-2 w-full rounded mt-4"
                >
                  Verify OTP
                </button>
              </>
            )
          ) : (
            <>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="border p-2 w-full rounded"
                required
              />
              <button
                onClick={handleSendOtp}
                className="bg-blue-500 text-white p-2 w-full rounded mt-4"
              >
                Send OTP
              </button>
            </>
          )}
          <button
            onClick={() => setShowForgotPassword(false)}
            className="text-sm text-blue-500 mt-4 underline"
          >
            Back to Login
          </button>
        </>
      )}
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
};

export default Login;
