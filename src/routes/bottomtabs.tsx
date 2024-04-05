import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import Profile from '../pages/profile';
import EventsTop from '../pages/home/top_bar';
import CreateEvent from '../pages/creation_event'
import QrCode from '../pages/qr_code';
import Settings from '../pages/settings_page';

const Tab = createMaterialBottomTabNavigator();

export default function MyBottomTabs() {
  return (
    <Tab.Navigator
  initialRouteName="EventsTop"
  barStyle={{ backgroundColor: '#222222' }} // Cor de fundo do rodapé
  activeColor="#00FFE0" // Cor do ícone e texto da aba ativa
  inactiveColor="#FFF" // Cor do ícone e texto da aba inativa
  shifting={true}
  labeled={true}
  shifting={true}
  sceneContainerStyle={{ backgroundColor: '#000' }}
>
      <Tab.Screen name="Profile" 
      options={{ 
        tabBarLabel: 'Perfil', tabBarIcon: 'account' 
        }} 
        component={Profile} />

      <Tab.Screen name="EventsTop" 
      options={{ 
        tabBarLabel: 'Ingressos', tabBarIcon: 'calendar' 
        }} 
        component={EventsTop} />

      <Tab.Screen name="CreateEvent" 
      options={{ 
        tabBarLabel: 'Criar Evento', tabBarIcon: 'calendar' 
        }} 
        component={CreateEvent} />

      <Tab.Screen name="QrCode" 
      options={{ 
        tabBarLabel: 'Validar Evento', tabBarIcon: 'line-scan' 
        }} 
        component={QrCode} />
        
    </Tab.Navigator>
  );
}

