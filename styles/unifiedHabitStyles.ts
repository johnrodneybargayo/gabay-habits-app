import { StyleSheet } from 'react-native';

const unifiedHabitStyles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#1b2845', // Match the home screen background color
    padding: 16,
  },
  header: {
    fontSize: 24, // Slightly larger for consistency with HomeScreen
    fontWeight: 'bold',
    color: '#f4b400', // Match the yellow used in HomeScreen
    marginVertical: 16,
    textAlign: 'center',
    fontFamily: 'Helvegen-Bold', // Optional, same font family as HomeScreen
  },
  emptyMessage: {
    textAlign: 'center',
    fontSize: 16,
    color: '#DA5367', // Subtle and consistent with the HomeScreen quote color
    marginTop: 20,
    fontFamily: 'Helvegen-Regular', // Optional, same font family as HomeScreen
  },
  addButton: {
    marginTop: 20,
    backgroundColor: '#4A3742', // Consistent with the card background in HomeScreen
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  addButtonText: {
    color: '#ffffff', // White text to contrast with the button background
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Helvegen-Bold', // Optional, same font family as HomeScreen
  },
});

export default unifiedHabitStyles;
