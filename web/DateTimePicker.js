// Web polyfill for @react-native-community/datetimepicker
// This provides a basic HTML5 date/time input fallback for web

import React from 'react';

const DateTimePicker = ({ value, mode = 'date', onChange, ...props }) => {
  const handleChange = (event) => {
    const date = new Date(event.target.value);
    if (onChange) {
      onChange(event, date);
    }
  };

  const inputType = mode === 'time' ? 'time' : mode === 'datetime' ? 'datetime-local' : 'date';
  
  const formatValue = (date) => {
    if (!date) return '';
    const d = new Date(date);
    if (mode === 'time') {
      return d.toTimeString().slice(0, 5);
    } else if (mode === 'datetime') {
      return d.toISOString().slice(0, 16);
    } else {
      return d.toISOString().slice(0, 10);
    }
  };

  return React.createElement('input', {
    type: inputType,
    value: formatValue(value),
    onChange: handleChange,
    style: {
      padding: '8px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      fontSize: '16px',
      ...props.style
    },
    ...props
  });
};

export default DateTimePicker;