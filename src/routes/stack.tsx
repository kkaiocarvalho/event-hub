import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import { TouchableOpacity, Text } from "react-native";

import Login from "../pages/login";
import Register from "../pages/register";
import MyBottomTabs from "./bottomtabs";
import TopBars from "./topbars";
import Home from "../pages/home/bottom_menu";
import InitialScreen from "../pages/initial_screen";


const Stack = createNativeStackNavigator();

type StackNavigation = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
  MyBottomTabs: undefined;
  TopBars: undefined;
  InitialScreen: undefined;
};

export type StackTypes = NativeStackNavigationProp<StackNavigation>;

export default function StackComponent() {
  return (
    <NavigationContainer>
      <Stack.Navigator
      initialRouteName="InitialScreen"
        screenOptions={{
          headerTransparent: true,
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontSize: 24,
          },
        }}
      >
        <Stack.Screen
          name="Login"
          component={Login}
        />

        <Stack.Screen name="InitialScreen" component={InitialScreen} options={{ headerShown: false, headerBackVisible: false }}/>

        <Stack.Screen name="Register" component={Register} />

        <Stack.Screen
          name="MyBottomTabs" component={MyBottomTabs}
          options={{ headerShown: false, headerBackVisible: false }}
        />

        <Stack.Screen
          name="TopBars" component={TopBars}
          options={{ headerShown: false, headerBackVisible: false }}
        />

        <Stack.Screen
          name="Home" component={Home}
          options={{ headerShown: false, headerBackVisible: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
