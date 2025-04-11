import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Ionicons } from '@expo/vector-icons';
import { View, Text } from 'react-native';

import Welcome from './Welcome';
import PastPapersStack from '../screens/YearlyNavigation/PastPapersStack';
import TopicalPastPapersStack from './TopicalNavigation/TopicalPastPapersStack';
import PracticeStack from './PracticeNavigation/PracticeStack';
import MoreStack from './MoreNavigation/MoreStack';

const Tab = createMaterialTopTabNavigator();

export default function TabNavigator({ user, setUser }) {
  // console.log('TabNavigator received user:', user); // Debug log to verify user prop
  
  return (
    <Tab.Navigator
      initialRouteName="Home"
      swipeEnabled={true}
      tabBarPosition="bottom"
      screenOptions={({ route }) => ({
        tabBarShowIcon: true,
        tabBarShowLabel: true,
        tabBarActiveTintColor: '#0f766e',
        tabBarInactiveTintColor: '#94a3b8',
        tabBarPressColor: '#d1fae5',
        tabBarIndicatorStyle: { backgroundColor: '#0f766e' },
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopColor: '#e2e8f0',
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
        tabBarIcon: ({ color }) => {
          let iconName;

          switch (route.name) {
            case 'Home':
              iconName = 'home-outline';
              break;
            case 'Yearly Past Papers':
              iconName = 'calendar-outline';
              break;
            case 'Topical Past Papers':
              iconName = 'layers-outline';
              break;
            case 'Practice Online':
              iconName = 'pencil-outline';
              break;
            case 'More':
              iconName = 'ellipsis-horizontal-outline';
              break;
          }

          return (
            <Ionicons name={iconName} size={20} color={color} style={{ marginBottom: -4 }} />
          );
        },
      })}
    >
      <Tab.Screen name="Home" children={() => <Welcome user={user} />} />
      <Tab.Screen name="Yearly Past Papers" component={PastPapersStack} />
      <Tab.Screen name="Topical Past Papers" component={TopicalPastPapersStack} />
      <Tab.Screen name="Practice Online" component={PracticeStack} />
      <Tab.Screen 
        name="More" 
        children={(props) => <MoreStack {...props} user={user} setUser={setUser} />}
      />
    </Tab.Navigator>
  );
}