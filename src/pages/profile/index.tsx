import React from 'react';
import { View, Text, StyleSheet, Pressable, Keyboard, Vibration, TouchableOpacity } from 'react-native';
import { Provider as PaperProvider, TextInput } from 'react-native-paper';
import { SvgXml } from 'react-native-svg';

import theme from '../../components/theme/theme';

const Profile = () => {

  const svgImagebackground = `<svg width="360" height="505" viewBox="0 0 360 505" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M231.438 65.494C225.37 44.6207 211.916 26.6016 193.53 14.7262C175.144 2.85089 153.054 -2.0887 131.291 0.809206C109.529 3.70711 89.5457 14.2492 74.9901 30.5111C60.4344 46.7729 52.277 67.6699 52.0069 89.3871C51.7369 111.104 59.3723 132.193 73.5192 148.804C87.6661 165.415 107.381 176.44 129.065 179.867C150.749 183.293 172.955 178.892 191.631 167.468C210.306 156.043 224.205 138.357 230.789 117.637L143.5 90.5L231.438 65.494Z" fill="#26EB80"/>
  <rect x="267" y="505" width="248" height="224" rx="38" transform="rotate(180 267 505)" fill="#26EB80"/>
  <path d="M91.2858 216.584C118.47 184.001 168.53 184.001 195.714 216.584L250.656 282.438C271.704 307.666 271.704 344.334 250.656 369.562L195.714 435.416C168.53 467.999 118.47 467.999 91.2858 435.416L36.3442 369.562C15.2964 344.334 15.2964 307.666 36.3442 282.438L91.2858 216.584Z" fill="#26EB80"/>
  <ellipse cx="287" cy="186" rx="25" ry="79" fill="#26EB80"/>
  <ellipse cx="286.5" cy="185.5" rx="73.5" ry="24.5" fill="#26EB80"/>
  <ellipse cx="165" cy="50" rx="7" ry="8" fill="#363434"/>
  </svg>
  `;
  
  const handlePressIn = () => {
    Vibration.vibrate();
  };
  
  return (
    <PaperProvider theme={theme}>
      <Pressable onPress={Keyboard.dismiss} style={styles.viewStyle}>
        {/*<SvgXml xml={svgImagebackground} style={styles.background} />*/}
        <View style={styles.cardInfo}>
          {/* Seu conteúdo do card aqui */}

          <TouchableOpacity onPress={handlePressIn}>
            <TextInput
            style={styles.textInput}
            label="Nome"
            mode='outlined'
            outlineColor="transparent"
            disabled
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={handlePressIn}>
            <TextInput
            style={styles.textInput}
            label="CPF"
            mode='outlined'
            outlineColor="transparent"
            disabled
            />
          </TouchableOpacity>

        <TouchableOpacity onPress={handlePressIn}>
          <TextInput
            style={styles.textInput}
            label="E-mail"
            mode='outlined'
            outlineColor="transparent"
            disabled
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={handlePressIn}>
          <TextInput
            style={styles.textInput}
            label="Telefone"
            mode='outlined'
            outlineColor="transparent"
            disabled
          />
        </TouchableOpacity>

        <Text style={styles.description}>Essas são as sua informações</Text>
        </View>
      </Pressable>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  viewStyle: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: "#313131",
    position: 'relative',
  },
  background: {
    position: 'absolute',
    top: 150,
    left: 10,
    zIndex: -1,
    width: '100%', // Largura total
    height: '100%', // Altura total
  },
  cardInfo: {
    position: "relative",
    top: 30,
    marginBottom: 60,
    width: "95%",
    backgroundColor: "rgba(255, 255, 255, 0.7)", /* Branco com 50% de opacidade */
    zIndex: 1,
    borderRadius: 10,
    padding: 40,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },
  title: {
    fontSize: 50,
    textAlign: "center",
    bottom: 100
  },
  textInput: {
    width: 250,
    height: 30,
    paddingVertical: 10, 
    marginBottom: 20,
    marginTop: 10,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },
  description:{
    fontSize: 20
  }
});

export default Profile;
