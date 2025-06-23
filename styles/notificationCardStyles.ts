import { StyleSheet } from 'react-native';

const notificationCardStyles = StyleSheet.create({
  card: {
    backgroundColor: '#DA5367',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  message: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default notificationCardStyles;
