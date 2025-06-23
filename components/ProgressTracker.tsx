import React from "react";
import { View, Text } from "react-native";
import styles from "../styles/habitStyles";

const ProgressTracker: React.FC<{ progress: number }> = ({ progress }) => (
  <View style={styles.progressContainer}>
    <Text style={styles.progressText}>Progress: {progress}%</Text>
    <View style={styles.progressBar}>
      <View style={[styles.progressFill, { width: `${progress}%` }]} />
    </View>
  </View>
);

export default ProgressTracker;
