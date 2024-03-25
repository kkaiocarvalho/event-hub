import {
  Text,
  StyleSheet,
  Pressable,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { TextInput, Provider as PaperProvider } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { StackTypes } from "../../routes/routes";

import theme from "../../components/theme/theme";
import { useForm } from "react-hook-form";

type FormValues = {
  name: string;
  cpf: string;
  phone: string;
  email: string;
  password: string;
};

const Register = () => {
  const navigation = useNavigation<StackTypes>();
  const form = useForm<FormValues>();

  return (
    <PaperProvider theme={theme}>
      <Pressable onPress={Keyboard.dismiss} style={styles.viewStyle}>
        <TextInput
          style={styles.textInput}
          label="Nome Completo"
          mode="outlined"
          outlineColor="transparent"
          {...form.register("name", {
            required: '"Nome" é um campo obrigatório',
          })}
        />

        <TextInput
          style={styles.textInput}
          label="CPF"
          {...form.register("cpf", {
            required: '"CPF" é um campo obrigatório',
          })}
          mode="outlined"
          outlineColor="transparent"
        />

        <TextInput
          style={styles.textInput}
          label="Telefone"
          {...form.register("phone", {
            required: '"Telefone" é um campo obrigatório',
          })}
          mode="outlined"
          outlineColor="transparent"
        />

        <TextInput
          style={styles.textInput}
          label="Email"
          {...form.register("email", {
            required: '"Email" é um campo obrigatório',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Endereço de e-mail inválido",
            },
          })}
          mode="outlined"
          outlineColor="transparent"
        />

        <TextInput
          style={styles.textInput}
          label="Senha"
          {...form.register("password", {
            required: '"Senha" é um campo obrigatório',
          })}
          mode="outlined"
          secureTextEntry={true}
          outlineColor="transparent"
        />

        <TouchableOpacity
          style={styles.buttonRegister}
          onPress={() => {
            navigation.navigate("Register");
          }}
        >
          <Text style={styles.buttonLabel}>Finalizar Cadastro</Text>
        </TouchableOpacity>
      </Pressable>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  viewStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#313131",
  },
  textInput: {
    width: 250,
    height: 30,
    marginBottom: 10,
    paddingVertical: 10,
    marginTop: 5,
  },
  buttonRegister: {
    //fontFamily: 'Barlow_500Medium',
    backgroundColor: "#c1ff72",
    color: "black",
    marginBottom: 20,
    marginTop: 50,
    borderRadius: 5,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    height: 50,
    width: 250,
  },
  textTop: {
    //fontFamily: 'Barlow_700Bold',
    fontSize: 25,
    color: "white",
  },
  buttonLabel: {
    //fontFamily: 'Barlow_500Medium',
    fontSize: 30,
    color: "black",
  },
});

export default Register;
