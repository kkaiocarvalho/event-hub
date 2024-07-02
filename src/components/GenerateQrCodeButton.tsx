import {
  ModalBody,
  ModalFooter,
  CopyIcon,
  Box,
  HStack,
  Spinner,
  useToast,
  Toast,
  VStack,
  ToastTitle,
  ToastDescription,
  ButtonGroup,
} from "@gluestack-ui/themed";
import {
  QrCodeGenerateResponse,
  QrCodeGenerateVariables,
  qrCodeGenerate,
} from "../api/requests/qr-code-generate";
import {
  InvalidDataSchemaResponse,
  RequestErrorWithMessage,
  RequestErrorSchema,
} from "../config/request";
import { Button } from "./Button";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QK_EVENT } from "../utils/constants";
import { GetEventResponse } from "../api/requests/get-event";
import { Modal } from "../components/Modal";
import { Image } from "react-native";
import * as Clipboard from "expo-clipboard";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useUserAndEventRelationship } from "../hook/useUserAndEventRelationship";
import { Text } from "@gluestack-ui/themed";
import { Event } from "../api/types";

type GenerateQrCodeButtonProps = {
  event: Event;
};

export function GenerateQrCodeButton({ event }: GenerateQrCodeButtonProps) {
  const insets = useSafeAreaInsets();
  const configToast = useToast();
  const [showModal, setShowModal] = useState(false);
  const [qrCode64, setQrCode64] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const { canInteractWithEvent } = useUserAndEventRelationship(event);

  const qrCodeGenerateMutation = useMutation({
    mutationFn: qrCodeGenerate,
    onSuccess(response) {
      const data = response as QrCodeGenerateResponse;
      configToast.closeAll();
      configToast.show({
        placement: "top",
        render: () => {
          return (
            <Toast action="success" variant="accent" top={insets.top}>
              <VStack space="xs">
                <ToastTitle>Sucesso</ToastTitle>
                <ToastDescription>
                  {data.mensagem ?? "QrCode gerado!"}
                </ToastDescription>
              </VStack>
            </Toast>
          );
        },
      });
      setQrCode64(data.qrcode);
      queryClient.refetchQueries({
        queryKey: [QK_EVENT, event.cdRegistroEvento],
      });
    },
    onError(error: RequestErrorSchema) {
      const message =
        (error as RequestErrorWithMessage)?.message ||
        (error as InvalidDataSchemaResponse)?.errors?.join(", ");

      configToast.closeAll();
      configToast.show({
        placement: "top",
        render: () => {
          return (
            <Toast action="error" variant="accent" top={insets.top}>
              <VStack space="xs">
                <ToastTitle>Ops!</ToastTitle>
                <ToastDescription>
                  {message ?? "Erro ao gerar codigo QR do evento."}
                </ToastDescription>
              </VStack>
            </Toast>
          );
        },
      });
    },
  });

  const generateQrCode = () => {
    if (!event) return;
    const body: QrCodeGenerateVariables = {
      cdRegistroEvento: event.cdRegistroEvento,
    };
    qrCodeGenerateMutation.mutate(body);
  };

  const handleOpenModal = () => {
    setShowModal(true);
    generateQrCode();
  };

  return (
    <>
      <Modal
        isOpen={showModal}
        title={`${qrCodeGenerateMutation.isError ? "Erro no " : ""}QR Code`}
        withCloseButton
        onClose={() => {
          setShowModal(false);
        }}
      >
        <ModalBody>
          {qrCodeGenerateMutation.isError ? (
            <Box>
              <Box flex={1} alignItems="center">
                <Text>Ocorreu um erro ao gerar o QrCode.</Text>
              </Box>
            </Box>
          ) : !qrCodeGenerateMutation.isPending && qrCode64 ? (
            <Box>
              <Box flex={1} alignItems="center">
                <Box
                  alignItems="center"
                  borderRadius="$lg"
                  borderWidth="$4"
                  overflow="hidden"
                >
                  <Image
                    source={{ uri: `data:image/png;base64,${qrCode64}` }}
                    width={240}
                    height={240}
                  />
                </Box>
              </Box>
            </Box>
          ) : (
            <Box py="$8">
              <Spinner size={45} />
            </Box>
          )}
        </ModalBody>
        <ModalFooter>
          <HStack
            flex={1}
            bgColor="$ambar300"
            justifyContent="space-between"
            alignItems="center"
          >
            {qrCodeGenerateMutation.isError ? (
              <ButtonGroup w="$full" flexDirection="column">
                <Button
                  w="$full"
                  text="Tentar novamente"
                  disabled={qrCodeGenerateMutation.isPending}
                  onPress={() => generateQrCode()}
                />
                <Button
                  w="$full"
                  text="Fechar"
                  action="secondary"
                  variant="outline"
                  onPress={() => setShowModal(false)}
                />
              </ButtonGroup>
            ) : (
              <Button
                action="primary"
                p="$4"
                h="$16"
                flex={1}
                text="Copiar"
                iconSize={18}
                rightIcon={CopyIcon}
                isDisabled={!qrCode64}
                onPress={async () => {
                  if (!qrCode64) return;
                  //TODO: fix copy to clipboard qr code in base64
                  await Clipboard.setImageAsync(
                    `data:image/png;base64,${qrCode64}`
                  ).then(() => {
                    configToast.closeAll();
                    configToast.show({
                      placement: "top",
                      render: () => {
                        return (
                          <Toast
                            action="info"
                            variant="accent"
                            top={insets.top}
                          >
                            <VStack space="xs">
                              <ToastTitle>Copiado!</ToastTitle>
                              <ToastDescription>
                                Qr Code copiado com sucesso!
                              </ToastDescription>
                            </VStack>
                          </Toast>
                        );
                      },
                    });
                  });
                  setShowModal(false);
                }}
              />
            )}
          </HStack>
        </ModalFooter>
      </Modal>
      <Button
        h="$16"
        //text="Gerar QR code"
        iconSize={24}
        onPress={handleOpenModal}
        isDisabled={!canInteractWithEvent}
        rightIcon={() => (
          <MaterialCommunityIcons
            name="qrcode"
            size={24}
            color="#F2F2F2"
            //style={{ marginLeft: 8 }}
          />
        )}
      />
    </>
  );
}
