import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Papa from "papaparse";
import { checkSimilarity } from "../utils/nlpUtils";
import axios from "axios";

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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-6 pt-20">
      <h1 className="text-3xl font-bold text-center mb-6">
        {year} Exam Practice
      </h1>
      <p className="text-lg text-gray-600 mb-6">
        Write your answer below using the textbox or upload an image of your
        handwritten answer.
      </p>
      <div className="w-full max-w-4xl">
        {questions.map((q, index) => (
          <div key={index} className="mb-6 p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-xl font-semibold">{q.question}</h2>
            <textarea
              className="w-full p-3 mt-3 border border-gray-300 rounded-lg"
              rows={4}
              placeholder="Write your answer here..."
              value={answers[index] || ""}
              onChange={(e) => handleInputChange(index, e.target.value)}
            ></textarea>
            <div className="mt-3">
              <label className="block mb-1 font-medium">
                Or Upload an Image:
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileUpload(index, e)}
                className="mb-2"
              />
              {uploadedImages[index] && (
                <div>
                  <img
                    src={uploadedImages[index]}
                    alt="Uploaded"
                    style={{ maxWidth: "300px", marginBottom: "10px" }}
                  />
                  {ocrTexts[index] && (
                    <div className="p-2 bg-gray-50 border border-gray-200 rounded">
                      <strong>OCR Extracted Text:</strong>
                      <textarea
                        className="w-full p-2 mt-1 border border-gray-300 rounded-lg"
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
            </div>
            <button
              className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              onClick={() =>
                gradeAnswer(
                  index,
                  q.question,
                  ocrTexts[index] || answers[index] || ""
                )
              }
              disabled={loading[index]}
            >
              {loading[index] ? "Grading..." : "Submit Answer"}
            </button>
            {loading[index] && (
              <div className="mt-2 text-gray-600 text-sm">
                Evaluating your answer...
              </div>
            )}
            {marks[index] !== undefined && !loading[index] && (
              <p className="mt-3 text-green-600 font-bold">
                Marks: {marks[index]} / {q.marks}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PracticePaper;
