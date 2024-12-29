import React from "react";

const ExpectedExam = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-800 px-6 pt-20">
      {/* Heading Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
          Your Results Are On the Way!
        </h1>
        <p className="text-lg text-gray-600">
          Please stay tuned. Our model is processing your request, and results will be available shortly.
        </p>
      </div>

      {/* Waiting Message */}
      <div className="flex flex-col items-center justify-center space-y-8">
        <div className="text-xl font-semibold text-gray-700">
          We're almost there! It won't be long now.
        </div>

        <div className="flex justify-center items-center space-x-4">
          <div className="w-8 h-8 rounded-full bg-teal-500 animate-ping"></div>
          <div className="text-lg text-gray-600">Just a moment...</div>
        </div>
      </div>
    </div>
  );
};

export default ExpectedExam;
