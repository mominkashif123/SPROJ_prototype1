import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Linking,
  TouchableOpacity,
  SafeAreaView,
  Dimensions
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';

const { width } = Dimensions.get('window');

export default function PastPapersDisplay() {
  const [pastPapers, setPastPapers] = useState([]);
  const [filteredPapers, setFilteredPapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState('');
  const [paperType, setPaperType] = useState('');
  const [paperNumber, setPaperNumber] = useState('');

  const route = useRoute();
  const { level, subject } = route.params;

  useEffect(() => {
    const fetchPastPapers = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://sproj-prototype1-1.onrender.com/api/past-papers/past-papers`,
          { params: { level, subject } }
        );
        setPastPapers(response.data);
        setFilteredPapers(response.data);
      } catch (error) {
        console.error('Failed to fetch past papers', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPastPapers();
  }, [level, subject]);

  useEffect(() => {
    const filteredAndSorted = pastPapers
      .filter(
        (paper) =>
          (session ? paper.session === session : true) &&
          (paperType ? paper.paperType === paperType : true) &&
          (paperNumber ? paper.paperNumber.toString() === paperNumber : true)
      )
      .sort((a, b) => parseInt(b.year) - parseInt(a.year));

    setFilteredPapers(filteredAndSorted);
  }, [session, paperType, paperNumber, pastPapers]);

  const uniqueSessions = [...new Set(pastPapers.map((paper) => paper.session))];
  const uniquePaperTypes = [...new Set(pastPapers.map((paper) => paper.paperType))];
  const uniquePaperNumbers = [...new Set(pastPapers.map((paper) => paper.paperNumber))];

  const renderPicker = (selectedValue, onValueChange, items, placeholder) => (
    <View style={styles.pickerContainer}>
      <Picker
        selectedValue={selectedValue}
        style={styles.picker}
        onValueChange={onValueChange}
      >
        <Picker.Item label={placeholder} value="" />
        {items.map((item, index) => (
          <Picker.Item key={index} label={item.toString()} value={item.toString()} />
        ))}
      </Picker>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.heading}>{subject}</Text>
          <Text style={styles.subheading}>{level} Past Papers</Text>
        </View>

        {loading ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="#14b8a6" />
            <Text style={styles.loaderText}>Fetching past papers...</Text>
          </View>
        ) : (
          <ScrollView contentContainerStyle={styles.scrollContent}>
            {/* Filters Section */}
            <View style={styles.filtersContainer}>
              <Text style={styles.filterTitle}>Filter Papers</Text>
              <View style={styles.filters}>
                {renderPicker(session, (itemValue) => setSession(itemValue), uniqueSessions, "All Sessions")}
                {renderPicker(paperType, (itemValue) => setPaperType(itemValue), uniquePaperTypes, "All Paper Types")}
                {renderPicker(paperNumber, (itemValue) => setPaperNumber(itemValue), uniquePaperNumbers, "All Paper Numbers")}
              </View>
            </View>

            {/* Papers List */}
            <View style={styles.papersContainer}>
              {filteredPapers.length > 0 ? (
                filteredPapers.map((paper, index) => (
                  <View key={index} style={styles.paperCard}>
                    <View style={styles.paperHeader}>
                      <Text style={styles.paperYear}>{paper.year}</Text>
                      <Text style={styles.paperSession}>{paper.session}</Text>
                    </View>
                    
                    <View style={styles.paperDetails}>
                      <Text style={styles.paperText}>
                        <Text style={styles.paperLabel}>Code: </Text>
                        {paper.subjectCode}
                      </Text>
                      <Text style={styles.paperText}>
                        <Text style={styles.paperLabel}>Type: </Text>
                        {paper.paperType}
                      </Text>
                      <Text style={styles.paperText}>
                        <Text style={styles.paperLabel}>Paper: </Text>
                        {paper.paperNumber}
                      </Text>
                    </View>
                    
                    <TouchableOpacity
                      onPress={() => Linking.openURL(paper.pdfUrl)}
                      style={styles.pdfButton}
                    >
                      <Text style={styles.pdfButtonText}>View PDF</Text>
                    </TouchableOpacity>
                  </View>
                ))
              ) : (
                <View style={styles.emptyContainer}>
                  <Text style={styles.noPapers}>No past papers found for {subject}.</Text>
                  <Text style={styles.noPapersSubtext}>Check back later for updates.</Text>
                </View>
              )}
            </View>
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  headerContainer: {
    paddingVertical: 24,
    paddingHorizontal: 16,
    backgroundColor: '#0f766e',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
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
    marginTop: 4,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderText: {
    marginTop: 16,
    fontSize: 16,
    color: '#64748b',
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 24,
  },
  filtersContainer: {
    marginHorizontal: 16,
    marginTop: 20,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  filterTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0f766e',
    marginBottom: 12,
  },
  filters: {
    width: '100%',
  },
  pickerContainer: {
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    overflow: 'hidden',
  },
  picker: {
    height: 50,
    backgroundColor: '#ffffff',
  },
  papersContainer: {
    marginHorizontal: 16,
    marginTop: 16,
  },
  paperCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  paperHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  paperYear: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0f766e',
  },
  paperSession: {
    fontSize: 16,
    fontWeight: '500',
    color: '#64748b',
    paddingTop: 4,
  },
  paperDetails: {
    marginBottom: 16,
  },
  paperText: {
    fontSize: 15,
    marginBottom: 6,
    color: '#334155',
  },
  paperLabel: {
    fontWeight: '600',
    color: '#0f766e',
  },
  pdfButton: {
    backgroundColor: '#0f766e',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  pdfButtonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 16,
  },
  emptyContainer: {
    marginTop: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  noPapers: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0f766e',
    textAlign: 'center',
  },
  noPapersSubtext: {
    marginTop: 8,
    fontSize: 15,
    color: '#64748b',
    textAlign: 'center',
  }
});