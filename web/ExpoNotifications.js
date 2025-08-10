// Web polyfill for expo-notifications
module.exports = {
  getPermissionsAsync: () => Promise.resolve({ status: 'granted' }),
  requestPermissionsAsync: () => Promise.resolve({ status: 'granted' }),
  
  scheduleNotificationAsync: (content, trigger) => {
    console.log('Notification scheduled (web):', content);
    return Promise.resolve('notification-id');
  },
  
  cancelScheduledNotificationAsync: (id) => {
    console.log('Notification cancelled (web):', id);
    return Promise.resolve();
  },
  
  cancelAllScheduledNotificationsAsync: () => {
    console.log('All notifications cancelled (web)');
    return Promise.resolve();
  },
  
  getAllScheduledNotificationsAsync: () => {
    return Promise.resolve([]);
  },
  
  addNotificationReceivedListener: (listener) => {
    return { remove: () => {} };
  },
  
  addNotificationResponseReceivedListener: (listener) => {
    return { remove: () => {} };
  },
  
  removeNotificationSubscription: (subscription) => {
    if (subscription && subscription.remove) {
      subscription.remove();
    }
  },
  
  setNotificationHandler: (handler) => {
    // No-op for web
  },
};