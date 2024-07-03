import React, { useState, useEffect } from "react";
import {
  CameraView,
  Camera,
  PermissionStatus,
  BarcodeScanningResult,
} from "expo-camera";
import { Center, Spinner, Text } from "@gluestack-ui/themed";
import { Button } from "../components/Button";
import { View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ScannerOverlay } from "../components/ScannerOverlay";
import { qrCodeCheckIn } from "../api/requests/qr-code-check-in";
import type { QrCodeCheckInVariables } from "../api/requests/qr-code-check-in";
import { Background } from "../components/Background";
import { useMutation } from "@tanstack/react-query";
import type {
  InvalidDataSchemaResponse,
  RequestErrorWithMessage,
  RequestErrorSchema,
  RuleErrorSchemaResponse,
} from "../config/request";
import { QrCodeModals } from "../components/QrCodeModals";

export function QRCode() {
  const [isLoading, setIsLoading] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const [eventId, setEventId] = useState<number | null>(null);
  const [body, setBody] = useState<QrCodeCheckInVariables | null>(null);
  const [modalExtraData, setModalExtraData] = useState<null | string>(null);
  const [modalInfo, setModalInfo] = useState<{
    isOpen: boolean;
    type: "SUCCESS" | "ERROR" | "NOT_REGISTERED";
  }>({
    isOpen: false,
    type: "ERROR",
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
      setModalInfo({
        isOpen: true,
        type: "SUCCESS",
      });
    },
    onError(error: RequestErrorSchema, variables) {
      if (
        (error as RuleErrorSchemaResponse)?.enumError ===
        "ERRO_PARTICIPANTE_NAO_ENCONTRADO"
      ) {
        setEventId(variables.cdRegistroEvento);
        setModalInfo({
          isOpen: true,
          type: "NOT_REGISTERED",
        });
        return;
      }
      const message =
        (error as RequestErrorWithMessage)?.message ||
        (error as InvalidDataSchemaResponse)?.errors?.join(", ");
      message && setModalExtraData(message);
      setModalInfo({
        isOpen: true,
        type: "ERROR",
      });
    },
    onSettled() {
      setIsLoading(false);
    },
  });

  const handleMutationQrCode = () => {
    if (body) {
      qrCodeCheckInMutation.mutate(body);
    }
  };

  const handleBarCodeScanned = async (scanner: BarcodeScanningResult) => {
    setIsLoading(true);
    const { data } = scanner;
    setScanned(true);
    const { cdRegistroEvento, chaveQRCode, cpfParticipante } = JSON.parse(data);
    const scannerBody: QrCodeCheckInVariables = {
      cdRegistroEvento,
      tipoSolicitacao: "CHECKIN",
      formaSolicitacao: "QRCODE",
      chaveQRCode,
      cpfParticipante,
    };
    setBody(scannerBody);
    handleMutationQrCode();
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
      <QrCodeModals
        modalInfo={modalInfo}
        handleMutationQrCode={handleMutationQrCode}
        onClose={() => {
          setModalInfo({ isOpen: false, type: "ERROR" });
          setScanned(false);
        }}
        modalExtraData={modalExtraData}
        eventId={eventId}
      />
      <CameraView
        style={{ flex: 1 }}
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ["qr", "pdf417"],
        }}
      />
      <ScannerOverlay />
      {isLoading ? (
        <Center
          position="absolute"
          w="$full"
          h="$full"
          zIndex={100}
          bg="$black"
          opacity="$90"
        >
          <Spinner size={45} />
        </Center>
      ) : scanned ? (
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
      ) : null}
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
