import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/FontAwesome';

const { width } = Dimensions.get('window');

const TopicalPastPapersSelection = () => {
  const navigation = useNavigation();

  const handleLevelSelect = (level) => {
    navigation.navigate('TopicalSubjectsList', { level });
  };

  const features = [
    {
      title: 'Topic-Based Learning',
      description: 'Focus on individual topics to master concepts effectively.',
      icon: 'book',
    },
    {
      title: 'Instant Access',
      description: 'Easily navigate and download past papers sorted by topics.',
      icon: 'download',
    },
    {
      title: 'Stay Ahead',
      description: 'Practice with updated topical papers and improve exam readiness.',
      icon: 'clock-o',
    },
  ];

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
              Explore Topical Past Papers
            </Animatable.Text>
            <Animatable.Text
              style={styles.subheading}
              animation="fadeIn"
              delay={300}
              duration={800}
            >
              Select your level to access focused topic-wise past papers for targeted preparation.
            </Animatable.Text>
          </View>

          {/* Level Selection Cards */}
          <View style={styles.cardsSection}>
            {['O Level', 'A Level'].map((level, index) => (
              <Animatable.View
                key={index}
                style={styles.cardWrapper}
                animation="zoomIn"
                delay={400 + index * 200}
                duration={600}
              >
                <TouchableOpacity
                  style={styles.card}
                  onPress={() => handleLevelSelect(level)}
                  activeOpacity={0.8}
                >
                  <Text style={styles.cardText}>{level}</Text>
                </TouchableOpacity>
              </Animatable.View>
            ))}
          </View>

          {/* Features Section */}
          <Animatable.View
            style={styles.featuresSection}
            animation="fadeInUp"
            delay={800}
            duration={800}
          >
            <Text style={styles.featuresHeading}>
              Why Choose Our Topical Past Papers?
            </Text>
            
            <View style={styles.featuresContainer}>
              {features.map((feature, index) => (
                <Animatable.View
                  key={index}
                  style={styles.featureCard}
                  animation="fadeInUp"
                  delay={1000 + index * 200}
                  duration={600}
                >
                  <View style={styles.iconContainer}>
                    <Icon name={feature.icon} size={24} color="#ffffff" />
                  </View>
                  <Text style={styles.featureTitle}>{feature.title}</Text>
                  <Text style={styles.featureDescription}>{feature.description}</Text>
                </Animatable.View>
              ))}
            </View>
          </Animatable.View>
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
  cardsSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    marginTop: 24,
  },
  cardWrapper: {
    width: '45%',
    margin: 10,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    height: 140,
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
  cardText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0f766e',
  },
  featuresSection: {
    marginTop: 30,
    marginHorizontal: 16,
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  featuresHeading: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0f766e',
    textAlign: 'center',
    marginBottom: 20,
  },
  featuresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  featureCard: {
    width: '30%',
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 1,
  },
  iconContainer: {
    width: 48,
    height: 48,
    backgroundColor: '#0f766e',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0f766e',
    textAlign: 'center',
    marginBottom: 6,
  },
  featureDescription: {
    fontSize: 12,
    textAlign: 'center',
    color: '#64748b',
    lineHeight: 16,
  },
});

export default TopicalPastPapersSelection;