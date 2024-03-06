import React from 'react';
import { View, Text, StyleSheet, Pressable, Keyboard, Image, TouchableOpacity, Share} from 'react-native';
import { Button, TextInput, Provider as PaperProvider } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { StackTypes } from '../../routes/stack';
import { useFonts, Barlow_400Regular, Barlow_500Medium, Barlow_600SemiBold, Barlow_700Bold } from "@expo-google-fonts/barlow";
import MyTabs from '../../routes/bottomtabs';
import Myevents from '../home/myevents';
import TopBars from '../../routes/topbars';


const onShare = async () => {
  const result = await Share.share({
      message: "Olá eu estou usando o Event HUB para gerenciar meus eventos! E confesso que estou amando o APP."
  })
}

const Login = () => {
  const [fontsLoaded] = useFonts({
    Barlow_400Regular, Barlow_500Medium, Barlow_600SemiBold, Barlow_700Bold
  });

  const navigation = useNavigation<StackTypes>();
  const [text, setText] = React.useState("");
  const [password, setPassword] = React.useState("");

  return (
    <PaperProvider theme={theme}>
      <Pressable onPress={Keyboard.dismiss} style={styles.viewStyle}>
        <View style={styles.viewLogin}>
          <Image
          source={require('../../assets/logo.png')}
          style={styles.imageBackground}
          resizeMode="cover"
          />
        
          <TextInput
            style={styles.textInput}
            label="Email"
            value={text}
            onChangeText={text => setText(text)}
            mode='outlined'
            outlineColor="transparent"
          />

          <TextInput
            style={styles.textInput}
            label="Senha"
            value={password}
            onChangeText={password => setPassword(password)}
            mode='outlined'
            outlineColor="transparent"
          />

          <TouchableOpacity
            style={styles.buttonLogin}
            onPress={() => {navigation.navigate("Home");}}
          >
            <Text style={styles.buttonLabel}>Entrar</Text>
          </TouchableOpacity>
        </View>


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
    alignItems: 'center',
    backgroundColor: "#313131"
  },
  viewLogin: {
    width: "100%",
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 150
  },
  imageBackground: {
    width: '50%',
    height: 150,
  },
  textInput: {
    width: 250,
    height: 30,
    paddingVertical: 10, // Adicionar espaço vertical interno
    marginBottom: 20,
    marginTop: 10,
  },
  button: {
    backgroundColor: "#c1ff72",
    color: "black",
    width: 250,
    borderWidth: 0, // Definir a largura da borda como 0 para torná-la transparente
  },
  buttonLogin: {
    backgroundColor: "#26eb80",
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

export default Login;
