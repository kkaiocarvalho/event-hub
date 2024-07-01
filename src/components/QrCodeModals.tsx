import {
  Box,
  ModalBody,
  ModalFooter,
  HStack,
  Text,
  VStack,
  useToast,
  ToastTitle,
  ToastDescription,
} from "@gluestack-ui/themed";
import { Modal } from "./Modal";
import { QK_EVENT } from "../utils/constants";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getEvent, GetEventResponse } from "../api/requests/get-event";
import { Button } from "./Button";
import { formatDateToShow } from "../utils/helpers";
import {
  manageSubscriptionEvent,
  ManageSubscriptionEventResponse,
  ManageSubscriptionEventVariables,
} from "../api/requests/manage-subscription-event";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Toast } from "@gluestack-ui/themed";
import type {
  InvalidDataSchemaResponse,
  RequestErrorWithMessage,
  RequestErrorSchema,
} from "../config/request";

enum ModalTitle {
  SUCCESS = "Sucesso!",
  ERROR = "Ocorreu um erro!",
  NOT_REGISTERED = "Não inscrito",
}

enum ModalMessage {
  SUCCESS = "CheckIn realizado.",
  ERROR = "Houve um erro ao realizar o CheckIn.",
  NOT_REGISTERED = "Informações do Evento:",
}

enum ModalButtonText {
  SUCCESS = "Fechar",
  ERROR = "Tentar novamente",
  NOT_REGISTERED = "Se inscrever",
}

type ModalInfo = {
  isOpen: boolean;
  type: "SUCCESS" | "ERROR" | "NOT_REGISTERED";
};

type QrCodeModalsProps = {
  modalInfo: ModalInfo;
  handleMutationQrCode: () => void;
  onClose: () => void;
  modalExtraData?: string | null;
  eventId?: number | null;
};

export function QrCodeModals({
  modalInfo,
  handleMutationQrCode,
  onClose,
  modalExtraData,
  eventId,
}: QrCodeModalsProps) {
  const configToast = useToast();
  const insets = useSafeAreaInsets();
  const eventQuery = useQuery({
    queryKey: [QK_EVENT, eventId],
    queryFn: () => getEvent({ eventId: eventId! }),
    enabled: !!eventId,
  });

  const event = eventQuery.data as GetEventResponse | undefined;

  const manageSubscriptionEventMutation = useMutation({
    mutationFn: manageSubscriptionEvent,
    onSuccess(response) {
      configToast.closeAll();
      configToast.show({
        placement: "top",
        render: () => {
          return (
            <Toast action="success" variant="accent" top={insets.top}>
              <VStack space="xs">
                <ToastTitle>Sucesso</ToastTitle>
                <ToastDescription>
                  {
                    (response as ManageSubscriptionEventResponse)
                      .statusInscricaoEvento
                  }{" "}
                  com sucesso!
                </ToastDescription>
              </VStack>
            </Toast>
          );
        },
      });
      handleMutationQrCode();
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
                  {message ?? "Erro ao interagir com evento"}
                </ToastDescription>
              </VStack>
            </Toast>
          );
        },
      });
    },
  });

  const handleEventInteract = () => {
    if (!event) return;
    const body: ManageSubscriptionEventVariables = {
      cdRegistroEvento: event.cdRegistroEvento,
      tipoSolicitacao: "INSCREVER",
    };
    manageSubscriptionEventMutation.mutate(body);
  };

  const handleOnClose = () => {
    onClose();
  };

  return (
    <Modal
      isOpen={modalInfo.isOpen}
      title={ModalTitle[modalInfo.type]}
      withCloseButton
      onClose={handleOnClose}
    >
      <ModalBody>
        <Box>
          <Box flex={1} gap="$4">
            <Text>{ModalMessage[modalInfo.type]}</Text>
            {modalExtraData && <Text>{modalExtraData}</Text>}
            {event && modalInfo.type === "NOT_REGISTERED" ? (
              <VStack gap="$2">
                <Text>Nome: {event.nomeEvento}</Text>
                <Text>Descrição: {event.complementoEvento}</Text>
                <Text>
                  Encerramento:{" "}
                  {formatDateToShow(event.dtEncerramento, { withTime: true })}
                </Text>
              </VStack>
            ) : null}
          </Box>
        </Box>
      </ModalBody>
      <ModalFooter>
        <HStack flex={1} justifyContent="space-between" alignItems="center">
          <Button
            action={
              modalInfo.type === "NOT_REGISTERED" ? "positive" : "primary"
            }
            p="$4"
            h="$16"
            flex={1}
            text={ModalButtonText[modalInfo.type]}
            isDisabled={manageSubscriptionEventMutation.isPending}
            onPress={() => {
              if (modalInfo.type === "NOT_REGISTERED") {
                handleEventInteract();
                return;
              }
              handleOnClose();
            }}
            iconSize={18}
          />
        </HStack>
      </ModalFooter>
    </Modal>
  );
}
