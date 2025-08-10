import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const NativeWindDemo: React.FC = () => {
  return (
    <View className="p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg m-4">
      <Text className="text-white text-xl font-bold mb-2">NativeWind is Working! 🎉</Text>
      <Text className="text-gray-100 text-sm mb-4">
        This component demonstrates NativeWind classes in action:
      </Text>
      
      <View className="space-y-2">
        <View className="flex-row items-center space-x-2">
          <View className="w-3 h-3 bg-green-400 rounded-full" />
          <Text className="text-white text-sm">Tailwind colors and spacing</Text>
        </View>
        
        <View className="flex-row items-center space-x-2">
          <View className="w-3 h-3 bg-yellow-400 rounded-full" />
          <Text className="text-white text-sm">Flexbox utilities</Text>
        </View>
        
        <View className="flex-row items-center space-x-2">
          <View className="w-3 h-3 bg-red-400 rounded-full" />
          <Text className="text-white text-sm">Typography classes</Text>
        </View>
      </View>
      
      <TouchableOpacity className="bg-white bg-opacity-20 p-3 rounded-lg mt-4 items-center">
        <Text className="text-white font-semibold">Interactive Button</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NativeWindDemo;