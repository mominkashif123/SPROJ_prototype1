import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';

const SignupScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  const handleChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        'https://sproj-prototype1-1.onrender.com/api/signup',
        formData
      );
      setMessage(response.data.message);
      if (response.status === 201) setOtpSent(true);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error signing up');
    }
  };

  const handleOtpSubmit = async () => {
    try {
      const response = await axios.post(
        'https://sproj-prototype1-1.onrender.com/api/verify-otp',
        { email: formData.email, otp }
      );
      setMessage('OTP Verified!');
      setTimeout(() => {
        navigation.navigate('Login'); 
      }, 2000);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error verifying OTP');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Create Your Account</Text>
      {message ? <Text style={styles.message}>{message}</Text> : null}

      {!otpSent ? (
        <>
          <TextInput
            placeholder="Username"
            style={styles.input}
            value={formData.username}
            onChangeText={(text) => handleChange('username', text)}
          />
          <TextInput
            placeholder="Email"
            style={styles.input}
            value={formData.email}
            onChangeText={(text) => handleChange('email', text)}
          />
          <TextInput
            placeholder="Password"
            style={styles.input}
            value={formData.password}
            onChangeText={(text) => handleChange('password', text)}
            secureTextEntry
          />
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <TextInput
            placeholder="Enter OTP"
            style={styles.input}
            value={otp}
            onChangeText={setOtp}
          />
          <TouchableOpacity style={styles.button} onPress={handleOtpSubmit}>
            <Text style={styles.buttonText}>Verify OTP</Text>
          </TouchableOpacity>
        </>
      )}

      {/* Login Button */}
      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#f5a623' }]} 
        onPress={() => navigation.navigate('Login')}  
      >
        <Text style={styles.buttonText}>Already have an account? Login</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#fff',
    flexGrow: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 24,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  message: {
    color: 'red',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    padding: 12,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 12,
    height: 50,
  },
  button: {
    backgroundColor: '#14b8a6',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default SignupScreen;
