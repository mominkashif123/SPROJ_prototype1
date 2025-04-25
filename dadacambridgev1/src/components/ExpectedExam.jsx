import React from "react";

const ExpectedExam = () => {
  const fileId = "19Bh85ixgNmLKOTZQOwf0z419NGHdIJss";
  const fileLink = `https://drive.google.com/file/d/19Bh85ixgNmLKOTZQOwf0z419NGHdIJss/view?usp=sharing`;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-teal-50 to-teal-80 text-gray-800 px-6 pt-20">
      {/* Waiting Message */}
      <div className="flex flex-col items-center justify-center space-y-8">

        <div className="flex justify-center items-center space-x-4">
          {/* <div className="w-8 h-8 rounded-full bg-teal-500 animate-ping"></div> */}
          <div className="text-5xl text-gray-600">Good Luck!</div>
        </div>

        {/* Link to Expected Exam */}
        <a
          href={fileLink}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-block px-6 py-3 bg-teal-600 text-white rounded-xl shadow-md hover:bg-teal-700 transition duration-300"
        >
          View Expected Exam (2058_s25_qp_12.pdf)
        </a>
      </div>
    </div>
  );
};

export default ExpectedExam;
