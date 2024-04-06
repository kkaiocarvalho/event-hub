import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import Myevents from '../pages/home/myevents';
import Allevents from '../pages/home/all_events';

import {
  SafeAreaProvider,
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
        tabBarActiveTintColor: '#00FFE0', // Cor do texto da aba ativa
        tabBarInactiveTintColor: '#888', // Cor do texto da aba inativa
        tabBarLabelStyle: {
          fontSize: 16, // Tamanho do texto da aba
          fontWeight: 'bold', // Estilo do texto da aba
        },
        tabBarIndicatorStyle: {
          backgroundColor: '#00FFE0', // Cor do indicador da aba ativa
        },
      }}
    >
      <Tab.Screen name="My-events" component={Myevents} />
      <Tab.Screen name="All-events" component={Allevents} />
    </Tab.Navigator>
    </SafeAreaProvider>
  );
}



