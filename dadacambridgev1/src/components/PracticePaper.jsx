import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Papa from "papaparse";
import axios from "axios";
import { motion } from "framer-motion";
import { FaUpload, FaCheckCircle, FaSpinner } from "react-icons/fa";

const GEMINI_API_KEY = "AIzaSyATMkZy7NBJPP7O41F6II_qYPibxHltn4A";
const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent";

const PracticePaper = () => {
  const { year } = useParams();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [marks, setMarks] = useState({});
  const [loading, setLoading] = useState({});
  const [uploadedImages, setUploadedImages] = useState({});
  const [ocrTexts, setOcrTexts] = useState({});
  const [gradingFeedback, setGradingFeedback] = useState({});

  useEffect(() => {
    fetch("/extracted_questions_pkhist.csv")
      .then((response) => response.text())
      .then((csvText) => {
        Papa.parse(csvText, {
          header: true,
          complete: (results) => {
            const validQuestions = results.data
              .filter((row) => row.Year === year)
              .filter((row) => row.Answers && row.Answers.trim() !== "")
              .map((row) => ({
                section: row.Section?.trim(),
                topic: row.Topic?.trim(),
                question: row.Question?.trim(),
                marks: parseInt(row.Marks, 10) || 0,
                answer: row.Answers.trim(),
              }));
            setQuestions(validQuestions);
          },
        });
      })
      .catch(error => {
        console.error("Error loading CSV data:", error);
      });
  }, [year]);

  const handleInputChange = (index, value) => {
    setAnswers({ ...answers, [index]: value });
  };

  const handleOcrTextChange = (index, value) => {
    setOcrTexts({ ...ocrTexts, [index]: value });
  };

  const gradeAnswer = async (index, questionText, userAnswer) => {
    setLoading((prev) => ({ ...prev, [index]: true }));

    try {
      // Validation checks
      if (index >= questions.length) {
        console.error(`Invalid question index: ${index}`);
        setLoading((prev) => ({ ...prev, [index]: false }));
        return;
      }

      const correctAnswer = questions[index].answer;
      const maxMarks = questions[index].marks || 0;

      if (!correctAnswer) {
        console.error(`No model answer available for question at index ${index}`);
        setLoading((prev) => ({ ...prev, [index]: false }));
        return;
      }

      if (!userAnswer || userAnswer.trim() === "") {
        setMarks((prev) => ({ ...prev, [index]: 0 }));
        setGradingFeedback((prev) => ({ 
          ...prev, 
          [index]: "No answer provided." 
        }));
        setLoading((prev) => ({ ...prev, [index]: false }));
        return;
      }
      
      // Create a detailed prompt for Gemini to grade the answer
      const prompt = `
      You are an expert history teacher grading a student's answer. Your task is to evaluate the student's answer against the marking scheme and assign a fair score.
      
      Question: ${questionText}
      
      Marking Scheme (key points that should be addressed):
      ${correctAnswer}
      
      Student Answer: ${userAnswer}
      
      The question is worth ${maxMarks} marks. 
      
      Instructions:
      1. Grade the answer based on how well it covers the key points in the marking scheme.
      2. Consider accuracy, completeness, and relevance to the question.
      3. A student doesn't need to use exact wording, but should demonstrate understanding of the key concepts.
      4. The maximum score possible is ${maxMarks}.
      5. Provide your score in the first line in this format: "SCORE: X" where X is a number between 0 and ${maxMarks}.
      6. Briefly explain your grading decision below the score.
      `;

      const requestPayload = {
        contents: [
          {
            parts: [
              { text: prompt }
            ]
          }
        ]
      };

      const response = await axios.post(
        `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
        requestPayload,
        {
          headers: { "Content-Type": "application/json" }
        }
      );

      const gradingResult = response.data.candidates?.[0]?.content?.parts?.[0]?.text || "";
      
      // Extract the numerical score from the response (looking for SCORE: X pattern)
      const scoreMatch = gradingResult.match(/SCORE:\s*(\d+)/i);
      let score = scoreMatch ? parseInt(scoreMatch[1], 10) : 0;
      
      // Double-check score is within bounds
      score = Math.max(0, Math.min(score, maxMarks));

      // Extract feedback if any (everything after the SCORE line)
      let feedback = "";
      if (gradingResult.includes("SCORE:")) {
        feedback = gradingResult.split(/SCORE:\s*\d+/i)[1]?.trim() || "";
      } else {
        feedback = gradingResult;
      }

      setMarks((prev) => ({ ...prev, [index]: score }));
      setGradingFeedback((prev) => ({ ...prev, [index]: feedback }));
    } catch (error) {
      console.error("Error grading answer with Gemini:", error);
      setGradingFeedback((prev) => ({ 
        ...prev, 
        [index]: "An error occurred while grading. Please try again." 
      }));
    } finally {
      setLoading((prev) => ({ ...prev, [index]: false }));
    }
  };

  const handleFileUpload = async (index, event) => {
    const file = event.target.files?.[0];
    if (file) {
      setLoading((prev) => ({ ...prev, [index]: true }));
      try {
        const readFileAsBase64 = (file) => {
          return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result.split(",")[1]);
            reader.onerror = reject;
            reader.readAsDataURL(file);
          });
        };

        const base64Image = await readFileAsBase64(file);
        setUploadedImages((prev) => ({
          ...prev,
          [index]: URL.createObjectURL(file),
        }));

        const requestPayload = {
          contents: [
            {
              parts: [
                { text: "Extract all the text from this image accurately:" },
                { inline_data: { mime_type: file.type || "image/jpeg", data: base64Image } },
              ],
            },
          ],
        };

        const response = await axios.post(
          `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
          requestPayload,
          {
            headers: { "Content-Type": "application/json" },
          }
        );

        const extractedText =
          response.data.candidates?.[0]?.content?.parts?.[0]?.text || "";
        setOcrTexts((prev) => ({ ...prev, [index]: extractedText }));
      } catch (error) {
        console.error("Error in OCR processing:", error);
        setOcrTexts((prev) => ({ 
          ...prev, 
          [index]: "Failed to extract text from image. Please type your answer manually." 
        }));
      } finally {
        setLoading((prev) => ({ ...prev, [index]: false }));
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-teal-50 to-teal-100 px-6 py-20">
      <motion.div
        className="w-full max-w-4xl bg-[#0f766e] rounded-2xl px-8 py-12 mb-10 text-center shadow-xl"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1
          className="text-4xl font-extrabold text-white mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {year} Exam Practice
        </motion.h1>
        <motion.p
          className="text-lg text-[#e2e8f0] max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          Answer the questions below and submit for grading. You can also upload a
          handwritten answer for automatic text extraction.
        </motion.p>
      </motion.div>

      <div className="w-full max-w-4xl space-y-8">
        {questions.map((q, index) => (
          <motion.div
            key={index}
            className="p-6 bg-white shadow-xl rounded-xl backdrop-blur-lg border border-gray-200"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <h2 className="text-xl font-semibold text-black mb-4">
              {q.question} <span className="ml-2 text-gray-500 text-sm font-normal">({q.marks} marks)</span>
            </h2>
            <textarea
              className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0f766e]"
              rows={4}
              placeholder="Write your answer here..."
              value={answers[index] || ""}
              onChange={(e) => handleInputChange(index, e.target.value)}
            ></textarea>

            {/* Button Row with Flexbox */}
            <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
              {/* Upload Image Button (Left) */}
              <label className="cursor-pointer bg-[#0f766e] text-white px-4 py-2 rounded-lg shadow-md hover:bg-[#0e6b63] transition-colors flex items-center gap-2 text-sm">
                <FaUpload />
                Upload Image
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleFileUpload(index, e)}
                />
              </label>

              {/* Submit Answer Button (Right) */}
              <button
                className="px-6 py-2 bg-[#0f766e] text-white font-semibold rounded-lg shadow-md hover:bg-[#0e6b63] transition-colors flex items-center gap-2 text-sm"
                onClick={() =>
                  gradeAnswer(
                    index,
                    q.question,
                    ocrTexts[index] || answers[index] || ""
                  )
                }
                disabled={loading[index]}
              >
                {loading[index] ? (
                  <FaSpinner className="animate-spin" />
                ) : (
                  <FaCheckCircle />
                )}
                {loading[index] ? "Grading..." : "Submit Answer"}
              </button>
            </div>
            {uploadedImages[index] && (
              <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                <p className="text-[#0f766e] font-medium mb-2">Uploaded Image:</p>
                <img
                  src={uploadedImages[index]}
                  alt="Uploaded"
                  className="w-full max-w-sm h-auto object-cover rounded-lg border mb-3"
                />
                {ocrTexts[index] && (
                  <div className="mt-3">
                    <p className="text-[#0f766e] font-medium mb-2">Extracted Text:</p>
                    <textarea
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0f766e]"
                      rows={3}
                      value={ocrTexts[index]}
                      onChange={(e) =>
                        handleOcrTextChange(index, e.target.value)
                      }
                    ></textarea>
                  </div>
                )}
              </div>
            )}
            {marks[index] !== undefined && !loading[index] && (
              <motion.div 
                className="mt-4 p-4 bg-[#ecfdf5] border border-[#0f766e] rounded-lg"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-black font-semibold text-center text-lg">
                  Marks: {marks[index]} / {q.marks}
                </p>
                {gradingFeedback[index] && (
                  <div className="mt-2 pt-2 border-t border-[#0f766e] border-opacity-20">
                    <p className="text-sm text-gray-600">{gradingFeedback[index]}</p>
                  </div>
                )}
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PracticePaper;