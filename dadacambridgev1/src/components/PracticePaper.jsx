import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Papa from "papaparse";
import { checkSimilarity } from "../utils/nlpUtils";
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
                marks: parseInt(row.Marks, 10),
                answer: row.Answers.trim(),
              }));
            setQuestions(validQuestions);
          },
        });
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
    let score = 0;
    const maxMarks = questions[index].marks;
    const correctAnswer = questions[index].answer;

    if (!correctAnswer) {
      setLoading((prev) => ({ ...prev, [index]: false }));
      return;
    }

    const answerPoints = correctAnswer
      .split("\n")
      .map((point) => point.trim())
      .filter((point) => point.length > 0);
    const sentences = userAnswer
      .split(/[.!?]/)
      .map((sentence) => sentence.trim())
      .filter((sentence) => sentence.length > 5);

    let matchedSentences = 0;
    for (let sentence of sentences) {
      let bestMatchScore = 0;
      for (let correctSentence of answerPoints) {
        const { similarity } = await checkSimilarity(sentence, [
          correctSentence,
        ]);
        if (similarity > bestMatchScore) {
          bestMatchScore = similarity;
        }
      }
      if (bestMatchScore >= 0.65) {
        matchedSentences++;
      } else if (bestMatchScore >= 0.45) {
        matchedSentences += 0.5;
      }
    }
    score =
      matchedSentences < maxMarks
        ? Math.ceil((matchedSentences / maxMarks) * maxMarks)
        : maxMarks;
    setMarks({ ...marks, [index]: score });
    setLoading((prev) => ({ ...prev, [index]: false }));
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
                { text: "Extract the text from this image:" },
                { inline_data: { mime_type: "image/png", data: base64Image } },
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
      } finally {
        setLoading((prev) => ({ ...prev, [index]: false }));
      }
    }
  };

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

export default PracticePaper;
