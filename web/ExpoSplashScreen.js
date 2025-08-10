// Web polyfill for expo-splash-screen
module.exports = {
  preventAutoHideAsync: () => Promise.resolve(),
  hideAsync: () => Promise.resolve(),
  setOptions: () => {},
  isHiddenAsync: () => Promise.resolve(true),
};