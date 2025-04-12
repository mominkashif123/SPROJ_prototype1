import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import PastPapersSelection from '../PastPaperSelection';
import SubjectsList from '../SubjectsListafterSelection';
import PastPapersDisplay from '../YearlyPastPapersDisplay';

const Stack = createStackNavigator();

const PastPapersStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="PastPapersSelection" component={PastPapersSelection} />
      <Stack.Screen name="SubjectsList" component={SubjectsList} />
      <Stack.Screen name="YearlyPPD" component={PastPapersDisplay} />
    </Stack.Navigator>
  );
};

export default PastPapersStack;
