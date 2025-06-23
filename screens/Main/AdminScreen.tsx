import React from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import DashboardHeader from '../../components/DashboardHeader';

const AdminScreen: React.FC = () => {
  return (
    <ScrollView className="flex-1 bg-[#1b2845] px-4 pt-8">
      <DashboardHeader firstName="Admin" points={5} />

      {/* Tab Navigation */}
      <View className="flex-row bg-[#324065] rounded-xl overflow-hidden mt-4">
        {['Overview', 'Users', 'Support', 'Content'].map((tab, index) => (
          <TouchableOpacity key={index} className={`flex-1 p-2 ${index === 0 ? 'bg-[#4c5c85]' : ''}`}>
            <Text className={`text-center font-medium ${index === 0 ? 'text-white' : 'text-gray-300'}`}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Search Box */}
      <TextInput
        placeholder="Search users, issues..."
        className="bg-white mt-4 p-3 rounded-xl text-sm text-black"
        placeholderTextColor="#999"
      />

      {/* Stats Cards */}
      <View className="flex-row justify-between mt-4">
        <View className="bg-white rounded-xl p-4 w-[48%]">
          <Text className="text-gray-500 text-sm font-medium">Total Users</Text>
          <Text className="text-purple-600 text-3xl font-bold">1247</Text>
          <Text className="text-xs text-gray-400 mt-1">+12% from last month</Text>
        </View>
        <View className="bg-white rounded-xl p-4 w-[48%]">
          <Text className="text-gray-500 text-sm font-medium">Active Users</Text>
          <Text className="text-green-600 text-3xl font-bold">892</Text>
          <Text className="text-xs text-gray-400 mt-1">71% engagement rate</Text>
        </View>
      </View>

      {/* System Health */}
      <View className="bg-white rounded-xl p-4 mt-4">
        <Text className="text-black font-semibold text-lg mb-3">System Health</Text>
        <View className="flex-row justify-between mb-1">
          <Text className="text-gray-300">Server Uptime</Text>
          <Text className="text-green-400 font-semibold">99.9%</Text>
        </View>
        <View className="flex-row justify-between mb-1">
          <Text className="text-gray-300">API Response</Text>
          <Text className="text-white font-semibold">120ms</Text>
        </View>
        <View className="flex-row justify-between mb-1">
          <Text className="text-gray-300">Error Rate</Text>
          <Text className="text-green-400 font-semibold">0.1%</Text>
        </View>
        <View className="flex-row justify-between">
          <Text className="text-gray-300">Open Issues</Text>
          <Text className="text-red-400 font-semibold">1</Text>
        </View>
      </View>

      {/* Recent Issues */}
      <View className="bg-white rounded-xl p-4 mt-4 mb-10">
        <Text className="text-black font-semibold text-lg mb-3">Recent Issues</Text>

        <View className="flex-row justify-between items-center mb-3">
          <View>
            <Text className="text-black font-semibold">Alice Johnson</Text>
            <Text className="text-gray-500 text-sm">Flashcards not syncing</Text>
          </View>
          <Text className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs">high</Text>
        </View>

        <View className="flex-row justify-between items-center">
          <View>
            <Text className="text-black font-semibold">Bob Smith</Text>
            <Text className="text-gray-500 text-sm">App crash on iOS</Text>
          </View>
          <Text className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs">medium</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default AdminScreen;
