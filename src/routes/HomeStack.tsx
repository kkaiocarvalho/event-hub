import {
  type NativeStackNavigationOptions,
  NativeStackScreenProps,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import * as P from "./allPages";
import { RootParamList } from "./routes";

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
  },
];

const Stack = createNativeStackNavigator<EventParamStack>();

export function HomeStack() {
  return (
    <Stack.Navigator
      initialRouteName={homeStack[0].name}
      screenOptions={{
        headerShown: false,
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
