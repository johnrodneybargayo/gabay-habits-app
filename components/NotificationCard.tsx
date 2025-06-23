import React from 'react';
import { View, Text } from 'react-native';
import notificationCardStyles from '../styles/notificationCardStyles';

const NotificationCard: React.FC<{ message: string }> = ({ message }) => (
  <View style={notificationCardStyles.card}>
    <Text style={notificationCardStyles.message}>{message}</Text>
  </View>
);

export default NotificationCard;
