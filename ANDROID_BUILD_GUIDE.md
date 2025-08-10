# Android Build Guide for Google Sign-In

This guide provides comprehensive instructions for building the Gabay Habits app for Android with Google Sign-In functionality.

## 🚀 Quick Start

### Prerequisites
- Node.js 20.18.0 or later
- EAS CLI installed globally: `npm install -g @expo/eas-cli`
- EAS account and project configured
- Google Cloud Console project with OAuth 2.0 credentials
- Firebase project with Android app configured

### Validation
Before building, always run the validation script:
```bash
npm run validate-android
```

### Build Commands
```bash
# Development build (recommended for testing Google Sign-In)
npm run build:android:dev

# Preview build
npm run build:android:preview

# Production build
npm run build:android:prod
```

## 📋 Configuration Checklist

### 1. App Configuration (`app.json`)
- ✅ Android package name: `com.auracreo.gabayhabits`
- ✅ Google Sign-In plugin with correct client IDs
- ✅ Expo build properties with AndroidX support

### 2. Google Services (`google-services.json`)
- ✅ File present in project root
- ✅ Package name matches app.json
- ✅ OAuth client configuration
- ✅ SHA-1 fingerprint configured in Google Cloud Console

### 3. Environment Variables (`.env`)
Required variables:
```env
FIREBASE_API_KEY=your_api_key
FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_project.appspot.com
FIREBASE_MESSAGING_SENDER_ID=your_sender_id
FIREBASE_APP_ID=your_app_id

# Web versions (for Expo web compatibility)
EXPO_PUBLIC_FIREBASE_API_KEY=your_api_key
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
EXPO_PUBLIC_FIREBASE_APP_ID=your_app_id
EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID=your_web_client_id
```

### 4. EAS Configuration (`eas.json`)
- ✅ Development profile with `developmentClient: true`
- ✅ Android build configurations
- ✅ Node.js version specified

## 🔧 Google Cloud Console Setup

### 1. Create OAuth 2.0 Credentials
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project
3. Navigate to "APIs & Services" > "Credentials"
4. Create OAuth 2.0 Client ID for Android

### 2. Configure SHA-1 Fingerprint

#### For Development Builds:
```bash
# Get development SHA-1 fingerprint
eas credentials -p android
```

#### For Production Builds:
```bash
# Generate production keystore
eas credentials -p android --profile production
```

### 3. Add SHA-1 to Google Cloud Console
1. Copy the SHA-1 fingerprint from EAS
2. In Google Cloud Console, edit your Android OAuth client
3. Add the SHA-1 fingerprint to "SHA certificate fingerprints"
4. Save the configuration

## 🏗️ Build Process

### Development Build (Recommended for Testing)
```bash
# Validate configuration
npm run validate-android

# Create development build
npm run build:android:dev

# Install on device
# Download the APK from EAS and install manually
# OR use EAS CLI to install directly
eas build:run -p android
```

### Production Build
```bash
# Validate configuration
npm run validate-android

# Create production build
npm run build:android:prod

# Submit to Google Play Store (optional)
eas submit -p android
```

## 🐛 Troubleshooting

### Common Issues

#### 1. "DEVELOPER_ERROR" during Google Sign-In
**Cause:** SHA-1 fingerprint mismatch or incorrect OAuth client configuration

**Solution:**
1. Verify SHA-1 fingerprint in Google Cloud Console
2. Ensure OAuth client ID matches the one in `google-services.json`
3. Check that package name is consistent across all configurations

#### 2. "Google Play Services not available"
**Cause:** Testing on emulator without Google Play Services or outdated services

**Solution:**
1. Use a physical device with Google Play Services
2. Use an emulator with Google Play Store support
3. Update Google Play Services on the device

#### 3. "Configuration error" or "Invalid client"
**Cause:** Missing or incorrect `google-services.json` file

**Solution:**
1. Download the latest `google-services.json` from Firebase Console
2. Ensure the file is in the project root
3. Verify the package name matches your app configuration

#### 4. Build fails with "Missing google-services.json"
**Cause:** File not found during build process

**Solution:**
1. Ensure `google-services.json` is in the project root
2. Check that the file is not in `.gitignore`
3. Verify file permissions

### Debug Logging

The app includes comprehensive debug logging for Google Sign-In:

1. **Development Mode:** Automatic validation runs before sign-in
2. **Console Logs:** Detailed step-by-step logging
3. **Error Handling:** Specific error messages for common issues

### Testing Google Sign-In

1. **Development Build Required:** Google Sign-In doesn't work in Expo Go
2. **Physical Device Recommended:** Better Google Play Services support
3. **Network Connection:** Ensure stable internet connection
4. **Google Account:** Use a real Google account for testing

## 📱 Device Requirements

### Minimum Requirements
- Android 6.0 (API level 23) or higher
- Google Play Services installed and updated
- Internet connection

### Recommended
- Android 8.0 (API level 26) or higher
- Latest Google Play Services
- Physical device (not emulator)

## 🔒 Security Considerations

1. **Environment Variables:** Never commit sensitive keys to version control
2. **SHA-1 Fingerprints:** Use different fingerprints for development and production
3. **OAuth Clients:** Separate OAuth clients for different environments
4. **Key Rotation:** Regularly rotate API keys and certificates

## 📞 Support

If you encounter issues:

1. Run the validation script: `npm run validate-android`
2. Check the console logs for detailed error information
3. Verify all configurations match this guide
4. Test on a physical device with updated Google Play Services

## 🔄 Continuous Integration

For automated builds, ensure:

1. Environment variables are configured in your CI/CD system
2. `google-services.json` is available during build
3. EAS credentials are properly configured
4. Validation script passes before building

---

**Note:** This guide is specific to the Gabay Habits app configuration. Adjust package names and client IDs according to your project setup.