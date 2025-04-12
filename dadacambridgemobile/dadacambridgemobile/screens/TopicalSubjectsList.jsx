import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import * as Animatable from 'react-native-animatable';

const TopicalSubjectsList = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const level = route.params?.level;

  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubjects = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://sproj-prototype1-1.onrender.com/api/topical/subjects/${level}`);
        const data = await response.json();
        setSubjects(data);
      } catch (error) {
        console.error("Failed to fetch subjects", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubjects();
  }, [level]);

  const handleSubjectClick = (subjectName) => {
    navigation.navigate('TopicalTopicsList', {
      level,
      subject: subjectName,
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Header Section */}
          <View style={styles.headerContainer}>
            <Animatable.Text
              style={styles.heading}
              animation="fadeInDown"
              duration={800}
            >
              Subjects for {level}
            </Animatable.Text>
            <Animatable.Text
              style={styles.subheading}
              animation="fadeIn"
              delay={300}
              duration={800}
            >
              Select a subject to explore topic-wise past papers
            </Animatable.Text>
          </View>

          {loading ? (
            <View style={styles.loadingContainer}>
              <LottieView
                source={require('../assets/loading.json')}
                autoPlay
                loop
                style={styles.lottie}
              />
              <Text style={styles.loadingText}>Fetching subjects...</Text>
            </View>
          ) : subjects.length > 0 ? (
            <View style={styles.cardsSection}>
              {subjects.map((subject, index) => (
                <Animatable.View
                  key={index}
                  style={styles.cardWrapper}
                  animation="zoomIn"
                  delay={400 + index * 200}
                  duration={600}
                >
                  <TouchableOpacity
                    style={styles.card}
                    onPress={() => handleSubjectClick(subject.name)}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.subjectName}>{subject.name}</Text>
                    <Text style={styles.subjectCode}>Code: {subject.subjectCode}</Text>
                  </TouchableOpacity>
                </Animatable.View>
              ))}
            </View>
          ) : (
            <Text style={styles.noData}>No subjects found for {level}. Stay tuned!</Text>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  container: {
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
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
  cardsSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    marginTop: 24,
  },
  cardWrapper: {
    width: '90%',
    margin: 10,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: 'rgba(15, 118, 110, 0.1)',
  },
  subjectName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0f766e',
    textAlign: 'center',
    marginBottom: 5,
  },
  subjectCode: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
  },
  noData: {
    fontSize: 16,
    color: '#64748b',
    marginTop: 50,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});

export default TopicalSubjectsList;