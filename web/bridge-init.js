// React Native Web Bridge Initialization
// This must be loaded before any React Native modules

(function() {
  'use strict';
  
  console.log('Starting React Native Web Bridge initialization...');
  
  // Ensure global exists
  if (typeof global === 'undefined') {
    window.global = window;
  }
  
  // Immediately freeze the bridge config to prevent overwrites
  const bridgeConfig = {
    moduleConfig: [],
    methodConfig: [],
    remoteModuleConfig: [],
    localModulesConfig: []
  };
  
  // Set up React Native bridge configuration with all required properties
  Object.defineProperty(global, '__fbBatchedBridgeConfig', {
    value: bridgeConfig,
    writable: false,
    configurable: false
  });
  
  console.log('__fbBatchedBridgeConfig set:', global.__fbBatchedBridgeConfig);
  
  // Create comprehensive batched bridge mock
  const batchedBridge = {
    callFunctionReturnFlushedQueue: function() { return null; },
    invokeCallbackAndReturnFlushedQueue: function() { return null; },
    flushedQueue: function() { return null; },
    getEventLoopRunningTime: function() { return 0; },
    registerBundle: function() {},
    setGlobalHandler: function() {},
    getCallableModule: function() { return {}; },
    registerCallableModule: function() {},
    registerLazyCallableModule: function() {},
    callNativeSyncHook: function() { return null; },
    enqueueNativeCall: function() {},
    processCallbacks: function() {},
    callNativeModule: function() { return null; },
    callNativeMethodWithPromise: function() { return Promise.resolve(); }
  };
  
  Object.defineProperty(global, '__fbBatchedBridge', {
    value: batchedBridge,
    writable: false,
    configurable: false
  });
  
  console.log('__fbBatchedBridge set:', global.__fbBatchedBridge);
  
  // Mock native module proxy with comprehensive fallbacks
  global.nativeModuleProxy = new Proxy({}, {
    get: function(target, prop) {
      if (!target[prop]) {
        target[prop] = new Proxy({}, {
          get: function() {
            return function() {
              return Promise.resolve();
            };
          }
        });
      }
      return target[prop];
    }
  });
  
  // Mock turbo module proxy
  global.__turboModuleProxy = function(name) {
    return new Proxy({}, {
      get: function() {
        return function() {
          return Promise.resolve();
        };
      }
    });
  };
  
  // Mock MessageQueue with all expected methods
  global.MessageQueue = {
    spy: function() {},
    getEventLoopRunningTime: function() { return 0; },
    callFunctionReturnFlushedQueue: function() { return null; },
    invokeCallbackAndReturnFlushedQueue: function() { return null; },
    flushedQueue: function() { return null; }
  };
  
  // Comprehensive NativeModules mock
  global.NativeModules = new Proxy({}, {
    get: function(target, prop) {
      if (!target[prop]) {
        target[prop] = new Proxy({}, {
          get: function() {
            return function() {
              return Promise.resolve();
            };
          }
        });
      }
      return target[prop];
    }
  });
  
  // Mock React Native's internal modules
  global.__r = function() { return {}; };
  global.__d = function() {};
  global.__c = function() {};
  
  // Set up development environment
  global.__DEV__ = process.env.NODE_ENV !== 'production';
  
  // Mock React DevTools
  if (typeof window !== 'undefined') {
    window.__REACT_DEVTOOLS_GLOBAL_HOOK__ = window.__REACT_DEVTOOLS_GLOBAL_HOOK__ || {};
  }
  
  // Verify all bridge components are properly set
  const verifyBridge = function() {
    const checks = {
      '__fbBatchedBridgeConfig': !!global.__fbBatchedBridgeConfig,
      '__fbBatchedBridge': !!global.__fbBatchedBridge,
      'nativeModuleProxy': !!global.nativeModuleProxy,
      '__turboModuleProxy': !!global.__turboModuleProxy,
      'MessageQueue': !!global.MessageQueue,
      'NativeModules': !!global.NativeModules
    };
    
    console.log('Bridge verification:', checks);
    
    const allPassed = Object.values(checks).every(Boolean);
    if (allPassed) {
      console.log('✅ React Native Web Bridge initialized successfully');
    } else {
      console.error('❌ Bridge initialization failed:', checks);
    }
    
    return allPassed;
  };
  
  verifyBridge();
})();