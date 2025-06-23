import React from 'react';
import { View, Text } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

type Props = {
  isBreak: boolean;
};

const tips = [
  'Focus on one task at a time.',
  'Break large tasks into smaller ones.',
  'Avoid multitasking—it reduces focus.',
  'Use breaks to hydrate and stretch.',
  'Celebrate small wins to stay motivated.',
];

const PomodoroTipsSlider: React.FC<Props> = ({ isBreak }) => {
  return (
    <View className={`mt-4 ${isBreak ? 'bg-green-50' : 'bg-gray-100'} rounded-md p-4`}>
      <Text className="text-sm font-bold text-primary mb-2">💡 Gabay Tip</Text>
      <Carousel
        loop
        autoPlay
        width={300}
        height={60}
        data={tips}
        autoPlayInterval={12000} // wait 5 seconds before moving
        scrollAnimationDuration={800} // smooth transition
        renderItem={({ item }: { item: string }) => (
          <View className="flex justify-center items-center h-full px-2">
            <Text className="text-sm text-primary text-center">{item}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default PomodoroTipsSlider;
