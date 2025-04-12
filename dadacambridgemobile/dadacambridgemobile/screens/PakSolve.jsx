import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    ActivityIndicator,
    ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useRoute } from "@react-navigation/native";
import pkstudiesData from "../assets/pkstudies.json";

const GEMINI_API_KEY = "AIzaSyATMkZy7NBJPP7O41F6II_qYPibxHltn4A";
const GEMINI_API_URL =
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent";

const PracticePaperScreen = () => {
    const route = useRoute();
    const { year } = route.params;
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({});
    const [ocrTexts, setOcrTexts] = useState({});
    const [marks, setMarks] = useState({});
    const [loading, setLoading] = useState({});
    const [images, setImages] = useState({});

    useEffect(() => {
        const filtered = pkstudiesData
          .filter((q) => q.Year === Number(year) && q.Answers?.trim())  // Convert year to number here
          .map((q) => ({
            section: q.Section?.trim(),
            topic: q.Topic?.trim(),
            question: q.Question?.trim(),
            marks: parseInt(q.Marks, 10),
            answer: q.Answers.trim(),
          }));
        setQuestions(filtered);
      }, [year]);
      
    const handleAnswerChange = (index, text) => {
        setAnswers({ ...answers, [index]: text });
    };

    const handleOCRTextChange = (index, text) => {
        setOcrTexts({ ...ocrTexts, [index]: text });
    };

    const pickImage = async (index) => {
        const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permission.granted) return;

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            base64: true,
            quality: 0.7,
        });

        if (!result.canceled) {
            const base64 = result.assets[0].base64;
            const uri = result.assets[0].uri;
            setImages((prev) => ({ ...prev, [index]: uri }));
            await handleOCR(index, base64);
        }
    };

    const handleOCR = async (index, base64Image) => {
        setLoading((prev) => ({ ...prev, [index]: true }));
        try {
            const payload = {
                contents: [
                    {
                        parts: [
                            { text: "Extract the text from this image:" },
                            {
                                inline_data: {
                                    mime_type: "image/jpeg",
                                    data: base64Image,
                                },
                            },
                        ],
                    },
                ],
            };

            const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const data = await response.json();
            const extracted =
                data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "";

            setOcrTexts((prev) => ({ ...prev, [index]: extracted }));
        } catch (err) {
            console.error("OCR Error:", err);
        } finally {
            setLoading((prev) => ({ ...prev, [index]: false }));
        }
    };

    const gradeAnswer = async (index, questionText, userAnswer) => {
        setLoading((prev) => ({ ...prev, [index]: true }));
        const correctAnswer = questions[index].answer;
        const maxMarks = questions[index].marks;

        const gradingPrompt = `
You are a teacher grading a student's answer.
- Question: ${questionText}
- Correct Answer: ${correctAnswer}
- Student Answer: ${userAnswer}

Evaluate how closely the student's answer matches the correct answer in meaning.
Give a score out of ${maxMarks}. Just reply with the number only.
`;

        try {
            const payload = {
                contents: [
                    {
                        parts: [{ text: gradingPrompt }],
                    },
                ],
            };

            const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const data = await response.json();
            const scoreText = data?.candidates?.[0]?.content?.parts?.[0]?.text || "0";
            const parsedScore = parseInt(scoreText.match(/\d+/)?.[0]) || 0;

            setMarks((prev) => ({ ...prev, [index]: parsedScore }));
        } catch (error) {
            console.error("Grading Error:", error);
            setMarks((prev) => ({ ...prev, [index]: 0 }));
        } finally {
            setLoading((prev) => ({ ...prev, [index]: false }));
        }
    };

    return (
        <ScrollView style={{ padding: 20, backgroundColor: "#f4fafa" }}>
            <Text
                style={{
                    fontSize: 24,
                    fontWeight: "bold",
                    textAlign: "center",
                    marginBottom: 10,
                }}
            >
                {year} Exam Practice
            </Text>
            <Text style={{ textAlign: "center", marginBottom: 20 }}>
                Answer the questions below and submit for grading.
            </Text>

            {questions.map((q, index) => (
                <View
                    key={index}
                    style={{
                        backgroundColor: "#fff",
                        padding: 15,
                        borderRadius: 10,
                        marginBottom: 20,
                        shadowColor: "#000",
                        shadowOffset: { width: 0, height: 1 },
                        shadowOpacity: 0.1,
                        shadowRadius: 2,
                        elevation: 2,
                    }}
                >
                    <Text style={{ fontWeight: "bold", fontSize: 16, marginBottom: 10 }}>
                        {q.question}
                    </Text>

                    <TextInput
                        placeholder="Type your answer..."
                        multiline
                        style={{
                            borderColor: "#ccc",
                            borderWidth: 1,
                            borderRadius: 8,
                            padding: 10,
                            minHeight: 80,
                            marginBottom: 10,
                            backgroundColor: "#fdfdfd",
                        }}
                        value={answers[index] || ""}
                        onChangeText={(text) => handleAnswerChange(index, text)}
                    />

                    <TouchableOpacity
                        onPress={() =>
                            gradeAnswer(index, q.question, ocrTexts[index] || answers[index] || "")
                        }
                        style={{
                            backgroundColor: "#008080",
                            padding: 10,
                            borderRadius: 6,
                            alignItems: "center",
                            marginBottom: 10,
                        }}
                        disabled={loading[index]}
                    >
                        <Text style={{ color: "white", fontWeight: "bold" }}>
                            {loading[index] ? "Grading..." : "Submit Answer"}
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => pickImage(index)}
                        style={{
                            backgroundColor: "#0097a7",
                            padding: 8,
                            borderRadius: 6,
                            alignItems: "center",
                        }}
                    >
                        <Text style={{ color: "white" }}>Upload Image</Text>
                    </TouchableOpacity>

                    {images[index] && (
                        <Image
                            source={{ uri: images[index] }}
                            style={{
                                height: 100,
                                width: 100,
                                marginTop: 10,
                                borderRadius: 8,
                            }}
                        />
                    )}

                    {ocrTexts[index] && (
                        <View style={{ marginTop: 10 }}>
                            <Text style={{ fontWeight: "bold" }}>OCR Text:</Text>
                            <TextInput
                                multiline
                                style={{
                                    borderColor: "#ccc",
                                    borderWidth: 1,
                                    borderRadius: 8,
                                    padding: 10,
                                    minHeight: 60,
                                    backgroundColor: "#fefefe",
                                    marginTop: 4,
                                }}
                                value={ocrTexts[index]}
                                onChangeText={(text) => handleOCRTextChange(index, text)}
                            />
                        </View>
                    )}

                    {marks[index] !== undefined && !loading[index] && (
                        <Text style={{ marginTop: 10, color: "green", fontWeight: "bold" }}>
                            Marks: {marks[index]} / {q.marks}
                        </Text>
                    )}
                </View>
            ))}
        </ScrollView>
    );
};

export default PracticePaperScreen;
