import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';

import DashboardHeader from '../../components/DashboardHeader';
import PomodoroTimer from '../../components/PomodoroTimer';
import GroupStudyRoomList from '../../components/GroupStudy/GroupStudyLobby';
import ChatRoom from '../../components/GroupStudy/ChatRoom';

import { getFirebaseAuth, getFirebaseDatabase } from '../../firebase/firebase';
import { ref, get } from 'firebase/database';

const ScheduleScreen: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('Group Study');
  const [firstName, setFirstName] = useState('User');
  const [points, setPoints] = useState(0);
  const [joinedRoom, setJoinedRoom] = useState(false);

  const navigation = useNavigation();

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

  return (
    <SafeAreaView className="flex-1 bg-[#1b2845]">
      <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 16, paddingTop: 32 }}>
        <View className="mb-4">
          <DashboardHeader firstName={firstName} points={points} />
        </View>

        <View className="flex-row justify-between mb-4 bg-[#324065] rounded-xl p-1">
          {['Schedule', 'Pomodoro', 'Group Study'].map((tab) => (
            <TouchableOpacity
              key={tab}
              className={`flex-1 p-2 rounded-xl ${selectedTab === tab ? 'bg-[#4c5c85]' : ''}`}
              onPress={() => setSelectedTab(tab)}
            >
              <Text className={`text-center ${selectedTab === tab ? 'text-white font-bold' : 'text-gray-300'}`}>{tab}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {selectedTab === 'Schedule' && (
          <View className="bg-[#2a3b5f] p-4 rounded-xl">
            <Text className="text-white text-lg font-bold mb-2">Schedule Study Session</Text>
            <Text className="text-white mb-1">Subject</Text>
            <TextInput className="bg-white rounded-md p-2 mb-3" placeholder="e.g., Mathematics, Physics" placeholderTextColor="#999" />
            <Text className="text-white mb-1">Date</Text>
            <TextInput className="bg-white rounded-md p-2 mb-3" placeholder="mm/dd/yyyy" placeholderTextColor="#999" />
            <View className="flex-row gap-2">
              <View className="flex-1">
                <Text className="text-white mb-1">Duration (minutes)</Text>
                <Picker selectedValue="30 minutes" enabled={false} style={{ backgroundColor: 'white', borderRadius: 8 }}>
                  <Picker.Item label="30 minutes" value="30" />
                </Picker>
              </View>
              <View className="flex-1">
                <Text className="text-white mb-1">Study Mode</Text>
                <Picker selectedValue="Focused Mode" enabled={false} style={{ backgroundColor: 'white', borderRadius: 8 }}>
                  <Picker.Item label="Focused Mode" value="focused" />
                </Picker>
              </View>
            </View>
            <TouchableOpacity className="bg-blue-500 mt-4 p-3 rounded-xl" disabled>
              <Text className="text-white text-center font-bold">📅 Schedule Session</Text>
            </TouchableOpacity>
          </View>
        )}

        {selectedTab === 'Pomodoro' && <PomodoroTimer />}

        {selectedTab === 'Group Study' && (
          <>
            {!joinedRoom ? (
              <GroupStudyRoomList onJoinRoom={() => setJoinedRoom(true)} />
            ) : (
              <>
                <TouchableOpacity
                  className="bg-gray-700 px-4 py-2 rounded-xl mb-4 self-start"
                  onPress={() => setJoinedRoom(false)}
                >
                  <Text className="text-white font-semibold">⬅ Back to Group Study</Text>
                </TouchableOpacity>
                <ChatRoom
                  roomInfo={{ name: 'Math Study Group', description: 'Working on calculus problems and derivatives', capacity: 4 }}
                  participants={[
                    { name: 'Alice 👑', online: true },
                    { name: 'Bob', online: true },
                    { name: 'Charlie', online: false },
                    { name: 'You', online: true },
                  ]}
                  messages={[
                    { sender: 'Alice', time: '06:00 PM', content: 'Welcome everyone! Let’s start with derivatives.' },
                    { sender: 'System', time: '', content: 'Bob joined the room' },
                    { sender: 'System', time: '', content: 'You joined the room' },
                  ]}
                  onSendMessage={() => console.log('Send message')}
                />
              </>
            )}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ScheduleScreen;
