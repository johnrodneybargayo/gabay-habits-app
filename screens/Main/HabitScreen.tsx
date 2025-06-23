import React from "react";
import { View, Text } from "react-native";
import habitStyles from "../../styles/habitStyles"; // Correct default import

const HabitScreen: React.FC = () => {
  return (
    <View style={habitStyles.screenContainer}>
      <Text style={habitStyles.text}>This is the Habits Screen</Text>
    </View>
  );
};

export default HabitScreen;
