import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

type RoomInfo = {
  name: string;
  description: string;
  capacity: number;
};

type Participant = {
  name: string;
  online: boolean;
};

type Message = {
  sender: string;
  time: string;
  content: string;
};

type ChatRoomProps = {
  roomInfo: RoomInfo;
  participants: Participant[];
  messages: Message[];
  onSendMessage: () => void;
};

const ChatRoom: React.FC<ChatRoomProps> = ({
  roomInfo,
  participants,
  messages,
  onSendMessage,
}) => {
  return (
    <View className="bg-[#2a3b5f] p-4 rounded-xl">
      <Text className="text-white text-lg font-bold mb-1">{roomInfo.name}</Text>
      <Text className="text-gray-300 mb-3">{roomInfo.description}</Text>

      <View className="flex-row my-3">
        <TouchableOpacity className="mr-4 bg-blue-600 px-3 py-2 rounded-xl">
          <Text className="text-white">🎤</Text>
        </TouchableOpacity>
        <TouchableOpacity className="mr-4 bg-blue-600 px-3 py-2 rounded-xl">
          <Text className="text-white">📹</Text>
        </TouchableOpacity>
        <Text className="text-yellow-400 self-center">Video requires Premium</Text>
      </View>

      <Text className="text-white font-semibold mb-1">
        Participants ({participants.length}/{roomInfo.capacity})
      </Text>
      <View className="flex-row gap-2 mb-4 flex-wrap">
        {participants.map((p, index) => (
          <View key={index} className="bg-[#1f2d4a] p-2 rounded-lg w-[47%] mb-2">
            <Text className="text-white text-sm font-bold">{p.name}</Text>
            <Text className="text-xs" style={{ color: p.online ? 'green' : '#ccc' }}>
              {p.online ? '🟢 Online' : '🔴 Offline'}
            </Text>
          </View>
        ))}
      </View>

      <View className="bg-[#1f2d4a] p-4 rounded-xl my-3">
        <Text className="text-white font-bold text-base mb-1">
          ⚡ AI Tutor Active <Text className="text-xs">Online</Text>
        </Text>
        <Text className="text-gray-300 text-sm">
          The AI tutor is ready to help with questions and explanations. Type @ai followed by your question in chat.
        </Text>
      </View>

      <Text className="text-white text-lg font-bold mb-2">💬 Chat</Text>
      <View className="bg-white rounded-xl p-4 mb-4">
        {messages.map((msg, idx) => (
          <View key={idx} className="mb-2">
            {msg.sender !== 'System' ? (
              <>
                <Text className="text-xs text-gray-500">{msg.sender}: {msg.time}</Text>
                <Text className="text-base">{msg.content}</Text>
              </>
            ) : (
              <Text className="text-xs italic text-gray-400">{msg.content}</Text>
            )}
          </View>
        ))}
      </View>

      <View className="flex-row items-center">
        <TextInput
          className="flex-1 bg-white p-2 rounded-l-xl"
          placeholder="Type a message... (Use @ai for AI help)"
          placeholderTextColor="#aaa"
        />
        <TouchableOpacity className="bg-blue-500 px-4 py-3 rounded-r-xl" onPress={onSendMessage}>
          <Text className="text-white">📨</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatRoom;
