import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  SafeAreaView,
} from 'react-native';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';
import LottieView from 'lottie-react-native';
import * as Animatable from 'react-native-animatable';

import loadingAnimation from '../assets/loading.json';

const TopicalTopicsList = ({ route }) => {
  const { level, subject } = route.params;
  const [topics, setTopics] = useState([]);
  const [filteredTopics, setFilteredTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPaperNumber, setSelectedPaperNumber] = useState('');

  useEffect(() => {
    const fetchTopics = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://sproj-prototype1-1.onrender.com/api/topical/topics/${level}/${encodeURIComponent(subject)}`
        );
        setTopics(response.data);
        setFilteredTopics(response.data);
      } catch (error) {
        console.error('Failed to fetch topics', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopics();
  }, [level, subject]);

  useEffect(() => {
    const filtered = topics.filter(
      (topic) => selectedPaperNumber === '' || topic.paperNumber === parseInt(selectedPaperNumber)
    );
    setFilteredTopics(filtered);
  }, [selectedPaperNumber, topics]);

  const uniquePaperNumbers = [...new Set(topics.map((topic) => topic.paperNumber))];

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <LottieView source={loadingAnimation} autoPlay loop style={styles.lottie} />
        <Text style={styles.loadingText}>Fetching topics...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.headerContainer}>
          <Animatable.Text
            style={styles.heading}
            animation="fadeInDown"
            duration={800}
          >
            Topics for {subject} ({level})
          </Animatable.Text>
          <Animatable.Text
            style={styles.subheading}
            animation="fadeIn"
            delay={300}
            duration={800}
          >
            Select a paper number to filter topics
          </Animatable.Text>
        </View>

        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={selectedPaperNumber}
            onValueChange={(itemValue) => setSelectedPaperNumber(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="All Paper Numbers" value="" />
            {uniquePaperNumbers.map((number, index) => (
              <Picker.Item key={index} label={`Paper ${number}`} value={number.toString()} />
            ))}
          </Picker>
        </View>

        {filteredTopics.length > 0 ? (
          <View style={styles.cardsSection}>
            {filteredTopics.map((topic, index) => (
              <Animatable.View
                key={index}
                style={styles.cardWrapper}
                animation="zoomIn"
                delay={400 + index * 200}
                duration={600}
              >
                <View style={styles.card}>
                  <Text style={styles.topic}>{topic.topic}</Text>
                  <Text style={styles.paperNumber}>Paper Number: {topic.paperNumber}</Text>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => Linking.openURL(topic.pdfUrl)}
                  >
                    <Text style={styles.buttonText}>View PDF</Text>
                  </TouchableOpacity>
                </View>
              </Animatable.View>
            ))}
          </View>
        ) : (
          <Text style={styles.noData}>No topics found.</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 30,
  },
  headerContainer: {
    paddingVertical: 30,
    paddingHorizontal: 20,
    backgroundColor: '#0f766e',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    alignItems: 'center',
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
  },
  subheading: {
    fontSize: 16,
    color: '#e2e8f0',
    textAlign: 'center',
    marginTop: 10,
    paddingHorizontal: 20,
    lineHeight: 22,
  },
  pickerWrapper: {
    backgroundColor: '#ffffff',
    marginTop: 20,
    marginHorizontal: 20,
    borderRadius: 12,
    elevation: 3,
    overflow: 'hidden',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  cardsSection: {
    flexDirection: 'column',
    paddingHorizontal: 16,
    marginTop: 24,
  },
  cardWrapper: {
    width: '100%',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: 'rgba(15, 118, 110, 0.1)',
  },
  topic: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0f766e',
    marginBottom: 6,
  },
  paperNumber: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#0f766e',
    paddingVertical: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
  },
  noData: {
    fontSize: 16,
    color: '#64748b',
    marginTop: 20,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0fdfa',
  },
  lottie: {
    width: 150,
    height: 150,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#475569',
  },
});

export default TopicalTopicsList;
