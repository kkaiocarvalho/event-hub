import {
  type NativeStackNavigationOptions,
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import * as P from "./allPages";
import { Event } from "../api/requests/list-events";

export const ScreenName = [
  "Events",
  "MyEvents",
  "CreateEvent",
  "EventDetails",
] as const;
export type ScreenNames = (typeof ScreenName)[number];
export type EventParamStack = {
  Events: undefined;
  MyEvents: undefined;
  CreateEvent: undefined;
  EventDetails: { event: Event };
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
];

const Stack = createNativeStackNavigator<EventParamStack>();

export function EventsStack() {
  return (
    <Stack.Navigator
      initialRouteName="Events"
      screenOptions={{
        headerShown: false,
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
