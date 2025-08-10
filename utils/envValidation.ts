// Environment validation utility
import { Alert, Platform } from 'react-native';

// Detect if we're running in web environment
const isWeb = Platform.OS === 'web';

// Import environment variables with proper error handling for native
let nativeEnvVars: Record<string, string | undefined> = {};

if (!isWeb) {
  try {
    // Try to import from @env (works in native)
    const env = require('@env');
    nativeEnvVars = {
      FIREBASE_API_KEY: env.FIREBASE_API_KEY,
      FIREBASE_AUTH_DOMAIN: env.FIREBASE_AUTH_DOMAIN,
      FIREBASE_DATABASE_URL: env.FIREBASE_DATABASE_URL,
      FIREBASE_PROJECT_ID: env.FIREBASE_PROJECT_ID,
      FIREBASE_STORAGE_BUCKET: env.FIREBASE_STORAGE_BUCKET,
      FIREBASE_MESSAGING_SENDER_ID: env.FIREBASE_MESSAGING_SENDER_ID,
      FIREBASE_APP_ID: env.FIREBASE_APP_ID,
      FIREBASE_MEASUREMENT_ID: env.FIREBASE_MEASUREMENT_ID,
      GOOGLE_WEB_CLIENT_ID: env.GOOGLE_WEB_CLIENT_ID,
      OPENAI_API_KEY: env.OPENAI_API_KEY,
    };
  } catch (error) {
    // If @env fails, try to use process.env directly
    nativeEnvVars = {};
  }
}

// Helper function to get environment variable from appropriate source
function getEnvValue(key: string): string | undefined {
  if (isWeb) {
    // For web, use EXPO_PUBLIC_ prefixed variables from process.env
    const webKey = `EXPO_PUBLIC_${key}`;
    return process.env[webKey];
  } else {
    // For native, try multiple sources in order of preference
    // 1. @env imported variables
    // 2. process.env with original key
    // 3. process.env with EXPO_PUBLIC_ prefix (fallback)
    return nativeEnvVars[key] || process.env[key] || process.env[`EXPO_PUBLIC_${key}`];
  }
}

// Required environment variables
const REQUIRED_ENV_VARS = {
  FIREBASE_API_KEY: 'Firebase API Key',
  FIREBASE_AUTH_DOMAIN: 'Firebase Auth Domain',
  FIREBASE_DATABASE_URL: 'Firebase Database URL',
  FIREBASE_PROJECT_ID: 'Firebase Project ID',
  FIREBASE_STORAGE_BUCKET: 'Firebase Storage Bucket',
  FIREBASE_MESSAGING_SENDER_ID: 'Firebase Messaging Sender ID',
  FIREBASE_APP_ID: 'Firebase App ID',
  FIREBASE_MEASUREMENT_ID: 'Firebase Measurement ID',
} as const;

// Optional environment variables (won't cause app to fail)
const OPTIONAL_ENV_VARS = {
  GOOGLE_WEB_CLIENT_ID: 'Google Web Client ID',
  OPENAI_API_KEY: 'OpenAI API Key',
  EXPO_PUBLIC_OPENAI_API_KEY: 'Expo Public OpenAI API Key',
} as const;

interface ValidationResult {
  isValid: boolean;
  missingVars: string[];
  warnings: string[];
}

/**
 * Validates that all required environment variables are present
 * @returns ValidationResult object with validation status and missing variables
 */
export function validateEnvironmentVariables(): ValidationResult {
  const missingVars: string[] = [];
  const warnings: string[] = [];

  // Map of environment variables to their values using hybrid approach
  const envValues = {
    FIREBASE_API_KEY: getEnvValue('FIREBASE_API_KEY'),
    FIREBASE_AUTH_DOMAIN: getEnvValue('FIREBASE_AUTH_DOMAIN'),
    FIREBASE_DATABASE_URL: getEnvValue('FIREBASE_DATABASE_URL'),
    FIREBASE_PROJECT_ID: getEnvValue('FIREBASE_PROJECT_ID'),
    FIREBASE_STORAGE_BUCKET: getEnvValue('FIREBASE_STORAGE_BUCKET'),
    FIREBASE_MESSAGING_SENDER_ID: getEnvValue('FIREBASE_MESSAGING_SENDER_ID'),
    FIREBASE_APP_ID: getEnvValue('FIREBASE_APP_ID'),
    FIREBASE_MEASUREMENT_ID: getEnvValue('FIREBASE_MEASUREMENT_ID'),
    GOOGLE_WEB_CLIENT_ID: getEnvValue('GOOGLE_WEB_CLIENT_ID'),
    OPENAI_API_KEY: getEnvValue('OPENAI_API_KEY'),
    EXPO_PUBLIC_OPENAI_API_KEY: getEnvValue('EXPO_PUBLIC_OPENAI_API_KEY'),
  };

  // Check required variables
  Object.entries(REQUIRED_ENV_VARS).forEach(([key, description]) => {
    const value = envValues[key as keyof typeof envValues];
    if (!value || value.trim() === '' || value.includes('your_') || value.includes('_here')) {
      missingVars.push(`${key} (${description})`);
    }
  });

  // Check optional variables and warn if missing
  Object.entries(OPTIONAL_ENV_VARS).forEach(([key, description]) => {
    const value = envValues[key as keyof typeof envValues];
    if (!value || value.trim() === '' || value.includes('your_') || value.includes('_here')) {
      warnings.push(`${key} (${description}) - Optional but recommended`);
    }
  });

  return {
    isValid: missingVars.length === 0,
    missingVars,
    warnings,
  };
}

/**
 * Shows a user-friendly error message for missing environment variables
 * @param missingVars Array of missing variable names
 */
export function showEnvironmentError(missingVars: string[]): void {
  const errorMessage = `
🔧 Configuration Required

The following environment variables are missing or invalid:

${missingVars.map(v => `• ${v}`).join('\n')}

Please:
1. Copy .env.example to .env
2. Fill in your Firebase and API credentials
3. Restart the app

See README.md for detailed setup instructions.`;

  Alert.alert(
    'App Configuration Error',
    errorMessage,
    [{ text: 'OK', style: 'default' }],
    { cancelable: false }
  );

  // Also log to console for development
  console.error('❌ Environment Validation Failed:');
  console.error('Missing variables:', missingVars);
  console.error('Please check your .env file and ensure all required variables are set.');
}

/**
 * Shows warnings for missing optional environment variables
 * @param warnings Array of warning messages
 */
export function showEnvironmentWarnings(warnings: string[]): void {
  if (warnings.length === 0) return;

  console.warn('⚠️ Environment Warnings:');
  warnings.forEach(warning => console.warn(`  • ${warning}`));
}

/**
 * Validates environment and handles errors/warnings
 * @param throwOnError Whether to throw an error if validation fails
 * @returns boolean indicating if validation passed
 */
export function validateAndHandleEnvironment(throwOnError: boolean = true): boolean {
  const validation = validateEnvironmentVariables();

  if (!validation.isValid) {
    showEnvironmentError(validation.missingVars);
    
    if (throwOnError) {
      throw new Error(`Missing required environment variables: ${validation.missingVars.join(', ')}`);
    }
    
    return false;
  }

  // Show warnings for missing optional variables
  showEnvironmentWarnings(validation.warnings);

  console.log('✅ Environment validation passed');
  return true;
}

/**
 * Gets an environment variable with validation
 * @param key Environment variable key
 * @param required Whether the variable is required
 * @returns The environment variable value or undefined
 */
export function getEnvVar(key: string, required: boolean = true): string | undefined {
  const value = getEnvValue(key);
  
  if (required && (!value || value.trim() === '')) {
    throw new Error(`Required environment variable ${key} is missing or empty`);
  }
  
  return value;
}