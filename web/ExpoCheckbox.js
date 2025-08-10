// Web polyfill for expo-checkbox
import React from 'react';

const Checkbox = React.forwardRef((props, ref) => {
  const { value, onValueChange, style, color, ...otherProps } = props;
  
  const checkboxStyle = {
    width: 20,
    height: 20,
    accentColor: color,
    ...style,
  };
  
  return React.createElement('input', {
    ref,
    type: 'checkbox',
    checked: value,
    onChange: (e) => onValueChange && onValueChange(e.target.checked),
    style: checkboxStyle,
    ...otherProps,
  });
});

Checkbox.displayName = 'ExpoCheckbox';

module.exports = {
  Checkbox,
};