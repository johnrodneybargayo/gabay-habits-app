import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { getFirebaseDatabase } from '../firebase/firebase';
import { ref, get } from 'firebase/database';

type Props = {
  isBreak: boolean;
};

const defaultTips = [
  'Focus on one task at a time.',
  'Break large tasks into smaller ones.',
  'Avoid multitasking—it reduces focus.',
  'Use breaks to hydrate and stretch.',
  'Celebrate small wins to stay motivated.',
  'Take deep breaths to stay calm and focused.',
  'Set clear goals for each study session.',
  'Remove distractions from your workspace.',
  'Use the 2-minute rule for quick tasks.',
  'Reward yourself after completing tasks.',
];

const PomodoroTipsSlider: React.FC<Props> = ({ isBreak }) => {
  const [tips, setTips] = useState(defaultTips);
  const [currentTipIndex, setCurrentTipIndex] = useState(0);

  useEffect(() => {
    loadTipsFromFirebase();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTipIndex((prevIndex) => (prevIndex + 1) % tips.length);
    }, 8000); // Change tip every 8 seconds

    return () => clearInterval(interval);
  }, [tips.length]);

  const loadTipsFromFirebase = async () => {
    try {
      const db = getFirebaseDatabase();
      const tipsRef = ref(db, 'pomodoro_tips');
      const snapshot = await get(tipsRef);
      
      if (snapshot.exists()) {
        const firebaseTips = Object.values(snapshot.val()) as string[];
        if (firebaseTips.length > 0) {
          setTips(firebaseTips);
        }
      }
    } catch (error) {
      console.log('Using default tips:', error);
    }
  };

  return (
    <View className={`mt-4 ${isBreak ? 'bg-green-50' : 'bg-gray-100'} rounded-md p-4`}>
      <Text className="text-sm font-bold text-primary mb-2">💡 Gabay Tip</Text>
      
      {/* Current Tip Display */}
      <View className="bg-white rounded-lg p-3 mb-3 min-h-[60px] justify-center">
        <Text className="text-sm text-primary text-center leading-5">
          {tips[currentTipIndex]}
        </Text>
      </View>
      
      {/* Scrollable Tips List */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        className="flex-row"
        contentContainerStyle={{ paddingHorizontal: 4 }}
      >
        {tips.map((tip, index) => (
          <TouchableOpacity
            key={index}
            className={`mr-2 px-3 py-2 rounded-full ${
              index === currentTipIndex ? 'bg-blue-500' : 'bg-gray-300'
            }`}
            onPress={() => setCurrentTipIndex(index)}
          >
            <Text className={`text-xs ${
              index === currentTipIndex ? 'text-white' : 'text-gray-600'
            }`}>
              Tip {index + 1}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      
      {/* Navigation Dots */}
      <View className="flex-row justify-center mt-3">
        {tips.map((_, index) => (
          <TouchableOpacity
            key={index}
            className={`w-2 h-2 rounded-full mx-1 ${
              index === currentTipIndex ? 'bg-blue-500' : 'bg-gray-300'
            }`}
            onPress={() => setCurrentTipIndex(index)}
          />
        ))}
      </View>
    </View>
  );
};

export default PomodoroTipsSlider;
