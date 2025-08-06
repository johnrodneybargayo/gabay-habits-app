import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, SafeAreaView, Keyboard, Dimensions, Animated } from 'react-native';
import { useChatContext } from '../../context/ChatContext';

const ChatRoom: React.FC = () => {
  const { currentRoom, sendMessage, currentUser, leaveRoom } = useChatContext();
  const [messageText, setMessageText] = useState('');
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);
  const textInputRef = useRef<TextInput>(null);
  const inputContainerAnimation = useRef(new Animated.Value(0)).current;
  const screenHeight = Dimensions.get('window').height;

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', (e) => {
      const keyboardHeight = e.endCoordinates.height;
      setKeyboardHeight(keyboardHeight);
      setIsKeyboardVisible(true);
      
      // Animate input container to position above keyboard with proper spacing
      // Reduced spacing to move input field closer to keyboard
      Animated.timing(inputContainerAnimation, {
        toValue: -keyboardHeight + (Platform.OS === 'ios' ? 20 : 20),
        duration: 250,
        useNativeDriver: false,
      }).start();
      
      // Scroll to end after animation
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    });

    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardHeight(0);
      setIsKeyboardVisible(false);
      
      // Animate input container back to bottom
      Animated.timing(inputContainerAnimation, {
        toValue: 0,
        duration: 250,
        useNativeDriver: false,
      }).start();
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, [inputContainerAnimation]);

  const handleSendMessage = async () => {
    if (messageText.trim() && currentRoom) {
      await sendMessage(messageText.trim());
      setMessageText('');
      // Scroll to bottom after sending message
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  };

  if (!currentRoom) {
    return (
      <View className="flex-1 justify-center items-center bg-[#2a3b5f]">
        <Text className="text-white text-lg">No room selected</Text>
      </View>
    );
  }

  const messages = currentRoom.messages ? Object.values(currentRoom.messages) : [];
  const participants = currentRoom.participants ? Object.values(currentRoom.participants) : [];

  return (
    <SafeAreaView className="flex-1">
      <View className="bg-[#2a3b5f] flex-1">
        {/* Header Section - Compact */}
        <View className="px-4 pt-4 pb-2">
          <Text className="text-white text-lg font-bold mb-1">{currentRoom.name}</Text>
          <Text className="text-gray-300 text-sm mb-2">{currentRoom.description}</Text>

          <View className="flex-row items-center justify-between mb-2">
            <View className="flex-row">
              <TouchableOpacity className="mr-3 bg-blue-600 px-3 py-2 rounded-lg">
                <Text className="text-white text-sm">🎤</Text>
              </TouchableOpacity>
              <TouchableOpacity className="mr-3 bg-red-500 px-3 py-2 rounded-lg opacity-60">
                <Text className="text-white text-sm">📹</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                className="mr-3 bg-red-600 px-3 py-2 rounded-lg"
                onPress={leaveRoom}
              >
                <Text className="text-white text-sm font-medium">Leave Room</Text>
              </TouchableOpacity>
            </View>
            <Text className="text-white font-medium text-sm">
              {participants.filter(p => p.online).length}/{currentRoom.capacity || 10} online
            </Text>
          </View>
        </View>

        {/* Participants Section - Compact */}
        <View className="px-4 pb-2">
          <View className="flex-row gap-2 flex-wrap">
            {participants.map((p, index) => (
              <View key={index} className="bg-[#1f2d4a] px-3 py-2 rounded-lg">
                <Text className="text-white text-xs font-bold">{p.name}</Text>
                <Text className="text-xs" style={{ color: p.online ? '#6cffb2' : '#ccc' }}>
                  {p.online ? '🟢' : '🔴'}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <View className="bg-[#1f2d4a] p-4 rounded-xl my-3">
          <Text className="text-white font-bold text-base mb-1">
            ⚡ AI Tutor Active <Text className="text-xs">Online</Text>
          </Text>
          <Text className="text-gray-300 text-sm">
            The AI tutor is ready to help with questions and explanations. Type @ai followed by your question in chat.
          </Text>
        </View>

        {/* Chat Section - Expanded */}
        <View className="flex-1 px-4" style={{ paddingBottom: 120 }}>
          <Text className="text-white text-lg font-bold mb-3">💬 Chat</Text>
          <ScrollView 
            ref={scrollViewRef}
            className="bg-gray-50 rounded-2xl p-4"
            style={{ flex: 1 }}
            showsVerticalScrollIndicator={true}
            onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
            contentContainerStyle={{ flexGrow: 1, paddingBottom: 40 }}
            keyboardShouldPersistTaps="handled"
          >
            {messages.length === 0 ? (
              <View className="flex-1 justify-center items-center py-8">
                <Text className="text-gray-400 text-center italic text-base">💬 No messages yet</Text>
                <Text className="text-gray-400 text-center text-sm mt-1">Start the conversation or ask the AI for help!</Text>
              </View>
            ) : (
              messages.map((msg, idx) => {
                const isOwnMessage = msg.senderUid === currentUser?.uid;
                const isSystemMessage = msg.type === 'system';
                const isAIMessage = msg.type === 'ai';
                
                if (isSystemMessage) {
                  return (
                    <View key={idx} className="mb-2">
                      <Text className="text-xs italic text-gray-400 text-center py-2 bg-gray-200 rounded-full px-3">
                        {msg.content}
                      </Text>
                    </View>
                  );
                }
                
                return (
                  <View key={idx} className={`mb-3 ${isOwnMessage ? 'items-end' : 'items-start'}`}>
                    <Text className={`text-xs mb-1 ${
                      isOwnMessage ? 'text-gray-600' : isAIMessage ? 'text-purple-600' : 'text-gray-700'
                    }`}>
                      {msg.sender}{msg.time ? ` • ${msg.time}` : ''}
                    </Text>
                    
                    <View className={`max-w-[80%] px-4 py-3 rounded-2xl ${
                      isOwnMessage ? 'bg-blue-500' : isAIMessage ? 'bg-purple-100 border border-purple-200' : 'bg-white border border-gray-200'
                    }`}>
                      <Text className={`text-base leading-5 flex-wrap ${
                        isOwnMessage ? 'text-white' : isAIMessage ? 'text-purple-800' : 'text-gray-800'
                      }`} style={{ flexShrink: 1 }}>
                        {msg.content}
                      </Text>
                    </View>
                  </View>
                );
              })
            )}
          </ScrollView>
        </View>

        {/* Input Section - Messenger-like positioning */}
        <Animated.View 
          className="px-4 absolute bottom-0 left-0 right-0" 
          style={{ 
            transform: [{ translateY: inputContainerAnimation }],
            paddingBottom: isKeyboardVisible ? 0 : (Platform.OS === 'ios' ? 2 : 2),
            paddingTop: isKeyboardVisible ? 0 : 2,
            backgroundColor: '#2a3b5f',
          }}
        >
          <View className={`bg-white rounded-2xl border border-gray-200 shadow-lg ${isKeyboardVisible ? 'p-0' : 'p-1'}`} style={{ marginBottom: isKeyboardVisible ? 0 : 0 }}>
            <View className="flex-row items-end">
              <TextInput
                ref={textInputRef}
                className={`flex-1 bg-gray-50 rounded-2xl border border-gray-100 mr-2 text-base ${isKeyboardVisible ? 'px-2 py-1' : 'px-3 py-2'}`}
                placeholder="Type a message... (Use @ai for AI help)"
                placeholderTextColor="#9CA3AF"
                value={messageText}
                onChangeText={setMessageText}
                multiline={true}
                maxLength={500}
                style={{ maxHeight: 100, minHeight: 40 }}
                textAlignVertical="top"
                returnKeyType="send"
                blurOnSubmit={false}
                onFocus={() => {
                  setTimeout(() => {
                    scrollViewRef.current?.scrollToEnd({ animated: true });
                  }, 300);
                }}
                onSubmitEditing={() => {
                  if (messageText.trim()) {
                    handleSendMessage();
                  }
                }}
              />
              <TouchableOpacity 
                className={`w-10 h-10 rounded-full items-center justify-center shadow-md ${
                  messageText.trim() ? 'bg-blue-500' : 'bg-gray-300'
                }`} 
                onPress={handleSendMessage}
                disabled={!messageText.trim()}
              >
                <Text className="text-white text-xl">{messageText.trim() ? '➤' : '✎'}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

export default ChatRoom;
