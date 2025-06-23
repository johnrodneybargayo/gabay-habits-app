import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#1b2845',
    padding: 20,
    paddingTop: 50, // adjusted to match Dashboard
  },

  headerContainer: {
    marginBottom: 20, // match Dashboard spacing under header
  },

  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#f4b400',
    fontFamily: 'Helvegen-Bold',
  },

  card: {
    backgroundColor: '#313D5D',
    borderRadius: 12,
    padding: 20,
    marginBottom: 30,
  },

  label: {
    fontSize: 14,
    color: '#f4f4f4',
    marginBottom: 6,
    fontWeight: '500',
    fontFamily: 'Helvegen-Regular',
  },

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: '#fff',
    fontSize: 14,
    color: '#000',
    fontFamily: 'Helvegen-Regular',
  },

  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 15,
    overflow: 'hidden',
  },

  picker: {
    height: 50,
    width: '100%',
    color: '#000',
    backgroundColor: '#fff',
  },

  textArea: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    height: 100,
    textAlignVertical: 'top',
    backgroundColor: '#fff',
    marginBottom: 15,
    fontSize: 14,
    color: '#000',
    fontFamily: 'Helvegen-Regular',
  },

  fileButton: {
    backgroundColor: '#4A3742',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },

  fileButtonText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '600',
    fontFamily: 'Helvegen-Regular',
  },

  submitButton: {
    backgroundColor: '#f4b400',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },

  submitButtonText: {
    color: '#1b2845',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Helvegen-Bold',
  },

  section: {
    marginBottom: 30,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#f4b400',
    marginBottom: 10,
    fontFamily: 'Helvegen-Bold',
  },

  noteCard: {
    backgroundColor: '#313D5D',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },

  noteTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
    fontFamily: 'Helvegen-Bold',
  },

  noteContent: {
    fontSize: 14,
    color: '#eee',
    marginBottom: 10,
    fontFamily: 'Helvegen-Regular',
  },

  noteButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  noteButton: {
    backgroundColor: '#4A3742',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
