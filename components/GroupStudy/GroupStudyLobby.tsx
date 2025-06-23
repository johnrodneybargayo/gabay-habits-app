// GroupStudyLobby.tsx
import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';

interface GroupStudyLobbyProps {
  onJoinRoom: () => void;
}

const GroupStudyLobby: React.FC<GroupStudyLobbyProps> = ({ onJoinRoom }) => {
  return (
    <View className="bg-[#2a3b5f] p-4 rounded-xl">
      <Text className="text-white text-lg font-bold mb-3">Group Study</Text>
      <Text className="text-white mb-2">+ Create Study Room</Text>
      <TextInput
        className="bg-white rounded-md p-2 mb-2"
        placeholder="e.g., Math Study Group"
        placeholderTextColor="#999"
      />
      <Picker selectedValue="Mathematics" style={{ backgroundColor: 'white', borderRadius: 8, marginBottom: 8 }}>
        <Picker.Item label="Mathematics" value="math" />
        <Picker.Item label="Physics" value="physics" />
      </Picker>
      <TextInput
        className="bg-white rounded-md p-2 mb-2"
        placeholder="Brief description of what you'll be studying..."
        placeholderTextColor="#999"
      />
      <Picker selectedValue="8 members" style={{ backgroundColor: 'white', borderRadius: 8, marginBottom: 8 }}>
        <Picker.Item label="8 members" value="8" />
      </Picker>
      <TouchableOpacity className="bg-black mt-2 p-3 rounded-xl">
        <Text className="text-white text-center font-bold">+ Create Room</Text>
      </TouchableOpacity>

      <View className="flex-row justify-between my-4 bg-white rounded-md">
        <TouchableOpacity className="flex-1 p-2 rounded-l-md bg-gray-200">
          <Text className="text-center font-bold">🌐 Public Rooms</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-1 p-2 rounded-r-md">
          <Text className="text-center text-gray-500">👥 My Rooms</Text>
        </TouchableOpacity>
      </View>

      <View className="bg-white p-4 rounded-xl mb-4">
        <Text className="text-black font-bold text-base">Math Study Group</Text>
        <Text className="text-blue-600">Mathematics</Text>
        <Text className="text-gray-500 text-sm mb-2">Working on calculus problems and derivatives</Text>
        <View className="flex-row justify-between items-center">
          <Text className="text-black">⚡ 2/8</Text>
          <TouchableOpacity onPress={onJoinRoom} className="bg-black px-3 py-2 rounded-md">
            <Text className="text-white">Join Room</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default GroupStudyLobby;
