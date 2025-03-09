import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Papa from "papaparse";
import { checkSimilarity } from "../utils/nlpUtils";
import axios from "axios";
import { motion } from "framer-motion";
import { FaUpload, FaCheckCircle, FaSpinner } from "react-icons/fa";

const Practice = () => {
    const { year } = useParams(); 
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({});
    const [marks, setMarks] = useState({});
    const [loading, setLoading] = useState({}); 
    const [modelLoaded, setModelLoaded] = useState(false); // ✅ Track model loading state

    // ✅ Load NLP Model As Soon As Component Mounts
    useEffect(() => {
        const initializeModel = async () => {
            console.log("🔄 Loading NLP model...");
            await loadNLPModel();
            setModelLoaded(true);
            console.log("✅ NLP model loaded!");
        };
        initializeModel();
    }, []);

    // ✅ Load Questions Based on Selected Year
    useEffect(() => {
        fetch("/extracted_questions_pkhist.csv")
            .then(response => response.text())
            .then(csvText => {
                Papa.parse(csvText, {
                    header: true,
                    complete: (results) => {
                        const validQuestions = results.data
                            .filter(row => row.Year === year) // ✅ Filter by selected year
                            .filter(row => row.Answers && row.Answers.trim() !== "") // ✅ Exclude empty answers
                            .filter(row => !row.Question.toLowerCase().includes("according to source")) // ✅ Exclude "According to source"
                            .map(row => ({
                                section: row.Section?.trim(),
                                topic: row.Topic?.trim(),
                                question: row.Question?.trim(),
                                marks: parseInt(row.Marks, 10),
                                answer: row.Answers.trim()
                            }));

                        console.log(`✅ Loaded ${validQuestions.length} questions for year ${year}`);
                        setQuestions(validQuestions);
                    },
                });
            });
    }, [year]); // ✅ Reload if year changes

    // ✅ Handle User Input
    const handleInputChange = (index, value) => {
        setAnswers({ ...answers, [index]: value });
    };

    // ✅ Grade Answer After Ensuring Model is Loaded
    const gradeAnswer = async (index, questionText, userAnswer) => {
        if (!modelLoaded) {
            console.warn("⏳ NLP Model not loaded yet! Please wait.");
            return;
        }

        setLoading(prev => ({ ...prev, [index]: true })); // Start loading
        let score = 0;
        const maxMarks = questions[index].marks;
        const correctAnswer = questions[index].answer;

        if (!correctAnswer) {
            console.warn(`⚠️ No marking scheme found for question: "${questionText}"`);
            setLoading(prev => ({ ...prev, [index]: false })); // Stop loading
            return;
        }

        // ✅ Convert marking scheme into a list of correct points
        const answerPoints = correctAnswer
            .split('\n')
            .map(point => point.trim())
            .filter(point => point.length > 0);

        // ✅ Split user answer into proper sentences
        const sentences = userAnswer
            .split(/[.!?]/) // Split by sentence-ending punctuation
            .map(sentence => sentence.trim())
            .filter(sentence => sentence.length > 5); // Ensure proper length

        const sentenceCount = sentences.length;
        console.log(`📝 User Sentence Count: ${sentenceCount} (Required: ${maxMarks})`);

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-teal-50 to-teal-70 px-6 py-20">
      <motion.h1
        className="text-4xl font-extrabold text-gray-900 mb-6 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {year} Exam Practice
      </motion.h1>
      <p className="text-lg text-gray-700 text-center mb-8 max-w-2xl">
        Answer the questions below and submit for grading. You can also upload a handwritten answer.
      </p>

      <div className="w-full max-w-4xl space-y-8">
        {questions.map((q, index) => (
          <motion.div
            key={index}
            className="p-6 bg-[#f5f7f8] bg-opacity-90 shadow-xl rounded-xl backdrop-blur-lg border border-gray-200"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-4">{q.question}</h2>
            <textarea
              className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              rows={4}
              placeholder="Write your answer here..."
              value={answers[index] || ""}
              onChange={(e) => handleInputChange(index, e.target.value)}
            ></textarea>

            {/* Button Row with Flexbox */}
            <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
              {/* Upload Image Button (Left) */}
              <label className="cursor-pointer bg-teal-500 text-white px-4 py-2 sm:px-3 sm:py-2 rounded-lg shadow-md hover:bg-teal-600 flex items-center gap-2 text-sm sm:text-xs">
                <FaUpload />
                Upload Image
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => console.log("Upload logic here")}
                />
              </label>

              {/* Submit Answer Button (Right) */}
              <button
                className="px-6 py-3 sm:px-3 sm:py-2 bg-teal-600 text-white font-semibold rounded-lg shadow-md hover:bg-teal-700 flex items-center gap-2 text-sm sm:text-xs"
                onClick={() => gradeAnswer(index, answers[index] || "")}
                disabled={loading[index]}
              >
                {loading[index] ? <FaSpinner className="animate-spin" /> : <FaCheckCircle />}
                {loading[index] ? "Grading..." : "Submit Answer"}
              </button>
            </div>
            {uploadedImages[index] && (
              <div className="mt-4">
                <img
                  src={uploadedImages[index]}
                  alt="Uploaded"
                  className="w-24 h-24 object-cover rounded-lg border"
                />
              </div>
            )}

            {marks[index] !== undefined && !loading[index] && (
              <p className="mt-4 text-green-600 font-semibold">
                Marks: {marks[index]} / {q.marks}
              </p>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Practice;
