import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons, Fontisto, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
        <Tabs.Screen name ="Chatrooms" 
          options={{ 
            headerShown: true, 
            headerStyle: {
              backgroundColor: '#f4511e',
            }, 
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="forum" color={color} size={24} />
            ),
          }}/>
        <Tabs.Screen 
        name="Favorite"
        options={{
          title: 'Favorite',
          tabBarIcon: ({ color }) => (
            <Fontisto name="favorite" color={color} size={20} />
          ),
        }} 
        />
        <Tabs.Screen 
        name="Music" 
        options={{
          title: 'Music',
          tabBarIcon: ({ color }) => (
            <Ionicons name="musical-notes" color={color} size={24} />
          ),
        }} 
        />
        <Tabs.Screen 
        name="Artists" 
        options={{
          title: 'Music',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="microphone-variant" color={color} size={24} />
          ),
        }} 
        />
        <Tabs.Screen 
        name="Upcoming" 
        options={{
          title: 'Upcoming',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="upcoming" color={color} size={24} />
          ),
        }} 
        />
        <Tabs.Screen name="Live" options={{ href: null }}/>
        <Tabs.Screen name="ComingSoon" options={{ href: null }}/>
    </Tabs>
  );
}