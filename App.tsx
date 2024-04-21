import { Routes } from "./src/routes/routes";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./src/config/react-query";
import { NavigationContainer } from "@react-navigation/native";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { config } from "./src/config/themeConfig";
import { useReactQueryDevTools } from "@dev-plugins/react-query";
import { AuthProvider } from "./src/contexts/AuthContext";

export default function App() {
  useReactQueryDevTools(queryClient);
  // press shift + m to open
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <GluestackUIProvider config={config}>
          <NavigationContainer>
            <AuthProvider>
              <SafeAreaView style={{ flex: 1 }}>
                <Routes />
              </SafeAreaView>
            </AuthProvider>
          </NavigationContainer>
        </GluestackUIProvider>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
