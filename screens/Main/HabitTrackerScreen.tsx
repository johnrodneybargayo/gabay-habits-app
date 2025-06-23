import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  Button,
  TouchableOpacity,
  Modal,
  Alert,
} from "react-native";
import habitTrackerStyles from "../../styles/HabitTrackerStyles"; // Correct default import

interface Habit {
  id: string;
  name: string;
  isCompleted: boolean;
  frequency: string;
}

const HabitTrackerScreen: React.FC = () => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [newHabit, setNewHabit] = useState("");
  const [frequency, setFrequency] = useState("Daily");
  const [modalVisible, setModalVisible] = useState(false);

  const addHabit = () => {
    if (newHabit.trim()) {
      setHabits([
        ...habits,
        {
          id: Date.now().toString(),
          name: newHabit,
          isCompleted: false,
          frequency,
        },
      ]);
      setNewHabit("");
      setFrequency("Daily");
      setModalVisible(false);
    }
  };

  const toggleCompletion = (id: string) => {
    setHabits((prevHabits) =>
      prevHabits.map((habit) =>
        habit.id === id ? { ...habit, isCompleted: !habit.isCompleted } : habit
      )
    );
  };

  const deleteHabit = (id: string) => {
    Alert.alert("Delete Habit", "Are you sure you want to delete this habit?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => setHabits(habits.filter((habit) => habit.id !== id)),
      },
    ]);
  };

  const completedHabits = habits.filter((habit) => habit.isCompleted).length;

  return (
    <View style={habitTrackerStyles.container}>
      <View style={habitTrackerStyles.header}>
        <Text style={habitTrackerStyles.headerText}>Habit Tracker</Text>
        <Text style={habitTrackerStyles.progress}>
          Completed: {completedHabits}/{habits.length}
        </Text>
      </View>
      <FlatList
        data={habits}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={habitTrackerStyles.habitCard}>
            <TouchableOpacity onPress={() => toggleCompletion(item.id)}>
              <Text
                style={[
                  habitTrackerStyles.habitText,
                  item.isCompleted && habitTrackerStyles.completedHabitText,
                ]}
              >
                {item.name} ({item.frequency})
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={habitTrackerStyles.deleteButton}
              onPress={() => deleteHabit(item.id)}
            >
              <Text style={habitTrackerStyles.deleteText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          <Text style={habitTrackerStyles.emptyText}>No habits added yet!</Text>
        }
      />
      <TouchableOpacity
        style={habitTrackerStyles.addButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={habitTrackerStyles.addButtonText}>+ Add Habit</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={habitTrackerStyles.modalContainer}>
          <Text style={habitTrackerStyles.modalTitle}>Add New Habit</Text>
          <TextInput
            placeholder="Habit Name"
            value={newHabit}
            onChangeText={setNewHabit}
            style={habitTrackerStyles.input}
          />
          <TextInput
            placeholder="Frequency (e.g., Daily, Weekly)"
            value={frequency}
            onChangeText={setFrequency}
            style={habitTrackerStyles.input}
          />
          <Button title="Add Habit" onPress={addHabit} />
          <Button
            title="Cancel"
            color="red"
            onPress={() => setModalVisible(false)}
          />
        </View>
      </Modal>
    </View>
  );
};

export default HabitTrackerScreen;
