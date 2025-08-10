import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
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
import { getFirebaseAuth } from '../../firebase/firebase';
import registerScreenStyles from '../../styles/registerScreenStyles';

interface Props {
  navigation: {
    navigate: (screen: string, params?: object) => void;
  };
}

const RegisterScreen: React.FC<Props> = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [address, setAddress] = useState('');
  const [occupation, setOccupation] = useState('');
  const [dob, setDob] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async () => {
    if (!firstName || !lastName || !contactNumber || !address || !occupation || !dob) {
      Alert.alert('Validation Error', 'All fields including Date of Birth are required.');
      return;
    }

    if (!email.trim()) {
      Alert.alert('Validation Error', 'Email is required.');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Validation Error', 'Password must be at least 6 characters.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Validation Error', 'Passwords do not match.');
      return;
    }

    try {
      const auth = getFirebaseAuth();
      const userCredential = await auth.createUserWithEmailAndPassword(email, password);

      if (!userCredential.user) {
        throw new Error('User creation failed.');
      }

      Alert.alert('Success', 'Your account has been created successfully!');
      navigation.navigate('Login');
    } catch (error: any) {
      console.error('Registration Error:', error);
      Alert.alert('Registration Error', error.message || 'Something went wrong.');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={registerScreenStyles.container}>
        <Image
          source={{
            uri: 'https://i.postimg.cc/Wbp09kB4/icon.png', // ✅ Direct image URL
          }}
          style={{
            width: 100,
            height: 100,
            marginBottom: 20,
            alignSelf: 'center',
          }}
          contentFit="contain"
        />
        <Text style={registerScreenStyles.title}>Create an Account</Text>

        <TextInput
          style={registerScreenStyles.input}
          placeholder="First Name"
          placeholderTextColor="#ccc"
          value={firstName}
          onChangeText={setFirstName}
        />

        <TextInput
          style={registerScreenStyles.input}
          placeholder="Last Name"
          placeholderTextColor="#ccc"
          value={lastName}
          onChangeText={setLastName}
        />

        <TextInput
          style={registerScreenStyles.input}
          placeholder="Contact Number"
          placeholderTextColor="#ccc"
          value={contactNumber}
          onChangeText={setContactNumber}
          keyboardType="phone-pad"
        />

        <TextInput
          style={registerScreenStyles.input}
          placeholder="Address"
          placeholderTextColor="#ccc"
          value={address}
          onChangeText={setAddress}
        />

        <TextInput
          style={registerScreenStyles.input}
          placeholder="Occupation"
          placeholderTextColor="#ccc"
          value={occupation}
          onChangeText={setOccupation}
        />

        {/* 📅 Date of Birth Picker */}
        <TouchableOpacity
          style={registerScreenStyles.input}
          onPress={() => setShowDatePicker(true)}
        >
          <Text style={{ color: '#fff' }}>
            {dob ? dob.toDateString() : 'Select Date of Birth'}
          </Text>
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            value={dob}
            mode="date"
            display="default"
            maximumDate={new Date()}
            onChange={(event, selectedDate) => {
              setShowDatePicker(false);
              if (selectedDate) setDob(selectedDate);
            }}
          />
        )}

        <TextInput
          style={registerScreenStyles.input}
          placeholder="Email"
          placeholderTextColor="#ccc"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          style={registerScreenStyles.input}
          placeholder="Password"
          placeholderTextColor="#ccc"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TextInput
          style={registerScreenStyles.input}
          placeholder="Confirm Password"
          placeholderTextColor="#ccc"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        <TouchableOpacity style={registerScreenStyles.button} onPress={handleRegister}>
          <Text style={registerScreenStyles.buttonText}>Register</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={registerScreenStyles.loginLink}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={registerScreenStyles.loginText}>
            Already have an account? Login
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;
