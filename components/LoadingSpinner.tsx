import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import loadingSpinnerStyles from '../styles/loadingSpinnerStyles';

const LoadingSpinner: React.FC = () => (
  <View style={loadingSpinnerStyles.container}>
    <ActivityIndicator size="large" color="#f4b400" />
  </View>
);

export default LoadingSpinner;
