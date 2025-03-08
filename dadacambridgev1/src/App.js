import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Navbar from "./components/Navbar";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Welcome from "./components/Welcome";
import Home from "./components/Home"; // Import Homepage for logged-in users
import HomeGuest from "./components/Home2.jsx"; // Import Homepage for non-logged-in users
import UploadForm from "./components/UploadForm.jsx";
import PastPapersSelection from "./components/PastPaperSelection.jsx";
import PastPapersDisplay from "./components/PastPaperDisplay.jsx";
import SubjectsList from "./components/SubjectsList.jsx";
import ExpectedExam from "./components/ExpectedExam.jsx"; // Import ExpectedExam page
import PracticeOnline from "./components/PracticeOnline.jsx"; // Import PracticeOnline page
import Profile from "./components/Profile.jsx"; // Import Profile page (if required)
import TopicalUploadForm from "./components/UploadTopical.jsx";
import TopicalPastPapersSelection from "./components/TopicalSelection.jsx";
import TopicalSubjectsList from "./components/TopicalSubjectsList.jsx";
import TopicalTopicsList from "./components/TopicalTopicsList.jsx";
import PracticePaper from "./components/PracticePaper.jsx";
import MCQPractice from "./components/MCQPractice.jsx"; // Import MCQPractice page
import PracticePakStudies from "./components/PracticePakStudies.jsx"; // Import PracticePakStudies page
import PracticeChemistry from "./components/PracticeChemistry.jsx"; // Import PracticeChemistry page

function App() {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  const location = useLocation(); // To get the current route

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUser({
          username: decodedToken.username,
          email: decodedToken.email, // Add email here
        });
        setIsAdmin(decodedToken.role === "admin");
      } catch (error) {
        console.error("Invalid token:", error);
        sessionStorage.removeItem("token");
      }
    }
    setLoading(false);
  }, []);

  if (loading) return <div>Loading...</div>; // Show loading until data is ready

  // Check if the current route is Login or Signup
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/signup";

  return (
    <div>
      {/* Conditionally render the Navbar */}
      {<Navbar user={user} setUser={setUser} />}
      <Routes>
        {/* Conditionally render homepage based on user login status */}
        <Route path="/" element={user ? <Home user={user} /> : <HomeGuest />} />

        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route
          path="/past-papers"
          element={user ? <PastPapersSelection /> : <Navigate to="/" />}
        />
        <Route
          path="/past-papers/subjects"
          element={user ? <SubjectsList /> : <Navigate to="/" />}
        />
        <Route
          path="/past-papers/display"
          element={user ? <PastPapersDisplay /> : <Navigate to="/" />}
        />
        <Route
          path="/topical-papers"
          element={user ? <TopicalPastPapersSelection /> : <Navigate to="/" />}
        />
        <Route
          path="/topical-papers/subjects"
          element={user ? <TopicalSubjectsList /> : <Navigate to="/" />}
        />
        <Route
          path="/topical-papers/topics"
          element={user ? <TopicalTopicsList /> : <Navigate to="/" />}
        />
        <Route
          path="/practice"
          element={user ? <PracticeOnline /> : <Navigate to="/" />}
        />
        <Route
          path="/practice/pakstudies"
          element={user ? <PracticePakStudies /> : <Navigate to="/" />}
        />
        <Route
          path="/practice/pakstudies/:year"
          element={user ? <PracticePaper /> : <Navigate to="/" />}
        />
        <Route
          path="/practice/chemistry"
          element={user ? <PracticeChemistry /> : <Navigate to="/" />}
        />
        <Route
          path="/practice/chemistry/:year/:session/:variant"
          element={user ? <MCQPractice /> : <Navigate to="/" />}
        />
        <Route
          path="/upload"
          element={isAdmin ? <UploadForm /> : <Navigate to="/" />}
        />
        <Route
          path="/upload-topical"
          element={isAdmin ? <TopicalUploadForm /> : <Navigate to="/" />}
        />
        <Route
          path="/expected-exam"
          element={user ? <ExpectedExam /> : <Navigate to="/" />}
        />
        <Route
          path="/practice-online"
          element={user ? <PracticeOnline /> : <Navigate to="/" />}
        />
        <Route
          path="/mcq-practice"
          element={user ? <MCQPractice /> : <Navigate to="/" />}
        />
        <Route
          path="/profile"
          element={
            user ? (
              <Profile user={user} setUser={setUser} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

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
