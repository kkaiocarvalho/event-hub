import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Keyboard,
  Image,
  TouchableOpacity,
  Share,
} from "react-native";
import { TextInput, Provider as PaperProvider } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { StackTypes } from "../../routes/routes";
import {
  useFonts,
  Barlow_400Regular,
  Barlow_500Medium,
  Barlow_600SemiBold,
  Barlow_700Bold,
} from "@expo-google-fonts/barlow";

import theme from "../../components/theme/theme";
import { useForm } from "react-hook-form";

type FormValues = {
  email: string;
  password: string;
};

const Login = () => {
  const form = useForm<FormValues>();
  const [fontsLoaded] = useFonts({
    Barlow_400Regular,
    Barlow_500Medium,
    Barlow_600SemiBold,
    Barlow_700Bold,
  });

  const navigation = useNavigation<StackTypes>();
  const onShare = async () => {
    const result = await Share.share({
      message:
        "Olá eu estou usando o Event HUB para gerenciar meus eventos! E confesso que estou amando o APP.",
    });
  };

  console.log(form.formState.errors);

  return (
    <PaperProvider theme={theme}>
      <Pressable onPress={Keyboard.dismiss} style={styles.viewStyle}>
        <View style={styles.viewLogin}>
          <Image
            source={require("../../assets/logo.png")}
            style={styles.imageBackground}
            resizeMode="cover"
          />

          <TextInput
            style={styles.textInput}
            label="Email"
            mode="outlined"
            outlineColor="transparent"
            {...form.register("email", {
              required: '"Email" é um campo obrigatório',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Endereço de e-mail inválido",
              },
            })}
          />

          <TextInput
            style={styles.textInput}
            label="Senha"
            mode="outlined"
            outlineColor="transparent"
            {...form.register("password", {
              required: '"Senha" é um campo obrigatório',
            })}
          />

          <TouchableOpacity
            style={styles.buttonLogin}
            onPress={() => {
              form.handleSubmit(() => navigation.navigate("MyBottomTabs"));
            }}
          >
            <Text style={styles.buttonLabel}>Entrar</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.shareFlex}>
          <TouchableOpacity style={styles.shareButton} onPress={onShare}>
            <Text style={styles.buttonShareText}>Share</Text>
          </TouchableOpacity>
        </View>
      </Pressable>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  viewStyle: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#313131",
  },
  viewLogin: {
    width: "100%",
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 150,
  },
  imageBackground: {
    width: "50%",
    height: 150,
  },
  textInput: {
    width: 250,
    height: 30,
    paddingVertical: 10,
    marginBottom: 20,
    marginTop: 10,
  },
  button: {
    backgroundColor: "#c1ff72",
    color: "black",
    width: 250,
    borderWidth: 0,
  },
  buttonLogin: {
    backgroundColor: "#26eb80",
    marginTop: 20,
    borderRadius: 5,
    padding: 0,
    width: 100,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  textTop: {
    fontSize: 25,
    color: "white",
  },
  buttonLabel: {
    fontSize: 30,
    color: "black",
  },
  shareButton: {
    backgroundColor: "#5CB8E4",
    padding: 7,
    borderRadius: 5,
  },
  buttonShareText: {
    color: "#FFF",
    fontSize: 22,
  },
  shareFlex: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    alignItems: "flex-end",
    paddingRight: 25,
    paddingBottom: 25,
  },
});

export default Login;
