import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { registerUser } from '../utils/cognito';

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    if (!username || !email || !password) {
      Alert.alert('Error', 'Please enter all required fields.');
      return;
    }

    try {
      await registerUser(username, email, password);
      Alert.alert('Success', 'User registered successfully. Please check your email for verification.');
      navigation.navigate('LoginScreen');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Register</Text>
        <View style={styles.inputContainer}>
          <MaterialCommunityIcons name="account" size={24} color="#FF007F" />
          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor="#FF007F"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
          />
        </View>
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
        <View style={styles.inputContainer}>
          <MaterialCommunityIcons name="lock" size={24} color="#FF1493" />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#FF1493"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
        <Text style={styles.loginText}>Already have an account? Login</Text>
      </TouchableOpacity>
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
    color: '#FF007F', // Dark red text color
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
  loginText: {
    color: '#FF1493', // Dark pink text color
    marginTop: 16,
  },
});

export default RegisterScreen;
