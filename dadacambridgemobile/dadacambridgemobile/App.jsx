import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { View, Text, Image, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import TabNavigator from './screens/TabNavigator';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignUp';
import MoreStack from './screens/MoreNavigation/MoreStack';

const Stack = createStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // console.log('App.jsx - User state changed to:', user);
  }, [user]);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Image
          source={require('./assets/logo.png')}
          style={{ width: 120, height: 120, marginBottom: 20 }}
          resizeMode="contain"
        />
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
          DADACambridge: Your Gateway to Academic Success
        </Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      {user ? (
        // We need to use a single stack navigator structure
        <Stack.Navigator initialRouteName="MainTabs">
          <Stack.Screen 
            name="MainTabs"
            options={{ headerShown: false }}
          >
            {(props) => {
              // console.log('Rendering MainTabs with user:', user);
              return <TabNavigator {...props} user={user} setUser={setUser} />;
            }}
          </Stack.Screen>
          
          <Stack.Screen
            name="MoreStack"
            options={{ headerShown: false }}
          >
            {(props) => {
              // console.log('Rendering MoreStack with user:', user);
              return <MoreStack {...props} user={user} setUser={setUser} />;
            }}
          </Stack.Screen>
        </Stack.Navigator>
      ) : (
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Login"
            options={{ headerShown: false }}
          >
            {(props) => <LoginScreen {...props} setUser={setUser} />}
          </Stack.Screen>

          <Stack.Screen
            name="Signup"
            component={SignupScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});