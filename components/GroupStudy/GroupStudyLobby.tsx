// GroupStudyLobby.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useChatContext } from '../../context/ChatContext';

interface GroupStudyLobbyProps {
  onJoinRoom: (roomId: string) => void;
}

const GroupStudyLobby: React.FC<GroupStudyLobbyProps> = ({ onJoinRoom }) => {
  const { availableRooms, createRoom, loading, joiningRooms } = useChatContext();
  const [roomName, setRoomName] = useState('');
  const [subject, setSubject] = useState('Mathematics');
  const [description, setDescription] = useState('');
  const [capacity, setCapacity] = useState('8');
  const [activeTab, setActiveTab] = useState('public');

  const handleCreateRoom = async () => {
    if (roomName.trim() && description.trim()) {
      await createRoom(roomName.trim(), description.trim(), subject);
      setRoomName('');
      setDescription('');
    }
  };
  return (
    <ScrollView className="bg-[#2a3b5f] p-4 rounded-xl">
      <Text className="text-white text-lg font-bold mb-3">Group Study</Text>
      
      {/* Create Room Section */}
      <View className="mb-4">
        <Text className="text-white mb-2">+ Create Study Room</Text>
        <TextInput
          className="bg-white rounded-md p-2 mb-2"
          placeholder="e.g., Math Study Group"
          placeholderTextColor="#999"
          value={roomName}
          onChangeText={setRoomName}
        />
        <Picker 
          selectedValue={subject} 
          onValueChange={setSubject}
          style={{ backgroundColor: 'white', borderRadius: 8, marginBottom: 8 }}
        >
          <Picker.Item label="Mathematics" value="Mathematics" />
          <Picker.Item label="Physics" value="Physics" />
          <Picker.Item label="Chemistry" value="Chemistry" />
          <Picker.Item label="Biology" value="Biology" />
          <Picker.Item label="Computer Science" value="Computer Science" />
          <Picker.Item label="Literature" value="Literature" />
          <Picker.Item label="History" value="History" />
        </Picker>
        <TextInput
          className="bg-white rounded-md p-2 mb-2"
          placeholder="Brief description of what you'll be studying..."
          placeholderTextColor="#999"
          value={description}
          onChangeText={setDescription}
          multiline
        />
        <Picker 
          selectedValue={capacity} 
          onValueChange={setCapacity}
          style={{ backgroundColor: 'white', borderRadius: 8, marginBottom: 8 }}
        >
          <Picker.Item label="4 members" value="4" />
          <Picker.Item label="6 members" value="6" />
          <Picker.Item label="8 members" value="8" />
          <Picker.Item label="10 members" value="10" />
        </Picker>
        <TouchableOpacity 
          className={`mt-2 p-3 rounded-xl ${
            roomName.trim() && description.trim() && !loading ? 'bg-black' : 'bg-gray-500'
          }`}
          onPress={handleCreateRoom}
          disabled={!roomName.trim() || !description.trim() || loading}
        >
          <Text className="text-white text-center font-bold">
            {loading ? 'Creating...' : '+ Create Room'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View className="flex-row justify-between my-4 bg-white rounded-md">
        <TouchableOpacity 
          className={`flex-1 p-2 rounded-l-md ${
            activeTab === 'public' ? 'bg-gray-200' : 'bg-white'
          }`}
          onPress={() => setActiveTab('public')}
        >
          <Text className={`text-center font-bold ${
            activeTab === 'public' ? 'text-black' : 'text-gray-500'
          }`}>
            🌐 Public Rooms
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          className={`flex-1 p-2 rounded-r-md ${
            activeTab === 'my' ? 'bg-gray-200' : 'bg-white'
          }`}
          onPress={() => setActiveTab('my')}
        >
          <Text className={`text-center font-bold ${
            activeTab === 'my' ? 'text-black' : 'text-gray-500'
          }`}>
            👥 My Rooms
          </Text>
        </TouchableOpacity>
      </View>

      {/* Room List */}
      {Object.entries(availableRooms).length === 0 ? (
        <View className="bg-white p-4 rounded-xl mb-4">
          <Text className="text-gray-500 text-center">No rooms available. Create one to get started!</Text>
        </View>
      ) : (
        Object.entries(availableRooms).map(([roomId, room]) => {
          const participantCount = room.participants ? Object.keys(room.participants).length : 0;
          return (
            <View key={roomId} className="bg-white p-4 rounded-xl mb-4">
              <Text className="text-black font-bold text-base">{room.name}</Text>
              <Text className="text-blue-600">{room.subject}</Text>
              <Text className="text-gray-500 text-sm mb-2">{room.description}</Text>
              <View className="flex-row justify-between items-center">
                <Text className="text-black">⚡ {participantCount}/{room.capacity || 8}</Text>
                <TouchableOpacity 
                  onPress={() => onJoinRoom(roomId)} 
                  className="bg-black px-3 py-2 rounded-md"
                  disabled={joiningRooms[roomId] || false}
                >
                  <Text className="text-white">{joiningRooms[roomId] ? 'Joining...' : 'Join Room'}</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        })
      )}
    </ScrollView>
  );
};

export default GroupStudyLobby;
