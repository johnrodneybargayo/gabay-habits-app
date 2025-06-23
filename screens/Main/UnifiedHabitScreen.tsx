import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import HabitCard from '../../components/HabitCard';
import unifiedHabitStyles from '../../styles/unifiedHabitStyles';

const UnifiedHabitScreen: React.FC = () => {
  const [habits, setHabits] = useState([
    { id: '1', name: 'Morning Exercise', completed: false },
    { id: '2', name: 'Meditation', completed: true },
    { id: '3', name: 'Read a Book', completed: false },
  ]);

  const toggleHabit = (id: string) => {
    setHabits((prev) =>
      prev.map((habit) =>
        habit.id === id ? { ...habit, completed: !habit.completed } : habit
      )
    );
  };

  return (
    <View style={unifiedHabitStyles.screenContainer}>
      <Text style={unifiedHabitStyles.header}>Your Habits</Text>
      <FlatList
        data={habits}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <HabitCard
            habit={item}
            onToggle={() => toggleHabit(item.id)}
          />
        )}
        ListEmptyComponent={
          <Text style={unifiedHabitStyles.emptyMessage}>No habits added yet!</Text>
        }
      />
      <TouchableOpacity style={unifiedHabitStyles.addButton}>
        <Text style={unifiedHabitStyles.addButtonText}>+ Add Habit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UnifiedHabitScreen;
