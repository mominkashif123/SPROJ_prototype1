import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Welcome = ({ user }) => {
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container}>
      {/* Hero */}
      <View style={styles.hero}>
        <Text style={styles.heroTitle}>Welcome, {user.username}!</Text>
        <Text style={styles.heroSub}>
          Unlock a world of academic excellence with DadaCambridge. Let's elevate your learning experience.
        </Text>
      </View>

      {/* Features */}
      <Text style={styles.sectionTitle}>✨ Discover Our Features</Text>
      <View style={styles.cardGrid}>
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('Yearly Past Papers', {
            screen: 'PastPaperSelection',
          })}
        >
          <Image
            source={require('../assets/book.jpeg')}
            style={styles.cardImage}
            resizeMode="cover"
          />
          <Text style={[styles.cardTitle, { color: '#14b8a6' }]}>Past Papers</Text>
          <Text style={styles.cardText}>
            Access an extensive collection of past papers to enhance your preparation.
          </Text>
        </TouchableOpacity>


        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('ExpectedExams')}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1596495577886-d920f1fb7238?auto=format&fit=crop&w=800&q=80' }}
            style={styles.cardImage}
            resizeMode="cover"
          />
          <Text style={[styles.cardTitle, { color: '#3b82f6' }]}>Exam Insights</Text>
          <Text style={styles.cardText}>
            Get personalized insights to predict and prepare for your exams effectively.
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('ProgressTracker')}>
          <Image
            source={require('../assets/chart.png')}
            style={styles.cardImage}
            resizeMode="cover"
          />
          <Text style={[styles.cardTitle, { color: '#8b5cf6' }]}>Progress Tracker</Text>
          <Text style={styles.cardText}>
            Monitor your academic performance and achieve your goals with easy-to-read progress charts.
          </Text>
        </TouchableOpacity>


      </View>

      {/* Trust Stats */}
      <Text style={styles.sectionTitle}>💡 Why Trust Us?</Text>
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>10,000+</Text>
          <Text style={styles.statLabel}>Past Papers Available</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>500+</Text>
          <Text style={styles.statLabel}>Expected Exam Insights</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>99%</Text>
          <Text style={styles.statLabel}>User Satisfaction Rate</Text>
        </View>
      </View>

      {/* Quote */}
      <View style={styles.quoteSection}>
        <Text style={styles.quote}>
          "Education is the passport to the future, for tomorrow belongs to those who prepare for it today."
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    flex: 1,
  },
  hero: {
    backgroundColor: '#0f766e',
    paddingVertical: 40,
    paddingHorizontal: 24,
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 10,
  },
  heroSub: {
    fontSize: 16,
    color: '#e0f2f1',
    textAlign: 'center',
    lineHeight: 22,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    color: '#0f766e',
    marginTop: 30,
    marginBottom: 10,
  },
  cardGrid: {
    paddingHorizontal: 16,
    gap: 16,
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 18,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
  },
  cardImage: {
    width: '100%',
    height: 140,
    borderRadius: 12,
    marginBottom: 12,
    backgroundColor: '#e5e7eb',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  cardText: {
    fontSize: 14,
    color: '#4b5563',
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 20,
  },
  statsContainer: {
    paddingHorizontal: 16,
    marginTop: 10,
    marginBottom: 30,
    gap: 16,
  },
  statCard: {
    backgroundColor: '#f0fdf4',
    borderRadius: 14,
    padding: 20,
    alignItems: 'center',
    elevation: 2,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: '#15803d',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#334155',
    textAlign: 'center',
  },
  quoteSection: {
    backgroundColor: '#0f766e',
    padding: 28,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: 20,
  },
  quote: {
    fontSize: 16,
    color: '#ffffff',
    fontStyle: 'italic',
    textAlign: 'center',
    lineHeight: 24,
  },
});

export default Welcome;
