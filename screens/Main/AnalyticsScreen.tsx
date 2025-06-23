import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { fetchAnalyticsData, AnalyticsData } from '../../services/analyticsService';
import analyticsScreenStyles from '../../styles/analyticsScreenStyles';

const AnalyticsScreen: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);

  useEffect(() => {
    const getData = async () => {
      const data = await fetchAnalyticsData();
      setAnalyticsData(data);
      setLoading(false);
    };

    getData();
  }, []);

  if (loading) {
    return (
      <View style={analyticsScreenStyles.loadingContainer}>
        <ActivityIndicator size="large" color="#f4b400" />
      </View>
    );
  }

  if (!analyticsData) {
    return (
      <View style={analyticsScreenStyles.container}>
        <Text style={analyticsScreenStyles.errorText}>Failed to load analytics data.</Text>
      </View>
    );
  }

  return (
    <View style={analyticsScreenStyles.container}>
      <Text style={analyticsScreenStyles.headerTitle}>Your Analytics</Text>
      <Text>Longest Streak: {Math.max(...analyticsData.streaks)} days</Text>
      {/* Render analytics data like streaks, completion rates, etc. */}
    </View>
  );
};

export default AnalyticsScreen;
