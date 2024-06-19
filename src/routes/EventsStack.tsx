import {
  type NativeStackNavigationOptions,
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import * as P from "./allPages";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export const ScreenName = [
  "Events",
  "MyEvents",
  "CreateEvent",
  "EventDetails",
  "EventParticipants",
] as const;
export type ScreenNames = (typeof ScreenName)[number];
export type EventParamStack = {
  Events: undefined;
  MyEvents: undefined;
  CreateEvent: undefined;
  EventDetails: { eventId: number };
  EventParticipants: { eventId: number };
};
export type EventStackProps = NativeStackScreenProps<EventParamStack>;

type RouteEventsType = {
  name: ScreenNames;
  component: React.FC<any>;
  options?: (props: any) => NativeStackNavigationOptions;
};

const eventStack: RouteEventsType[] = [
  {
    name: "Events",
    component: P.Events,
    options: () => ({
      title: "Eventos",
    }),
  },
  {
    name: "MyEvents",
    component: P.MyEvents,
    options: () => ({
      title: "Meus eventos",
    }),
  },
  {
    name: "CreateEvent",
    component: P.CreateEvent,
    options: () => ({
      title: "Criar Evento",
    }),
  },
  {
    name: "EventDetails",
    component: P.EventDetails,
    options: () => ({
      title: "Detalhe do Evento",
    }),
  },
  {
    name: "EventParticipants",
    component: P.EventParticipants,
    options: () => ({
      title: "Participantes",
    }),
  },
];

const Stack = createNativeStackNavigator<EventParamStack>();

export function EventsStack() {
  return (
    <Stack.Navigator
      initialRouteName="Events"
      screenOptions={{
        headerStyle: {
          backgroundColor: "#111D40",
        },
        headerTitleAlign: "center",
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      {eventStack.map(({ name, component, options }) => (
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
