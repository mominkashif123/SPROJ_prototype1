import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  SafeAreaView,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import mcqData from '../assets/mcq.json';

const MCQPracticeScreen = () => {
  const route = useRoute();
  const { year, session, variant } = route.params;

  const [userAnswers, setUserAnswers] = useState({});
  const [correctAnswers, setCorrectAnswers] = useState({});
  const [graded, setGraded] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (route.params) {
      loadData(year, session, variant);
    }
  }, [route.params]);

  const loadData = (year, session, variant) => {
    try {
      const yearNum = parseInt(year, 10);
      const variantNum = parseInt(variant, 10);

      const filtered = mcqData.filter(
        (entry) =>
          parseInt(entry.year) === yearNum &&
          entry.session.toLowerCase() === session.toLowerCase() &&
          parseInt(entry.variant) === variantNum
      );

      const qnaMap = {};
      filtered.forEach((entry) => {
        const q = parseInt(entry.question, 10);
        const a = entry.answer.trim();
        if (q && a) qnaMap[q] = a;
      });

      setCorrectAnswers(qnaMap);
    } catch (error) {
      Alert.alert('Error', 'Failed to load MCQ data');
      console.error('Error parsing JSON:', error);
    }
  };

  const handleAnswerChange = (questionNumber, answer) => {
    setUserAnswers((prev) => ({ ...prev, [questionNumber]: answer }));
  };

  const gradeAnswers = () => {
    let correctCount = 0;
    Object.entries(correctAnswers).forEach(([q, ans]) => {
      if (userAnswers[q] === ans) correctCount++;
    });
    setScore(correctCount);
    setGraded(true);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Chemistry {year} {session} {variant}</Text>
        <Text style={styles.description}>
          Tap the correct answer for each question below.
        </Text>

        {Object.keys(correctAnswers).map((questionNumber) => (
          <View key={questionNumber} style={styles.questionBox}>
            <Text style={styles.questionText}>Question {questionNumber}</Text>

            <View style={styles.optionsContainer}>
              {['A', 'B', 'C', 'D'].map((option) => (
                <TouchableOpacity
                  key={option}
                  style={[
                    styles.optionButton,
                    userAnswers[questionNumber] === option && styles.selectedOption,
                  ]}
                  onPress={() => handleAnswerChange(questionNumber, option)}
                >
                  <Text
                    style={[
                      styles.optionText,
                      userAnswers[questionNumber] === option && styles.selectedOptionText,
                    ]}
                  >
                    {option}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {graded && (
              <Text
                style={[
                  styles.feedbackText,
                  userAnswers[questionNumber] === correctAnswers[questionNumber]
                    ? styles.correct
                    : styles.incorrect,
                ]}
              >
                {userAnswers[questionNumber] === correctAnswers[questionNumber]
                  ? '✅ Correct!'
                  : `❌ Correct Answer: ${correctAnswers[questionNumber]}`}
              </Text>
            )}
          </View>
        ))}

        <TouchableOpacity style={styles.gradeButton} onPress={gradeAnswers}>
          <Text style={styles.gradeButtonText}>Grade My Answers</Text>
        </TouchableOpacity>

        {graded && (
          <View style={styles.scoreBox}>
            <Text style={styles.scoreText}>
              🎯 You scored {score} out of {Object.keys(correctAnswers).length}
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  container: {
    padding: 20,
    paddingBottom: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1e293b',
    textAlign: 'center',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#475569',
    textAlign: 'center',
    marginBottom: 20,
  },
  questionBox: {
    backgroundColor: '#fff',
    padding: 18,
    borderRadius: 14,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 2,
  },
  questionText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 15,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 10,
  },
  optionButton: {
    backgroundColor: '#e2e8f0',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    width: '48%',
    alignItems: 'center',
    marginBottom: 10,
  },
  selectedOption: {
    backgroundColor: '#38bdf8',
  },
  optionText: {
    fontSize: 16,
    color: '#1e293b',
    fontWeight: '500',
  },
  selectedOptionText: {
    color: '#fff',
    fontWeight: '700',
  },
  feedbackText: {
    marginTop: 12,
    fontSize: 16,
    fontWeight: '500',
  },
  correct: {
    color: '#22c55e',
  },
  incorrect: {
    color: '#ef4444',
  },
  gradeButton: {
    backgroundColor: '#0ea5e9',
    paddingVertical: 15,
    borderRadius: 12,
    marginTop: 10,
    marginBottom: 30,
    alignItems: 'center',
  },
  gradeButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  scoreBox: {
    backgroundColor: '#dcfce7',
    borderColor: '#16a34a',
    borderWidth: 1.5,
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 50,
  },
  scoreText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#15803d',
  },
});

export default MCQPracticeScreen;
