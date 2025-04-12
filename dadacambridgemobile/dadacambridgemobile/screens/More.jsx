import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import * as Animatable from 'react-native-animatable';

const More = ({ navigation, user, setUser }) => {
  const handleLogout = () => {
    if (setUser) {
      setUser(null);
    } else {
      console.error('setUser function not available');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header Section */}
        <View style={styles.headerContainer}>
          <Animatable.Text
            style={styles.heading}
            animation="fadeInDown"
            duration={800}
          >
            More Options
          </Animatable.Text>
          <Animatable.Text
            style={styles.subheading}
            animation="fadeIn"
            delay={300}
            duration={800}
          >
            Manage your account and preferences
          </Animatable.Text>
          
          {user && user.username ? (
            <Animatable.Text
              style={styles.userInfo}
              animation="fadeIn"
              delay={500}
              duration={800}
            >
              Logged in as: {user.username}
            </Animatable.Text>
          ) : (
            <Animatable.Text
              style={styles.userInfo}
              animation="fadeIn"
              delay={500}
              duration={800}
            >
              User not available
            </Animatable.Text>
          )}
        </View>

        {/* Options Cards */}
        <View style={styles.cardsSection}>
          <Animatable.View
            style={styles.cardWrapper}
            animation="zoomIn"
            delay={600}
            duration={600}
          >
            <TouchableOpacity
              style={[styles.card, styles.changePasswordCard]}
              onPress={() => navigation.navigate('ChangePassword', { username: user?.username })}
              activeOpacity={0.8}
            >
              <Text style={styles.cardText}>Change Password</Text>
            </TouchableOpacity>
          </Animatable.View>

          <Animatable.View
            style={styles.cardWrapper}
            animation="zoomIn"
            delay={800}
            duration={600}
          >
            <TouchableOpacity
              style={[styles.card, styles.logoutCard]}
              onPress={handleLogout}
              activeOpacity={0.8}
            >
              <Text style={styles.cardText}>Logout</Text>
            </TouchableOpacity>
          </Animatable.View>
        </View>
      </View>
    </SafeAreaView>
  );
};

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
    paddingVertical: 30,
    paddingHorizontal: 20,
    backgroundColor: '#0f766e',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    alignItems: 'center',
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
    marginTop: 10,
    paddingHorizontal: 20,
    lineHeight: 22,
  },
  userInfo: {
    fontSize: 18,
    fontWeight: '500',
    color: '#ffffff',
    marginTop: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  cardsSection: {
    paddingHorizontal: 16,
    marginTop: 24,
  },
  cardWrapper: {
    width: '100%',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: 'rgba(15, 118, 110, 0.1)',
  },
  changePasswordCard: {
    backgroundColor: '#0f766e',
  },
  logoutCard: {
    backgroundColor: '#f43f5e',
  },
  cardText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
    textAlign: 'center',
  },
});

export default More;