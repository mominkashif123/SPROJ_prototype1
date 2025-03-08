import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const PracticePakStudies = () => {
  const [years, setYears] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/extracted_questions_pkhist.csv")
      .then((response) => response.text())
      .then((csvText) => {
        Papa.parse(csvText, {
          header: true,
          complete: (results) => {
            const allYears = results.data
              .map((row) => parseInt(row.Year, 10)) // Convert to numbers
              .filter((year) => year >= 2015 && year <= 2024); // Ensure valid years

            const uniqueYears = [...new Set(allYears)]; // Remove duplicates
            uniqueYears.sort((a, b) => b - a); // Sort in descending order

            setYears(uniqueYears);
          },
        });
      });
  }, []);

  const handleYearSelect = (selectedYear) => {
    navigate(`/practice/pakstudies/${selectedYear}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-teal-50 to-teal-70 text-gray-800 px-6 py-20">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-6 text-center">
        Practice Pak Studies
      </h1>
      <p className="text-lg text-gray-600 text-center mb-12 max-w-3xl">
        Select a year to practice past papers and refine your preparation.
      </p>

      {years.length > 0 ? (
        <>
          <h2 className="text-2xl font-semibold text-center mb-6">Select Year</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-5xl">
            {years.map((year) => (
              <motion.div
                key={year}
                whileHover={{ scale: 1.05 }}
                className="h-48 flex flex-col justify-center items-center p-6 bg-white rounded-2xl shadow-lg transition duration-300 hover:bg-teal-100 cursor-pointer"
                onClick={() => handleYearSelect(year)}
              >
                <h2 className="text-2xl font-semibold text-gray-800">{year}</h2>
              </motion.div>
            ))}
          </div>
        </>
      ) : (
        <p className="text-lg text-gray-600">Loading years...</p>
      )}
    </div>
  );
};

export default PracticePakStudies;
