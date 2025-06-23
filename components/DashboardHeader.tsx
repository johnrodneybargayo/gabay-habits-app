import React from 'react';
import { View, Text, TextInput, Image } from 'react-native';
import dashboardStyles from '../styles/dashboardStyles'; // adjust the path if necessary

interface DashboardHeaderProps {
  firstName: string;
  points: number;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ firstName, points }) => {
  return (
    <View style={dashboardStyles.headerContainer}>
      {/* Top Row: Logo and Search Bar */}
      <View style={dashboardStyles.topHeaderRow}>
        <Image
          source={{ uri: 'https://i.postimg.cc/Wbp09kB4/icon.png' }}
          style={dashboardStyles.logoImage}
        />

        <View style={dashboardStyles.searchGroup}>
          <Text style={dashboardStyles.searchLabel}>Search</Text>
          <TextInput
            placeholder="Basic search"
            placeholderTextColor="#ccc"
            style={dashboardStyles.searchInput}
            keyboardType="default"
          />
        </View>
      </View>

      {/* Bottom Row: User Info */}
      <View style={dashboardStyles.userInfoRow}>
        <Text style={dashboardStyles.usernameText}>Hi, {firstName}</Text>
        <Text style={dashboardStyles.pointsText}>Current Points: {points}</Text>
      </View>
    </View>
  );
};

export default DashboardHeader;
