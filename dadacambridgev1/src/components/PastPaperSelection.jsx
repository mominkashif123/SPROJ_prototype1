import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const PastPapersSelection = () => {
  const navigate = useNavigate();

  const handleLevelSelect = (level) => {
    navigate(`/past-papers/subjects?level=${encodeURIComponent(level)}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-teal-50 to-teal-70 text-gray-900 px-6 py-20">
      {/* Header */}
      <motion.h1 
        className="text-4xl font-extrabold text-center mb-6 text-gray-800"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Explore Yearly Past Papers
      </motion.h1>
      <p className="text-lg text-gray-700 mb-12 text-center">
        Select your level to access carefully curated resources for your preparation.
      </p>

      {/* Level Selection Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-4xl">
        {["O Level", "A Level"].map((level, index) => (
          <motion.div
            key={index}
            onClick={() => handleLevelSelect(level)}
            className="relative group flex flex-col items-center justify-center bg-white rounded-2xl shadow-md h-64 cursor-pointer transition-all duration-300 hover:shadow-lg"
            whileHover={{ scale: 1.02 }}
          >
            <h2 className="text-2xl font-semibold text-gray-900 z-10">{level}</h2>
            <div className="absolute inset-0 bg-teal-500 opacity-0 group-hover:opacity-20 transition-opacity"></div>
          </motion.div>
        ))}
      </div>

      {/* Features Section */}
      <section
        id="features"
        className="mt-16 bg-white rounded-xl py-16 px-8 sm:px-12 lg:px-20 shadow-xl w-full max-w-6xl"
      >
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-900">
          Why Choose Our Past Papers?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-gray-700">
          {[
            {
              title: "Comprehensive Archive",
              description: "Access an extensive collection of past papers tailored to your educational needs.",
              iconPath: "M12 6v6m0 0v6m0-6H6m6 0h6",
            },
            {
              title: "Easy Accessibility",
              description: "Navigate and download resources seamlessly, from any device.",
              iconPath: "M8 16l-4-4m0 0l4-4m-4 4h16",
            },
            {
              title: "Real-Time Updates",
              description: "Stay updated with the latest past papers and educational content.",
              iconPath: "M3 10h11m4 4h1M3 14h1m9 0h6M3 18h11m4 4h1M3 22h1m9 0h6",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center text-center p-6 bg-gray-50 border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              whileHover={{ scale: 1.02 }}
            >
              <div className="w-16 h-16 rounded-full bg-teal-500 flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={feature.iconPath} />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p>{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default PastPapersSelection;
