const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname);

// Add web platform support
config.resolver.platforms = ['ios', 'android', 'native', 'web'];

// Basic web compatibility aliases
config.resolver.alias = {
  ...config.resolver.alias,
  'react-native': require.resolve('react-native-web'),
  '@react-native-google-signin/google-signin': require.resolve('./web/GoogleSignin.js'),
  '@react-native-community/datetimepicker': require.resolve('./web/DateTimePicker.js'),
  '@react-native-picker/picker': require.resolve('./web/Picker.js'),
  '@react-native-async-storage/async-storage': require.resolve('./web/AsyncStorage.js'),
  'react-native-safe-area-context': require.resolve('./web/SafeAreaContext.js'),
  'expo-splash-screen': require.resolve('./web/ExpoSplashScreen.js'),
  'expo-image-picker': require.resolve('./web/ExpoImagePicker.js'),
  'expo-image': require.resolve('./web/ExpoImage.js'),
  'expo-checkbox': require.resolve('./web/ExpoCheckbox.js'),
  'expo-notifications': require.resolve('./web/ExpoNotifications.js'),
  'expo-status-bar': require.resolve('./web/ExpoStatusBar.js'),
  'expo-asset': require.resolve('./web/ExpoAsset.js'),
};

// Configure resolver for React Native 0.79+ compatibility
config.resolver.unstable_enablePackageExports = false;
config.resolver.unstable_conditionNames = ['browser', 'require'];
config.resolver.resolverMainFields = ['browser', 'module', 'main'];
config.resolver.sourceExts = [...config.resolver.sourceExts, 'cjs', 'web.js', 'web.ts', 'web.tsx'];
config.resolver.unstable_enableSymlinks = false;

// Add resolver for React Native internal modules
const originalResolveRequest = config.resolver.resolveRequest;
config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (platform === 'web') {
    // Handle Platform utilities from React Native internals
    if (
      moduleName === '../Utilities/Platform' ||
      moduleName.includes('Utilities/Platform') ||
      (
        moduleName === './Platform' &&
        context && context.originModulePath && (
          context.originModulePath.includes('react-native\\Libraries\\Utilities') ||
          context.originModulePath.includes('react-native/Libraries/Utilities')
        )
      )
    ) {
      return {
        filePath: require.resolve('./web/Platform.js'),
        type: 'sourceFile',
      };
    }
    
    // Handle AccessibilityInfo legacy module
    if (moduleName.includes('AccessibilityInfo/legacySendAccessibilityEvent')) {
      try {
        return {
          filePath: require.resolve('react-native-web/dist/exports/AccessibilityInfo'),
          type: 'sourceFile',
        };
      } catch (e) {
        // Fallback to empty module if react-native-web doesn't have it
        return {
          filePath: require.resolve('./web/EmptyModule.js'),
          type: 'sourceFile',
        };
      }
    }
    
    // Handle PlatformColorValueTypes
    if (moduleName.includes('PlatformColorValueTypes')) {
      return {
        filePath: require.resolve('./web/EmptyModule.js'),
        type: 'sourceFile',
      };
    }
    
    // Handle BaseViewConfig
    if (moduleName.includes('BaseViewConfig')) {
      return {
        filePath: require.resolve('./web/EmptyModule.js'),
        type: 'sourceFile',
      };
    }

    // Handle ReactDevToolsSettingsManager internal path (RN 0.79+)
    if (
      moduleName === '../../src/private/debugging/ReactDevToolsSettingsManager' ||
      moduleName.endsWith('/src/private/debugging/ReactDevToolsSettingsManager') ||
      moduleName.includes('src/private/debugging/ReactDevToolsSettingsManager')
    ) {
      return {
        filePath: require.resolve('./web/ReactDevToolsSettingsManager.js'),
        type: 'sourceFile',
      };
    }
    
    // Handle react-native-safe-area-context native specs
    if (
      moduleName.includes('react-native-safe-area-context') && 
      (moduleName.includes('NativeSafeAreaView') || moduleName.includes('specs/NativeSafeAreaView'))
    ) {
      return {
        filePath: require.resolve('./web/NativeSafeAreaView.js'),
        type: 'sourceFile',
      };
    }
    
    // Add specific resolution for react-native-safe-area-context specs
        if (moduleName.includes('react-native-safe-area-context/lib/module/specs/NativeSafeAreaView') ||
            moduleName.includes('react-native-safe-area-context\\lib\\module\\specs\\NativeSafeAreaView') ||
            moduleName.includes('NativeSafeAreaView')) {
          return {
            filePath: require.resolve('./web/NativeSafeAreaView.js'),
            type: 'sourceFile',
          };
        }
        
        // Add resolution for react-native-safe-area-context specs directory
        if (moduleName.includes('react-native-safe-area-context/lib/module/specs/') ||
            moduleName.includes('react-native-safe-area-context\\lib\\module\\specs\\')) {
          return {
            filePath: require.resolve('./web/NativeSafeAreaView.js'),
            type: 'sourceFile',
          };
        }
    
    // Handle ReactDevToolsSettingsManager
    if (moduleName.includes('ReactDevToolsSettingsManager')) {
      return {
        filePath: require.resolve('./web/EmptyModule.js'),
        type: 'sourceFile',
      };
    }
    
    // Handle Alert deep import to use react-native-web implementation
    if (
      moduleName === 'react-native/Libraries/Alert/Alert' ||
      moduleName.endsWith('/Libraries/Alert/Alert') ||
      moduleName.includes('Libraries/Alert/Alert')
    ) {
      return {
        filePath: require.resolve('react-native-web/dist/exports/Alert'),
        type: 'sourceFile',
      };
    }

    // Handle native alert manager (not available on web)
    if (moduleName === './RCTAlertManager' || moduleName.endsWith('/RCTAlertManager') || moduleName.includes('RCTAlertManager')) {
      return {
        filePath: require.resolve('./web/EmptyModule.js'),
        type: 'sourceFile',
      };
    }

    // Handle RCTNetworking (not available on web)
    if (
      moduleName === '../../Network/RCTNetworking' ||
      moduleName.endsWith('/Network/RCTNetworking') ||
      moduleName.includes('Network/RCTNetworking') ||
      moduleName === './RCTNetworking' ||
      moduleName.endsWith('/RCTNetworking')
    ) {
      return {
        filePath: require.resolve('./web/RCTNetworking.js'),
        type: 'sourceFile',
      };
    }

    // Handle BackHandler utilities
    if (
      moduleName === '../Utilities/BackHandler' ||
      moduleName.endsWith('/Utilities/BackHandler') ||
      moduleName.includes('Utilities/BackHandler') ||
      moduleName === './BackHandler' ||
      moduleName.endsWith('/BackHandler')
    ) {
      return {
        filePath: require.resolve('./web/BackHandler.js'),
        type: 'sourceFile',
      };
    }

    // Handle Image component
    if (
      moduleName === '../../Image/Image' ||
      moduleName.endsWith('/Image/Image') ||
      moduleName.includes('Image/Image') ||
      moduleName === './Image' ||
      moduleName.endsWith('/Image')
    ) {
      try {
        return {
          filePath: require.resolve('react-native-web/dist/exports/Image'),
          type: 'sourceFile',
        };
      } catch (e) {
        return {
          filePath: require.resolve('./web/EmptyModule.js'),
          type: 'sourceFile',
        };
      }
    }
  }
  
  if (originalResolveRequest) {
    return originalResolveRequest(context, moduleName, platform);
  }
  return context.resolveRequest(context, moduleName, platform);
};

// Configure NativeWind with error handling for build environments
try {
  module.exports = withNativeWind(config, { 
    input: './global.css',
    // Add build-specific configurations to avoid lightningcss issues
    inlineRem: false,
    // Use PostCSS instead of lightningcss for better compatibility
    postcss: true,
  });
} catch (error) {
  console.warn('NativeWind configuration warning:', error.message);
  // Fallback to basic config if NativeWind fails
  module.exports = config;
}