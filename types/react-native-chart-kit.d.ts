declare module 'react-native-chart-kit' {
    import React from 'react';
    import { StyleProp, ViewStyle } from 'react-native';
  
    export interface ChartConfig {
      backgroundColor: string;
      backgroundGradientFrom: string;
      backgroundGradientTo: string;
      decimalPlaces?: number; // optional, defaults to 2
      color: (opacity: number) => string;
      labelColor: (opacity: number) => string;
      style?: StyleProp<ViewStyle>;
      propsForDots?: object;
    }
  
    export interface LineChartProps {
      data: {
        labels: string[];
        datasets: { data: number[] }[];
      };
      width: number;
      height: number;
      yAxisLabel?: string;
      yAxisSuffix?: string;
      yAxisInterval?: number; // optional, defaults to 1
      chartConfig: ChartConfig;
      bezier?: boolean; // optional
      style?: StyleProp<ViewStyle>;
    }
  
    export interface BarChartProps {
      data: {
        labels: string[];
        datasets: { data: number[] }[];
      };
      width: number;
      height: number;
      yAxisLabel?: string;
      yAxisSuffix?: string;
      chartConfig: ChartConfig;
      style?: StyleProp<ViewStyle>;
    }
  
    export interface ProgressChartProps {
      data: number[];
      width: number;
      height: number;
      chartConfig: ChartConfig;
      style?: StyleProp<ViewStyle>;
    }
  
    export interface PieChartProps {
      data: { name: string; population: number; color: string; legendFontColor: string; legendFontSize: number }[];
      width: number;
      height: number;
      chartConfig: ChartConfig;
      accessor?: string; // defaults to "population"
      backgroundColor?: string;
      paddingLeft?: string;
      center?: [number, number]; // array of two numbers
      absolute?: boolean; // optional, default is false
    }
  
    export const LineChart: React.FC<LineChartProps>;
    export const BarChart: React.FC<BarChartProps>;
    export const ProgressChart: React.FC<ProgressChartProps>;
    export const PieChart: React.FC<PieChartProps>;
  }
  