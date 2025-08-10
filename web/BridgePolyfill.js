// Global bridge polyfill for React Native web
// This sets up the __fbBatchedBridgeConfig that native modules expect

// Ensure global object exists in web environment
if (typeof global === 'undefined') {
  if (typeof window !== 'undefined') {
    global = window;
  } else {
    global = {};
  }
}

// Force set the bridge config immediately
if (typeof global !== 'undefined') {
  // Always override to ensure it's set
  // Create a mock bridge configuration
  global.__fbBatchedBridgeConfig = {
    moduleConfig: [],
    methodConfig: []
  };
  
  // Create a mock BatchedBridge
  global.__fbBatchedBridge = {
    callFunctionReturnFlushedQueue: () => null,
    invokeCallbackAndReturnFlushedQueue: () => null,
    flushedQueue: () => null,
    registerCallableModule: () => {},
    registerLazyCallableModule: () => {},
    getEventLoopRunningTime: () => 0,
    callNativeSyncHook: () => null,
    enqueueNativeCall: () => {},
    processCallbacks: () => {},
  };
  
  // Mock NativeModules for web - always set
  global.nativeModuleProxy = new Proxy({}, {
    get: (target, prop) => {
      // Return empty object for any native module access
      return new Proxy({}, {
        get: () => () => Promise.resolve(null)
      });
    }
  });
  
  // Set up global.__turboModuleProxy for TurboModules - always set
  global.__turboModuleProxy = (name) => {
    return new Proxy({}, {
      get: () => () => Promise.resolve(null)
    });
  };
  
  // Additional bridge setup for web compatibility
  global.nativeCallSyncHook = () => null;
  global.nativeFlushQueueImmediate = () => null;
  global.nativeRequire = () => null;
  
  // Ensure MessageQueue is available
  if (!global.MessageQueue) {
    global.MessageQueue = {
      spy: () => {},
    };
  }
}

// Export empty object
module.exports = {};