import {
  type MaterialTopTabNavigationOptions,
  createMaterialTopTabNavigator,
} from "@react-navigation/material-top-tabs";
import { NavigationProp } from "@react-navigation/native";
import { RootParamList } from "../routes/routes";
import { Events } from "./Events";

export const ScreenName = ["Events", "MyEvents"] as const;

export type ScreenNames = (typeof ScreenName)[number];
export type Navigation = NavigationProp<RootParamList<ScreenNames>>;

type RouteEventsType = {
  name: ScreenNames;
  Component: React.FC<any>;
  options?: (props: any) => MaterialTopTabNavigationOptions;
  props?: { showOnlyMyEvents: boolean };
};

const eventTabs: RouteEventsType[] = [
  {
    name: "Events",
    Component: Events,
    options: () => ({
      title: "Eventos",
    }),
  },
  {
    name: "MyEvents",
    Component: Events,
    options: () => ({
      title: "Meus Eventos",
    }),
    props: { showOnlyMyEvents: true },
  },
];

const Tab = createMaterialTopTabNavigator<RootParamList<ScreenNames>>();

export function TabEvents() {
  return (
    <Tab.Navigator
      initialRouteName="Events"
      screenOptions={{
        tabBarIndicatorStyle: { backgroundColor: "#038c8c" },
        tabBarActiveTintColor: "#038c8c",
        tabBarStyle: {
          backgroundColor: "#084040",
        },
      }}
    >
      {eventTabs.map(({ name, Component, options, props }) => (
        <Tab.Screen
          key={name}
          name={name}
          children={() => <Component {...props} />}
          options={options}
        />
      ))}
    </Tab.Navigator>
  );
}
