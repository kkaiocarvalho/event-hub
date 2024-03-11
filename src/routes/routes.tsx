import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  NativeStackNavigationOptions,
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

type RouteType = {
  name: string;
  component: React.FC;
  options?: (props: any) => NativeStackNavigationOptions;
};

const routes: RouteType[] = [
  {
    name: "Login",
    component: Login,
    options: ({ navigation }) => ({
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
    }),
  },
  {
    name: "Register",
    component: Register,
  },
  {
    name: "MyBottomTabs",
    component: MyBottomTabs,
    options: () => ({ headerShown: false, headerBackVisible: false }),
  },
  {
    name: "TopBars",
    component: TopBars,
    options: () => ({ headerShown: false, headerBackVisible: false }),
  },
  {
    name: "Home",
    component: Home,
    options: () => ({ headerShown: false, headerBackVisible: false }),
  },
];

type StackNavigation = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
  MyBottomTabs: undefined;
  TopBars: undefined;
};

//TODO: get object key value of each object in array instead StackNavigation

export type StackTypes = NativeStackNavigationProp<StackNavigation>;

export function Routes() {
  return (
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
      {routes.map(({ name, component, options }) => (
        <Stack.Screen name={name} component={component} options={options} />
      ))}
    </Stack.Navigator>
  );
}
