import React, { useEffect } from 'react';
import { Platform } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import AppNavigator from './navigation/AppNavigator';
import { PomodoroProvider } from './context/PomodoroContext';
import './global.css';

const App = () => {
  useEffect(() => {
    const prepare = async () => {
      try {
        // Optional: prevent auto-hide if doing asset preloading
        if (Platform.OS === 'android' || Platform.OS === 'ios') {
          await SplashScreen.preventAutoHideAsync();

          // ⏳ Optional: preload assets, fonts, or Firebase auth here

          // ✅ Once ready, hide the splash
          await SplashScreen.hideAsync();
        }
      } catch (e) {
        console.warn('Error during splash screen setup:', e);
      }
    };

    prepare();
  }, []);

  return (
    <PomodoroProvider>
      <AppNavigator />
    </PomodoroProvider>
  );
};

export default App;
