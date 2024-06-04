import React, { useState, useEffect } from "react";
import {
  CameraView,
  Camera,
  PermissionStatus,
  BarcodeScanningResult,
} from "expo-camera";
import { Center, Text } from "@gluestack-ui/themed";
import { Button } from "../components/Button";
import { View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ScannerOverlay } from "../components/ScannerOverlay";

export function QRCode() {
  const [showCamera, setShowCamera] = useState(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  //TODO: timeout to off camera
  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === PermissionStatus.GRANTED);
    };

    getCameraPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }: BarcodeScanningResult) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return !showCamera ? (
    <View style={{ flex: 1 }}>
      <CameraView
        style={{ flex: 1 }}
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ["qr", "pdf417"],
        }}
      />
      <ScannerOverlay />
      {scanned && (
        <Center
          position="absolute"
          w="$full"
          h="$full"
          zIndex={100}
          bg="$black"
          opacity="$90"
        >
          <Button
            opacity={1}
            text="Reescanear"
            onPress={() => setScanned(false)}
            rightIcon={() => (
              <MaterialCommunityIcons
                name="camera-retake"
                size={24}
                color="#FFF"
                style={{ marginLeft: 10 }}
              />
            )}
          />
        </Center>
      )}
    </View>
  ) : (
    <Center flex={1} bgColor="$background">
      <Button
        text="Abrir câmera"
        onPress={() => setShowCamera(true)}
        rightIcon={() => (
          <MaterialCommunityIcons name="camera" size={24} color="#FFF" />
        )}
      />
    </Center>
  );
}
