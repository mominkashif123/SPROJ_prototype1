import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import Navbar from './components/Navbar';
import Signup from './components/Signup';
import Login from './components/Login';
import Welcome from './components/Welcome';
import Homepage from './components/Home.jsx';
import UploadForm from './components/UploadForm.jsx';
import PastPapersSelection from './components/PastPaperSelection.jsx';
import PastPapersDisplay from './components/PastPaperDisplay.jsx';
import SubjectsList from './components/SubjectsList.jsx';

function App() {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUser({ username: decodedToken.username });
        setIsAdmin(decodedToken.role === 'admin'); // Check if user has admin role
      } catch (error) {
        console.error("Invalid token:", error);
        sessionStorage.removeItem('token'); 
      }
    }
    setLoading(false); // Set loading to false once user data is ready
  }, []);

  if (loading) return <div>Loading...</div>; // Show loading until data is ready

  return (
    <div>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/past-papers" element={user ? <PastPapersSelection /> : <Navigate to="/" />} />
        <Route path="/past-papers/subjects" element={user ? <SubjectsList /> : <Navigate to="/" />} />
        <Route path="/past-papers/display" element={user ? <PastPapersDisplay /> : <Navigate to="/" />} />
        <Route path="/upload" element={isAdmin ? <UploadForm /> : <Navigate to="/" />} />
        <Route
          path="/welcome"
          element={user ? <Welcome user={user} /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
