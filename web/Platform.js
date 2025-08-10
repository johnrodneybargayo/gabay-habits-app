// Custom Platform utility for web compatibility
// This resolves React Native 0.79+ web bundling issues

const Platform = {
  OS: 'web',
  Version: undefined,
  isTV: false,
  isTesting: false,
  select: (obj) => {
    return obj.web || obj.default;
  },
  constants: {
    reactNativeVersion: {
      major: 0,
      minor: 79,
      patch: 5
    }
  }
};

module.exports = Platform;