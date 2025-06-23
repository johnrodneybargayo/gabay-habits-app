import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "../styles/habitStyles";


interface HabitCardProps {
  habit: {
    name: string;
    completed: boolean;
  };
  onToggle: () => void;
}

const HabitCard: React.FC<HabitCardProps> = ({ habit, onToggle }) => (
  <View style={styles.habitCard}>
    <Text style={styles.habitName}>{habit.name}</Text>
    <TouchableOpacity style={styles.toggleButton} onPress={onToggle}>
      <Text style={styles.toggleText}>{habit.completed ? "Completed" : "Mark Done"}</Text>
    </TouchableOpacity>
  </View>
);

export default HabitCard;
