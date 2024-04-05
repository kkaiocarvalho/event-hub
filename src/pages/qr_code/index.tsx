import React, { useState, useEffect, useRef } from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';

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
    <View style={styles.container}>
      {cameraOn && ( // Renderizar o componente da câmera apenas se cameraOn for true
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
      {scanned && (
        <TouchableOpacity style={styles.button} onPress={() => { setScanned(false); setCameraOn(true); }}>
          <Text style={styles.buttonText}>Scan Again</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraContainer: {
    height: 300,
    width: 300,
    overflow: 'hidden',
    borderRadius: 20,
    marginBottom: 20
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
