import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
import { Ionicons } from '@expo/vector-icons';



export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#667eea', // match web app primary
        tabBarInactiveTintColor: '#94a3b8',
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopColor: '#e2e8f0',
          borderTopWidth: 1,
          height: Platform.OS === 'ios' ? 88 : 64,
          paddingBottom: Platform.OS === 'ios' ? 28 : 12,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color }) => <Ionicons name="apps-outline" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: 'Submit',
          tabBarIcon: ({ color }) => <Ionicons name="add-circle-outline" size={28} color={color} />,
        }}
      />
    </Tabs>
  );
}
