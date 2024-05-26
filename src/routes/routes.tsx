import {
  type NativeStackNavigationOptions,
  NativeStackScreenProps,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import * as P from "./allPages";
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
export type RootStackParamStack = RootParamList<ScreenNames>;
export type RootStackProps = NativeStackScreenProps<RootStackParamStack>;

type RouteType = {
  name: ScreenNames;
  component: any;
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

const Stack = createNativeStackNavigator<RootStackParamStack>();

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
