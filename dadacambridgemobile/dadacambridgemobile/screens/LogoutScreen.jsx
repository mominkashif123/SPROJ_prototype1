import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';

const LogoutScreen = ({ navigation, setUser }) => {
  useEffect(() => {
    setUser(null);
    navigation.replace('Login');
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" />
    </View>
  );
};

export default LogoutScreen;
