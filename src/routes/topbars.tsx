import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { View } from 'react-native';

import Myevents from '../pages/home/myevents';
import Allevents from '../pages/home/all_events';

import {
  SafeAreaView,
  SafeAreaProvider,
  SafeAreaInsetsContext,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

const Tab = createMaterialTopTabNavigator();

export default function TopBars() {
  return (   
    <SafeAreaProvider>
      <Tab.Navigator
      screenOptions={{
        tabBarStyle: { 
          backgroundColor: '#313131', // Cor de fundo do tab bar
        },
        tabBarActiveTintColor: '#c1ff72', // Cor do texto da aba ativa
        tabBarInactiveTintColor: '#888', // Cor do texto da aba inativa
        tabBarLabelStyle: {
          fontSize: 16, // Tamanho do texto da aba
          fontWeight: 'bold', // Estilo do texto da aba
        },
        tabBarIndicatorStyle: {
          backgroundColor: '#c1ff72', // Cor do indicador da aba ativa
        },
      }}
    >
      <Tab.Screen name="My-events" component={Myevents} />
      <Tab.Screen name="All-events" component={Allevents} />
    </Tab.Navigator>
    </SafeAreaProvider>
  );
}
