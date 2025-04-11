import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Asset } from "expo-asset";
import * as FileSystem from "expo-file-system";

// Helper function to parse CSV string manually
const parseCSV = (csvText) => {
  const rows = csvText.split("\n");
  const headers = rows[0].split(",");  // Assuming the first row is the header
  const data = rows.slice(1);

  return data.map((row) => {
    const values = row.split(",");
    const obj = {};
    headers.forEach((header, index) => {
      obj[header.trim()] = values[index].trim();
    });
    return obj;
  });
};

const PracticePakStudiesScreen = () => {
  const [years, setYears] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const loadCSV = async () => {
      try {
        // Load the asset (CSV file)
        const asset = Asset.fromModule(require('../assets/extracted_questions_pkhist.csv'));
        await asset.downloadAsync(); // This is necessary to load the asset from the bundle
        
        // Read the file contents as a string
        const csvFile = await FileSystem.readAsStringAsync(asset.localUri); // Get the URI for the file

        // Parse the CSV data
        const parsedData = parseCSV(csvFile);

        // Extract years from the CSV data and filter them
        const allYears = parsedData
          .map((row) => parseInt(row.Year, 10)) // Convert to numbers
          .filter((year) => year >= 2015 && year <= 2024); // Ensure valid years

        // Remove duplicates and sort in descending order
        const uniqueYears = [...new Set(allYears)];
        uniqueYears.sort((a, b) => b - a);

        // Set the years to state
        setYears(uniqueYears);
      } catch (error) {
        console.error("Error loading CSV:", error);
      } finally {
        setLoading(false);
      }
    };

    loadCSV();
  }, []);

  const handleYearSelect = (selectedYear) => {
    navigation.navigate(`/practice/pakstudies/${selectedYear}`);
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: "#f0f4f8" }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 20 }}>
        Practice Pak Studies
      </Text>
      <Text style={{ fontSize: 16, textAlign: "center", marginBottom: 20 }}>
        Select a year to practice past papers and refine your preparation.
      </Text>
      <ScrollView contentContainerStyle={{ alignItems: "center" }}>
        {years.length > 0 ? (
          years.map((year) => (
            <TouchableOpacity
              key={year}
              style={{
                backgroundColor: "#00bcd4",
                padding: 15,
                marginBottom: 10,
                borderRadius: 10,
                width: "90%",
                alignItems: "center",
              }}
              onPress={() => handleYearSelect(year)}
            >
              <Text style={{ color: "white", fontSize: 18 }}>{year}</Text>
            </TouchableOpacity>
          ))
        ) : (
          <Text>No years available</Text>
        )}
      </ScrollView>
    </View>
  );
};

export default PracticePakStudiesScreen;
