import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const PracticeChemistry = () => {
  const [year, setYear] = useState(null);
  const [session, setSession] = useState(null);
  const [paperType, setPaperType] = useState(null);
  const [variant, setVariant] = useState(null);
  const navigate = useNavigate();

  const years = Array.from({ length: 15 }, (_, i) => 2010 + i);
  const sessions = ["Summer", "Winter"];
  const paperTypes = ["Paper Type 1"];
  const variants = ["11", "12"];

  const handleYearSelect = (selectedYear) => {
    setYear(selectedYear);
    setSession(null);
    setPaperType(null);
    setVariant(null);
  };

  const handleSessionSelect = (selectedSession) => {
    setSession(selectedSession);
    setPaperType(null);
    setVariant(null);
  };

  const handlePaperTypeSelect = (selectedPaperType) => {
    setPaperType(selectedPaperType);
    setVariant(null);
  };

  const handleVariantSelect = (selectedVariant) => {
    setVariant(selectedVariant);
    navigate(
      `/practice/chemistry/${year}/${session.toLowerCase()}/${selectedVariant.toLowerCase().replace(" ", "")}`
    );
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-teal-50 to-teal-70 text-gray-800 px-6 py-20">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-6 text-center">
        Practice Chemistry
      </h1>
      <p className="text-lg text-gray-600 text-center mb-12 max-w-3xl">
        Select options to practice Chemistry past papers.
      </p>

      {!year ? (
        <>
          <h2 className="text-2xl font-semibold text-center mb-6">
            Select Year
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-5xl">
            {years.map((year) => (
              <motion.div
                key={year}
                whileHover={{ scale: 1.05 }}
                className="h-40 flex flex-col justify-center items-center p-6 bg-white rounded-2xl shadow-lg transition duration-300 hover:bg-teal-100 cursor-pointer"
                onClick={() => handleYearSelect(year)}
              >
                <h2 className="text-2xl font-semibold text-gray-800">{year}</h2>
              </motion.div>
            ))}
          </div>
        </>
      ) : !session ? (
        <>
          <h2 className="text-2xl font-semibold text-center mb-6">
            Select Session
          </h2>
          <div className="grid grid-cols-2 gap-6 w-full max-w-lg">
            {sessions.map((session) => (
              <motion.div
                key={session}
                whileHover={{ scale: 1.05 }}
                className="h-36 flex flex-col justify-center items-center p-6 bg-white rounded-2xl shadow-lg transition duration-300 hover:bg-teal-100 cursor-pointer"
                onClick={() => handleSessionSelect(session)}
              >
                <h2 className="text-xl font-semibold text-gray-800">{session}</h2>
              </motion.div>
            ))}
          </div>
        </>
      ) : !paperType ? (
        <>
          <h2 className="text-2xl font-semibold text-center mb-6">
            Select Paper Type
          </h2>
          <div className="grid grid-cols-1 gap-6 w-full max-w-lg">
            {paperTypes.map((type) => (
              <motion.div
                key={type}
                whileHover={{ scale: 1.05 }}
                className="h-36 flex flex-col justify-center items-center p-6 bg-white rounded-2xl shadow-lg transition duration-300 hover:bg-teal-100 cursor-pointer"
                onClick={() => handlePaperTypeSelect(type)}
              >
                <h2 className="text-xl font-semibold text-gray-800">{type}</h2>
              </motion.div>
            ))}
          </div>
        </>
      ) : !variant ? (
        <>
          <h2 className="text-2xl font-semibold text-center mb-6">
            Select Variant
          </h2>
          <div className="grid grid-cols-2 gap-6 w-full max-w-lg">
            {variants.map((variant) => (
              <motion.div
                key={variant}
                whileHover={{ scale: 1.05 }}
                className="h-36 flex flex-col justify-center items-center p-6 bg-white rounded-2xl shadow-lg transition duration-300 hover:bg-teal-100 cursor-pointer"
                onClick={() => handleVariantSelect(variant)}
              >
                <h2 className="text-xl font-semibold text-gray-800">{variant}</h2>
              </motion.div>
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
};

export default PracticeChemistry;
