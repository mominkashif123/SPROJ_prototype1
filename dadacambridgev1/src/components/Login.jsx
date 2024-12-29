import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import logo from "../assets/logo.png";

const Login = ({ setUser }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  const [otp, setOtp] = useState('');
  const [otpVerified, setOtpVerified] = useState(false);
  const [newPassword, setNewPassword] = useState('');


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/api/login",
        formData
      );
      const { token } = response.data;

      sessionStorage.setItem("token", token);

      const decodedToken = jwtDecode(token);
      const { username, role } = decodedToken;

      sessionStorage.setItem("role", role);
      setUser({ username, role });

      setMessage("");
      navigate("/welcome");
    } catch (error) {
      console.error("Login Error:", error);
      setMessage(error.response?.data?.message || "Error logging in");
    }
  };

  const handleForgotPassword = () => {
    setShowForgotPassword(true);
  };

  const handleSendOtp = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/forgot-password",
        { email: formData.email }
      );
      setMessage(response.data.message);
      setOtpSent(true);
    } catch (error) {
      setMessage(error.response?.data?.message || "Error sending OTP");
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/verify-otp-for-reset",
        { email: formData.email, otp }
      );
      setMessage(response.data.message);
      setOtpVerified(true);
    } catch (error) {
      setMessage(error.response?.data?.message || "Error verifying OTP");
    }
  };

  const handleResetPassword = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/reset-password",
        { email: formData.email, newPassword }
      );
      setMessage(response.data.message);
      setOtpSent(false);
      setOtpVerified(false);
      setShowForgotPassword(false);
      setNewPassword("");
    } catch (error) {
      setMessage(error.response?.data?.message || "Error resetting password");
    }
  };
  
  return (
    <div className="flex flex-col lg:flex-row h-screen">
      {/* Left Section */}
      <div className="flex flex-col justify-center items-center w-full lg:w-1/2 bg-white px-6 sm:px-10 lg:px-16 py-10">
        {/* Logo */}
        <div
          className="absolute top-4 left-4 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <a aria-label="Home" href="/" className="flex items-center gap-4">

            <img
              src={logo}
              alt="DadaCambridge Logo"
              className="w-10 h-auto"
            />
            <span className="text-lg font-medium font-montserrat text-gray-900 uppercase">
              DADACAMBRIDGE
            </span>
          </a>
        </div>

        {!showForgotPassword ? (
          <>
            <div className="w-full max-w-sm">
              <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
                Login to Your Account
              </h2>
              {message && (
                <p className="text-center text-red-500 mb-4">{message}</p>
              )}
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email address"
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
                <div className="flex flex-col sm:flex-row items-center justify-between">
                  <label className="text-sm text-gray-600 flex items-center mb-2 sm:mb-0">
                    <input type="checkbox" className="mr-2" /> Remember for 30
                    days
                  </label>
                  <button
                    type="button"
                    className="text-sm text-teal-500 hover:underline"
                    onClick={handleForgotPassword}
                  >
                    Forgot password?
                  </button>
                </div>
                <button
                  type="submit"
                  className="w-full bg-teal-500 text-white font-medium py-3 rounded-lg hover:bg-teal-600 transition duration-300"
                >
                  Sign in
                </button>
              </form>
            </div>
          </>
        ) : (
          <>
            <div className="w-full max-w-sm">
              <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
                Forgot Password
              </h2>
              {message && (
                <p className="text-center text-red-500 mb-4">{message}</p>
              )}

              {!otpSent && (
                <div className="space-y-4">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                    required
                  />
                  <button
                    onClick={handleSendOtp}
                    className="w-full bg-teal-500 text-white font-medium py-3 rounded-lg hover:bg-teal-600 transition duration-300"
                  >
                    Send OTP
                  </button>
                </div>
              )}

              {otpSent && !otpVerified && (
                <div className="space-y-4">
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter OTP"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                    required
                  />
                  <button
                    onClick={handleVerifyOtp}
                    className="w-full bg-teal-500 text-white font-medium py-3 rounded-lg hover:bg-teal-600 transition duration-300"
                  >
                    Verify OTP
                  </button>
                </div>
              )}

              {otpVerified && (
                <div className="space-y-4">
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                    required
                  />
                  <button
                    onClick={handleResetPassword}
                    className="w-full bg-teal-500 text-white font-medium py-3 rounded-lg hover:bg-teal-600 transition duration-300"
                  >
                    Reset Password
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* Right Section */}
      <div className="hidden lg:flex w-1/2 flex-col justify-center items-center bg-gradient-to-br from-teal-400 to-blue-500 text-white relative">
        <div className="absolute inset-0 flex justify-center items-center z-0">
          <div className="w-48 h-48 rounded-full bg-white opacity-20 absolute"></div>
          <div className="w-72 h-72 rounded-full bg-white opacity-10 absolute top-20"></div>
        </div>
        <div className="relative z-10 text-center px-6">
          <h2 className="text-3xl font-bold">New Here?</h2>
          <p className="mt-2 text-lg">
            Join us and explore endless opportunities to grow and excel.
          </p>
          <a
            href="/signup"
            className="mt-6 inline-block bg-white text-teal-500 font-medium py-2 px-6 rounded-lg shadow-md hover:bg-gray-100 transition duration-300"
          >
            Sign Up
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
