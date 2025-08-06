import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ref, get } from 'firebase/database';
import { getFirebaseAuth, getFirebaseDatabase } from '../../firebase/firebase';
import dashboardStyles from '../../styles/dashboardStyles';
import DashboardHeader from '../../components/DashboardHeader';
import { DashboardNavigationProp } from '../../types/navigation';

const DashboardScreen = () => {
  const navigation = useNavigation<DashboardNavigationProp>();
  const [firstName, setFirstName] = useState('User');
  const [points, setPoints] = useState(125);
  const [streak, setStreak] = useState(3);
  const [sessions, setSessions] = useState(8);
  const [badges, setBadges] = useState(2);

  useEffect(() => {
    const fetchUserData = async () => {
      const auth = getFirebaseAuth();
      if (auth.currentUser) {
        const userId = auth.currentUser.uid;
        const db = getFirebaseDatabase();
        const userRef = ref(db, `users/${userId}`);
        const snapshot = await get(userRef);
        if (snapshot.exists()) {
          const data = snapshot.val();
          setFirstName(data.firstName || 'User');
          setPoints(data.points || 0);
          setStreak(data.streak || 0);
          setSessions(data.sessions || 0);
          setBadges(data.badges || 0);
        }
      }
    };

    fetchUserData();
  }, []);

  // Navigation handlers
  const handleStudyModePress = (mode: string) => {
    if (mode === 'Leitner Mode' || mode === 'Active Recall') {
      navigation.navigate('Flashcards');
    } else {
      Alert.alert('Coming Soon', `${mode} will be available in future updates!`);
    }
  };

  const handleSocialPress = (feature: string) => {
    if (feature === 'Study Circles') {
      navigation.navigate('Schedule');
    } else {
      Alert.alert('Coming Soon', `${feature} will be available in future updates!`);
    }
  };

  const handleQuickActionPress = (action: string) => {
    switch (action) {
      case 'Upload Notes':
        navigation.navigate('Notes');
        break;
      case 'Study Flashcards':
        navigation.navigate('Flashcards');
        break;
      case 'Schedule Session':
        navigation.navigate('Schedule');
        break;
      case 'Join Room':
        navigation.navigate('Schedule');
        break;
      default:
        Alert.alert('Coming Soon', `${action} will be available soon!`);
    }
  };

  const handleAIAssistantPress = () => {
    Alert.alert('AI Assistant', 'AI summarization and assistance features are coming soon!');
  };

  return (
    <ScrollView contentContainerStyle={dashboardStyles.container}>
      {/* Header */}
      <DashboardHeader firstName={firstName} points={points} />


      {/* Dashboard */}
      <View style={dashboardStyles.section}>
        <Text style={dashboardStyles.sectionTitle}>Dashboard</Text>
        <Text style={dashboardStyles.tag}>FREE</Text>
        <View style={dashboardStyles.cardBox}>
          <Text style={dashboardStyles.progressTitle}>🏆 Your Progress</Text>
          <View style={dashboardStyles.progressGrid}>
            <Text style={[dashboardStyles.statText, { color: '#3366FF' }]}>Points{"\n"}{points}</Text>
            <Text style={[dashboardStyles.statText, { color: '#FF6600' }]}>Streak{"\n"}{streak} days</Text>
            <Text style={[dashboardStyles.statText, { color: '#00AA66' }]}>Sessions{"\n"}{sessions}</Text>
            <Text style={[dashboardStyles.statText, { color: '#AA00AA' }]}>Badges{"\n"}{badges}</Text>
          </View>
          <Text style={dashboardStyles.recentBadgeTitle}>Recent Badges:</Text>
          <View style={dashboardStyles.badgeRow}>
            <Text style={dashboardStyles.badgeTag}>First Study</Text>
            <Text style={dashboardStyles.badgeTag}>Week Warrior</Text>
          </View>
        </View>
      </View>

      {/* Study Modes */}
      <View style={dashboardStyles.section}>
        <Text style={dashboardStyles.sectionTitle}>Study Modes</Text>
        {[
          { label: 'Feynman Mode', sub: 'Explain concepts in your own words', locked: true },
          { label: 'SQ3R Mode', sub: 'Survey, Question, Read, Recite, Review', locked: true },
          { label: 'Mind Mapping', sub: 'Visual concept relationships', locked: true },
          { label: 'Leitner Mode', sub: 'Spaced repetition system' },
          { label: 'Active Recall', sub: 'Timed question sessions' },
        ].map((item, i) => (
          <TouchableOpacity 
            key={i} 
            style={dashboardStyles.modeItem}
            onPress={() => handleStudyModePress(item.label)}
          >
            <Text style={dashboardStyles.modeLabel}>{item.label}</Text>
            <Text style={dashboardStyles.modeSub}>{item.sub}</Text>
            {item.locked && <Text style={dashboardStyles.lockBadge}>Student+</Text>}
          </TouchableOpacity>
        ))}
      </View>

      {/* Social & Collaboration */}
      <View style={dashboardStyles.section}>
        <Text style={dashboardStyles.sectionTitle}>Social & Collaboration</Text>
        {[
          { label: 'Friends', sub: 'Follow other students' },
          { label: 'Direct Messages', sub: 'Chat with friends', locked: true },
          { label: 'Study Circles', sub: 'Join temporary study groups' },
        ].map((item, i) => (
          <TouchableOpacity 
            key={i} 
            style={dashboardStyles.modeItem}
            onPress={() => handleSocialPress(item.label)}
          >
            <Text style={dashboardStyles.modeLabel}>{item.label}</Text>
            <Text style={dashboardStyles.modeSub}>{item.sub}</Text>
            {item.locked && <Text style={dashboardStyles.lockBadge}>Student+</Text>}
          </TouchableOpacity>
        ))}
      </View>

      {/* Quick Actions */}
      <View style={dashboardStyles.section}>
        <Text style={dashboardStyles.sectionTitle}>Quick Actions</Text>
        <View style={dashboardStyles.actionsGrid}>
          {['Upload Notes', 'Study Flashcards', 'Schedule Session', 'Join Room'].map((a, i) => (
            <TouchableOpacity 
              key={i} 
              style={dashboardStyles.quickButton}
              onPress={() => handleQuickActionPress(a)}
            >
              <Text style={dashboardStyles.quickText}>{a}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* AI Assistant */}
      <View style={dashboardStyles.section}>
        <Text style={dashboardStyles.sectionTitle}>AI Assistant</Text>
        <Text style={dashboardStyles.aiAccessText}>Current AI Access: basic</Text>
        <TouchableOpacity 
          style={dashboardStyles.aiButton}
          onPress={handleAIAssistantPress}
        >
          <Text style={dashboardStyles.aiButtonText}>Summarization</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default DashboardScreen;
