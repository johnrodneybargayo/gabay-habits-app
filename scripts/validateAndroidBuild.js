/**
 * Android Build Validation Script for Google Sign-In
 * This script validates all necessary configurations for successful EAS Android builds
 * with Google Sign-In functionality.
 */

const fs = require('fs');
const path = require('path');

// ANSI color codes for console output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m'
};

function log(message, color = 'white') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function validateAndroidBuild() {
  log('\n🔍 Android Build Validation for Google Sign-In', 'cyan');
  log('=' .repeat(60), 'cyan');
  
  const errors = [];
  const warnings = [];
  const recommendations = [];
  
  // 1. Check app.json configuration
  log('\n📱 Checking app.json configuration...', 'blue');
  try {
    const appJsonPath = path.join(process.cwd(), 'app.json');
    const appJson = JSON.parse(fs.readFileSync(appJsonPath, 'utf8'));
    
    // Check Android package name
    if (!appJson.expo?.android?.package) {
      errors.push('Missing android.package in app.json');
    } else {
      log(`✅ Android package: ${appJson.expo.android.package}`, 'green');
    }
    
    // Check Google Sign-In plugin configuration
    const googleSignInPlugin = appJson.expo?.plugins?.find(plugin => 
      Array.isArray(plugin) && plugin[0] === '@react-native-google-signin/google-signin'
    );
    
    if (!googleSignInPlugin) {
      errors.push('Missing @react-native-google-signin/google-signin plugin in app.json');
    } else {
      const config = googleSignInPlugin[1];
      if (!config.androidClientId) {
        errors.push('Missing androidClientId in Google Sign-In plugin configuration');
      } else {
        log(`✅ Android Client ID configured`, 'green');
      }
      
      if (!config.webClientId) {
        warnings.push('Missing webClientId in Google Sign-In plugin configuration');
      } else {
        log(`✅ Web Client ID configured`, 'green');
      }
    }
    
    // Check expo-build-properties
    const buildPropsPlugin = appJson.expo?.plugins?.find(plugin => 
      Array.isArray(plugin) && plugin[0] === 'expo-build-properties'
    );
    
    if (!buildPropsPlugin) {
      warnings.push('Missing expo-build-properties plugin (recommended for Android builds)');
    } else {
      const config = buildPropsPlugin[1];
      if (config.android?.useAndroidX && config.android?.enableJetifier) {
        log(`✅ AndroidX and Jetifier enabled`, 'green');
      } else {
        warnings.push('AndroidX and Jetifier not properly configured');
      }
    }
    
  } catch (error) {
    errors.push(`Failed to read app.json: ${error.message}`);
  }
  
  // 2. Check google-services.json
  log('\n🔧 Checking google-services.json...', 'blue');
  try {
    const googleServicesPath = path.join(process.cwd(), 'google-services.json');
    if (!fs.existsSync(googleServicesPath)) {
      errors.push('Missing google-services.json file');
    } else {
      const googleServices = JSON.parse(fs.readFileSync(googleServicesPath, 'utf8'));
      
      // Check project info
      if (!googleServices.project_info?.project_id) {
        errors.push('Missing project_id in google-services.json');
      } else {
        log(`✅ Firebase project: ${googleServices.project_info.project_id}`, 'green');
      }
      
      // Check client info
      const client = googleServices.client?.[0];
      if (!client) {
        errors.push('Missing client configuration in google-services.json');
      } else {
        if (!client.client_info?.mobilesdk_app_id) {
          errors.push('Missing mobilesdk_app_id in google-services.json');
        }
        
        if (!client.client_info?.android_client_info?.package_name) {
          errors.push('Missing package_name in google-services.json');
        } else {
          log(`✅ Package name: ${client.client_info.android_client_info.package_name}`, 'green');
        }
        
        // Check OAuth client
        const oauthClient = client.oauth_client?.find(oauth => oauth.client_type === 1);
        if (!oauthClient) {
          errors.push('Missing OAuth client configuration in google-services.json');
        } else {
          log(`✅ OAuth client configured`, 'green');
        }
      }
    }
  } catch (error) {
    errors.push(`Failed to read google-services.json: ${error.message}`);
  }
  
  // 3. Check EAS configuration
  log('\n⚙️ Checking eas.json configuration...', 'blue');
  try {
    const easJsonPath = path.join(process.cwd(), 'eas.json');
    if (!fs.existsSync(easJsonPath)) {
      warnings.push('Missing eas.json file');
    } else {
      const easJson = JSON.parse(fs.readFileSync(easJsonPath, 'utf8'));
      
      // Check build profiles
      if (!easJson.build) {
        errors.push('Missing build configuration in eas.json');
      } else {
        const profiles = ['development', 'preview', 'production'];
        profiles.forEach(profile => {
          if (easJson.build[profile]) {
            log(`✅ ${profile} build profile configured`, 'green');
          } else {
            warnings.push(`Missing ${profile} build profile in eas.json`);
          }
        });
        
        // Check development build configuration
        if (easJson.build.development?.developmentClient) {
          log(`✅ Development client enabled for Google Sign-In testing`, 'green');
        } else {
          errors.push('Development client not enabled - required for Google Sign-In on Android');
        }
      }
    }
  } catch (error) {
    errors.push(`Failed to read eas.json: ${error.message}`);
  }
  
  // 4. Check environment variables
  log('\n🔐 Checking environment variables...', 'blue');
  try {
    const envPath = path.join(process.cwd(), '.env');
    if (!fs.existsSync(envPath)) {
      warnings.push('Missing .env file');
    } else {
      const envContent = fs.readFileSync(envPath, 'utf8');
      const requiredVars = [
        'FIREBASE_API_KEY',
        'FIREBASE_AUTH_DOMAIN',
        'FIREBASE_PROJECT_ID',
        'FIREBASE_STORAGE_BUCKET',
        'FIREBASE_MESSAGING_SENDER_ID',
        'FIREBASE_APP_ID'
      ];
      
      const optionalVars = [
        'GOOGLE_WEB_CLIENT_ID',
        'EXPO_PUBLIC_FIREBASE_API_KEY',
        'EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN',
        'EXPO_PUBLIC_FIREBASE_PROJECT_ID',
        'EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET',
        'EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID',
        'EXPO_PUBLIC_FIREBASE_APP_ID',
        'EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID'
      ];
      
      requiredVars.forEach(varName => {
        if (envContent.includes(`${varName}=`)) {
          log(`✅ ${varName} configured`, 'green');
        } else {
          errors.push(`Missing required environment variable: ${varName}`);
        }
      });
      
      optionalVars.forEach(varName => {
        if (envContent.includes(`${varName}=`)) {
          log(`✅ ${varName} configured`, 'green');
        }
      });
    }
  } catch (error) {
    errors.push(`Failed to read .env file: ${error.message}`);
  }
  
  // 5. Check package.json dependencies
  log('\n📦 Checking dependencies...', 'blue');
  try {
    const packageJsonPath = path.join(process.cwd(), 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    
    const requiredDeps = {
      '@react-native-google-signin/google-signin': 'Google Sign-In',
      'firebase': 'Firebase SDK',
      'expo': 'Expo SDK'
    };
    
    Object.entries(requiredDeps).forEach(([dep, name]) => {
      if (packageJson.dependencies?.[dep]) {
        log(`✅ ${name}: ${packageJson.dependencies[dep]}`, 'green');
      } else {
        errors.push(`Missing dependency: ${dep} (${name})`);
      }
    });
    
  } catch (error) {
    errors.push(`Failed to read package.json: ${error.message}`);
  }
  
  // Generate recommendations
  if (errors.length === 0 && warnings.length === 0) {
    recommendations.push('All configurations look good! You can proceed with EAS build.');
  } else {
    if (errors.length > 0) {
      recommendations.push('Fix all errors before creating an EAS build.');
    }
    
    recommendations.push('Create a development build first: npx eas build --platform android --profile development');
    recommendations.push('Test Google Sign-In on a physical device or emulator with Google Play Services.');
    recommendations.push('Ensure SHA-1 fingerprint is correctly configured in Google Cloud Console.');
    recommendations.push('Verify that the OAuth client ID matches the one in google-services.json.');
  }
  
  // Print summary
  log('\n📋 Validation Summary', 'cyan');
  log('=' .repeat(60), 'cyan');
  
  if (errors.length > 0) {
    log(`\n❌ Errors (${errors.length}):`, 'red');
    errors.forEach(error => log(`  • ${error}`, 'red'));
  }
  
  if (warnings.length > 0) {
    log(`\n⚠️ Warnings (${warnings.length}):`, 'yellow');
    warnings.forEach(warning => log(`  • ${warning}`, 'yellow'));
  }
  
  if (recommendations.length > 0) {
    log(`\n💡 Recommendations:`, 'magenta');
    recommendations.forEach(rec => log(`  • ${rec}`, 'magenta'));
  }
  
  if (errors.length === 0) {
    log('\n🎉 Ready for Android build!', 'green');
    return true;
  } else {
    log('\n🚫 Please fix the errors before proceeding with the build.', 'red');
    return false;
  }
}

// Run validation if script is executed directly
if (require.main === module) {
  validateAndroidBuild();
}

module.exports = { validateAndroidBuild };