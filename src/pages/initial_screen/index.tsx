import React from 'react';
import { View, Text, StyleSheet, Pressable, Keyboard, Image, TouchableOpacity, Share} from 'react-native';
import {  Provider as PaperProvider } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { StackTypes } from '../../routes/stack';

import { LinearGradient } from 'expo-linear-gradient';

import {SvgXml} from 'react-native-svg'

import theme from '../../components/theme/theme';
import logo from '../../components/theme/logo';

const onShare = async () => {
  const result = await Share.share({
      message: "Olá eu estou usando o Event HUB para gerenciar meus eventos! E confesso que estou amando o APP."
  })
}

const InitialScreen = () => {

  const navigation = useNavigation<StackTypes>();

  return (
    <PaperProvider theme={theme}>
      <Pressable onPress={Keyboard.dismiss} style={styles.viewStyle}>

        <LinearGradient colors={['#FFFA', '#606060', '#222222']}  style={styles.viewCard}>
          <SvgXml xml={logo}/>
          <TouchableOpacity
            style={styles.buttonLogin}
            onPress={() => {navigation.navigate("Login");}}
            >
            <Text style={styles.buttonLabel}>LOGIN</Text>
          </TouchableOpacity>

            <Text style={styles.textORbuttons}>OR</Text>

          <TouchableOpacity
            style={styles.buttonCadastrar}
            onPress={() => {navigation.navigate("Register");}}
            >
            <Text style={styles.buttonLabel}>CADASTRAR</Text>
          </TouchableOpacity>
        </LinearGradient>

          <View style={styles.shareFlex}>
          <TouchableOpacity 
            style={styles.shareButton} onPress={onShare}>
            <Text style={styles.buttonShareText}>Share</Text>
          </TouchableOpacity>
        </View>

      </Pressable>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  viewStyle: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: "#222222",
    zIndex: 1
  },
  viewCard: {
    width: "90%",
    height:"100%",
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
    zIndex: -1,
    position: "relative",
    marginBottom: 20,
    borderRadius: 10,
    padding: 40,
  },
  textORbuttons:{
    color: '#FFFFFF',
    fontSize: 40,
    margin: 10
  },
  buttonLogin: {
    backgroundColor: "#00FFE0",
    marginTop: 20,
    borderRadius: 5,
    padding: 0,
    width: 200,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonCadastrar: {
    backgroundColor: "#00FFE0",
    borderRadius: 5,
    padding: 0,
    width: 200,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonLabel: {
    fontSize: 30,
    color: "black",
  },
  shareButton:{
    backgroundColor: '#5CB8E4',
    padding: 7,
    borderRadius: 5,
  },
  buttonShareText:{
    color: '#FFF',
    fontSize: 22
  },
  shareFlex:{
    display: "flex",
    justifyContent: "center",
    width: "100%",
    alignItems: "flex-end",
    paddingRight: 25,
    paddingBottom: 25
  }
});

export default InitialScreen;
