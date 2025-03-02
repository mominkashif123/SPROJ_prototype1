import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Papa from "papaparse";
import { checkSimilarity } from "../utils/nlpUtils";

const Practice = () => {
    const { year } = useParams(); 
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({});
    const [marks, setMarks] = useState({});
    const [loading, setLoading] = useState({}); 

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

    const gradeAnswer = async (index, questionText, userAnswer) => {
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

        // ✅ Check similarity for each user sentence against marking scheme
        let matchedSentences = 0;
        let matchedSimilarities = [];

        for (let sentence of sentences) {
            let bestMatchScore = 0;

            for (let correctSentence of answerPoints) {
                const { similarity } = await checkSimilarity(sentence, [correctSentence]);

                if (similarity > bestMatchScore) {
                    bestMatchScore = similarity;
                }
            }

            console.log(`🔍 User Sentence: "${sentence}"`);
            console.log(`🔹 Best Matched Score: ${bestMatchScore}`);

            // ✅ Adjusted Thresholds for Partial Marks
            if (bestMatchScore >= 0.65) {  // Strong Match
                matchedSentences++;
                matchedSimilarities.push(bestMatchScore);
            } else if (bestMatchScore >= 0.45) {  // Partial Match
                matchedSentences += 0.5; // Give half credit
                matchedSimilarities.push(bestMatchScore);
            }
        }

        console.log(`✅ Matched Sentences: ${matchedSentences}`);

        // **🚨 Must Match At Least 3 Correct Sentences**
        if (matchedSentences < maxMarks) {
            console.warn(`❌ Not enough correct sentences! Only ${matchedSentences} matched.`);
            score = Math.ceil((matchedSentences / maxMarks) * maxMarks); // Partial marks based on correct points
        } else {
            score = maxMarks; // ✅ Full marks if 3+ correct sentences are found
        }

        console.log(`🎯 Final Score: ${score} / ${maxMarks}`);
        setMarks({ ...marks, [index]: score });
        setLoading(prev => ({ ...prev, [index]: false })); // Stop loading
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-800 px-6 pt-20">
            <h1 className="text-3xl font-bold text-center mb-6">{year} Exam Practice</h1>
            <p className="text-lg text-gray-600 mb-6">Write your answers below and get automatic grading.</p>

            <div className="w-full max-w-4xl">
                {questions.map((q, index) => (
                    <div key={index} className="mb-6 p-6 bg-white shadow-lg rounded-lg">
                        <h2 className="text-xl font-semibold">{q.question}</h2>
                        <textarea
                            className="w-full p-3 mt-3 border border-gray-300 rounded-lg"
                            rows="4"
                            placeholder="Write your answer here..."
                            value={answers[index] || ""}
                            onChange={(e) => handleInputChange(index, e.target.value)}
                        ></textarea>
                        <button
                            className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                            onClick={() => gradeAnswer(index, q.question, answers[index] || "")}
                            disabled={loading[index]} // ✅ Disable button while grading
                        >
                            {loading[index] ? "Grading..." : "Submit Answer"}
                        </button>
                        {loading[index] && (
                            <div className="mt-2 text-gray-600 text-sm">🔄 Evaluating your answer...</div>
                        )}
                        {marks[index] !== undefined && !loading[index] && (
                            <p className="mt-3 text-green-600 font-bold">Marks: {marks[index]} / {q.marks}</p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Practice;
