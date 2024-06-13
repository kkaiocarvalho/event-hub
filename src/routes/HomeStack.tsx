import {
  type NativeStackNavigationOptions,
  NativeStackScreenProps,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import * as P from "./allPages";
import { RootParamList } from "./routes";
import { SvgXml } from "react-native-svg";
import MiniLogo from "../components/MiniLogo";
import { LoopMiniLogo } from "../components/LoopMiniLogo";

import React, { useState } from 'react';
import {
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogCloseButton,
  AlertDialogFooter,
  AlertDialogBody,
  Text,
} from '@gluestack-ui/themed';

import { Button } from "../components/Button";

import { useAuth } from "../hook/useAuth";

import { MaterialCommunityIcons } from '@expo/vector-icons';  

export const ScreenName = ["Home", "CreateEvent"] as const;
export type ScreenNames = (typeof ScreenName)[number];
export type EventParamStack = RootParamList<ScreenNames>;
export type EventStackProps = NativeStackScreenProps<EventParamStack>;

type RouteType = {
  name: ScreenNames;
  component: any;
  options?: (props: any) => NativeStackNavigationOptions;
};

const homeStack: RouteType[] = [
  {
    name: "Home",
    component: P.Home,
    options: ({ navigation }) => ({
      headerTitle: () => <LoopMiniLogo />,
      headerRight: () => <LogoutButton />
    }),
  },
];

const Stack = createNativeStackNavigator<EventParamStack>();

export function HomeStack() {

  return (
    <Stack.Navigator
      initialRouteName={homeStack[0].name}
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: '#111D40' },
        headerShadowVisible: false,
        headerTransparent: false,
        headerTitleAlign: "center",
      }}
    >
      {homeStack.map(({ name, component, options }) => (
        <Stack.Screen
          key={name}
          name={name}
          component={component}
          options={options}
        />
      ))}
    </Stack.Navigator>
  );
}

const LogoutButton = () => {
  const { logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => setIsOpen(false);
  const onOpen = () => setIsOpen(true);

  return (
    <>
      <MaterialCommunityIcons name="logout" size={24} color="white" onPress={onOpen} />
      <CustomAlertDialog isOpen={isOpen} onClose={onClose} logout={logout} />
    </>
  );
};

const CustomAlertDialog = ({ isOpen, onClose, logout }) => {
  return (
    <AlertDialog isOpen={isOpen} onClose={onClose}>
      <AlertDialogBackdrop />
      <AlertDialogContent>
        <AlertDialogHeader>
          <Text fontSize={30}>Logout</Text>
          <AlertDialogCloseButton onPress={onClose} />
        </AlertDialogHeader>
        <AlertDialogBody>
          <Text fontSize={20}>Deseja realmente encerrar a sessão?</Text>
        </AlertDialogBody>
        <AlertDialogFooter>
          <Button
            w="$full"
            text="Encerrar sessão"
            action="negative"
            onPress={() => {
              logout();
              onClose();
            }}
          />
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
