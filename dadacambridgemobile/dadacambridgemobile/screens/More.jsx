import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';

const More = ({ navigation, user, setUser }) => {
  // console.log('More received user:', user); // Debug log

  const handleLogout = () => {
    // console.log('Logging out user:', user);
    if (setUser) {
      setUser(null);
      // console.log('User set to null');
    } else {
      console.error('setUser function not available');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.title}>More Options</Text>
        <Text style={styles.subtitle}>Manage your account and preferences</Text>
        {user && user.username ? (
          <Text style={styles.username}>Logged in as: {user.username}</Text>
        ) : (
          <Text style={styles.username}>User not available</Text>
        )}
      </View>

      <View style={styles.cardContainer}>
        <TouchableOpacity
          style={[styles.card, styles.changePasswordCard]}
          onPress={() => navigation.navigate('ChangePassword', { username: user.username })}
        >
          <Text style={styles.cardText}>Change Password</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.card, styles.logoutCard]}
          onPress={handleLogout}
        >
          <Text style={styles.cardText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20,
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  username: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginTop: 10,
  },
  cardContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  card: {
    padding: 16,
    backgroundColor: '#14b8a6',
    borderRadius: 10,
    marginBottom: 12,
    alignItems: 'center',
  },
  cardText: {
    color: '#fff',
    fontWeight: '600',
  },
  logoutCard: {
    backgroundColor: '#f43f5e',
  },
  changePasswordCard: {
    backgroundColor: '#4CAF50',
  }
});

export default More;