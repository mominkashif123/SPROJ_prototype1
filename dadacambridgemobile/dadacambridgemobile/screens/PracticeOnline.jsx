import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const subjects = {
  'O Level': [
    { name: 'PakStudies', available: true },
    { name: 'Chemistry', available: true },
    { name: 'Physics', available: false },
    { name: 'Biology', available: false },
    { name: 'Maths', available: false },
    { name: 'Islamic Studies', available: false },
    { name: 'English Language', available: false },
    { name: 'Computer Science', available: false },
  ],
  'A Level': [
    { name: 'Business', available: false },
    { name: 'Economics', available: false },
    { name: 'Accounting', available: false },
    { name: 'Psychology', available: false },
    { name: 'Law', available: false },
    { name: 'Sociology', available: false },
    { name: 'Further Maths', available: false },
    { name: 'Computer Science', available: false },
  ],
};

const PracticeOnline = () => {
  const [level, setLevel] = useState(null);
  const navigation = useNavigation();

  const handleLevelSelect = (selectedLevel) => {
    setLevel(selectedLevel);
  };

  const handleSubjectSelect = (subjectName) => {
    if (subjectName === 'Chemistry') {
      navigation.navigate('PracticeChemistry');
    } else if (subjectName === 'PakStudies') {
      navigation.navigate('PracticePakStudies');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.headerContainer}>
          <Text style={styles.heading}>Practice Online</Text>
          <Text style={styles.subheading}>
            Get ready for your exams by practicing with a variety of online exercises.
          </Text>
        </View>

        {!level ? (
          <View style={styles.cardsSection}>
            <TouchableOpacity
              style={styles.card}
              onPress={() => handleLevelSelect('O Level')}
              activeOpacity={0.8}
            >
              <Text style={styles.cardText}>O Level</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.card, styles.disabledCard]} disabled>
              <Text style={styles.cardText}>A Level (Coming Soon!)</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <Text style={styles.levelTitle}>Choose a Subject ({level})</Text>
            <View style={styles.subjectList}>
              {subjects[level].map((subject) => (
                <TouchableOpacity
                  key={subject.name}
                  style={[
                    styles.subjectCard,
                    !subject.available && styles.disabledSubjectCard,
                  ]}
                  onPress={() =>
                    subject.available && handleSubjectSelect(subject.name)
                  }
                  disabled={!subject.available}
                >
                  <Text style={styles.subjectName}>{subject.name}</Text>
                  <Text
                    style={[
                      styles.subjectStatus,
                      {
                        backgroundColor: subject.available ? '#14b8a6' : '#94a3b8',
                      },
                    ]}
                  >
                    {subject.available ? 'Available' : 'Coming Soon'}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity style={styles.backButton} onPress={() => setLevel(null)}>
              <Text style={styles.backButtonText}>Back to Levels</Text>
            </TouchableOpacity>
          </>
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
  cardsSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    marginTop: 24,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    height: 140,
    width: '45%',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: 'rgba(15, 118, 110, 0.1)',
  },
  disabledCard: {
    opacity: 0.6,
  },
  cardText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0f766e',
    textAlign: 'center',
  },
  levelTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0f766e',
    textAlign: 'center',
    marginTop: 24,
    marginBottom: 16,
  },
  subjectList: {
    paddingHorizontal: 16,
  },
  subjectCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  disabledSubjectCard: {
    opacity: 0.5,
  },
  subjectName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
  },
  subjectStatus: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 12,
  },
  backButton: {
    marginTop: 24,
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#cbd5e1',
    borderRadius: 12,
  },
  backButtonText: {
    fontWeight: '600',
    color: '#1e293b',
  },
});

export default PracticeOnline;
