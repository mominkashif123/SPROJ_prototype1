import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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
    navigate(`/practice/chemistry/${year}/${session.toLowerCase()}/${selectedVariant.toLowerCase().replace(" ", "")}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-800 px-6 pt-20">
      <h1 className="text-3xl font-bold text-center mb-6">Practice Chemistry</h1>
      <p className="text-lg text-gray-600 mb-6">Select options to practice Chemistry past papers.</p>

      <div className="w-full max-w-md">
        {!year ? (
          <>
            <h2 className="text-xl font-semibold mb-4">Select Year</h2>
            {years.map((year) => (
              <button
                key={year}
                className="w-full mb-3 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-lg font-semibold"
                onClick={() => handleYearSelect(year)}
              >
                {year}
              </button>
            ))}
          </>
        ) : !session ? (
          <>
            <h2 className="text-xl font-semibold mb-4">Select Session</h2>
            {sessions.map((session) => (
              <button
                key={session}
                className="w-full mb-3 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-lg font-semibold"
                onClick={() => handleSessionSelect(session)}
              >
                {session}
              </button>
            ))}
          </>
        ) : !paperType ? (
          <>
            <h2 className="text-xl font-semibold mb-4">Select Paper Type</h2>
            {paperTypes.map((type) => (
              <button
                key={type}
                className="w-full mb-3 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-lg font-semibold"
                onClick={() => handlePaperTypeSelect(type)}
              >
                {type}
              </button>
            ))}
          </>
        ) : !variant ? (
          <>
            <h2 className="text-xl font-semibold mb-4">Select Variant</h2>
            {variants.map((variant) => (
              <button
                key={variant}
                className="w-full mb-3 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-lg font-semibold"
                onClick={() => handleVariantSelect(variant)}
              >
                {variant}
              </button>
            ))}
          </>
        ) : null}
      </div>
    </div>
  );
};

export default PracticeChemistry;