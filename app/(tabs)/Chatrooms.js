import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Live from './Live';
import ComingSoon from './ComingSoon';

const Tab = createMaterialTopTabNavigator();

export default function ChatRooms() {
  return (
    <Tab.Navigator>
        <Tab.Screen name="Live" component={Live} />
        <Tab.Screen name="ComingSoon" component={ComingSoon} />
    </Tab.Navigator>
  );
}