// BackHandler polyfill for web platform
// BackHandler is Android-specific and not applicable to web

module.exports = {
  addEventListener: () => {
    // Return a no-op subscription object
    return {
      remove: () => {}
    };
  },
  removeEventListener: () => {},
  exitApp: () => {
    // On web, we can't exit the app, but we can close the window
    if (typeof window !== 'undefined' && window.close) {
      window.close();
    }
  },
  // Legacy method names for compatibility
  addListener: () => {
    return {
      remove: () => {}
    };
  },
  removeListener: () => {}
};