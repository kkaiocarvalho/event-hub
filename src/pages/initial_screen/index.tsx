import React from 'react';
import { View, Text, StyleSheet, Pressable, Keyboard, Image, TouchableOpacity, Share} from 'react-native';
import {  Provider as PaperProvider } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { StackTypes } from '../../routes/stack';

import { LinearGradient } from 'expo-linear-gradient';

import {SvgXml} from 'react-native-svg'

import theme from '../../components/theme/theme';
import logo from '../../components/theme/logo';
import { AntDesign } from '@expo/vector-icons';

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
        <LinearGradient colors={['rgba(0, 255, 224, 1)', 'rgba(97, 0, 255, 1)']} 
            start={{x: 1, y: 1}}
            end={{x: 0.8, y: 0.8}}
            locations={[1,1]} style={styles.viewCardBack}>
        
          <LinearGradient colors={['rgba(255, 255, 255, 0.3)', 'rgba(146, 146, 146, 0.1)', 'rgba(49, 49, 49, 0.0)']}  style={styles.viewCard}>

              <SvgXml xml={logo}/>
              <TouchableOpacity
                style={styles.buttonLogin}
                onPress={() => {navigation.navigate("Login");}}
                >
                <Text style={styles.buttonLabel}>LOGIN</Text>
                <AntDesign name="user" size={24} color="black" />
              </TouchableOpacity>

                <Text style={styles.textORbuttons}>OR</Text>

              <TouchableOpacity
                style={styles.buttonCadastrar}
                onPress={() => {navigation.navigate("Register");}}
                >
                <Text style={styles.buttonLabel}>CADASTRAR</Text>
                <AntDesign name="plus" size={24} color="black" />
              </TouchableOpacity>
            
            </LinearGradient>
        
            <View style={styles.shareFlex}>
            <TouchableOpacity 
              style={styles.shareButton} onPress={onShare}>
              <Text style={styles.buttonShareText}>Share</Text>
              <AntDesign name="link" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </LinearGradient>
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
  viewCardBack: {
    width: "100%",
    height:"100%",
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    zIndex: -1,
    position: "relative",
  },
  viewCard: {
    width: "95%",
    height:"100%",
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
    zIndex: 1,
    position: "relative",
    marginBottom: 20,
    padding: 40,
    borderBottomLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 35,
    borderTopLeftRadius: 35,
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
    flexDirection: 'row',
    gap: 10
  },
  buttonCadastrar: {
    backgroundColor: "#00FFE0",
    borderRadius: 5,
    padding: 0,
    width: 200,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10
  },
  buttonLabel: {
    fontSize: 30,
    color: "black",
  },
  shareButton:{
    backgroundColor: '#6100FF',
    padding: 7,
    borderRadius: 5,
    flexDirection: 'row',
    gap: 10,
    width: 100
  },
  buttonShareText:{
    color: '#FFF',
    fontSize: 22,
    flexDirection: 'row'
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
