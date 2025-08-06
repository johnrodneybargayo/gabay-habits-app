import { StackNavigationProp } from '@react-navigation/stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp } from '@react-navigation/native';

// Stack Navigator Param List
export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  Register: undefined;
  Main: undefined;
};

// Tab Navigator Param List
export type MainTabParamList = {
  Dashboard: undefined;
  Notes: undefined;
  Flashcards: undefined;
  Schedule: undefined;
  Admin: undefined;
};

// Combined Navigation Types
export type DashboardNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList, 'Dashboard'>,
  StackNavigationProp<RootStackParamList>
>;

export type NotesNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList, 'Notes'>,
  StackNavigationProp<RootStackParamList>
>;

export type FlashcardsNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList, 'Flashcards'>,
  StackNavigationProp<RootStackParamList>
>;

export type ScheduleNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList, 'Schedule'>,
  StackNavigationProp<RootStackParamList>
>;

export type AdminNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList, 'Admin'>,
  StackNavigationProp<RootStackParamList>
>;

// Auth Screen Navigation Types
export type LoginNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;
export type RegisterNavigationProp = StackNavigationProp<RootStackParamList, 'Register'>;