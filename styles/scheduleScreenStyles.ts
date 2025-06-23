import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    paddingTop: 60,
    backgroundColor: '#1b2845',
  },

  headerWrapper: {
    marginBottom: 24,
  },

  tabRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
    backgroundColor: '#313D5D',
    borderRadius: 10,
    padding: 6,
  },

  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },

  tabButtonActive: {
    backgroundColor: '#fff',
    borderRadius: 10,
  },

  tabButtonInactive: {
    backgroundColor: 'transparent',
  },

  tabText: {
    fontSize: 15,
    fontWeight: '600',
  },

  tabTextActive: {
    color: '#1b2845',
  },

  tabTextInactive: {
    color: '#fff',
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#f4b400',
    marginBottom: 20,
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 28,
    marginBottom: 28,
  },

  label: {
    color: '#1b2845',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    marginTop: 20,
  },

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 24,
    color: '#1b2845',
    fontSize: 16,
    height: 52,
  },

  picker: {
    height: 52,
    backgroundColor: '#f9f9f9',
    color: '#1b2845',
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 24,
    fontSize: 16,
  },

  row: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 20,
  },

  submitButton: {
    backgroundColor: '#1b2845',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 24,
  },

  submitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },

  badge: {
    alignSelf: 'flex-start',
    backgroundColor: '#fddede',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginBottom: 20,
  },

  badgeText: {
    color: '#d9534f',
    fontWeight: 'bold',
    fontSize: 13,
  },

  pomodoroTimer: {
    fontSize: 48,
    color: '#1b2845',
    textAlign: 'center',
    marginVertical: 28,
  },

  startButton: {
    flex: 1,
    backgroundColor: '#000',
    borderRadius: 8,
    padding: 14,
    marginRight: 10,
  },

  startButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },

  resetButton: {
    flex: 1,
    backgroundColor: '#eee',
    borderRadius: 8,
    padding: 14,
  },

  resetButtonText: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#1b2845',
  },

  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginVertical: 20,
  },

  tipBox: {
    marginTop: 24,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 18,
  },

  tipText: {
    fontSize: 14,
    color: '#1b2845',
    lineHeight: 22,
  },

  roomCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 20,
    marginTop: 28,
  },

  roomTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1b2845',
    marginBottom: 10,
  },

  roomSubject: {
    color: '#888',
    fontSize: 15,
    marginBottom: 10,
  },

  roomDescription: {
    fontSize: 14,
    color: '#555',
    lineHeight: 22,
  },

  joinButton: {
    backgroundColor: '#1b2845',
    padding: 16,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
  },

  joinButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  voiceButton: {
  backgroundColor: '#3a4b6e',
  borderRadius: 10,
  padding: 12,
  marginRight: 10,
},

videoButton: {
  backgroundColor: '#e67c7c',
  borderRadius: 10,
  padding: 12,
  marginRight: 10,
},

premiumNotice: {
  color: '#ccc',
  fontSize: 12,
  alignSelf: 'center',
  backgroundColor: '#2a375a',
  padding: 6,
  borderRadius: 6,
},

participantTitle: {
  color: '#fff',
  fontWeight: 'bold',
  marginTop: 20,
  marginBottom: 8,
},

participantRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginBottom: 20,
},

participantCard: {
  backgroundColor: '#2a375a',
  padding: 12,
  borderRadius: 10,
  flex: 1,
  marginHorizontal: 4,
},

participantName: {
  color: '#fff',
  fontWeight: 'bold',
},

participantStatus: {
  color: '#6cffb2',
  fontSize: 12,
  marginTop: 4,
},

chatBox: {
  backgroundColor: '#2f3b56',
  padding: 12,
  borderRadius: 10,
  marginBottom: 12,
},

chatMessageTime: {
  color: '#aaa',
  fontSize: 12,
},

chatMessageText: {
  color: '#fff',
  fontSize: 14,
  marginTop: 4,
},

chatInputRow: {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#2a375a',
  borderRadius: 10,
  paddingHorizontal: 10,
},

chatInput: {
  flex: 1,
  color: '#fff',
  paddingVertical: 10,
},

sendButton: {
  backgroundColor: '#4f5d75',
  padding: 10,
  borderRadius: 10,
  marginLeft: 8,
},

});
