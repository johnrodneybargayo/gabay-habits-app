import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { getFirebaseAuth } from '../../firebase/firebase'; // ✅ Lazy init compat instance
import settingsStyles from '../../styles/settingsStyles';

interface Props {
  navigation: {
    navigate: (screen: string, params?: object) => void;
  };
}

const SettingsScreen: React.FC<Props> = ({ navigation }) => {
  const handleLogout = async () => {
    try {
      const auth = getFirebaseAuth(); // ✅ Firebase compat instance
      await auth.signOut(); // ✅ compat method
      Alert.alert('Success', 'You have been logged out.');
      navigation.navigate('Login');
    } catch (error: any) {
      console.error('Logout Error:', error);
      Alert.alert('Error', error.message || 'Something went wrong.');
    }
  };

  return (
    <View style={settingsStyles.container}>
      <Text style={settingsStyles.text}>Settings</Text>
      <TouchableOpacity style={settingsStyles.logoutButton} onPress={handleLogout}>
        <Text style={settingsStyles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SettingsScreen;
