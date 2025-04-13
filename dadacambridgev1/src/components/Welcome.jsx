import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFileLines,
  faLightbulb,
  faLaptopCode,
  faFolderOpen,
  faClipboardList,
  faThumbsUp,
} from '@fortawesome/free-solid-svg-icons';

const Welcome = ({ user }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-teal-500 to-blue-600 text-white py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-4xl font-extrabold mb-4">Welcome, {user.username}!</h1>
          <p className="text-lg">
            Dive into smarter studying with DadaCambridge – past papers, predictions, and real-time practice, all in one place.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-8">What You Can Explore</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Past Papers */}
            <div
              className="bg-white shadow-xl rounded-lg p-6 transform hover:scale-105 transition cursor-pointer"
              onClick={() => navigate('/past-papers')}
            >
              <div className="text-center">
                <FontAwesomeIcon icon={faFileLines} className="text-4xl text-teal-500 mb-4" />
                <h3 className="text-xl font-bold text-teal-600">Past Papers</h3>
                <p className="text-gray-700 mt-2">
                  Browse a growing archive of past papers to master real exam formats and improve confidence.
                </p>
              </div>
            </div>

            {/* Expected Exams */}
            <div
              className="bg-white shadow-xl rounded-lg p-6 transform hover:scale-105 transition cursor-pointer"
              onClick={() => navigate('/expected-exam')}
            >
              <div className="text-center">
                <FontAwesomeIcon icon={faLightbulb} className="text-4xl text-blue-500 mb-4" />
                <h3 className="text-xl font-bold text-blue-600">Expected Exam</h3>
                <p className="text-gray-700 mt-2">
                  Stay ahead with hand-picked questions based on trends and past paper analysis.
                </p>
              </div>
            </div>

            {/* Practice Online */}
            <div
              className="bg-white shadow-xl rounded-lg p-6 transform hover:scale-105 transition cursor-pointer"
              onClick={() => navigate('/practice-online')}
            >
              <div className="text-center">
                <FontAwesomeIcon icon={faLaptopCode} className="text-4xl text-purple-500 mb-4" />
                <h3 className="text-xl font-bold text-purple-600">Practice Online</h3>
                <p className="text-gray-700 mt-2">
                  Sharpen your skills interactively with quizzes and instant feedback.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Trust Us Section */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-8">Why Trust Us?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white shadow-lg rounded-lg p-6">
              <FontAwesomeIcon icon={faFolderOpen} className="text-3xl text-teal-500 mb-3" />
              <h3 className="text-2xl font-bold text-teal-600">1,000+</h3>
              <p className="text-gray-700">Past Papers & Resources</p>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6">
              <FontAwesomeIcon icon={faClipboardList} className="text-3xl text-blue-500 mb-3" />
              <h3 className="text-2xl font-bold text-blue-600">100+</h3>
              <p className="text-gray-700">Expected Exam Sets</p>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6">
              <FontAwesomeIcon icon={faThumbsUp} className="text-3xl text-purple-500 mb-3" />
              <h3 className="text-2xl font-bold text-purple-600">95%</h3>
              <p className="text-gray-700">Positive Student Feedback</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-12 bg-gradient-to-r from-teal-500 to-blue-600 text-white text-center">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-xl font-semibold">
            "Education is the passport to the future, for tomorrow belongs to those who prepare for it today."
          </p>
        </div>
      </section>
    </div>
  );
};

export default Welcome;
