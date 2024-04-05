import React from 'react';
import { View, Text, StyleSheet, Pressable, Keyboard, Image, TouchableOpacity} from 'react-native';
import { Button, TextInput, Provider as PaperProvider } from 'react-native-paper';
import MyBottomTabs from '../../routes/bottomtabs';
import theme from '../../components/theme/theme';

const CreateEvent = () => {
  return (
    <PaperProvider theme={theme}>
    <Pressable onPress={Keyboard.dismiss} style={styles.viewStyle}>
    <Text style={styles.textTitle}>Criar evento</Text>
    
      </Pressable>
      </PaperProvider>
  );
}

const styles = StyleSheet.create({
    viewStyle: {
      flex: 1,
      justifyContent: 'center', 
      alignItems: 'center',
      backgroundColor: "#313131"
    },
    textTitle: {
      color: 'white',
      fontSize: 30,
      marginBottom: '140%'
    }
});

export default CreateEvent;
