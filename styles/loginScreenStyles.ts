import { StyleSheet } from 'react-native';

const loginScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1b2845',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 50,
    borderRadius: 8,
    backgroundColor: '#273c63',
    color: '#fff',
    fontSize: 16,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#f4b400',
    width: '80%',
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
  },
  buttonText: {
    color: '#1b2845',
    fontSize: 16,
    fontWeight: 'bold',
  },
  registerButton: {
    marginTop: 12,
  },
  registerText: {
    color: '#f4b400',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    marginBottom: 12,
    marginTop: 8,
  },
  rememberMeText: {
    color: '#fff',
    fontSize: 14,
    marginLeft: 8,
  },
  googleButton: {
    backgroundColor: '#fff',
    width: '80%',
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  googleButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default loginScreenStyles;
