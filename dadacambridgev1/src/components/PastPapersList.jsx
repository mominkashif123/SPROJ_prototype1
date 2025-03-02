import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import { useNavigate } from "react-router-dom";

const PastPapersList = () => {
    const [years, setYears] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("/extracted_questions_pkhist.csv")
            .then(response => response.text())
            .then(csvText => {
                Papa.parse(csvText, {
                    header: true,
                    complete: (results) => {
                        const uniqueYears = [...new Set(results.data.map(row => row.Year).filter(year => year))];
                        uniqueYears.sort((a, b) => b - a); // Sort in descending order
                        setYears(uniqueYears);
                    },
                });
            });
    }, []);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-800 px-6 pt-20">
            <h1 className="text-3xl font-bold text-center mb-6">Select a Past Paper</h1>
            <p className="text-lg text-gray-600 mb-6">Choose a year to practice questions from that exam.</p>

            <div className="w-full max-w-md">
                {years.map(year => (
                    <button
                        key={year}
                        className="w-full mb-3 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-lg font-semibold"
                        onClick={() => navigate(`/practice/${year}`)}
                    >
                        {year} Past Paper
                    </button>
                ))}
            </div>
        </div>
    );
};

export default PastPapersList;
