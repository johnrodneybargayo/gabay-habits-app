import { StyleSheet } from 'react-native';

const filterControlsStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 16,
  },
  button: {
    backgroundColor: '#4A3742',
    padding: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: '#f4b400',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default filterControlsStyles;
