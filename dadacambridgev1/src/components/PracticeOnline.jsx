import React from 'react';

const PracticeOnline = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-800 px-6 pt-20">
      {/* Heading Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
          Practice Online
        </h1>
        <p className="text-lg text-gray-600">
          Get ready for your exams by practicing with a variety of online exercises and tests.
        </p>
      </div>

      {/* Practice Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-4xl">
        {/* Option 1: Start Practice */}
        <div
          className="relative group flex flex-col items-center justify-center bg-white border border-gray-300 rounded-lg shadow-lg h-64 cursor-pointer transform hover:scale-105 transition-transform duration-300 ease-out"
        >
          <h2 className="text-2xl font-semibold text-gray-800 z-10">Start Practice</h2>
          <div className="absolute inset-0 bg-teal-200 opacity-0 group-hover:opacity-50 transition-opacity"></div>
        </div>

        {/* Option 2: Practice with Timed Tests */}
        <div
          className="relative group flex flex-col items-center justify-center bg-white border border-gray-300 rounded-lg shadow-lg h-64 cursor-pointer transform hover:scale-105 transition-transform duration-300 ease-out"
        >
          <h2 className="text-2xl font-semibold text-gray-800 z-10">Timed Test</h2>
          <div className="absolute inset-0 bg-teal-200 opacity-0 group-hover:opacity-50 transition-opacity"></div>
        </div>
      </div>

      {/* Features Section */}
      <section
        id="features"
        className="mt-16 bg-gray-50 rounded-xl py-16 px-8 sm:px-12 lg:px-20 shadow-lg w-full max-w-6xl"
      >
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">
          Why Choose Practice Online?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-gray-700">
          {/* Feature 1 */}
          <div className="flex flex-col items-center text-center p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="w-16 h-16 rounded-full bg-teal-500 flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6H6m6 0h6"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Comprehensive Practice</h3>
            <p>
              Practice various exercises that cover all topics and difficulty levels.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="flex flex-col items-center text-center p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="w-16 h-16 rounded-full bg-teal-500 flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 16l-4-4m0 0l4-4m-4 4h16"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Real-Time Feedback</h3>
            <p>
              Get instant feedback on your answers to improve your performance.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="flex flex-col items-center text-center p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="w-16 h-16 rounded-full bg-teal-500 flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 10h11m4 4h1M3 14h1m9 0h6M3 18h11m4 4h1M3 22h1m9 0h6"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Progress Tracking</h3>
            <p>
              Track your progress and identify areas where you need to focus more.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PracticeOnline;
