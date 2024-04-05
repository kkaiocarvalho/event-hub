import { Routes } from "./src/routes/routes";
import { SafeAreaView } from "react-native-safe-area-context";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./src/config/react-query";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  return (
    <NavigationContainer>
      <SafeAreaView style={{ flex: 1 }}>
        <QueryClientProvider client={queryClient}>
          <Routes />
        </QueryClientProvider>
      </SafeAreaView>
    </NavigationContainer>
  );
}
