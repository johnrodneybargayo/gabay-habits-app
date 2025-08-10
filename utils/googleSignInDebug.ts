// Google Sign-In Debug Utility for Android
import { Platform } from 'react-native';
import { getEnvVar } from './envValidation';

interface GoogleSignInDebugInfo {
  platform: string;
  hasNativeModule: boolean;
  isConfigured: boolean;
  hasPlayServices?: boolean;
  isSignedIn?: boolean;
  currentUser?: any;
  configuration?: any;
  errors: string[];
  warnings: string[];
  recommendations: string[];
}

/**
 * Comprehensive Google Sign-In debug utility
 * Checks configuration, native module availability, and device capabilities
 */
export const debugGoogleSignIn = async (): Promise<GoogleSignInDebugInfo> => {
  const debugInfo: GoogleSignInDebugInfo = {
    platform: Platform.OS,
    hasNativeModule: false,
    isConfigured: false,
    errors: [],
    warnings: [],
    recommendations: []
  };

  console.log('🔍 Starting Google Sign-In debug analysis...');
  console.log('📱 Platform:', Platform.OS);

  try {
    // Check if we're on a supported platform
    if (Platform.OS === 'web') {
      debugInfo.recommendations.push('Web platform detected - Google Sign-In should work with Firebase Auth');
      return debugInfo;
    }

    // Check environment variables
    console.log('🔧 Checking environment variables...');
    const webClientId = getEnvVar('GOOGLE_WEB_CLIENT_ID', false);
    
    if (!webClientId) {
      debugInfo.errors.push('GOOGLE_WEB_CLIENT_ID environment variable is missing');
      debugInfo.recommendations.push('Add GOOGLE_WEB_CLIENT_ID to your .env file');
    } else if (webClientId.includes('your_') || webClientId.includes('_here')) {
      debugInfo.errors.push('GOOGLE_WEB_CLIENT_ID contains placeholder value');
      debugInfo.recommendations.push('Replace GOOGLE_WEB_CLIENT_ID with actual client ID from Google Cloud Console');
    } else {
      console.log('✅ GOOGLE_WEB_CLIENT_ID found:', `${webClientId.substring(0, 20)}...`);
    }

    // Check native module availability
    console.log('🔍 Checking Google Sign-In native module...');
    let GoogleSignin;
    try {
      GoogleSignin = require('@react-native-google-signin/google-signin').GoogleSignin;
      debugInfo.hasNativeModule = true;
      console.log('✅ Google Sign-In native module loaded');
    } catch (requireError) {
      debugInfo.hasNativeModule = false;
      debugInfo.errors.push('Google Sign-In native module not available');
      debugInfo.recommendations.push('Create an EAS development build - Google Sign-In requires native code');
      console.error('❌ Native module error:', requireError);
      return debugInfo;
    }

    // Check if module is properly initialized
    if (!GoogleSignin || typeof GoogleSignin.configure !== 'function') {
      debugInfo.errors.push('Google Sign-In native module not properly initialized');
      debugInfo.recommendations.push('Ensure @react-native-google-signin/google-signin is properly installed and linked');
      return debugInfo;
    }

    // Try to configure Google Sign-In
    console.log('⚙️ Attempting to configure Google Sign-In...');
    try {
      if (webClientId) {
        const config = {
          webClientId: webClientId,
          offlineAccess: true,
          scopes: ['profile', 'email'],
        };
        
        GoogleSignin.configure(config);
        debugInfo.isConfigured = true;
        debugInfo.configuration = config;
        console.log('✅ Google Sign-In configured successfully');
      }
    } catch (configError: any) {
      debugInfo.errors.push(`Configuration failed: ${configError.message}`);
      debugInfo.recommendations.push('Check Google Sign-In configuration parameters');
      console.error('❌ Configuration error:', configError);
    }

    // Check Google Play Services (Android only)
    if (Platform.OS === 'android' && debugInfo.isConfigured) {
      console.log('🔍 Checking Google Play Services...');
      try {
        const hasPlayServices = await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: false });
        debugInfo.hasPlayServices = hasPlayServices;
        
        if (hasPlayServices) {
          console.log('✅ Google Play Services available');
        } else {
          debugInfo.warnings.push('Google Play Services not available or outdated');
          debugInfo.recommendations.push('Update Google Play Services on your device');
        }
      } catch (playServicesError: any) {
        debugInfo.warnings.push(`Google Play Services check failed: ${playServicesError.message}`);
        debugInfo.recommendations.push('Ensure Google Play Services is installed and updated');
        console.warn('⚠️ Play Services error:', playServicesError);
      }
    }

    // Check current sign-in status
    if (debugInfo.isConfigured) {
      console.log('🔍 Checking current sign-in status...');
      try {
        const isSignedIn = await GoogleSignin.isSignedIn();
        debugInfo.isSignedIn = isSignedIn;
        
        if (isSignedIn) {
          console.log('ℹ️ User is currently signed in');
          try {
            const currentUser = await GoogleSignin.getCurrentUser();
            debugInfo.currentUser = {
              id: currentUser?.user?.id,
              email: currentUser?.user?.email,
              name: currentUser?.user?.name,
              hasIdToken: !!currentUser?.idToken,
              hasAccessToken: !!currentUser?.accessToken
            };
            console.log('👤 Current user:', debugInfo.currentUser);
          } catch (userError) {
            debugInfo.warnings.push('Could not retrieve current user info');
            console.warn('⚠️ Current user error:', userError);
          }
        } else {
          console.log('ℹ️ User is not currently signed in');
        }
      } catch (statusError: any) {
        debugInfo.warnings.push(`Sign-in status check failed: ${statusError.message}`);
        console.warn('⚠️ Status check error:', statusError);
      }
    }

  } catch (error: any) {
    debugInfo.errors.push(`Debug analysis failed: ${error.message}`);
    console.error('❌ Debug analysis error:', error);
  }

  // Generate recommendations based on findings
  if (debugInfo.errors.length === 0 && debugInfo.warnings.length === 0) {
    debugInfo.recommendations.push('Google Sign-In appears to be properly configured');
  }

  if (Platform.OS === 'android' && debugInfo.hasNativeModule && !debugInfo.hasPlayServices) {
    debugInfo.recommendations.push('Update Google Play Services to the latest version');
  }

  if (!debugInfo.hasNativeModule) {
    debugInfo.recommendations.push('Run: eas build --profile development --platform android');
    debugInfo.recommendations.push('Install the generated APK on your device');
    debugInfo.recommendations.push('Use the development build instead of Expo Go');
  }

  console.log('🔍 Debug analysis complete');
  return debugInfo;
};

/**
 * Print a formatted debug report to console
 */
export const printGoogleSignInDebugReport = (debugInfo: GoogleSignInDebugInfo): void => {
  console.log('\n📋 Google Sign-In Debug Report');
  console.log('================================');
  console.log(`Platform: ${debugInfo.platform}`);
  console.log(`Native Module Available: ${debugInfo.hasNativeModule ? '✅' : '❌'}`);
  console.log(`Configured: ${debugInfo.isConfigured ? '✅' : '❌'}`);
  
  if (debugInfo.hasPlayServices !== undefined) {
    console.log(`Google Play Services: ${debugInfo.hasPlayServices ? '✅' : '❌'}`);
  }
  
  if (debugInfo.isSignedIn !== undefined) {
    console.log(`Currently Signed In: ${debugInfo.isSignedIn ? '✅' : '❌'}`);
  }

  if (debugInfo.errors.length > 0) {
    console.log('\n❌ Errors:');
    debugInfo.errors.forEach((error, index) => {
      console.log(`  ${index + 1}. ${error}`);
    });
  }

  if (debugInfo.warnings.length > 0) {
    console.log('\n⚠️ Warnings:');
    debugInfo.warnings.forEach((warning, index) => {
      console.log(`  ${index + 1}. ${warning}`);
    });
  }

  if (debugInfo.recommendations.length > 0) {
    console.log('\n💡 Recommendations:');
    debugInfo.recommendations.forEach((rec, index) => {
      console.log(`  ${index + 1}. ${rec}`);
    });
  }

  console.log('================================\n');
};

/**
 * Test Google Sign-In functionality with detailed logging
 */
export const testGoogleSignIn = async (): Promise<boolean> => {
  console.log('🧪 Testing Google Sign-In functionality...');
  
  try {
    // First run debug analysis
    const debugInfo = await debugGoogleSignIn();
    printGoogleSignInDebugReport(debugInfo);
    
    // If there are critical errors, don't attempt sign-in
    if (debugInfo.errors.length > 0) {
      console.log('❌ Cannot test sign-in due to configuration errors');
      return false;
    }
    
    // Import and test the actual sign-in function
    const { signInWithGoogle } = require('../firebase/firebase');
    
    console.log('🚀 Attempting test sign-in...');
    const result = await signInWithGoogle();
    
    if (result && result.user) {
      console.log('✅ Google Sign-In test successful!');
      console.log('👤 Test user:', {
        uid: result.user.uid,
        email: result.user.email,
        displayName: result.user.displayName
      });
      return true;
    } else {
      console.log('❌ Google Sign-In test failed - no user returned');
      return false;
    }
    
  } catch (error: any) {
    console.error('❌ Google Sign-In test failed:', error.message);
    return false;
  }
};

/**
 * Validate Google Sign-In configuration for EAS builds
 */
export const validateEASConfiguration = (): { isValid: boolean; issues: string[] } => {
  const issues: string[] = [];
  
  console.log('🔍 Validating EAS build configuration for Google Sign-In...');
  
  // Check app.json configuration
  try {
    const appConfig = require('../app.json');
    const plugins = appConfig.expo?.plugins || [];
    
    const googleSignInPlugin = plugins.find((plugin: any) => 
      Array.isArray(plugin) && plugin[0] === '@react-native-google-signin/google-signin'
    );
    
    if (!googleSignInPlugin) {
      issues.push('Google Sign-In plugin not found in app.json');
    } else {
      const config = googleSignInPlugin[1] || {};
      
      if (!config.androidClientId) {
        issues.push('androidClientId not configured in app.json Google Sign-In plugin');
      }
      
      if (!config.webClientId) {
        issues.push('webClientId not configured in app.json Google Sign-In plugin');
      }
      
      console.log('✅ Google Sign-In plugin configuration found in app.json');
    }
    
    // Check Android package name
    const androidPackage = appConfig.expo?.android?.package;
    if (!androidPackage) {
      issues.push('Android package name not configured in app.json');
    } else {
      console.log('✅ Android package name configured:', androidPackage);
    }
    
  } catch (error) {
    issues.push('Could not read app.json configuration');
  }
  
  // Check google-services.json
  try {
    const googleServices = require('../google-services.json');
    const clients = googleServices.client || [];
    
    if (clients.length === 0) {
      issues.push('No clients found in google-services.json');
    } else {
      console.log('✅ google-services.json found with clients');
      
      // Check if Android client exists
      const androidClient = clients.find((client: any) => 
        client.client_info?.android_client_info?.package_name
      );
      
      if (!androidClient) {
        issues.push('No Android client configuration found in google-services.json');
      } else {
        console.log('✅ Android client configuration found in google-services.json');
      }
    }
  } catch (error) {
    issues.push('google-services.json not found or invalid');
  }
  
  const isValid = issues.length === 0;
  
  if (isValid) {
    console.log('✅ EAS configuration validation passed');
  } else {
    console.log('❌ EAS configuration validation failed:');
    issues.forEach((issue, index) => {
      console.log(`  ${index + 1}. ${issue}`);
    });
  }
  
  return { isValid, issues };
};