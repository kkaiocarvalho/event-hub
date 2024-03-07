import React from 'react';
import { StyleSheet,} from 'react-native';
import StackComponent from './src/routes/stack';

import {
  SafeAreaView
} from 'react-native-safe-area-context';
import { Provider as PaperProvider } from 'react-native-paper';


export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <PaperProvider>
      <StackComponent/>
      </PaperProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
