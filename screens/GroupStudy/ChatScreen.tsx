import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ChatScreen: React.FC = () => {
  return (
    <SafeAreaView className="flex-1 bg-[#1b2845]">
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {/* Room Info */}
        <Text className="text-white text-xl font-bold mb-1">Math Study Group</Text>
        <Text className="text-sm text-gray-300 mb-1">Mathematics</Text>
        <Text className="text-sm text-gray-400 mb-4">
          Working on calculus problems and derivatives
        </Text>

        {/* Buttons */}
        <View className="flex-row items-center space-x-3 mb-4">
          <TouchableOpacity className="bg-gray-700 p-3 rounded-md">
            <Text className="text-white text-lg">🎤</Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-red-200 p-3 rounded-md">
            <Text className="text-red-700 text-lg">📹</Text>
          </TouchableOpacity>
          <Text className="text-sm text-gray-300 italic">Video requires Premium</Text>
        </View>

        {/* Participants */}
        <Text className="text-white text-base font-semibold mb-2">Participants (3/4)</Text>
        <View className="flex-row flex-wrap gap-2 mb-4">
          {['Alice 👑', 'Bob', 'Charlie', 'You'].map((name, index) => (
            <View key={index} className="bg-white rounded-xl p-3 w-[47%]">
              <Text className="text-[#1b2845] font-semibold">{name}</Text>
              <Text
                className={`text-sm ${
                  name === 'Charlie' ? 'text-gray-500' : 'text-green-600'
                }`}
              >
                {name === 'Charlie' ? '🔴 Offline' : '🟢 Online'}
              </Text>
            </View>
          ))}
        </View>

        {/* AI Tutor */}
        <View className="bg-indigo-100 rounded-xl p-4 mb-4">
          <Text className="text-[#1b2845] font-bold mb-1">
            ⚡ AI Tutor Active <Text className="text-sm font-normal">Online</Text>
          </Text>
          <Text className="text-[#1b2845] text-sm">
            The AI tutor is ready to help with questions and explanations. Type{' '}
            <Text className="font-semibold">@ai</Text> followed by your question in chat.
          </Text>
        </View>

        {/* Chat */}
        <Text className="text-white text-base font-bold mb-2">💬 Chat</Text>
        <View className="bg-white rounded-xl p-3 mb-3">
          <Text className="text-gray-600 text-xs">Alice: 06:00 PM</Text>
          <Text className="text-black text-sm">
            Welcome everyone! Let’s start with derivatives.
          </Text>
          <Text className="text-gray-500 text-xs italic mt-2">Bob joined the room</Text>
          <Text className="text-gray-500 text-xs italic">You joined the room</Text>
        </View>

        {/* Chat Input */}
        <View className="flex-row items-center bg-white rounded-xl px-4 py-2">
          <TextInput
            className="flex-1 text-black text-sm"
            placeholder="Type a message... (Use @ai for AI help)"
            placeholderTextColor="#888"
          />
          <TouchableOpacity className="ml-3 bg-[#1b2845] p-2 rounded-md">
            <Text className="text-white text-lg">📨</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ChatScreen;
