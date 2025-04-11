import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const PracticeChemistryScreen = () => {
  const [year, setYear] = useState(null);
  const [session, setSession] = useState(null);
  const [paperType, setPaperType] = useState(null);
  const [variant, setVariant] = useState(null);
  const navigation = useNavigation();

  const years = Array.from({ length: 15 }, (_, i) => 2010 + i);
  const sessions = ['Summer', 'Winter'];
  const paperTypes = ['Paper Type 1'];
  const variants = ['11', '12'];

  const handleVariantSelect = (selectedVariant) => {
    navigation.navigate('MCQpractice', {
      subject: 'chemistry',
      year,
      session: session.toLowerCase(),
      variant: selectedVariant.toLowerCase().replace(' ', ''),
    });
  };

  const renderOptions = (options, onPress) => (
    <View style={styles.optionContainer}>
      {options.map((item) => (
        <TouchableOpacity
          key={item}
          style={styles.optionButton}
          onPress={() => onPress(item)}
        >
          <Text style={styles.optionText}>{item}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Practice Chemistry</Text>
      <Text style={styles.description}>
        Select options to practice Chemistry past papers.
      </Text>

      {!year ? (
        <>
          <Text style={styles.subtitle}>Select Year</Text>
          {renderOptions(years, setYear)}
        </>
      ) : !session ? (
        <>
          <Text style={styles.subtitle}>Select Session</Text>
          {renderOptions(sessions, setSession)}
        </>
      ) : !paperType ? (
        <>
          <Text style={styles.subtitle}>Select Paper Type</Text>
          {renderOptions(paperTypes, setPaperType)}
        </>
      ) : !variant ? (
        <>
          <Text style={styles.subtitle}>Select Variant</Text>
          {renderOptions(variants, handleVariantSelect)}
        </>
      ) : null}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 20,
    backgroundColor: '#f0fdfa',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#0f172a',
    textAlign: 'center',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#475569',
    textAlign: 'center',
    marginBottom: 30,
  },
  subtitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 20,
    textAlign: 'center',
  },
  optionContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 16,
  },
  optionButton: {
    backgroundColor: '#fff',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
    marginBottom: 10,
    width: 140,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    textAlign: 'center',
  },
});

export default PracticeChemistryScreen;
