import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import filterControlsStyles from '../styles/filterControlsStyles';

const FilterControls: React.FC<{ onFilterChange: (filter: string) => void }> = ({ onFilterChange }) => {
  return (
    <View style={filterControlsStyles.container}>
      <TouchableOpacity style={filterControlsStyles.button} onPress={() => onFilterChange('weekly')}>
        <Text style={filterControlsStyles.buttonText}>Weekly</Text>
      </TouchableOpacity>
      <TouchableOpacity style={filterControlsStyles.button} onPress={() => onFilterChange('monthly')}>
        <Text style={filterControlsStyles.buttonText}>Monthly</Text>
      </TouchableOpacity>
      <TouchableOpacity style={filterControlsStyles.button} onPress={() => onFilterChange('custom')}>
        <Text style={filterControlsStyles.buttonText}>Custom</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FilterControls;
