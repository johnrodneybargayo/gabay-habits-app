import { StyleSheet } from "react-native";

const habitStyles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: "#F9FAFB", // Softer background color for better contrast
    padding: 16,
  },
  habitCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center", // Ensure alignment for elements in the card
    padding: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    marginBottom: 12, // Slightly larger spacing between cards
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 }, // Add subtle shadow for elevation
    elevation: 2, // For Android elevation
  },
  habitName: {
    fontSize: 16,
    fontWeight: "600", // Slightly bolder for better readability
    color: "#333333", // Darker text color for contrast
  },
  toggleButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 8,
    paddingHorizontal: 12, // Adjust padding for consistency
    borderRadius: 6,
  },
  toggleText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
  },
  progressContainer: {
    marginTop: 20,
    padding: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  progressText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#555555", // Slightly muted text color
    marginBottom: 8,
  },
  progressBar: {
    height: 10,
    backgroundColor: "#E0E0E0",
    borderRadius: 5,
    overflow: "hidden", // Ensure rounded corners are applied
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#4CAF50",
    borderRadius: 5,
  },
  text: {
    color: "#f4b400",
    fontSize: 18,
    fontWeight: "bold", // Optional for better visibility
  },
  formContainer: {
    marginTop: 20,
    padding: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  input: {
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 6,
    padding: 10,
    marginBottom: 12,
    backgroundColor: "#FAFAFA", // Light background for inputs
    fontSize: 14,
    color: "#333333",
  },
  toggleAnalyticsButton: {
    marginTop: 20,
    padding: 16,
    backgroundColor: "#007BFF",
    borderRadius: 8,
    alignItems: "center", // Ensure text is centered
  },
  toggleButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default habitStyles;
