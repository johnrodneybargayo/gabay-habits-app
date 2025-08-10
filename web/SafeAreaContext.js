// Web polyfill for react-native-safe-area-context
// This provides basic safe area functionality for web

import React from 'react';

// Mock native specs to prevent "Could not find component config" errors
const mockNativeComponent = () => {
  return React.forwardRef((props, ref) => {
    return React.createElement('div', { ...props, ref });
  });
};

// Mock the native specs that cause errors
if (typeof global !== 'undefined') {
  // Prevent native component registration errors
  global.nativeComponentRegistry = global.nativeComponentRegistry || new Map();
}

const SafeAreaContext = React.createContext({
  top: 0,
  bottom: 0,
  left: 0,
  right: 0
});

const SafeAreaProvider = ({ children }) => {
  const safeAreaInsets = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  };

  return React.createElement(
    SafeAreaContext.Provider,
    { value: safeAreaInsets },
    children
  );
};

const SafeAreaView = ({ children, style, ...props }) => {
  return React.createElement('div', {
    style: {
      flex: 1,
      ...style
    },
    ...props
  }, children);
};

const useSafeAreaInsets = () => {
  return React.useContext(SafeAreaContext);
};

const useSafeAreaFrame = () => {
  return {
    x: 0,
    y: 0,
    width: window.innerWidth || 0,
    height: window.innerHeight || 0
  };
};

// Mock native components that libraries expect
const NativeSafeAreaProvider = SafeAreaProvider;
const NativeSafeAreaView = SafeAreaView;

// Mock native specs
const NativeSafeAreaViewConfig = {
  uiViewClassName: 'RNCSafeAreaView',
  bubblingEventTypes: {},
  directEventTypes: {},
  validAttributes: {
    mode: true,
    edges: true,
  },
};

export {
  SafeAreaProvider,
  SafeAreaView,
  SafeAreaContext,
  useSafeAreaInsets,
  useSafeAreaFrame,
  NativeSafeAreaProvider,
  NativeSafeAreaView,
  NativeSafeAreaViewConfig
};

// Export specs that native modules expect
export const specs = {
  NativeSafeAreaView: NativeSafeAreaView,
  NativeSafeAreaProvider: NativeSafeAreaProvider,
};

export default {
  SafeAreaProvider,
  SafeAreaView,
  SafeAreaContext,
  useSafeAreaInsets,
  useSafeAreaFrame,
  NativeSafeAreaProvider,
  NativeSafeAreaView,
  NativeSafeAreaViewConfig,
  specs
};