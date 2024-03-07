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

const Stack = createNativeStackNavigator();

type StackNavigation = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
  MyBottomTabs: undefined;
  TopBars: undefined;
};

export type StackTypes = NativeStackNavigationProp<StackNavigation>;

export default function StackComponent() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerTransparent: true,
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontFamily: "Barlow_700Bold",
            fontSize: 24,
          },
        }}
      >
        <Stack.Screen
          name="Login"
          component={Login}
          options={({ navigation }) => ({
            headerRight: () => (
              <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                <Text
                  style={{
                    color: "#000",
                    fontSize: 25,
                    backgroundColor: "#c1ff72",
                    padding: 5,
                    borderRadius: 10,
                  }}
                >
                  Registrar
                </Text>
              </TouchableOpacity>
            ),
          })}
        />
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
