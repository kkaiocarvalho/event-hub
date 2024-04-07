import React from 'react';
// import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'; // MATERIAL BOTTOM TABS
// const Tab = createMaterialBottomTabNavigator(); // MATERIAL BOTTOM TABS

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; // BOTTOM TABS
const Tab = createBottomTabNavigator();

import Profile from '../pages/profile';
import EventsTop from '../pages/home/top_bar';
import CreateEvent from '../pages/creation_event'
import QrCode from '../pages/qr_code';

import { Ionicons } from '@expo/vector-icons'
import { Platform } from 'react-native';


/* // MATERIAL BOTTOM TABS
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
        tabBarLabel: 'Criar Evento', tabBarIcon: 'plus' 
        }} 
        component={CreateEvent} />

      <Tab.Screen name="QrCode" 
      options={{ 
        tabBarLabel: 'Validar Evento', tabBarIcon: 'qrcode' 
        }} 
        component={QrCode} />
        
    </Tab.Navigator>
  );
}
*/

export default function MyBottomTabs() {
  return (
    <Tab.Navigator
    screenOptions={{
      tabBarActiveTintColor: '#00FFE0',
      tabBarShowLabel: false,

      tabBarStyle:{
        position: 'absolute',
        backgroundColor: '#222222',
        borderTopWidth: 0,

        bottom: Platform.OS === 'android' ? 10 : 10,
        left: 18,
        right: 18,
        elevation: 0,
        borderRadius: 4,
        height: 60,
        paddingBottom: 0, // Apenas no iOS para zerar o padding do IOS
      }
    }}  
    >

      <Tab.Screen name="Profile" component={Profile} 
        options={{
          headerShown: false,        
          tabBarIcon: ({ color, size, focused }) => {
              if(focused){
                return <Ionicons name="person" size={size} color={color} />
              }
              return <Ionicons name="person-outline" size={size} color={color} />
          }
        }}
      />

      <Tab.Screen name="EventsTop" component={EventsTop} 
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => {
          if(focused){
            return <Ionicons name="calendar" size={size} color={color} />
          }
            return <Ionicons name="calendar-outline" size={size} color={color} />
          }
        }}
      />

      <Tab.Screen name="CreateEvent" component={CreateEvent} 
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => {
          if(focused){
            return <Ionicons name="add-circle" size={size} color={color} />
          }
            return <Ionicons name="add-circle-outline" size={size} color={color} />
          }
        }}
      />

      <Tab.Screen name="QrCode" component={QrCode} 
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => {
              if(focused){
                return <Ionicons name="qr-code" size={size} color={color} />
              }
              return <Ionicons name="qr-code-outline" size={size} color={color} />
          }
        }}
      />

    </Tab.Navigator>
  );
}