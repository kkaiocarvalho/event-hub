import {
  VStack,
  CloseCircleIcon,
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogContent,
  AlertDialogBody,
  AlertDialogFooter,
  Heading,
  ButtonGroup,
  CloseIcon,
  AlertDialogCloseButton,
  AlertDialogHeader,
  Icon,
  Text,
  useToast,
  Toast,
  ToastTitle,
  ToastDescription,
} from "@gluestack-ui/themed";
import { Button } from "./Button";
import type {
  InvalidDataSchemaResponse,
  RequestErrorWithMessage,
  RequestErrorSchema,
} from "../config/request";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QK_EVENT } from "../utils/constants";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  cancelEvent,
  CancelEventResponse,
  CancelEventVariables,
} from "../api/requests/cancel-events";
import { Input } from "./Input";
import { useUserAndEventRelationship } from "../hook/useUserAndEventRelationship";
import { Event } from "../api/types";

type CancelEventButtonProps = {
  event: Event;
};

type FormValues = {
  reason: string;
};

const schema = yup.object({
  reason: yup
    .string()
    .min(4, "Pelo menos 4 caracteres")
    .max(255, "Não mais de 255 caracteres")
    .required('"Motivo" é obrigatório'),
});

export function CancelEventButton({ event }: CancelEventButtonProps) {
  const [showAlertDialog, setShowAlertDialog] = useState(false);
  const configToast = useToast();
  const insets = useSafeAreaInsets();
  const { canInteractWithEvent } = useUserAndEventRelationship(event);
  const queryClient = useQueryClient();

  const cancelEventMutation = useMutation({
    mutationFn: cancelEvent,
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
                  {(response as CancelEventResponse).message}
                </ToastDescription>
              </VStack>
            </Toast>
          );
        },
      });
      setShowAlertDialog(false);
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
                  {message ?? "Erro ao cancelar evento"}
                </ToastDescription>
              </VStack>
            </Toast>
          );
        },
      });
    },
  });

  const submit = (data: FormValues) => {
    const body: CancelEventVariables = {
      cdRegistroEvento: event.cdRegistroEvento,
      motivoCancelamentoEvento: data.reason,
    };
    cancelEventMutation.mutate(body);
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: yupResolver(schema) });

  return (
    <>
      <AlertDialog
        isOpen={showAlertDialog}
        onClose={() => {
          setShowAlertDialog(false);
        }}
      >
        <AlertDialogBackdrop />
        <AlertDialogContent>
          <AlertDialogHeader>
            <Heading size="lg" color="$error500">
              Cencelar Evento
            </Heading>
            <AlertDialogCloseButton>
              <Icon as={CloseIcon} />
            </AlertDialogCloseButton>
          </AlertDialogHeader>
          <AlertDialogBody>
            <VStack gap={2}>
              <Text size="md" color="$background" fontWeight="$bold">
                Evento: {event?.nomeEvento}
              </Text>
              <Text size="sm">
                Ao realizar essa ação seu evento será excluído e não poderá ser
                reativado.
              </Text>
              <Input
                color="$background"
                bgColor="transparent"
                placeholder="Motivo do cancelamento"
                label="Motivo:"
                subtitleProps={{ color: "$background", fontWeight: "$bold" }}
                inputName="reason"
                control={control}
                errorMessage={errors.reason?.message}
              />
            </VStack>
          </AlertDialogBody>
          <AlertDialogFooter>
            <ButtonGroup space="lg">
              <Button
                variant="outline"
                text="Fechar"
                action="secondary"
                h="$12"
                flex={1}
                onPress={() => {
                  setShowAlertDialog(false);
                }}
              />
              <Button
                action="negative"
                text="Confirmar"
                flex={1}
                h="$12"
                isLoading={cancelEventMutation.isPending}
                onPress={() => handleSubmit(submit)()}
              />
            </ButtonGroup>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <Button
        flex={1}
        text={canInteractWithEvent ? "Cancelar" : "Cancelado ou Finalizado"}
        onPress={() => setShowAlertDialog(true)}
        iconSize={24}
        rightIcon={CloseCircleIcon}
        isDisabled={!canInteractWithEvent}
        action={canInteractWithEvent ? "negative" : "secondary"}
      />
    </>
  );
}
