// Web polyfill for @react-native-picker/picker
// This provides a basic HTML5 select element fallback for web

import React from 'react';

const Picker = ({ selectedValue, onValueChange, children, style, ...props }) => {
  const handleChange = (event) => {
    if (onValueChange) {
      onValueChange(event.target.value, event.target.selectedIndex);
    }
  };

  return React.createElement('select', {
    value: selectedValue,
    onChange: handleChange,
    style: {
      padding: '8px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      fontSize: '16px',
      backgroundColor: 'white',
      minWidth: '120px',
      ...style
    },
    ...props
  }, children);
};

const PickerItem = ({ label, value, ...props }) => {
  return React.createElement('option', {
    value: value,
    ...props
  }, label);
};

Picker.Item = PickerItem;

export { Picker };
export default Picker;