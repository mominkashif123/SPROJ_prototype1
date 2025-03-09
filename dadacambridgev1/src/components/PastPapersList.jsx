import React, { useState, useEffect } from "react";
import Papa from "papaparse";

const PastPapersList = () => {
  const [years, setYears] = useState([]);

  useEffect(() => {
    fetch("/extracted_questions_pkhist.csv")
      .then((response) => response.text())
      .then((csvText) => {
        Papa.parse(csvText, {
          header: true,
          complete: (results) => {
            const uniqueYears = [
              ...new Set(
                results.data.map((row) => row.Year).filter((year) => year)
              ),
            ];
            uniqueYears.sort((a, b) => b - a); // Sort in descending order
            setYears(uniqueYears);
          },
        });
      });
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-teal-50 to-teal-70 text-gray-800 px-6 pt-20">
      <h1 className="text-3xl font-bold text-center mb-6">
        Select a Past Paper
      </h1>
      <p className="text-lg text-gray-600 mb-6">
        Choose a year to practice questions from that exam.
      </p>

      <div className="w-full max-w-md">
        {years.length > 0 ? (
          years.map((year) => (
            <button
              key={year}
              className="w-full mb-3 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-lg font-semibold"
            >
              {year} Past Paper
            </button>
          ))
        ) : (
          <p className="text-lg text-gray-600 mb-6">Loading years...</p>
        )}
      </div>
    </div>
  );
};

export default PastPapersList;
