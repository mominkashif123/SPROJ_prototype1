import React from 'react';
import { motion } from 'framer-motion';

function Home() {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="bg-[#f7f7f7] flex flex-col items-center justify-center min-h-screen text-center relative">
        <div className="absolute inset-0 bg-gradient-to-b from-teal-400 via-teal-300 to-transparent opacity-50"></div>
        <div className="relative z-10 px-4 sm:px-8">
          <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900">
            Ready to Give Yourself a Tough Time?
          </h1>
          <p className="mt-6 text-xl md:text-2xl text-gray-700">
            Push your limits, excel in your studies, and conquer challenges with
            the ultimate past paper archive and study tools.
          </p>
          <div className="mt-8">
            <a
              href="/past-papers"
              className="px-8 py-3 text-white bg-teal-500 rounded-lg text-lg font-semibold hover:bg-teal-700 transition duration-300"
            >
              Get Started
            </a>
          </div>
        </div>
        <div className="absolute bottom-12 animate-bounce">
          <p className="text-gray-500">Scroll to Explore</p>
          <span className="text-teal-400 text-2xl">↓</span>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white min-h-screen flex flex-col items-center justify-center py-24">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            Hi, Ready to Get Started?
          </h2>
          <p className="mt-4 text-lg text-gray-700">
            Dive into our features and take your academic preparation to the next level.
          </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl px-4 sm:px-8">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-6 bg-gray-100 rounded-lg shadow-lg text-center"
          >
            <h3 className="text-2xl font-semibold text-teal-500">Past Paper Repository</h3>
            <p className="mt-4 text-gray-600">
              Dive into the ultimate archive of past papers from various boards and subjects.
            </p>
            <a
              href="/past-papers"
              className="mt-6 inline-block text-teal-500 font-medium hover:underline"
            >
              Explore Now →
            </a>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-6 bg-gray-100 rounded-lg shadow-lg text-center"
          >
            <h3 className="text-2xl font-semibold text-teal-500">Get Expected Exams</h3>
            <p className="mt-4 text-gray-600">
              Access predictions and patterns to stay ahead in your exam preparation.
            </p>
            <a
              href="/expected-exam"
              className="mt-6 inline-block text-teal-500 font-medium hover:underline"
            >
              Learn More →
            </a>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-6 bg-gray-100 rounded-lg shadow-lg text-center"
          >
            <h3 className="text-2xl font-semibold text-teal-500">Practice Online</h3>
            <p className="mt-4 text-gray-600">
              Want to simulate exams? Practice online as much as you want to perfect your skills.
            </p>
            <a
              href="/practice-online"
              className="mt-6 inline-block text-teal-500 font-medium hover:underline"
            >
              Start Practicing →
            </a>
          </motion.div>
        </div>
      </section>

      {/* Motivational Section */}
      <section className="bg-gradient-to-r from-teal-400 via-blue-500 to-teal-400 text-white py-24 text-center">
        <h2 className="text-4xl md:text-5xl font-bold">Why Trust Us?</h2>
        <p className="mt-4 text-lg max-w-3xl mx-auto">
          We've been empowering students for years with comprehensive resources,
          expert guidance, and an unwavering commitment to your success.
        </p>
        <div className="mt-8 flex justify-center space-x-4">
          <img
            src="/cam.jpeg"
            alt="Cambridge Logo"
            className="h-16 object-contain"
          />
          <img
            src="/igcse.jpeg"
            alt="IGCSE Logo"
            className="h-16 object-contain"
          />
        </div>
      </section>
    </div>
  );
}

export default Home;
