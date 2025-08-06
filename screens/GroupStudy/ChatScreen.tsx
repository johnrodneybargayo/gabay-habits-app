import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useChatContext } from '../../context/ChatContext';

const ChatScreen: React.FC = () => {
  const { currentRoom, sendMessage, joinRoom } = useChatContext();
  const [messageText, setMessageText] = useState('');
  const scrollViewRef = useRef<ScrollView>(null);
  const navigation = useNavigation();

  // Initialize room when component mounts
  useEffect(() => {
    if (!currentRoom) {
      // Join the default math study group room
      joinRoom('math-study-group', 'You');
    }
  }, [currentRoom, joinRoom]);

  const handleSendMessage = () => {
    if (messageText.trim() && currentRoom) {
      sendMessage(messageText.trim());
      setMessageText('');
      
      // Scroll to bottom after sending message
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  };

  const handleVoiceCall = () => {
    Alert.alert('Voice Call', 'Voice call feature would be implemented here with WebRTC or similar technology.');
  };

  const handleVideoCall = () => {
    Alert.alert('Video Call', 'Video call requires Premium subscription. This feature would integrate with video calling services.');
  };

  if (!currentRoom) {
    return (
      <SafeAreaView className="flex-1 bg-[#1b2845]">
        <View className="flex-1 justify-center items-center">
          <Text className="text-white text-lg">Loading chat room...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-[#1b2845]">
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <View className="flex-1">
          {/* Header Section - Compact */}
          <View className="px-4 pt-4 pb-2">
            <Text className="text-white text-xl font-bold mb-1">{currentRoom.name}</Text>
            <Text className="text-sm text-gray-300 mb-1">Mathematics</Text>
            <Text className="text-sm text-gray-400 mb-3">
              {currentRoom.description}
            </Text>

            {/* Buttons and Online Count */}
            <View className="flex-row items-center justify-between mb-3">
              <View className="flex-row">
                <TouchableOpacity 
                  className="bg-blue-600 p-3 rounded-lg mr-3"
                  onPress={handleVoiceCall}
                >
                  <Text className="text-white text-sm">🎤</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  className="bg-red-500 p-3 rounded-lg opacity-60"
                  onPress={handleVideoCall}
                >
                  <Text className="text-white text-sm">📹</Text>
                </TouchableOpacity>
              </View>
              <Text className="text-white font-medium text-sm">
                {Object.values(currentRoom.participants).filter(p => p.online).length}/{currentRoom.capacity} online
              </Text>
            </View>
          </View>

          {/* Chat Section - Expanded */}
          <View className="flex-1 px-4">
            <Text className="text-white text-xl font-bold mb-3">💬 Chat</Text>
            <View className="bg-white rounded-2xl p-4 flex-1">
              <ScrollView 
                ref={scrollViewRef}
                showsVerticalScrollIndicator={true}
                className="flex-1"
                contentContainerStyle={{ flexGrow: 1 }}
                style={{ minHeight: 400 }}
              >
                {Object.keys(currentRoom.messages).length === 0 ? (
                  <View className="flex-1 justify-center items-center py-8">
                    <Text className="text-gray-400 text-center italic text-base">💬 No messages yet</Text>
                    <Text className="text-gray-400 text-center text-sm mt-1">Start the conversation or ask the AI for help!</Text>
                  </View>
                ) : (
                  Object.values(currentRoom.messages).map((message, index) => {
                    const isOwnMessage = message.sender === 'You';
                    const isAIMessage = message.type === 'ai';
                    const isSystemMessage = message.type === 'system';
                    
                    if (isSystemMessage) {
                      return (
                        <View key={message.id || index} className="mb-2">
                          <Text className="text-xs italic text-gray-400 text-center py-2 bg-gray-100 rounded-full px-3">
                            {message.content}
                          </Text>
                        </View>
                      );
                    }
                    
                    return (
                      <View key={message.id || index} className={`mb-3 ${isOwnMessage ? 'items-end' : 'items-start'}`}>
                        {/* Sender name and time */}
                        <Text className={`text-xs mb-1 ${
                          isAIMessage ? 'text-blue-600 font-semibold' : 
                          isOwnMessage ? 'text-gray-600' : 'text-gray-700'
                        }`}>
                          {message.sender}{message.time ? ` • ${message.time}` : ''}
                        </Text>
                        
                        {/* Message bubble */}
                        <View className={`max-w-[80%] px-4 py-3 rounded-2xl ${
                          isAIMessage ? 'bg-blue-100 border border-blue-200' :
                          isOwnMessage ? 'bg-blue-500' : 'bg-gray-100 border border-gray-200'
                        }`}>
                          <Text className={`text-base leading-5 ${
                            isAIMessage ? 'text-blue-900' :
                            isOwnMessage ? 'text-white' : 'text-gray-800'
                          }`}>
                            {message.content}
                          </Text>
                        </View>
                      </View>
                    );
                  })
                )}
              </ScrollView>
            </View>
          </View>

          {/* Input Section - Fixed at bottom */}
          <View className="px-4 pb-4">
            <View className="bg-white rounded-2xl border border-gray-200 p-3 shadow-lg">
              <View className="flex-row items-end">
                <TextInput
                  className="flex-1 bg-gray-50 px-4 py-3 rounded-2xl border border-gray-100 mr-3 text-base"
                  placeholder="Type a message... (Use @ai for AI help)"
                  placeholderTextColor="#9CA3AF"
                  value={messageText}
                  onChangeText={setMessageText}
                  multiline={true}
                  maxLength={500}
                  style={{ maxHeight: 120, minHeight: 48 }}
                  textAlignVertical="top"
                  returnKeyType="send"
                  blurOnSubmit={false}
                  onSubmitEditing={() => {
                    if (messageText.trim()) {
                      handleSendMessage();
                    }
                  }}
                />
                <TouchableOpacity 
                  className={`w-12 h-12 rounded-full items-center justify-center shadow-md ${
                    messageText.trim() ? 'bg-[#1b2845]' : 'bg-gray-300'
                  }`}
                  onPress={handleSendMessage}
                  disabled={!messageText.trim()}
                >
                  <Text className="text-white text-xl">{messageText.trim() ? '➤' : '✎'}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatScreen;
