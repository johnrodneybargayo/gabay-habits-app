// Web polyfill for expo-image-picker
module.exports = {
  launchImageLibraryAsync: (options = {}) => {
    return new Promise((resolve) => {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.multiple = options.allowsMultipleSelection || false;
      
      input.onchange = (event) => {
        const files = Array.from(event.target.files || []);
        if (files.length === 0) {
          resolve({ cancelled: true });
          return;
        }
        
        const file = files[0];
        const reader = new FileReader();
        reader.onload = () => {
          resolve({
            cancelled: false,
            assets: [{
              uri: reader.result,
              width: 0,
              height: 0,
              type: 'image',
              fileName: file.name,
              fileSize: file.size,
            }]
          });
        };
        reader.readAsDataURL(file);
      };
      
      input.click();
    });
  },
  
  launchCameraAsync: () => {
    return Promise.resolve({ cancelled: true });
  },
  
  requestMediaLibraryPermissionsAsync: () => {
    return Promise.resolve({ status: 'granted' });
  },
  
  requestCameraPermissionsAsync: () => {
    return Promise.resolve({ status: 'granted' });
  },
  
  MediaTypeOptions: {
    All: 'All',
    Videos: 'Videos',
    Images: 'Images',
  },
};