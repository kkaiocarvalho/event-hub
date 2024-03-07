import React from 'react';
import { View, Text, StyleSheet, Pressable, Keyboard, Image, TouchableOpacity} from 'react-native';
import { Button, TextInput, Provider as PaperProvider } from 'react-native-paper';
import MyBottomTabs from '../../routes/bottomtabs';

const QrCode = () => {
  return (
    <PaperProvider theme={theme}>
    <Pressable onPress={Keyboard.dismiss} style={styles.viewStyle}>
    <Text style={styles.textTitle}>QrCode</Text>
      </Pressable>
      </PaperProvider>
  );
}

const theme = {
  colors: {
    primary: '#313131', // Cor primária (cor do texto e da borda)
    accent: '#26eb80', // Cor de destaque (cor do botão)
    background: 'white', // Cor de fundo
    surface: 'white', // Cor da superfície
    text: 'black', // Cor do texto
    disabled: '#b5b5b5', // Cor de texto desativado
    placeholder: '#666', // Cor do placeholder
    backdrop: 'rgba(0, 0, 0, 0.5)', // Cor do fundo do modal
    notification: '#f50057', // Cor da notificação
    border: 'transparent', // Torna a cor da borda transparente
  },
};

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

export default QrCode;
