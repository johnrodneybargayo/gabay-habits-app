import { StyleSheet } from "react-native";

export const habitTrackerStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#F9FAFB", // Soft background for better contrast
  },
  header: {
    marginBottom: 20,
    alignItems: "center", // Center align header content
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333333", // Darker text color for readability
    marginBottom: 8,
  },
  progress: {
    fontSize: 16,
    color: "#555555", // Slightly muted text for secondary info
    fontWeight: "500",
  },
  habitCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  habitText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333333",
  },
  completedHabitText: {
    textDecorationLine: "line-through",
    color: "#4CAF50", // Green color for completed habits
  },
  deleteButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "#E57373", // Red for delete action
    borderRadius: 6,
  },
  deleteText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 14,
    textAlign: "center",
  },
  addButton: {
    marginTop: 16,
    padding: 16,
    backgroundColor: "#4CAF50", // Green for add action
    borderRadius: 8,
    alignItems: "center", // Center align text
  },
  addButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
    padding: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 16,
  },
  input: {
    width: "100%",
    padding: 12,
    backgroundColor: "#FFFFFF",
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#CCCCCC",
    fontSize: 14,
    marginBottom: 12,
  },
  emptyText: {
    textAlign: "center",
    color: "#AAAAAA", // Muted color for empty state text
    fontSize: 16,
    marginTop: 32,
  },
});

export default habitTrackerStyles;
