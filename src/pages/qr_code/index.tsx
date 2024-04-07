import React, { useState, useEffect, useRef } from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import { LinearGradient } from 'expo-linear-gradient';

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [cameraOn, setCameraOn] = useState(true); // Novo estado para controlar a câmera

  const cameraRef = useRef(null);

  const requestCameraPermission = async () => {
    const { status } = await Camera.requestPermissionsAsync();
    setHasPermission(status === 'granted');
  };

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setCameraOn(false); // Desligar a câmera após a leitura do código de barras
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Button title="Request Camera Permission" onPress={requestCameraPermission} />
      </View>
    );
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <LinearGradient 
      colors={['rgba(255, 255, 255, 0.5)', 'rgba(146, 146, 146, 0.5)', 'rgba(49, 49, 49, 0.5)']}
      style={styles.container}
    >
      <Text style={styles.textScan}>Escaneie o QR-CODE</Text>

      {cameraOn && (
        <View style={styles.cameraContainer}>
          <Camera
            ref={cameraRef}
            style={styles.camera}
            type={Camera.Constants.Type.back}
            ratio="1:1"
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          />
        </View>
      )}
      <TouchableOpacity style={styles.button} onPress={() => setCameraOn(!cameraOn)}>
        <Text style={styles.buttonText}>{cameraOn ? 'Desligar Câmera' : 'Ligar Câmera'}</Text>
      </TouchableOpacity>
      {scanned && (
        <TouchableOpacity style={styles.button} onPress={() => { setScanned(false); setCameraOn(true); }}>
          <Text style={styles.buttonText}>Scan Again</Text>
        </TouchableOpacity>
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textScan:{
    fontSize: 30,
    marginBottom: 20,

  },
  cameraContainer: {
    height: 300,
    width: 300,
    overflow: 'hidden',
    borderRadius: 20,
    marginBottom: 20,
    borderBottomLeftRadius: 5,
    borderTopLeftRadius: 35,
    borderBottomRightRadius: 35,
    borderTopRightRadius: 5,
  },
  camera: {
    flex: 1,

  },
  button:{
    width: 150,
    backgroundColor: '#00FFE0',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    fontSize: 20,
    color: 'black',
    textAlign: 'center',
  },
});
