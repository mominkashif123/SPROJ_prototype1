import React from 'react';
import { useNavigate } from 'react-router-dom';

const PastPapersSelection = () => {
  const navigate = useNavigate();

  const handleLevelSelect = (level) => {
    navigate(`/past-papers/subjects?level=${encodeURIComponent(level)}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      {/* Heading */}
      <h1 className="text-3xl font-bold text-gray-800 mb-12 text-center">
        Select Level for Past Papers
      </h1>
      
      {/* Level Selection Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-16">
        <div
          onClick={() => handleLevelSelect("O Level")}
          className="border border-gray-200 p-8 w-full max-w-xs h-40 flex items-center justify-center shadow-lg rounded-lg bg-white hover:bg-blue-100 cursor-pointer transform hover:scale-105 transition-transform duration-300 ease-out"
        >
          <h2 className="text-2xl font-semibold text-gray-800">O Level</h2>
        </div>
        
        <div
          onClick={() => handleLevelSelect("A Level")}
          className="border border-gray-200 p-8 w-full max-w-xs h-40 flex items-center justify-center shadow-lg rounded-lg bg-white hover:bg-blue-100 cursor-pointer transform hover:scale-105 transition-transform duration-300 ease-out"
        >
          <h2 className="text-2xl font-semibold text-gray-800">A Level</h2>
        </div>
      </div>
      
      {/* Features Section */}
      <section id="features" aria-label="Features for Past Papers" className="bg-gray-900 py-20 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-3xl">
            <h2 className="text-3xl font-medium tracking-tight text-white">Why Choose Our Past Papers?</h2>
            <p className="mt-2 text-lg text-gray-400">
              Our extensive archive was created for students like you, offering easy access to past papers for exam preparation. From mobile-friendly features to instant access to resources, we provide everything you need to excel.
            </p>
          </div>
        </div>

        <div className="mt-16 md:hidden">
          {/* Mobile Carousel with Features */}
          <div className="flex snap-x snap-mandatory -space-x-4 overflow-x-auto pb-4 scrollbar-hide sm:-space-x-6">
            <div className="w-full flex-none snap-center px-4 sm:px-6">
              <div className="relative transform overflow-hidden rounded-2xl bg-gray-800 px-5 py-6">
                <div className="relative aspect-[366/729] mx-auto max-w-[366px]">
                  <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center p-4">
                    <h3 className="text-2xl font-semibold">Access Anytime</h3>
                    <p className="text-gray-400 mt-2">Browse past papers on the go with mobile-friendly access.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full flex-none snap-center px-4 sm:px-6">
              <div className="relative transform overflow-hidden rounded-2xl bg-gray-800 px-5 py-6">
                <div className="relative aspect-[366/729] mx-auto max-w-[366px]">
                  <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center p-4">
                    <h3 className="text-2xl font-semibold">Instant Access</h3>
                    <p className="text-gray-400 mt-2">Download past papers instantly to start preparing right away.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Carousel Indicators */}
          <div className="mt-6 flex justify-center gap-3">
            <button type="button" className="relative h-0.5 w-4 rounded-full bg-gray-300" aria-label="Go to slide 1"></button>
            <button type="button" className="relative h-0.5 w-4 rounded-full bg-gray-500" aria-label="Go to slide 2"></button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PastPapersSelection;