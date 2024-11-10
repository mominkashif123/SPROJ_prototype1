// frontend/components/Login.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

const Login = ({ setUser }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
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
      const response = await axios.post('http://localhost:5000/api/login', formData); // Adjust with your backend URL
      const { token, message } = response.data;

      // Save the token to sessionStorage
      sessionStorage.setItem('token', token);

      // Decode the token to get user details
      const decodedToken = jwtDecode(token);
      const { username, role } = decodedToken; // Extract username and role from decoded token

      // Save role in sessionStorage
      sessionStorage.setItem('role', role);
      console.log(role);

      // Update global state with user details
      setUser({ username, role });

      setMessage(message);
      navigate('/welcome'); // Redirect to welcome page
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error logging in');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="border p-2 w-full"
          required
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          className="border p-2 w-full"
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2 w-full rounded">Login</button>
      </form>
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
};

export default Login;
