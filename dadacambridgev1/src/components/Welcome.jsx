import React from 'react';
import { useNavigate } from 'react-router-dom';

const Welcome = ({ user }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-teal-500 to-blue-600 text-white py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-4xl font-extrabold mb-4">Welcome, {user.username}!</h1>
          <p className="text-lg">
            Unlock a world of academic excellence with DadaCambridge. Let's elevate your learning
            experience.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-8">Discover Our Features</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Past Papers Card */}
            <div
              className="bg-white shadow-xl rounded-lg p-6 transform hover:scale-105 transition cursor-pointer"
              onClick={() => navigate('/past-papers')}
            >
              <div className="text-center">
                <img
                  src="https://via.placeholder.com/100"
                  alt="Past Papers Icon"
                  className="mx-auto mb-4"
                />
                <h3 className="text-xl font-bold text-teal-600">Past Papers</h3>
                <p className="text-gray-700 mt-2">
                  Access an extensive collection of past papers to enhance your preparation.
                </p>
              </div>
            </div>

            {/* Exam Insights Card */}
            <div
              className="bg-white shadow-xl rounded-lg p-6 transform hover:scale-105 transition cursor-pointer"
              onClick={() => navigate('/expected-exams')}
            >
              <div className="text-center">
                <img
                  src="https://via.placeholder.com/100"
                  alt="Exam Insights Icon"
                  className="mx-auto mb-4"
                />
                <h3 className="text-xl font-bold text-blue-600">Exam Insights</h3>
                <p className="text-gray-700 mt-2">
                  Get personalized insights to predict and prepare for your exams effectively.
                </p>
              </div>
            </div>

            {/* Progress Tracker Card */}
            <div
              className="bg-white shadow-xl rounded-lg p-6 transform hover:scale-105 transition cursor-pointer"
              onClick={() => navigate('/progress-tracker')}
            >
              <div className="text-center">
                <img
                  src="https://via.placeholder.com/100"
                  alt="Progress Tracker Icon"
                  className="mx-auto mb-4"
                />
                <h3 className="text-xl font-bold text-purple-600">Progress Tracker</h3>
                <p className="text-gray-700 mt-2">
                  Monitor your academic performance and achieve your goals with ease.
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
            {/* Stat 1 */}
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h3 className="text-2xl font-bold text-teal-600">10,000+</h3>
              <p className="text-gray-700">Past Papers Available</p>
            </div>
            {/* Stat 2 */}
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h3 className="text-2xl font-bold text-blue-600">500+</h3>
              <p className="text-gray-700">Expected Exam Insights</p>
            </div>
            {/* Stat 3 */}
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h3 className="text-2xl font-bold text-purple-600">99%</h3>
              <p className="text-gray-700">User Satisfaction Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* Inspirational Quote */}
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
