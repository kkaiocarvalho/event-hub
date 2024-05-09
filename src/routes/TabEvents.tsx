import {
  type MaterialTopTabNavigationOptions,
  createMaterialTopTabNavigator,
} from "@react-navigation/material-top-tabs";
import { NavigationProp } from "@react-navigation/native";
import { RootParamList } from "../routes/routes";
import * as P from "./allPages";

export const ScreenName = ["Events", "SubscribedEvents"] as const;

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
    Component: P.Events,
    options: () => ({
      title: "Eventos",
    }),
  },
  {
    name: "SubscribedEvents",
    Component: P.Events,
    options: () => ({
      title: "Eventos Inscritos",
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
        tabBarIndicatorStyle: { backgroundColor: "#13F2F2" },
        tabBarActiveTintColor: "#13F2F2",
        tabBarStyle: {
          backgroundColor: "#111D40",
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
