import { Text, Center, Box } from "@gluestack-ui/themed";
import { Background } from "../components/Background";
import { Button } from "../components/Button";
import React, { useState, useEffect, useRef } from 'react';
import { Camera } from 'expo-camera';
import { View, TouchableOpacity, StyleSheet } from "react-native";

export function QRCode() {

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [cameraOn, setCameraOn] = useState(true); // Novo estado para controlar a câmera

  const cameraRef = useRef(null);

  const requestCameraPermission = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasPermission(status === 'granted');
  };

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setCameraOn(false); // Desligar a câmera após a leitura do código de barras
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  if (hasPermission === null) {
    return (
      <Box flex={1} justifyContent="center" flexDirection='column' alignItems='center'>
        <Button text='Request camera permission' onPress={requestCameraPermission} />
      </Box>
    );
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <Background>

    <Center flex={1}>
      <Text>Valide sua entrada aqui</Text>
      <Text mt="$5">Aponte sua camera para o QR-Code do evento</Text>
      <Box
      mt="$5"
        bgColor="$backgroundLogo"
        borderWidth={0}
        width="100%"
        height="48%"
        display="flex"
        justifyContent="center"
        alignItems="center"
        borderBottomLeftRadius={10}
        borderBottomRightRadius={30}
        borderTopLeftRadius={30}
        borderTopRightRadius={10}
      >
        {cameraOn && (
        <Box  h="$80" w="$72" overflow="hidden" borderRadius={20} marginBottom={20} borderBottomLeftRadius={30} borderBottomRightRadius={30} borderTopLeftRadius={30} borderTopRightRadius={30}>
          <Camera
            ref={cameraRef}
            style={{flex:1}}
            type={Camera.Constants.Type.back}
            ratio="1:1"
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          />
        </Box>
        
      )}

      </Box>

      <Button onPress={() => setCameraOn(!cameraOn)} text={cameraOn ? 'Desligar Câmera' : 'Ligar Câmera'} mt="$5" />
      {scanned && (
        <Button onPress={() => { setScanned(false); setCameraOn(true); }} text='Scan again' mt="$5" />
      )}
    </Center>

    </Background>
  );
}
