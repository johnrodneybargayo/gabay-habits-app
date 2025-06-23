import { StyleSheet } from 'react-native';

const achievementCardStyles = StyleSheet.create({
  card: {
    backgroundColor: '#4A3742',
    padding: 20,
    borderRadius: 10,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#f4b400',
  },
  description: {
    fontSize: 14,
    color: '#ffffff',
    marginTop: 5,
  },
});

export default achievementCardStyles;
