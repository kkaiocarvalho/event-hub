import React from 'react';
import { View } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import Profile from '../pages/profile';
import Settings from '../pages/settings_page';

const Tab = createMaterialBottomTabNavigator();

export default function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Profile"
      barStyle={{ backgroundColor: '#313131' }} // Cor de fundo do rodapé
      activeColor="#c1ff72" // Cor do ícone e texto da aba ativa
      inactiveColor="#888" // Cor do ícone e texto da aba inativa
      shifting={false}
    >
      <Tab.Screen name="Profile" 
      options={{ 
        tabBarLabel: 'Perfil', 
        tabBarIcon: 'home' 
        }} 
        component={Profile} />

      <Tab.Screen name="Settings" 
      options={{ 
        tabBarLabel: 'Configurações', 
        tabBarIcon: 'calendar' 
        }} 
        component={Settings} />
        
    </Tab.Navigator>
  );
}

