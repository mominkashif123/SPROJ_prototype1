import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import pkstudiesData from "../assets/pkstudies.json";

const DESTINATION_SCREEN = "PakStudiesYear"; 

const PracticePakStudiesScreen = () => {
  const [years, setYears] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const extractYears = () => {
      const allYears = pkstudiesData
        .map((item) => parseInt(item.Year, 10))
        .filter((year) => year >= 2015 && year <= 2024);

      const uniqueYears = [...new Set(allYears)].sort((a, b) => b - a);
      setYears(uniqueYears);
      setLoading(false);
    };

    extractYears();
  }, []);

  const handleYearSelect = (year) => {
    navigation.navigate(DESTINATION_SCREEN, { year });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#14b8a6" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Practice Pak Studies</Text>
      <Text style={styles.subHeader}>
        Select a year to practice past papers and refine your preparation.
      </Text>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {years.map((year) => (
          <TouchableOpacity
            key={year}
            style={styles.card}
            onPress={() => handleYearSelect(year)}
          >
            <Text style={styles.cardText}>{year}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0fdf4",
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#0f172a",
    textAlign: "center",
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 16,
    color: "#475569",
    textAlign: "center",
    marginBottom: 20,
  },
  scrollContainer: {
    alignItems: "center",
    paddingBottom: 30,
  },
  card: {
    width: "90%",
    backgroundColor: "#14b8a6",
    paddingVertical: 18,
    borderRadius: 16,
    marginBottom: 12,
    alignItems: "center",
    elevation: 4, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#ffffff",
  },
});

export default PracticePakStudiesScreen;
