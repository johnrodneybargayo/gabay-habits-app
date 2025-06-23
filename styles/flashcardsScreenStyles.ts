import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#1b2845',
    padding: 20,
    paddingTop: 50,
  },

  headerContainer: {
    marginBottom: 20,
  },

  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#f4b400',
    marginBottom: 15,
    fontFamily: 'Helvegen-Bold',
  },

  subHeading: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 10,
    fontFamily: 'Helvegen-Bold',
  },

  card: {
    backgroundColor: '#313D5D',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },

  label: {
    fontSize: 14,
    color: '#f4f4f4',
    marginBottom: 6,
    fontFamily: 'Helvegen-Regular',
  },

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 12,
    backgroundColor: '#fff',
    color: '#000',
    fontSize: 14,
    fontFamily: 'Helvegen-Regular',
  },

  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 12,
  },

  picker: {
    height: 48,
    color: '#1b2845',
    backgroundColor: '#f9f9f9',
  },

  submitButton: {
    backgroundColor: '#f4b400',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 8,
  },

  submitButtonText: {
    color: '#1b2845',
    fontWeight: 'bold',
    fontSize: 15,
    fontFamily: 'Helvegen-Bold',
  },

  badge: {
    alignSelf: 'flex-start',
    backgroundColor: '#1b2845',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginBottom: 8,
  },

  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontFamily: 'Helvegen-Regular',
  },

  questionText: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 12,
    fontFamily: 'Helvegen-Regular',
  },

  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },

  actionButton: {
    backgroundColor: '#4A3742',
    borderRadius: 8,
    padding: 10,
    flex: 1,
    alignItems: 'center',
  },

  actionButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontFamily: 'Helvegen-Regular',
  },

  disabledButton: {
    backgroundColor: '#ccc',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 8,
  },

  disabledButtonText: {
    color: '#666',
    fontWeight: 'bold',
    fontFamily: 'Helvegen-Regular',
  },

  note: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 8,
    fontFamily: 'Helvegen-Regular',
  },

  deckRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },

  deckTitle: {
    fontSize: 16,
    color: '#f4f4f4',
    fontWeight: '600',
    fontFamily: 'Helvegen-Regular',
  },

  deckCount: {
    fontSize: 14,
    color: '#bbb',
    fontFamily: 'Helvegen-Regular',
  },
});
