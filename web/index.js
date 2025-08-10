// React Native Web Bridge Polyfill
// This file sets up the necessary bridge configuration for React Native web

// Set up global variables that React Native expects
if (typeof global === 'undefined') {
  global = window;
}

// Initialize React Native bridge configuration
global.__fbBatchedBridgeConfig = {
  remoteModuleConfig: [],
  localModulesConfig: []
};

// Mock the batched bridge
global.__fbBatchedBridge = {
  callFunctionReturnFlushedQueue: () => null,
  invokeCallbackAndReturnFlushedQueue: () => null,
  flushedQueue: () => null,
  getEventLoopRunningTime: () => 0,
  registerBundle: () => {},
  setGlobalHandler: () => {},
  getCallableModule: () => ({})
};

// Mock native module proxy
global.nativeModuleProxy = new Proxy({}, {
  get: () => new Proxy({}, {
    get: () => () => Promise.resolve()
  })
});

// Mock turbo module proxy
global.__turboModuleProxy = (name) => {
  return new Proxy({}, {
    get: () => () => Promise.resolve()
  });
};

// Mock MessageQueue
global.MessageQueue = {
  spy: () => {},
  getEventLoopRunningTime: () => 0
};

// Mock NativeModules
global.NativeModules = new Proxy({}, {
  get: (target, prop) => {
    if (!target[prop]) {
      target[prop] = new Proxy({}, {
        get: () => () => Promise.resolve()
      });
    }
    return target[prop];
  }
});

// Mock React Native's Platform for web
global.__PLATFORM__ = 'web';

// Set up React Native web environment
if (typeof window !== 'undefined') {
  window.__DEV__ = process.env.NODE_ENV !== 'production';
  window.__REACT_DEVTOOLS_GLOBAL_HOOK__ = window.__REACT_DEVTOOLS_GLOBAL_HOOK__ || {};
}

// Now load the main application
require('../index.ts');