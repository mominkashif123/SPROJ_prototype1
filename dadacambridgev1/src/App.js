// frontend/App.jsx
import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import Navbar from './components/Navbar';
import Signup from './components/Signup';
import Login from './components/Login';
import Welcome from './components/Welcome';
import Homepage from './components/Home.jsx';
import Subjects from './components/Subjects.jsx';
import PastPapers from './components/PastPapers.jsx';
import UploadForm from './components/UploadForm.jsx';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUser({ username: decodedToken.username });
      } catch (error) {
        console.error("Invalid token:", error);
        sessionStorage.removeItem('token'); 
      }
    }
  }, []);

  return (
    <div>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/past-papers" element={<Subjects />} />
        <Route path="/past-papers/:code" element={<PastPapers />} />
        <Route path="/upload" element={<UploadForm />} />
        <Route
          path="/welcome"
          element={user ? <Welcome user={user} /> : <Navigate to="/login" />}
        />
      </Routes>
    </div>
  );
}

export default App;
