import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Switch,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Platform } from 'react-native';
// Temporary web-compatible Image component
interface ImageProps {
  source: { uri: string };
  style: any;
  contentFit: string;
}

const Image: React.FC<ImageProps> = ({ source, style, contentFit }) => {
  return (
    <img
      src={source.uri}
      style={{
        ...style,
        objectFit: contentFit === 'contain' ? 'contain' : 'cover',
      }}
      alt="App Icon"
    />
  );
};
import loginScreenStyles from '../../styles/loginScreenStyles';
import { getFirebaseAuth, getFirebaseDatabase, getGoogleProvider } from '../../firebase/firebase';
import { ref, get } from 'firebase/database';
import firebase from 'firebase/compat/app';

interface Props {
  navigation: {
    navigate: (screen: string, params?: object) => void;
  };
}

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  // Load saved credentials and configure Google Sign-In on component mount
  useEffect(() => {
    loadSavedCredentials();
    configureGoogleSignIn();
  }, []);

  const configureGoogleSignIn = async () => {
    try {
      if (Platform.OS === 'android') {
        // Configure Google Sign-In for Android
         await GoogleSignin.configure({
           webClientId: '536095374999-9q6cqja7i2f7ia279eohlpghcgos3bcn.apps.googleusercontent.com',
           offlineAccess: true,
         });
      }
    } catch (error) {
       console.log('Google Sign-In configuration error:', error);
     }
   };

  const loadSavedCredentials = async () => {
    try {
      const savedIdentifier = await AsyncStorage.getItem('savedIdentifier');
      const savedPassword = await AsyncStorage.getItem('savedPassword');
      const savedRememberMe = await AsyncStorage.getItem('rememberMe');
      
      if (savedRememberMe === 'true' && savedIdentifier && savedPassword) {
        setIdentifier(savedIdentifier);
        setPassword(savedPassword);
        setRememberMe(true);
      }
    } catch (error) {
      console.log('Error loading saved credentials:', error);
    }
  };

  const saveCredentials = async () => {
    try {
      if (rememberMe) {
        await AsyncStorage.setItem('savedIdentifier', identifier);
        await AsyncStorage.setItem('savedPassword', password);
        await AsyncStorage.setItem('rememberMe', 'true');
      } else {
        await AsyncStorage.removeItem('savedIdentifier');
        await AsyncStorage.removeItem('savedPassword');
        await AsyncStorage.removeItem('rememberMe');
      }
    } catch (error) {
       console.log('Error saving credentials:', error);
     }
   };

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
      
      // Save credentials if remember me is enabled
      await saveCredentials();
      
      Alert.alert('Success', 'You are now logged in!');
      navigation.navigate('Main', { screen: 'Dashboard' });
    } catch (error: any) {
      Alert.alert('Login Error', error.message || 'Something went wrong.');
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const auth = getFirebaseAuth();
      const googleProvider = getGoogleProvider();

      if (Platform.OS === 'web') {
        // Web platform - use Firebase popup
        const result = await auth.signInWithPopup(googleProvider);
        const user = result.user;
        
        if (user) {
          Alert.alert('Success', `Welcome ${user.displayName}!`);
          navigation.navigate('Main', { screen: 'Dashboard' });
        }
      } else {
        // Android platform - use Google Sign-In SDK
        await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signIn();
        
        // Create Firebase credential
        const googleCredential = firebase.auth.GoogleAuthProvider.credential(
          userInfo.idToken,
          userInfo.accessToken
        );
        
        // Sign in with Firebase
        const result = await auth.signInWithCredential(googleCredential);
        const user = result.user;
        
        if (user) {
          Alert.alert('Success', `Welcome ${user.displayName}!`);
          navigation.navigate('Main', { screen: 'Dashboard' });
        }
      }
    } catch (error: any) {
      console.log('Google Sign-In Error:', error);
      if (error.code === 'auth/popup-closed-by-user') {
        Alert.alert('Sign-In Cancelled', 'Google Sign-In was cancelled.');
      } else if (error.code === 'auth/network-request-failed') {
        Alert.alert('Network Error', 'Please check your internet connection.');
      } else {
         Alert.alert('Google Sign-In Error', error.message || 'Something went wrong.');
       }
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

      {/* Remember Me Section */}
      <View style={loginScreenStyles.rememberMeContainer}>
        <Switch
          value={rememberMe}
          onValueChange={setRememberMe}
          trackColor={{ false: '#767577', true: '#f4b400' }}
          thumbColor={rememberMe ? '#fff' : '#f4f3f4'}
        />
        <Text style={loginScreenStyles.rememberMeText}>Remember Me</Text>
      </View>

      <TouchableOpacity style={loginScreenStyles.button} onPress={handleLogin}>
        <Text style={loginScreenStyles.buttonText}>Login</Text>
      </TouchableOpacity>

      {/* Google Sign-In Button */}
      <TouchableOpacity style={loginScreenStyles.googleButton} onPress={handleGoogleSignIn}>
        <Text style={loginScreenStyles.googleButtonText}>🔍 Sign in with Google</Text>
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
