// Web polyfill for @react-native-google-signin/google-signin
// This prevents the native module loading error on web platform

const GoogleSignin = {
  configure: () => {
    console.log('GoogleSignin.configure called on web - using Firebase Auth instead');
  },
  hasPlayServices: () => {
    console.log('GoogleSignin.hasPlayServices called on web - returning true');
    return Promise.resolve(true);
  },
  isSignedIn: () => {
    console.log('GoogleSignin.isSignedIn called on web - returning false');
    return Promise.resolve(false);
  },
  signIn: () => {
    console.log('GoogleSignin.signIn called on web - should use Firebase Auth instead');
    return Promise.reject(new Error('Use Firebase Auth on web platform'));
  },
  signOut: () => {
    console.log('GoogleSignin.signOut called on web - should use Firebase Auth instead');
    return Promise.resolve();
  },
  revokeAccess: () => {
    console.log('GoogleSignin.revokeAccess called on web - should use Firebase Auth instead');
    return Promise.resolve();
  },
  getCurrentUser: () => {
    console.log('GoogleSignin.getCurrentUser called on web - returning null');
    return Promise.resolve(null);
  }
};

module.exports = { GoogleSignin };