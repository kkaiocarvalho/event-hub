import React from 'react';
import { View, Text, StyleSheet, Pressable, Keyboard, TouchableOpacity, } from 'react-native';
import { TextInput, Provider as PaperProvider } from 'react-native-paper';
import {SvgXml} from 'react-native-svg'
import { LinearGradient } from 'expo-linear-gradient';

import { useNavigation } from '@react-navigation/native';
import { StackTypes } from '../../routes/stack';

import { useForm } from "react-hook-form";

import theme from '../../components/theme/theme';
import logo from '../../components/theme/logo';

import { AntDesign } from '@expo/vector-icons';

const Login = () => {

  const navigation = useNavigation<StackTypes>();
  const { register, handleSubmit, setValue } = useForm();

  React.useEffect(() => {
    register('email');
    register('password');
  }, [register]);

  const onSubmit = data => {
    console.log(data);
    navigation.navigate("MyBottomTabs");
  };

  return (
    <PaperProvider theme={theme}>
      <Pressable onPress={Keyboard.dismiss} style={styles.viewStyle}>
      <LinearGradient colors={['rgba(0, 255, 224, 1)', 'rgba(97, 0, 255, 1)']} 
        start={{x: 1, y: 1}}
        end={{x: 0.8, y: 0.8}}
        locations={[1,1]}
      style={styles.viewCardBack}>
        <LinearGradient colors={['rgba(255, 255, 255, 0.3)', 'rgba(146, 146, 146, 0.1)', 'rgba(49, 49, 49, 0.0)']}  style={styles.viewLogin}>
          <SvgXml xml={logo} />
          <TextInput
            style={styles.textInput}
            label="Email"
            onChangeText={text => setValue('email', text)}
            mode='outlined'
            outlineColor="transparent"
          />

          <TextInput
            style={styles.textInput}
            label="Senha"
            onChangeText={password => setValue('password', password)}
            mode='outlined'
            outlineColor="transparent"
          />

          <TouchableOpacity
            style={styles.buttonLogin}
            onPress={handleSubmit(onSubmit)}
          >
            <Text style={styles.buttonLabel}>Entrar</Text>
            <AntDesign name="right" size={24} color="black" />
          </TouchableOpacity>
        </LinearGradient>
        </LinearGradient>
      </Pressable>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  viewStyle: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: "#222222"
  },
  viewLogin: {
    width: "95%",
    height:"100%",
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 60,
    zIndex: 1,
    position: "relative",
    marginBottom: 20,
    padding: 40,
    borderBottomLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 35,
    borderTopLeftRadius: 35,
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
  imageBackground: {
    width: '50%',
    height: 150,
  },
  textInput: {
    width: 250,
    height: 30,
    paddingVertical: 10, 
    marginBottom: 20,
    marginTop: 10,
  },
  buttonLogin: {
    backgroundColor: "#00FFE0",
    marginTop: 20,
    borderRadius: 5,
    padding: 0,
    width: 150,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10
  },
  textTop: {
    fontSize: 25,
    color: "white",
  },
  buttonLabel: {
    fontSize: 30,
    color: "black",
  }
});

export default Login;
