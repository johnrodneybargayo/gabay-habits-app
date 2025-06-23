import { StyleSheet } from 'react-native';

const dashboardStyles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#1b2845',
    padding: 20,
    paddingTop: 50,
  },

headerContainer: {
  marginBottom: 20,
},

  // Header layout
  topHeaderRow: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: 10,
},

logoImage: {
  width: 80, // reduce width for better space
  height: 80,
  resizeMode: 'contain',
},

searchGroup: {
  flex: 1,
  flexDirection: 'row',
  alignItems: 'center',
  marginLeft: 40,
  gap: 8,
},

searchLabel: {
  color: '#f4b400',
  fontSize: 14,
  fontFamily: 'Helvegen-Regular',
},

searchInput: {
  flex: 1,
  maxWidth: 200, // cap width to prevent overflow
  backgroundColor: '#313D5D',
  padding: 10,
  borderRadius: 8,
  color: '#fff',
  fontFamily: 'Helvegen-Regular',
},


  // User info (Hi User + Points)
  userInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },

  usernameText: {
    fontSize: 18,
    color: '#f4b400',
    fontFamily: 'Helvegen-Bold',
  },

  pointsText: {
    fontSize: 18,
    color: '#f4b400',
    fontWeight: '600',
  },

  // Section styles
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

  tag: {
    alignSelf: 'flex-start',
    backgroundColor: '#00AA66',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginBottom: 10,
  },

  // Progress card
  cardBox: {
    backgroundColor: '#313D5D',
    borderRadius: 12,
    padding: 16,
  },

  progressTitle: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 10,
    fontFamily: 'Helvegen-Bold',
  },

  progressGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },

  statText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'Helvegen-Regular',
  },

  recentBadgeTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#5AD1D2',
    marginBottom: 5,
    fontFamily: 'Helvegen-Regular',
  },

  badgeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    columnGap: 10,
    rowGap: 6,
  },

  badgeTag: {
    backgroundColor: '#4A3742',
    color: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    fontSize: 12,
    fontWeight: '600',
  },

  // Study & Social Modes
  modeItem: {
    backgroundColor: '#2C3E50',
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
  },

  modeLabel: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
    fontFamily: 'Helvegen-Bold',
  },

  modeSub: {
    fontSize: 13,
    color: '#bbb',
    marginTop: 4,
    fontFamily: 'Helvegen-Regular',
  },

  lockBadge: {
    backgroundColor: '#AA00AA',
    color: '#fff',
    fontSize: 11,
    fontWeight: 'bold',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 5,
    alignSelf: 'flex-start',
    marginTop: 6,
  },

  // Quick Actions
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  quickButton: {
    backgroundColor: '#4A3742',
    padding: 12,
    borderRadius: 10,
    width: '48%',
    alignItems: 'center',
    marginBottom: 12,
  },

  quickText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },

  // AI Assistant
  aiAccessText: {
    color: '#5AD1D2',
    marginBottom: 10,
    fontSize: 13,
    fontFamily: 'Helvegen-Regular',
  },

  aiButton: {
    backgroundColor: '#f4b400',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },

  aiButtonText: {
    color: '#1b2845',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default dashboardStyles;
