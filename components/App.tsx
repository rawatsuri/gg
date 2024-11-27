'use client';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import HealthScreen from './screens/HealthScreen';
import WealthScreen from './screens/WealthScreen';
import SettingsScreen from './screens/SettingsScreen';
import HealthFormScreen from './screens/HealthFormScreen';
import WealthFormScreen from './screens/WealthFormScreen';
import GoalScreen from './screens/GoalScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Health') {
            iconName = focused ? 'fitness' : 'fitness-outline';
          } else if (route.name === 'Wealth') {
            iconName = focused ? 'wallet' : 'wallet-outline';
          } else if (route.name === 'Goals') {
            iconName = focused ? 'flag' : 'flag-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'settings' : 'settings-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#4CAF50',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Health" component={HealthStack} />
      <Tab.Screen name="Wealth" component={WealthStack} />
      <Tab.Screen name="Goals" component={GoalScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

function HealthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HealthMain" component={HealthScreen} options={{ title: 'Health Tracker' }} />
      <Stack.Screen name="HealthForm" component={HealthFormScreen} options={{ title: 'Log Health Data' }} />
    </Stack.Navigator>
  );
}

function WealthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="WealthMain" component={WealthScreen} options={{ title: 'Wealth Tracker' }} />
      <Stack.Screen name="WealthForm" component={WealthFormScreen} options={{ title: 'Log Financial Data' }} />
    </Stack.Navigator>
  );
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      setIsLoggedIn(!!token);
    } catch (error) {
      console.error('Error checking login status:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return null; // or a loading screen
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isLoggedIn ? (
          <Stack.Screen name="Main" component={MainTabs} />
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

