import React from "react";
import { StyleSheet } from "react-native";
import { Routes } from "./src/routes/routes";

import { SafeAreaView } from "react-native-safe-area-context";
import { Provider as PaperProvider } from "react-native-paper";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./src/config/react-query";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  return (
    <NavigationContainer>
      <SafeAreaView style={{ flex: 1 }}>
        <QueryClientProvider client={queryClient}>
          <PaperProvider>
            <Routes />
          </PaperProvider>
        </QueryClientProvider>
      </SafeAreaView>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
