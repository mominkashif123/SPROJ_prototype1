import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { FaFileAlt, FaClipboardCheck, FaLaptopCode, FaGraduationCap } from 'react-icons/fa';

function Home() {
  const featuresRef = useRef(null); // Create a reference for Features Section

  const scrollToFeatures = () => {
    featuresRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center min-h-screen text-center relative px-6 sm:px-12">
        <div className="absolute inset-0 bg-gradient-to-b from-teal-400 via-teal-300 to-transparent opacity-50"></div>
        <div className="relative z-10 max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight">
            Tired of Searching for Practice Exams?
          </h1>
          <p className="mt-6 text-2xl text-gray-700">
            Jumping from website to website but not finding the right platform with everything in one place?  
            <span className="block mt-2">We’ve got you covered!</span>  
            Explore our comprehensive resources and start preparing smarter.
          </p>
          <div className="mt-8">
            <button
              onClick={scrollToFeatures}
              className="px-8 py-3 text-white bg-teal-500 rounded-lg text-xl font-semibold hover:bg-teal-700 transition duration-300"
            >
              Explore What We Offer
            </button>
          </div>
        </div>
        <div className="absolute bottom-12 animate-bounce">
          <p className="text-gray-500">Scroll to Explore</p>
          <span className="text-teal-400 text-2xl">↓</span>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="bg-gradient-to-br from-teal-50 to-teal-70 py-24">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto px-6"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            Your Key to Academic Success
          </h2>
          <p className="mt-4 text-lg text-gray-700">
            Get access to premium study resources that will help you prepare effectively and gain confidence.
          </p>
        </motion.div>

        {/* Feature Cards */}
        <div className="mt-16 max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Past Papers */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center bg-white shadow-md rounded-[25px] p-6 space-x-6"
          >
            <FaFileAlt className="text-teal-500 text-5xl" />
            <div>
              <h3 className="text-2xl font-semibold text-gray-900">Past Papers</h3>
              <p className="text-gray-600">
                Solving past papers helps you familiarize yourself with the exam pattern and 
                recognize frequently repeated questions—boosting your confidence!
              </p>
              <a href="/past-papers" className="text-teal-500 font-medium hover:underline mt-2 block">
                Explore Past Papers →
              </a>
            </div>
          </motion.div>

          {/* Topical Exams */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center bg-white shadow-md rounded-[25px] p-6 space-x-6"
          >
            <FaClipboardCheck className="text-teal-500 text-5xl" />
            <div>
              <h3 className="text-2xl font-semibold text-gray-900">Topical Exams</h3>
              <p className="text-gray-600">
                Test your understanding of specific topics with targeted topical exams 
                and track your improvement over time.
              </p>
              <a href="/topical-exams" className="text-teal-500 font-medium hover:underline mt-2 block">
                Start Topical Exams →
              </a>
            </div>
          </motion.div>

          {/* Practice Online */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center bg-white shadow-md rounded-[25px] p-6 space-x-6"
          >
            <FaLaptopCode className="text-teal-500 text-5xl" />
            <div>
              <h3 className="text-2xl font-semibold text-gray-900">Practice Online</h3>
              <p className="text-gray-600">
                Simulate real exam conditions and practice unlimited times to 
                refine your answering techniques.
              </p>
              <a href="/practice-online" className="text-teal-500 font-medium hover:underline mt-2 block">
                Start Practicing →
              </a>
            </div>
          </motion.div>

          {/* Expected Exams */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center bg-white shadow-md rounded-[25px] p-6 space-x-6"
          >
            <FaGraduationCap className="text-teal-500 text-5xl" />
            <div>
              <h3 className="text-2xl font-semibold text-gray-900">Expected Exams</h3>
              <p className="text-gray-600">
                Prepare strategically with expected exam questions and get an 
                edge over others in your final exams.
              </p>
              <a href="/expected-exam" className="text-teal-500 font-medium hover:underline mt-2 block">
                View Expected Exams →
              </a>
            </div>
          </motion.div>
        </div>
      </section>
        {/* Motivational Section */}
        <section className="bg-gradient-to-r from-teal-400 via-blue-500 to-teal-400 text-white py-24 text-center">
        <h2 className="text-4xl md:text-5xl font-bold">Why Choose Us?</h2>
        <p className="mt-4 text-lg max-w-3xl mx-auto">
          We’ve been empowering students for years with comprehensive study materials, 
          expert guidance, and a commitment to your success.
        </p>
        <div className="mt-8 flex justify-center space-x-4">
          <img src="/cam.jpeg" alt="Cambridge Logo" className="h-16 object-contain" />
          <img src="/igcse.jpeg" alt="IGCSE Logo" className="h-16 object-contain" />
        </div>
      </section>
    </div>
  );
}

export default Home;
