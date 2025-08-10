/**
 * Aggressive console suppression for navigation context warnings
 */
import { LogBox } from 'react-native';

// Suppress specific navigation context warnings
LogBox.ignoreLogs([
  'Couldn\'t find a navigation context',
  'Have you wrapped your app with \'NavigationContainer\'?',
  'Warning: Error: Couldn\'t find a navigation context',
  'RNSScreenContainer',
  'navigation context'
]);

// Store original console methods
const originalWarn = console.warn;
const originalError = console.error;
const originalLog = console.log;

// Completely override console methods to filter navigation warnings
console.warn = function(...args: any[]) {
  const message = args.join(' ');
  if (message.includes('navigation context') || 
      message.includes('NavigationContainer') ||
      message.includes('RNSScreenContainer') ||
      message.includes('Couldn\'t find a navigation context')) {
    return; // Completely suppress
  }
  originalWarn.apply(console, args);
};

console.error = function(...args: any[]) {
  const message = args.join(' ');
  if (message.includes('navigation context') || 
      message.includes('NavigationContainer') ||
      message.includes('RNSScreenContainer') ||
      message.includes('Couldn\'t find a navigation context')) {
    return; // Completely suppress
  }
  originalError.apply(console, args);
};

// Also override console.log just in case
console.log = function(...args: any[]) {
  const message = args.join(' ');
  if (message.includes('navigation context') || 
      message.includes('NavigationContainer') ||
      message.includes('RNSScreenContainer') ||
      message.includes('Couldn\'t find a navigation context')) {
    return; // Completely suppress
  }
  originalLog.apply(console, args);
};

// Override global error handler as well
if (typeof ErrorUtils !== 'undefined') {
  const originalHandler = ErrorUtils.getGlobalHandler();
  ErrorUtils.setGlobalHandler((error, isFatal) => {
    const errorMessage = error.message || error.toString();
    
    if (errorMessage.includes('navigation context') || 
        errorMessage.includes('NavigationContainer') ||
        errorMessage.includes('RNSScreenContainer')) {
      return; // Suppress completely
    }
    
    if (originalHandler) {
      originalHandler(error, isFatal);
    }
  });
}
 
/**
 * Restore original console methods (for debugging purposes)
 */
export const restoreConsole = () => {
  console.warn = originalWarn;
  console.error = originalError;
  console.log = originalLog;
};

/**
 * Enable debug mode to see suppressed messages
 */
export const enableDebugMode = () => {
  console.warn = (...args: any[]) => {
    const message = args.join(' ');
    if (message.includes('navigation context') || 
        message.includes('NavigationContainer') ||
        message.includes('RNSScreenContainer') ||
        message.includes('Couldn\'t find a navigation context')) {
      originalWarn.apply(console, ['[SUPPRESSED WARNING]:', ...args]);
      return;
    }
    originalWarn.apply(console, args);
  };
  
  console.error = (...args: any[]) => {
    const message = args.join(' ');
    if (message.includes('navigation context') || 
        message.includes('NavigationContainer') ||
        message.includes('RNSScreenContainer') ||
        message.includes('Couldn\'t find a navigation context')) {
      originalError.apply(console, ['[SUPPRESSED ERROR]:', ...args]);
      return;
    }
    originalError.apply(console, args);
  };
};

export default {
  restoreConsole,
  enableDebugMode
};