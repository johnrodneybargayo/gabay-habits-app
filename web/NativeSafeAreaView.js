// Web polyfill for react-native-safe-area-context native specs
// This prevents "Could not find component config for native component" errors

import React from 'react';

// Mock native component that behaves like a regular div
const NativeSafeAreaView = React.forwardRef((props, ref) => {
  const { children, style, mode, edges, ...otherProps } = props;
  
  return React.createElement('div', {
    ...otherProps,
    ref,
    style: {
      flex: 1,
      ...style
    }
  }, children);
});

// Mock component config
const ComponentConfig = {
  uiViewClassName: 'RNCSafeAreaView',
  bubblingEventTypes: {},
  directEventTypes: {},
  validAttributes: {
    mode: true,
    edges: true,
  },
};

// Export what the native specs expect
export default NativeSafeAreaView;
export { NativeSafeAreaView, ComponentConfig };

// Mock the specs interface
export const specs = {
  NativeSafeAreaView: NativeSafeAreaView
};

// Ensure component is registered globally to prevent config errors
if (typeof global !== 'undefined') {
  global.nativeComponentRegistry = global.nativeComponentRegistry || new Map();
  global.nativeComponentRegistry.set('RNCSafeAreaView', ComponentConfig);
}