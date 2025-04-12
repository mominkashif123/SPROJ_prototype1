import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import PracticeOnline from "../PracticeOnline";
import PracticePakStudies from "../PracticePakStudies";
import PracticeChemistry from "../PracticeChemistry";
import MCQPracticeScreen from "../MCQpractice";
import PracticePaperScreen from "../PakSolve";

const Stack = createStackNavigator();

const PracticeStack = () => {
  return (
    <Stack.Navigator initialRouteName="PracticeOnline">
      <Stack.Screen
        name="PracticeOnline"
        component={PracticeOnline}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PracticePakStudies"
        component={PracticePakStudies}
        options={{ title: "Pak Studies" }}
      />
      <Stack.Screen
        name="PracticeChemistry"
        component={PracticeChemistry}
        options={{ title: "Chemistry" }}
      />
      <Stack.Screen
        name="MCQpractice"
        component={MCQPracticeScreen}
        options={{ title: "MCQ Practice" }}
      />
      <Stack.Screen
        name="PakStudiesYear"
        component={PracticePaperScreen}
        options={{ title: "Pak Studies Year" }}
      />
    </Stack.Navigator>
  );
};

export default PracticeStack;
