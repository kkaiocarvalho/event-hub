import {
  NativeStackNavigationOptions,
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import { StartScreen } from "../pages/StartScreen";

const Stack = createNativeStackNavigator();

type RouteType = {
  name: string;
  component: React.FC;
  options?: (props: any) => NativeStackNavigationOptions;
};

const routes: RouteType[] = [
  {
    name: "StartScreen",
    component: StartScreen,
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

type StackNavigation = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
  MyBottomTabs: undefined;
  TopBars: undefined;
};

//TODO: get object key value of each object in array instead StackNavigation

export type StackTypes = NativeStackNavigationProp<StackNavigation>;

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
