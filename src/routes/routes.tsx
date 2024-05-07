import {
  type NativeStackNavigationOptions,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import * as P from "./allPages";
import type { NavigationProp } from "@react-navigation/native";
import { useAuth } from "../hook/useAuth";
import { BottomTabRoutes } from "./BottomTabRoutes";

// To add new screen, first add the name in ScreenName const, and create the screen object inside routes const
export const ScreenName = [
  "StartScreen",
  "Login",
  "Register",
  "HomeTab",
] as const;
export type ScreenNames = (typeof ScreenName)[number];
export type RootParamList<T> = Record<T extends string ? T : any, undefined>;
export type Navigation = NavigationProp<RootParamList<ScreenNames>>;

type RouteType = {
  name: ScreenNames;
  component: React.FC;
  options?: (props: any) => NativeStackNavigationOptions;
};

const routesLoggedOut: RouteType[] = [
  {
    name: "StartScreen",
    component: P.StartScreen,
  },
  {
    name: "Login",
    component: P.Login,
  },
  {
    name: "Register",
    component: P.Register,
  },
];

const Stack = createNativeStackNavigator<RootParamList<ScreenNames>>();

export function Routes() {
  const { isAuthenticated } = useAuth();

  return (
    <Stack.Navigator
      initialRouteName={routesLoggedOut[0].name}
      screenOptions={{
        headerShown: false,
      }}
    >
      {isAuthenticated ? (
        <Stack.Screen
          key="HomeTab-key"
          name="HomeTab"
          component={BottomTabRoutes}
        />
      ) : (
        routesLoggedOut.map(({ name, component, options }) => (
          <Stack.Screen
            key={name}
            name={name}
            component={component}
            options={options}
          />
        ))
      )}
    </Stack.Navigator>
  );
}
