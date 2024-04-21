import {
  type NativeStackNavigationOptions,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import * as P from "./allPages";
import type { NavigationProp } from "@react-navigation/native";

// To add new screen, first add the name in ScreenName const, and create the screen object inside routes const
export const ScreenName = ["StartScreen", "Login", "Register", "Home"] as const;
export type ScreenNames = (typeof ScreenName)[number];
export type RootStackParamList = Record<ScreenNames, undefined>;
export type StackNavigation = NavigationProp<RootStackParamList>;

type RouteType = {
  name: ScreenNames;
  component: React.FC;
  options?: (props: any) => NativeStackNavigationOptions;
};

const routes: RouteType[] = [
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
  {
    name: "Home",
    component: P.Home,
  },
  /* 
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
  */
];

const Stack = createNativeStackNavigator<RootStackParamList>();

export function Routes() {
  return (
    <Stack.Navigator
      initialRouteName={routes[0].name}
      screenOptions={{
        header: () => undefined,
      }}
    >
      {routes.map(({ name, component, options }) => (
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
