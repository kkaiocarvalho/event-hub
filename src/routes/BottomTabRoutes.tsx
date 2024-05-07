import {
  type BottomTabNavigationOptions,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import type { RootParamList } from "./routes";
import * as P from "./allPages";
import { NavigationProp } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TabEvents } from "./TabEvents";
import { HomeStack } from "./HomeStack";

export const ScreenName = ["TabEvents", "HomeStack", "QRCode"] as const;

export type ScreenNames = (typeof ScreenName)[number];
export type Navigation = NavigationProp<RootParamList<ScreenNames>>;

type RouteType = {
  name: ScreenNames;
  component: React.FC;
  options?: (props: any) => BottomTabNavigationOptions;
};

const tabs: RouteType[] = [
  {
    name: "TabEvents",
    component: TabEvents,
    options: () => ({
      title: "Eventos",
      tabBarLabelStyle: { display: "none" },
      tabBarIcon: ({ color, size }) => (
        <MaterialCommunityIcons
          name="ticket-confirmation-outline"
          size={size}
          color={color}
        />
      ),
    }),
  },
  {
    name: "HomeStack",
    component: HomeStack,
    options: () => ({
      title: "Ínicio",
      tabBarLabelStyle: { display: "none" },
      tabBarIcon: ({ color, size }) => (
        <Feather name="home" size={size} color={color} />
      ),
    }),
  },
  {
    name: "QRCode",
    component: P.QRCode,
    options: () => ({
      title: "QR-Code",
      tabBarLabelStyle: { display: "none" },
      tabBarIcon: ({ color, size }) => (
        <MaterialCommunityIcons name="qrcode-scan" size={size} color={color} />
      ),
    }),
  },
];

const Tab = createBottomTabNavigator<RootParamList<ScreenNames>>();

export function BottomTabRoutes() {
  return (
    <Tab.Navigator
      initialRouteName="HomeStack"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#13F2F2",
        tabBarStyle: {
          position: "absolute",
          backgroundColor: "#111D40",
          borderColor: "#111D40",
          borderRadius: 15,
          bottom: 15,
          left: 15,
          right: 15,
          elevation: 0,
        },
      }}
    >
      {tabs.map(({ name, component, options }) => (
        <Tab.Screen
          key={name}
          name={name}
          component={component}
          options={options}
        />
      ))}
    </Tab.Navigator>
  );
}
