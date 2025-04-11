import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TopicalPastPapersSelection from '../TopicalSelection'; // Adjust the import path if necessary
import TopicalSubjectsList from '../TopicalSubjectsList'; // Adjust the import path if necessary
import TopicalTopicsList from '../TopicalTopicsList'; // Adjust the import path if necessary

const Stack = createStackNavigator();

export default function TopicalPastPapersStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TopicalPastPapersSelection"
        component={TopicalPastPapersSelection}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TopicalSubjectsList"
        component={TopicalSubjectsList}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TopicalTopicsList"
        component={TopicalTopicsList}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
