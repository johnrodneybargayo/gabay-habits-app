# Google Sign-In Setup for Android

This guide explains how to set up Google Sign-In for both web and Android platforms in your Expo React Native app.

## Overview

The app now supports Google Sign-In on both platforms:
- **Web**: Uses Firebase's built-in Google Auth provider with popup/redirect flow
- **Android**: Uses `@react-native-google-signin/google-signin` library with native integration

## Current Implementation Status

✅ **Web Platform**: Fully functional with Firebase Google Auth  
❌ **Android Platform**: Requires development build (cannot use Expo Go)

### ⚠️ Current Error in Expo Go
If you see this error: `TurboModuleRegistry.getEnforcing(...): 'RNGoogleSignin' could not be found`

**This is expected!** The `@react-native-google-signin/google-signin` library requires native code and cannot run in Expo Go. You need to create a development build.

## 🔧 How to Fix the Android Error

### Step 1: Create EAS Development Build
```bash
# Login to Expo (if not already logged in)
eas login

# Create development build for Android
eas build --platform android --profile development
```

### Step 2: Install the Development Build
1. Download the APK from the EAS build dashboard
2. Install it on your Android device
3. Open the development build app
4. Scan the QR code from `npx expo start --dev-client`

### Step 3: Test Google Sign-In
Once running in the development build, Google Sign-In should work properly.

## Requirements for Android

### 1. Development Build Required
The `@react-native-google-signin/google-signin` library requires custom native code and **cannot run in Expo Go**. You need to create a development build:

```bash
# Install EAS CLI if not already installed
npm install -g @expo/eas-cli

# Login to Expo
eas login

# Configure EAS Build
eas build:configure

# Create development build for Android
eas build --profile development --platform android
```

### 2. Google Cloud Console Setup

You need to configure your Google Cloud Console project for Android:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project (gabayhabits)
3. Navigate to "APIs & Services" → "Credentials"
4. Create a new OAuth 2.0 Client ID for Android:
   - Application type: Android
   - Package name: `com.anonymous.GabayHabitsNew`
   - SHA-1 certificate fingerprint: (see below)

### 3. Getting SHA-1 Fingerprint

For development builds, you need the SHA-1 fingerprint:

```bash
# Get development keystore fingerprint
eas credentials
# Select Android → Development → Keystore → View details
```

For production builds, you'll need the SHA-1 from Google Play Console after uploading your app.

### 4. Firebase Configuration

Add the Android OAuth Client ID to your Firebase project:
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Go to Authentication → Sign-in method → Google
4. Add the Android OAuth Client ID

## Environment Variables

The following environment variables are already configured in `.env`:

```env
# Required for both web and Android
EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID=536095374999-9q6cqja7i2f7ia279eohlpghcgos3bcn.apps.googleusercontent.com
```

## Code Implementation

The implementation automatically detects the platform:

### Firebase Configuration (`firebase/firebase.ts`)
```typescript
export const signInWithGoogle = async (): Promise<firebase.auth.UserCredential> => {
  // Web platform: Uses Firebase Google Auth Provider
  if (typeof window !== 'undefined' && window.location) {
    // Firebase popup/redirect flow
  }
  
  // React Native platform: Uses native Google Sign-In
  const { GoogleSignin } = require('@react-native-google-signin/google-signin');
  // Native Google Sign-In flow
};
```

### App Configuration (`app.json`)
```json
{
  "plugins": [
    [
      "@react-native-google-signin/google-signin",
      {
        "iosUrlScheme": "com.googleusercontent.apps.YOUR_IOS_CLIENT_ID"
      }
    ]
  ]
}
```

## Testing

### Web Testing
1. Run `npx expo start`
2. Press `w` to open in web browser
3. Test Google Sign-In functionality

### Android Testing
1. Create development build: `eas build --profile development --platform android`
2. Install the APK on your Android device
3. Test Google Sign-In functionality

**Note**: You cannot test Android Google Sign-In in Expo Go due to native code requirements.

## Troubleshooting

### Common Issues

1. **"Google Sign-In is only supported on web platforms"**
   - This error appears when testing on Android in Expo Go
   - Solution: Use a development build

2. **"DEVELOPER_ERROR" on Android**
   - Incorrect SHA-1 fingerprint in Google Cloud Console
   - Solution: Verify SHA-1 fingerprint matches your build keystore

3. **"SIGN_IN_REQUIRED" error**
   - Google Play Services not available or outdated
   - Solution: Update Google Play Services on device

### Debug Steps

1. Check if Google Play Services are available:
   ```typescript
   await GoogleSignin.hasPlayServices();
   ```

2. Verify configuration:
   ```typescript
   const isSignedIn = await GoogleSignin.isSignedIn();
   console.log('Is signed in:', isSignedIn);
   ```

3. Check current user:
   ```typescript
   const currentUser = await GoogleSignin.getCurrentUser();
   console.log('Current user:', currentUser);
   ```

## Next Steps

1. **For Development**: Create a development build to test Android functionality
2. **For Production**: Set up proper keystores and upload to Google Play Store
3. **For iOS**: Configure iOS OAuth Client ID and update `iosUrlScheme` in app.json

## Additional Resources

- [Expo Google Authentication Guide](https://docs.expo.dev/guides/google-authentication/)
- [React Native Google Sign-In Documentation](https://github.com/react-native-google-signin/google-signin)
- [Firebase Authentication Documentation](https://firebase.google.com/docs/auth)
- [EAS Build Documentation](https://docs.expo.dev/build/introduction/)