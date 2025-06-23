import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Image } from 'expo-image'; // Using expo-image for web + remote
import loginScreenStyles from '../../styles/loginScreenStyles';
import { getFirebaseAuth, getFirebaseDatabase } from '../../firebase/firebase';
import { ref, get } from 'firebase/database';

interface Props {
  navigation: {
    navigate: (screen: string, params?: object) => void;
  };
}

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');

  const isEmail = (value: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const handleLogin = async () => {
    if (!identifier.trim()) {
      Alert.alert('Validation Error', 'Email or username is required.');
      return;
    }

    if (!password.trim()) {
      Alert.alert('Validation Error', 'Password is required.');
      return;
    }

    try {
      const auth = getFirebaseAuth();
      const db = getFirebaseDatabase();

      let emailToUse = identifier;

      if (!isEmail(identifier)) {
        const usernameRef = ref(db, `usernames/${identifier}`);
        const snapshot = await get(usernameRef);

        if (!snapshot.exists()) {
          Alert.alert('Login Error', 'Username not found.');
          return;
        }

        const userData = snapshot.val();

        if (!userData.email) {
          Alert.alert('Login Error', 'Email not found for this username.');
          return;
        }

        emailToUse = userData.email;
      }

      await auth.signInWithEmailAndPassword(emailToUse, password);
      Alert.alert('Success', 'You are now logged in!');
      navigation.navigate('Main', { screen: 'Dashboard' });
    } catch (error: any) {
      Alert.alert('Login Error', error.message || 'Something went wrong.');
    }
  };

  return (
    <View style={loginScreenStyles.container}>
      <Image
        source={{
          uri: 'https://i.postimg.cc/Wbp09kB4/icon.png', // ✅ Replace with the actual direct link
        }}
        style={{
          width: 100,
          height: 100,
          marginBottom: 20,
        }}
        contentFit="contain"
      />

      <Text style={loginScreenStyles.title}>Welcome Back!</Text>

      <TextInput
        style={loginScreenStyles.input}
        placeholder="Email or Username"
        placeholderTextColor="#ccc"
        value={identifier}
        onChangeText={setIdentifier}
        autoCapitalize="none"
      />

      <TextInput
        style={loginScreenStyles.input}
        placeholder="Password"
        placeholderTextColor="#ccc"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={loginScreenStyles.button} onPress={handleLogin}>
        <Text style={loginScreenStyles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={loginScreenStyles.registerButton}
        onPress={() => navigation.navigate('Register')}
      >
        <Text style={loginScreenStyles.registerText}>
          Don’t have an account? Register
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
