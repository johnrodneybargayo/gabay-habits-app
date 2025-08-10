// Web polyfill for expo-status-bar
import React from 'react';

const StatusBar = (props) => {
  // StatusBar is not applicable on web, return null
  return null;
};

module.exports = {
  StatusBar,
  setStatusBarStyle: () => {},
  setStatusBarBackgroundColor: () => {},
  setStatusBarHidden: () => {},
  setStatusBarTranslucent: () => {},
};