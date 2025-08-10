// Web polyfill for expo-image
const React = require('react');

const Image = React.forwardRef((props, ref) => {
  const { source, style, contentFit, placeholder, ...otherProps } = props;
  
  const imageStyle = {
    ...style,
    objectFit: contentFit === 'cover' ? 'cover' : 
               contentFit === 'contain' ? 'contain' : 
               contentFit === 'fill' ? 'fill' : 'cover',
  };
  
  const src = typeof source === 'string' ? source : 
              source?.uri || source?.default || '';
  
  return React.createElement('img', {
    ref,
    src,
    style: imageStyle,
    ...otherProps,
  });
});

Image.displayName = 'ExpoImage';

const ImageBackground = ({ source, style, children, ...props }) => {
  const src = typeof source === 'string' ? source : 
              source?.uri || source?.default || '';
  
  return React.createElement('div', {
    style: {
      ...style,
      backgroundImage: `url(${src})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },
    ...props,
  }, children);
};

// Export using Object.defineProperty for better compatibility
Object.defineProperty(exports, '__esModule', { value: true });
exports.Image = Image;
exports.ImageBackground = ImageBackground;
exports.default = Image;

// Also set module.exports for CommonJS compatibility
module.exports = Image;
module.exports.Image = Image;
module.exports.ImageBackground = ImageBackground;
module.exports.default = Image;
module.exports.__esModule = true;