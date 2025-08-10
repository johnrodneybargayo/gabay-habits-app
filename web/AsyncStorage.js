// Web polyfill for @react-native-async-storage/async-storage
// This provides localStorage-based storage for web platform

const AsyncStorage = {
  getItem: async (key) => {
    try {
      return localStorage.getItem(key);
    } catch (error) {
      console.warn('AsyncStorage.getItem error:', error);
      return null;
    }
  },

  setItem: async (key, value) => {
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      console.warn('AsyncStorage.setItem error:', error);
      throw error;
    }
  },

  removeItem: async (key) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.warn('AsyncStorage.removeItem error:', error);
      throw error;
    }
  },

  clear: async () => {
    try {
      localStorage.clear();
    } catch (error) {
      console.warn('AsyncStorage.clear error:', error);
      throw error;
    }
  },

  getAllKeys: async () => {
    try {
      return Object.keys(localStorage);
    } catch (error) {
      console.warn('AsyncStorage.getAllKeys error:', error);
      return [];
    }
  },

  multiGet: async (keys) => {
    try {
      return keys.map(key => [key, localStorage.getItem(key)]);
    } catch (error) {
      console.warn('AsyncStorage.multiGet error:', error);
      return keys.map(key => [key, null]);
    }
  },

  multiSet: async (keyValuePairs) => {
    try {
      keyValuePairs.forEach(([key, value]) => {
        localStorage.setItem(key, value);
      });
    } catch (error) {
      console.warn('AsyncStorage.multiSet error:', error);
      throw error;
    }
  },

  multiRemove: async (keys) => {
    try {
      keys.forEach(key => {
        localStorage.removeItem(key);
      });
    } catch (error) {
      console.warn('AsyncStorage.multiRemove error:', error);
      throw error;
    }
  }
};

export default AsyncStorage;