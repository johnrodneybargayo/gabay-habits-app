import React from 'react';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

const AnalyticsChart: React.FC = () => {
  return (
    <LineChart
      data={{
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{ data: [20, 45, 28, 80, 99, 43] }],
      }}
      width={Dimensions.get('window').width - 40} // Full width minus some padding
      height={220}
      yAxisLabel="$"
      chartConfig={{
        backgroundColor: '#1b2845',
        backgroundGradientFrom: '#1b2845',
        backgroundGradientTo: '#313D5D',
        decimalPlaces: 2,
        color: (opacity = 1) => `rgba(244, 180, 0, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      }}
      style={{
        marginVertical: 8,
        borderRadius: 16,
      }}
    />
  );
};

export default AnalyticsChart;
