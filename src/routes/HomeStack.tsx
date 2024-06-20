import {
  type NativeStackNavigationOptions,
  NativeStackScreenProps,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import * as P from "./allPages";
import { RootParamList } from "./routes";
import { LoopMiniLogo } from "../components/LoopMiniLogo";
import React, { useState } from "react";
import {
  AlertDialogFooter,
  AlertDialogBody,
  Text,
  ButtonGroup,
} from "@gluestack-ui/themed";
import { Button } from "../components/Button";
import { useAuth } from "../hook/useAuth";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { CustomAlertDialog } from "../components/CustomAlertDialog";

export const ScreenName = ["Profile"] as const;
export type ScreenNames = (typeof ScreenName)[number];
export type EventParamStack = RootParamList<ScreenNames>;
export type EventStackProps = NativeStackScreenProps<EventParamStack>;

const LogoutButton = () => {
  const { logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => setIsOpen(false);
  const onOpen = () => setIsOpen(true);

  return (
    <>
      <MaterialCommunityIcons
        name="logout"
        size={24}
        color="red"
        onPress={onOpen}
      />
      <CustomAlertDialog isOpen={isOpen} onClose={onClose} title="Logout">
        <AlertDialogBody>
          <Text fontSize={15}>Deseja realmente encerrar a sessão?</Text>
        </AlertDialogBody>
        <AlertDialogFooter>
          <ButtonGroup flexDirection="column" w="$full">
            <Button
              w="$full"
              text="Encerrar sessão"
              action="negative"
              variant="outline"
              onPress={() => {
                logout();
                onClose();
              }}
            />
            <Button
              w="$full"
              text="Voltar"
              action="primary"
              onPress={() => onClose()}
            />
          </ButtonGroup>
        </AlertDialogFooter>
      </CustomAlertDialog>
    </>
  );
};

type RouteType = {
  name: ScreenNames;
  component: any;
  options?: (props: any) => NativeStackNavigationOptions;
};

const homeStack: RouteType[] = [
  {
    name: "Profile",
    component: P.Profile,
    options: () => ({
      headerTitle: () => <LoopMiniLogo />,
      headerRight: () => <LogoutButton />,
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
        headerStyle: { backgroundColor: "#111D40" },
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
