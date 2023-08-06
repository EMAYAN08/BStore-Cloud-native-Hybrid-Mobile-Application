import React, { useState } from 'react';
import { View, Text, TextInput, Alert, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { resetPassword, confirmPasswordReset } from '../utils/cognito';

const PasswordResetScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleResetPassword = async () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email.');
      return;
    }

    try {
      await resetPassword(email);
      Alert.alert('Success', 'A verification code has been sent to your email.');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const handleConfirmPasswordReset = async () => {
    if (!verificationCode || !newPassword || !confirmPassword) {
      Alert.alert('Error', 'Please enter all required fields.');
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }

    try {
      await confirmPasswordReset(email, verificationCode, newPassword);
      Alert.alert('Success', 'Password reset successful. You can now login with your new password.');
      navigation.navigate('LoginScreen');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Reset Password</Text>
        <View style={styles.inputContainer}>
          <MaterialCommunityIcons name="email" size={24} color="#FF69B4" />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#FF69B4"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
          <Text style={styles.buttonText}>Reset Password</Text>
        </TouchableOpacity>
        <Text style={styles.orText}>OR</Text>
        <View style={styles.inputContainer}>
          <MaterialCommunityIcons name="lock" size={24} color="#FF1493" />
          <TextInput
            style={styles.input}
            placeholder="Verification Code"
            placeholderTextColor="#FF1493"
            value={verificationCode}
            onChangeText={setVerificationCode}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.inputContainer}>
          <MaterialCommunityIcons name="lock" size={24} color="#FF1493" />
          <TextInput
            style={styles.input}
            placeholder="New Password"
            placeholderTextColor="#FF1493"
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry
          />
        </View>
        <View style={styles.inputContainer}>
          <MaterialCommunityIcons name="lock" size={24} color="#FF1493" />
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            placeholderTextColor="#FF1493"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleConfirmPasswordReset}>
          <Text style={styles.buttonText}>Confirm Password Reset</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
          <Text style={styles.loginButtonText}>Go back to Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#FFE4E1', // Light pink background color
  },
  card: {
    width: '90%',
    padding: 16,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 182, 193, 0.6)', // Light red glass morphism effect
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#FF1493', // Dark pink text color
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 12,
    marginLeft: 8,
    borderRadius: 8,
    color: '#FF1493', // Dark pink text color
  },
  button: {
    backgroundColor: '#FF69B4', // Medium pink button color
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
    width: '100%',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  orText: {
    marginTop: 16,
    marginBottom: 8,
  },
  loginButtonText: {
    color: '#FF1493', // Dark pink text color
    marginTop: 16,
  },
});

export default PasswordResetScreen;

