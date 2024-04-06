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
        <LinearGradient colors={['#FFFA', '#606060', '#222222']}  style={styles.viewLogin}>
          <SvgXml xml={logo} />
          <View style={styles.card}/>
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
          </TouchableOpacity>
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
    width: "90%",
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 60,
    zIndex: -1,
    position: "relative",
    marginBottom: 30,
    borderRadius: 10,
    padding: 40,
  },
  imageBackground: {
    width: '50%',
    height: 150,
  },
  card:{

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
    width: 100,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
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
