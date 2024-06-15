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
import { qrCodeCheckIn } from "../api/requests/qr-code-check-in";
import type { QrCodeCheckInVariables } from "../api/requests/qr-code-check-in";
import { CustomAlertDialog } from "../components/AlertCheckIn";
import { Background } from "../components/Background";
import { useMutation } from "@tanstack/react-query";
import type {
  InvalidDataSchemaResponse,
  RequestErrorWithMessage,
  RequestErrorSchema,
} from "../config/request";

export function QRCode() {
  const [showCamera, setShowCamera] = useState(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);

  const [alertInfo, setAlertInfo] = useState({
    isOpen: false,
    title: "",
    message: "",
  });

  const getCameraPermissions = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasPermission(status === PermissionStatus.GRANTED);
  };

  useEffect(() => {
    getCameraPermissions();
  }, []);

  const qrCodeCheckInMutation = useMutation({
    mutationFn: qrCodeCheckIn,
    onSuccess() {
      setAlertInfo({
        isOpen: true,
        title: "Success",
        message: "Check-in realizado com sucesso!",
      });
    },
    onError(error: RequestErrorSchema) {
      const message =
        (error as RequestErrorWithMessage)?.message ||
        (error as InvalidDataSchemaResponse)?.errors.join(", ");
      setAlertInfo({
        isOpen: true,
        title: "Error",
        message:
          message ?? "Erro ao realizar check-in. Por favor, tente novamente.",
      });
    },
  });

  const handleBarCodeScanned = async (scanner: BarcodeScanningResult) => {
    const { data } = scanner;
    setScanned(true);
    const { cdRegistroEvento, chaveQRCode, cpfParticipante } = JSON.parse(data);
    const body: QrCodeCheckInVariables = {
      cdRegistroEvento,
      tipoSolicitacao: "CHECKIN",
      formaSolicitacao: "QRCODE",
      chaveQRCode,
      cpfParticipante,
    };

    qrCodeCheckInMutation.mutate(body);
  };

  if (hasPermission === null) {
    return (
      <Background>
        <Center flex={1}>
          <Text color="$textColor">Requisitando acesso a câmera</Text>
        </Center>
      </Background>
    );
  }
  if (hasPermission === false) {
    //TODO: make request access work
    return (
      <Background>
        <Center flex={1} gap={15}>
          <Text color="$textColor">Sem acesso a câmera</Text>
          <Button
            onPress={() => getCameraPermissions()}
            text="Solicitar Acesso"
          />
        </Center>
      </Background>
    );
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
      <CustomAlertDialog
        isOpen={alertInfo.isOpen}
        onClose={() => setAlertInfo({ ...alertInfo, isOpen: false })}
        title={alertInfo.title}
        message={alertInfo.message}
      />
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
