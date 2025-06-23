import React, { useState } from "react";
import { View, TextInput, Button } from "react-native";
import styles from "../styles/habitStyles";


const HabitForm: React.FC<{ onSave: (name: string) => void }> = ({ onSave }) => {
  const [habitName, setHabitName] = useState("");

  return (
    <View style={styles.formContainer}>
      <TextInput
        style={styles.input}
        placeholder="Enter habit name"
        value={habitName}
        onChangeText={setHabitName}
      />
      <Button title="Save" onPress={() => onSave(habitName)} />
    </View>
  );
};

export default HabitForm;
