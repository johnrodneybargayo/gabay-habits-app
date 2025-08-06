import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

import DashboardHeader from '../../components/DashboardHeader';
import PomodoroTimer from '../../components/PomodoroTimer';
import GroupStudyLobby from '../../components/GroupStudy/GroupStudyLobby';
import ChatRoom from '../../components/GroupStudy/ChatRoom';
import { useChatContext } from '../../context/ChatContext';

import { getFirebaseAuth, getFirebaseDatabase } from '../../firebase/firebase';
import { ref, get } from 'firebase/database';

const ScheduleScreen: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('Schedule');
  const [firstName, setFirstName] = useState('User');
  const [points, setPoints] = useState(0);
  const { currentRoom, availableRooms, joinRoom, leaveRoom, loading, currentUser } = useChatContext();
  const [userName, setUserName] = useState('');
  
  // Schedule form states
  const [subject, setSubject] = useState('');
  const [date, setDate] = useState('');
  const [duration, setDuration] = useState('30');
  const [studyMode, setStudyMode] = useState('focused');

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
          const first = (data.username || 'User').split(' ')[0];
          setFirstName(first);
          setPoints(data.points || 0);
        }
      }
    };
    fetchUserData();
  }, []);

  const handleScheduleSession = () => {
    if (!subject.trim()) {
      Alert.alert('Error', 'Please enter a subject for your study session.');
      return;
    }
    if (!date.trim()) {
      Alert.alert('Error', 'Please enter a date for your study session.');
      return;
    }
    
    // Validate date format (basic validation)
    const dateRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/(\d{4})$/;
    if (!dateRegex.test(date)) {
      Alert.alert('Error', 'Please enter a valid date in MM/DD/YYYY format.');
      return;
    }
    
    Alert.alert(
      'Session Scheduled! 📅',
      `Your ${subject} study session has been scheduled for ${date} (${duration} minutes in ${studyMode} mode).\n\nYou'll receive a notification before your session starts!`,
      [
        {
          text: 'OK',
          onPress: () => {
            // Clear form
            setSubject('');
            setDate('');
            setDuration('30');
            setStudyMode('focused');
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-[#1b2845]">
      <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 16, paddingTop: 32 }}>
        <View className="mb-4">
          <DashboardHeader firstName={firstName} points={points} />
        </View>

        {/* Enhanced Tab Navigation */}
        <View className="mb-6">
          <View className="flex-row bg-[#324065] rounded-2xl p-2 shadow-lg">
            {[
              { name: 'Schedule', icon: '📚', color: 'bg-blue-500' },
              { name: 'Pomodoro', icon: '🍅', color: 'bg-red-500' },
              { name: 'Group Study', icon: '👥', color: 'bg-green-500' }
            ].map((tab) => (
              <TouchableOpacity
                key={tab.name}
                className={`flex-1 mx-1 py-3 px-2 rounded-xl transition-all duration-200 ${
                  selectedTab === tab.name 
                    ? `${tab.color} shadow-md` 
                    : 'bg-transparent'
                }`}
                onPress={() => setSelectedTab(tab.name)}
                activeOpacity={0.8}
              >
                <View className="items-center">
                  <Text className="text-lg mb-1">{tab.icon}</Text>
                  <Text className={`text-xs font-semibold text-center ${
                    selectedTab === tab.name ? 'text-white' : 'text-gray-300'
                  }`}>
                    {tab.name}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
          
          {/* Tab Indicator */}
          <View className="flex-row justify-center mt-2">
            {['Schedule', 'Pomodoro', 'Group Study'].map((tab, index) => (
              <View
                key={tab}
                className={`w-2 h-2 rounded-full mx-1 ${
                  selectedTab === tab ? 'bg-white' : 'bg-gray-500'
                }`}
              />
            ))}
          </View>
        </View>

        {selectedTab === 'Schedule' && (
          <View className="bg-[#2a3b5f] p-4 rounded-xl">
            <Text className="text-white text-lg font-bold mb-4">📚 Schedule Study Session</Text>
            
            <Text className="text-white mb-2 font-semibold">Subject *</Text>
            <TextInput 
              className="bg-white rounded-lg p-3 mb-4 text-gray-800" 
              placeholder="e.g., Mathematics, Physics, Chemistry" 
              placeholderTextColor="#999" 
              value={subject}
              onChangeText={setSubject}
            />
            
            <Text className="text-white mb-2 font-semibold">Date *</Text>
            <TextInput 
              className="bg-white rounded-lg p-3 mb-4 text-gray-800" 
              placeholder="MM/DD/YYYY" 
              placeholderTextColor="#999" 
              value={date}
              onChangeText={setDate}
              keyboardType="numeric"
            />
            
            <View className="flex-row gap-3 mb-4">
              <View className="flex-1">
                <Text className="text-white mb-2 font-semibold">Duration</Text>
                <View className="bg-white rounded-lg">
                  <Picker 
                    selectedValue={duration} 
                    onValueChange={setDuration}
                    style={{ color: '#374151' }}
                  >
                    <Picker.Item label="15 minutes" value="15" />
                    <Picker.Item label="30 minutes" value="30" />
                    <Picker.Item label="45 minutes" value="45" />
                    <Picker.Item label="60 minutes" value="60" />
                    <Picker.Item label="90 minutes" value="90" />
                    <Picker.Item label="120 minutes" value="120" />
                  </Picker>
                </View>
              </View>
              
              <View className="flex-1">
                <Text className="text-white mb-2 font-semibold">Study Mode</Text>
                <View className="bg-white rounded-lg">
                  <Picker 
                    selectedValue={studyMode} 
                    onValueChange={setStudyMode}
                    style={{ color: '#374151' }}
                  >
                    <Picker.Item label="🎯 Focused Mode" value="focused" />
                    <Picker.Item label="📖 Reading Mode" value="reading" />
                    <Picker.Item label="✍️ Practice Mode" value="practice" />
                    <Picker.Item label="🧠 Review Mode" value="review" />
                  </Picker>
                </View>
              </View>
            </View>
            
            <TouchableOpacity 
              className={`mt-4 p-4 rounded-xl ${
                subject.trim() && date.trim() ? 'bg-blue-500' : 'bg-gray-500'
              }`}
              onPress={handleScheduleSession}
              disabled={!subject.trim() || !date.trim()}
            >
              <Text className="text-white text-center font-bold text-lg">📅 Schedule Session</Text>
            </TouchableOpacity>
            
            <View className="mt-4 p-3 bg-blue-900/30 rounded-lg border border-blue-400/30">
              <Text className="text-blue-200 text-sm text-center">
                💡 Tip: Schedule regular study sessions to build consistent learning habits!
              </Text>
            </View>
          </View>
        )}

        {selectedTab === 'Pomodoro' && (
          <View>
            <View className="mb-4 p-4 bg-[#2a3b5f] rounded-xl">
              <Text className="text-white text-lg font-bold mb-2">🍅 Pomodoro Technique</Text>
              <Text className="text-gray-300 text-sm mb-3">
                Boost your productivity with focused work sessions and strategic breaks. 
                The Pomodoro Technique helps you maintain concentration and avoid burnout.
              </Text>
              <View className="flex-row items-center">
                <Text className="text-blue-400 text-sm font-semibold">💡 Tip: Start with 25-minute focus sessions</Text>
              </View>
            </View>
            <PomodoroTimer />
          </View>
        )}

        {selectedTab === 'Group Study' && (
          <View className="flex-1">
            {!currentRoom ? (
              <View>
                <View className="mb-4 p-4 bg-[#2a3b5f] rounded-xl">
                  <Text className="text-white text-lg font-bold mb-2">👥 Join Study Groups</Text>
                  <Text className="text-gray-300 text-sm mb-3">
                    Connect with other students, share knowledge, and study together in real-time!
                  </Text>
                  <View className="flex-row items-center">
                    <Text className="text-green-400 text-sm font-semibold">🟢 {Object.keys(availableRooms).length} rooms available</Text>
                  </View>
                </View>
                <GroupStudyLobby onJoinRoom={(roomId) => {
                  const name = userName.trim() || firstName || 'Anonymous User';
                  joinRoom(roomId, name);
                }} />
              </View>
            ) : (
              <View className="flex-1">
                <TouchableOpacity
                  className="bg-[#374151] px-4 py-3 rounded-xl mb-4 self-start flex-row items-center"
                  onPress={leaveRoom}
                >
                  <Text className="text-white font-semibold">⬅ Back to Study Rooms</Text>
                </TouchableOpacity>
                <ChatRoom />
              </View>
            )}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ScheduleScreen;
