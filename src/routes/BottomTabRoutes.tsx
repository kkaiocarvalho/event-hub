import {
  type BottomTabNavigationOptions,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import type { RootParamList } from "./routes";
import * as P from "./allPages";
import { NavigationProp } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export const ScreenName = ["Home", "Events", "QRCode"] as const;

export type ScreenNames = (typeof ScreenName)[number];
export type Navigation = NavigationProp<RootParamList<ScreenNames>>;

type RouteType = {
  name: ScreenNames;
  component: React.FC;
  options?: (props: any) => BottomTabNavigationOptions;
};

const tabs: RouteType[] = [
  {
    name: "Events",
    component: P.Events,
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
    name: "Home",
    component: P.Home,
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
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#038c8c",
        tabBarStyle: {
          position: "absolute",
          backgroundColor: "#084040",
          borderColor: "#084040",
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
