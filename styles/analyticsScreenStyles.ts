import { StyleSheet } from "react-native";

const analyticsScreenStyles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1b2845", // Optional background color for loading state
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f4f4f4", // Adjust to match your app's theme
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#313D5D",
  },
  backButton: {
    fontSize: 16,
    color: "#76c7c0",
  },
  errorText: {
    fontSize: 16,
    color: "#ff4d4f", // Example color for error messages
    textAlign: "center",
    marginTop: 20,
  },
  streakCard: {
    backgroundColor: "#76c7c0",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  streakText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
  },
  streakSubtext: {
    fontSize: 14,
    color: "#ffffff",
    marginTop: 8,
  },
  chartContainer: {
    marginBottom: 24,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#313D5D",
  },
  chart: {
    borderRadius: 16,
  },
  trendsContainer: {
    marginBottom: 24,
  },
  trendsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#313D5D",
  },
});

export default analyticsScreenStyles;
