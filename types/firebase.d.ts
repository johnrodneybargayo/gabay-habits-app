// firebase.d.ts
declare module 'firebase/auth' {
  import { Persistence } from 'firebase/auth';

  /**
   * Returns a React Native-compatible persistence implementation.
   * Must be used with React Native's AsyncStorage.
   */
  export function getReactNativePersistence(storage: any): Persistence;
}
