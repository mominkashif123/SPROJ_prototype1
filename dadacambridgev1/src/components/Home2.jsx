import React from 'react';
import frontimg from '../assets/front_img.jpg';

const HomeGuest = ({ user }) => {
  return (
    <div>
      {/* Hero Section */}
      <div className="bg-white flex flex-col lg:flex-row items-center justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Left Content */}
        <div className="text-center lg:text-left lg:max-w-lg">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 leading-tight">
            We Help to <span className="text-teal-400">Build</span> Your Dream
          </h1>
          <p className="mt-4 text-base sm:text-lg text-gray-600">
            Our platform provides you with access to past papers and personalized feedback
            to help you excel academically and achieve your goals.
          </p>
          <div className="mt-8 flex justify-center lg:justify-start">
            <a
              href="/signup"
              className="px-6 py-2 text-white bg-teal-400 rounded-lg text-sm sm:text-lg font-medium hover:bg-teal-700 transition duration-300"
            >
              Get Started
            </a>
          </div>
        </div>

        {/* Right Graphic */}
        <div className="relative w-full lg:w-1/2 mt-8 lg:mt-0">
          <img
            src={frontimg}
            alt="img"
            className="w-full h-auto object-contain max-h-[300px] sm:max-h-[400px] lg:max-h-[500px]"
          />
        </div>
      </div>

      {/* Featured Universities Section */}
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center">
            <img
              alt="Atlanta"
              src="/cam.jpeg" // Replace with actual image paths
              className="h-12 sm:h-16 object-contain"
            />
            <img
              alt="IGCSE"
              src="/igcse.jpeg" // Replace with actual image paths
              className="h-12 sm:h-16 object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeGuest;
