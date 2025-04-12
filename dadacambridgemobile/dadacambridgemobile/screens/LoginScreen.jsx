import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { Ionicons } from '@expo/vector-icons';

const LoginScreen = ({ setUser, navigation }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [otpVerified, setOtpVerified] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        'https://sproj-prototype1-1.onrender.com/api/login',
        formData
      );
      const { token } = response.data;
      const decodedToken = jwtDecode(token);
      const { username, role } = decodedToken;
      setUser({ username, role });
      setMessage('');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error logging in');
    }
  };

  const handleForgotPassword = () => {
    setShowForgotPassword(true);
  };

  const handleSendOtp = async () => {
    try {
      const response = await axios.post(
        'https://sproj-prototype1-1.onrender.com/api/forgot-password',
        { email: formData.email }
      );
      setMessage(response.data.message);
      setOtpSent(true);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error sending OTP');
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const response = await axios.post(
        'https://sproj-prototype1-1.onrender.com/api/verify-otp-for-reset',
        { email: formData.email, otp }
      );
      setMessage(response.data.message);
      setOtpVerified(true);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error verifying OTP');
    }
  };

  const handleResetPassword = async () => {
    try {
      const response = await axios.post(
        'https://sproj-prototype1-1.onrender.com/api/reset-password',
        { email: formData.email, newPassword }
      );
      setMessage(response.data.message);
      setOtpSent(false);
      setOtpVerified(false);
      setShowForgotPassword(false);
      setNewPassword('');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error resetting password');
    }
  };

  const handleBackToLogin = () => {
    setShowForgotPassword(false); 
    setMessage('');  
    setOtpSent(false);  
    setOtpVerified(false);  
    setNewPassword(''); 
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>
        {showForgotPassword ? 'Reset Password' : 'Login to Your Account'}
      </Text>

      {message ? <Text style={styles.message}>{message}</Text> : null}

      {!showForgotPassword ? (
        <>
          <TextInput
            placeholder="Email"
            style={styles.input}
            value={formData.email}
            onChangeText={(text) => handleChange('email', text)}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          <View style={styles.passwordContainer}>
            <TextInput
              placeholder="Password"
              style={styles.passwordInput}
              value={formData.password}
              onChangeText={(text) => handleChange('password', text)}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={styles.eyeIconContainer}
            >
              <Ionicons
                name={showPassword ? 'eye-off' : 'eye'}
                size={24}
                color="gray"
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={handleForgotPassword}>
            <Text style={styles.link}>Forgot Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#f5a623' }]}
            onPress={() => navigation.navigate('Signup')}
          >
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <TouchableOpacity onPress={handleBackToLogin} style={styles.backButton}>
            <Text style={styles.link}>Back to Login</Text>
          </TouchableOpacity>

          {!otpSent && (
            <>
              <TextInput
                placeholder="Enter your email"
                style={styles.input}
                value={formData.email}
                onChangeText={(text) => handleChange('email', text)}
              />
              <TouchableOpacity style={styles.button} onPress={handleSendOtp}>
                <Text style={styles.buttonText}>Send OTP</Text>
              </TouchableOpacity>
            </>
          )}
          {otpSent && !otpVerified && (
            <>
              <TextInput
                placeholder="Enter OTP"
                style={styles.input}
                value={otp}
                onChangeText={setOtp}
              />
              <TouchableOpacity style={styles.button} onPress={handleVerifyOtp}>
                <Text style={styles.buttonText}>Verify OTP</Text>
              </TouchableOpacity>
            </>
          )}
          {otpVerified && (
            <>
              <TextInput
                placeholder="Enter new password"
                style={styles.input}
                value={newPassword}
                onChangeText={setNewPassword}
                secureTextEntry
              />
              <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
                <Text style={styles.buttonText}>Reset Password</Text>
              </TouchableOpacity>
            </>
          )}
        </>
      )}
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
  passwordInput: {
    padding: 12,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    flex: 1,
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
  link: {
    color: '#14b8a6',
    textAlign: 'right',
    marginBottom: 10,
    fontWeight: '600',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  eyeIconContainer: {
    position: 'absolute',
    right: 10,
  },
  backButton: {
    marginBottom: 20,
  },
});

export default LoginScreen;
