import { StyleSheet } from 'react-native';

const settingsStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1b2845',
    padding: 20,
  },
  text: {
    color: '#f4b400',
    fontSize: 22,
    marginBottom: 20,
    fontFamily: 'Helvegen-Bold', // Use your app's font or update as needed
  },
  logoutButton: {
    backgroundColor: '#f4b400',
    width: '80%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  logoutButtonText: {
    color: '#1b2845',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Helvegen-Regular', // Update with your app's font
  },
});

export default settingsStyles;
