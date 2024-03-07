import { View, Text, StyleSheet, Pressable, Keyboard, TouchableOpacity} from 'react-native'
import React from 'react';
import { Button, TextInput, Provider as PaperProvider } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { StackTypes } from '../../routes/stack';

import theme from '../../components/theme/theme';

const Register = () => {

    const navigation = useNavigation<StackTypes>();

    const [nome, setNome] = React.useState("");
    const [cpf, setCpf] = React.useState("");
    const [telefone, setTelefone] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
  

  return (
    <PaperProvider theme={theme}>
    <Pressable onPress={Keyboard.dismiss} style={styles.viewStyle}>

    <TextInput style={styles.textInput}
      label="Nome Completo"
      value={nome}
      onChangeText={nome => setNome(nome)}
      mode='outlined'
      outlineColor="transparent"
    />

    <TextInput style={styles.textInput}
      label="CPF"
      value={cpf}
      onChangeText={cpf => setCpf(cpf)}
      mode='outlined'
      outlineColor="transparent"
    />

  <TextInput style={styles.textInput}
      label="Telefone"
      value={telefone}
      onChangeText={telefone => setTelefone(telefone)}
      mode='outlined'
      outlineColor="transparent"
    />

    <TextInput
      style={styles.textInput}
      label="Email"
      value={email}
      onChangeText={email => setEmail(email)}
      mode='outlined'
      outlineColor="transparent"
    />

    <TextInput style={styles.textInput}
      label="Senha"
      value={password}
      onChangeText={password => setPassword(password)}
      mode='outlined'
      secureTextEntry={true}
      outlineColor="transparent"
    />

  <TouchableOpacity 
    style={styles.buttonRegister}
    onPress={() => {navigation.navigate("Register");}}
    >
    <Text style={styles.buttonLabel}>Finalizar Cadastro</Text>
  </TouchableOpacity>


    </Pressable>
    </PaperProvider>
  )
}

const styles = StyleSheet.create({
  viewStyle: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: "#313131"
  },
  textInput: {
    width: 250,
    height: 30,
    marginBottom: 10,
    paddingVertical: 10,
    marginTop: 5,   
  },
  buttonRegister:{
    //fontFamily: 'Barlow_500Medium',
    backgroundColor: "#c1ff72",
    color: "black",
    marginBottom: 20,
    marginTop:50,
    borderRadius: 5,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center', 
    height:50,
    width:250
  },
  textTop:{
    //fontFamily: 'Barlow_700Bold',
    fontSize: 25,
    color:"white"
  },
  buttonLabel: {
   //fontFamily: 'Barlow_500Medium',
    fontSize: 30,
    color: "black",
  }
});

export default Register;