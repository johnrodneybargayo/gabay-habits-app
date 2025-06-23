import React from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Screens
import SplashScreen from '../screens/Auth/SplashScreen';
import LoginScreen from '../screens/Auth/LoginScreen';
import RegisterScreen from '../screens/Auth/RegisterScreen';
import DashboardScreen from '../screens/Main/DashboardScreen';
import NotesScreen from '../screens/Main/NotesScreen';
import FlashcardsScreen from '../screens/Main/FlashcardsScreen';
import ScheduleScreen from '../screens/Main/ScheduleScreen';
import AdminScreen from '../screens/Main/AdminScreen';

// Styles
import tabNavigatorStyles from '../styles/tabNavigatorStyles';

// TEMP: Use emojis as icons to avoid SVG import crash
const tabIcons: Record<string, React.FC<{ focused: boolean }>> = {
  Dashboard: ({ focused }) => <Text style={{ fontSize: 20 }}>{focused ? '🏠' : '🏚️'}</Text>,
  Notes: ({ focused }) => <Text style={{ fontSize: 20 }}>{focused ? '📝' : '📄'}</Text>,
  Flashcards: ({ focused }) => <Text style={{ fontSize: 20 }}>{focused ? '📊' : '📈'}</Text>,
  Schedule: ({ focused }) => <Text style={{ fontSize: 20 }}>{focused ? '📅' : '🕒'}</Text>,
  Admin: ({ focused }) => <Text style={{ fontSize: 20 }}>{focused ? '🛠️' : '⚙️'}</Text>,
};

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const tabScreens: { name: string; component: React.ComponentType<any> }[] = [
  { name: 'Dashboard', component: DashboardScreen },
  { name: 'Notes', component: NotesScreen },
  { name: 'Flashcards', component: FlashcardsScreen },
  { name: 'Schedule', component: ScheduleScreen },
  { name: 'Admin', component: AdminScreen },
];

// ✅ Tab Navigator
const MainTabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: tabNavigatorStyles.tabBar,
        tabBarActiveTintColor: '#f4b400',
        tabBarInactiveTintColor: '#888',
        tabBarIcon: ({ focused }) => {
          const Icon = tabIcons[route.name];
          return Icon ? <Icon focused={focused} /> : null;
        },
      })}
    >
      {tabScreens.map(({ name, component }) => {
        if (typeof component !== 'function') {
          console.error(`❌ Invalid component for tab: ${name}`);
          return null;
        }

        return (
          <Tab.Screen
            key={name}
            name={name}
            component={component}
            options={{
              headerShown: false,
              tabBarLabel: ({ focused }) => (
                <Text
                  style={
                    focused
                      ? tabNavigatorStyles.activeLabel
                      : tabNavigatorStyles.inactiveLabel
                  }
                >
                  {name}
                </Text>
              ),
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
};

// ✅ Stack Navigator
const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{
            title: 'Create Account',
            headerStyle: { backgroundColor: '#1b2845' },
            headerTintColor: '#f4b400',
          }}
        />
        <Stack.Screen
          name="Main"
          component={MainTabNavigator}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
