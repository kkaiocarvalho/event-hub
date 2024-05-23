import {
  Box,
  HStack,
  Text,
  VStack,
  CloseIcon,
  CheckIcon,
  AddIcon,
  SlashIcon,
  CloseCircleIcon,
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogContent,
  AlertDialogHeader,
  Heading,
  AlertDialogCloseButton,
  Icon,
  AlertDialogBody,
  AlertDialogFooter,
  Divider,
  BadgeText,
  BadgeIcon,
  GlobeIcon,
} from "@gluestack-ui/themed";
import { formatDateToShow } from "../utils/helpers";
import { Button } from "./Button";
import { } from "@gluestack-ui/themed";
import { Pressable } from "react-native";
import { useState } from "react";
import { ButtonGroup } from "@gluestack-ui/themed";
import { Input } from "./Input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import type { EventOnChangeType } from "../pages/Events";
import { EventStatus } from "../utils/constants";
import { Badge } from "@gluestack-ui/themed";
import type { Event } from "../api/requests/list-events";

type EventCardType = {
  event: Event;
  // isSubscribed: boolean;
  // showOnlyMyEvents: boolean;
  // handleOnPress: (values: EventOnChangeType) => void;
};

type FormValues = {
  reason?: string | undefined;
};

const schema = yup.object({
  reason: yup
    .string()
    .min(4, "O motivo deve ter pelo menos 4 caracteres")
    .max(255, "O motivo não pode ter mais de 255 caracteres")
    .optional(),
});

export function EventCard({
  event,
  // showOnlyMyEvents,
  // isSubscribed,
  // handleOnPress,
}: EventCardType) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    ...form
  } = useForm<FormValues>({ resolver: yupResolver(schema) });

  const isEventCanceled = event.statusEvento === EventStatus.CANCELED;
  console.log({ isEventCanceled, statusEvento: event.statusEvento, canceled: EventStatus.CANCELED })
  const [showAlertDialog, setShowAlertDialog] = useState(false);

  const getAction = () =>
    // showOnlyMyEvents ?
    isEventCanceled
      ? "secondary"
      : "negative"
  // : isSubscribed
  // ? "positive"
  // : "primary";

  const getIcon = () =>
    // showOnlyMyEvents ?
    isEventCanceled
      ? CloseCircleIcon
      : SlashIcon
  // : isSubscribed
  // ? CheckIcon
  // : AddIcon;

  // ===> FLUXO
  // meus eventos:
  // posição 0 = ao clicar deve abrir dialog para fechar o evento
  // posição 1 = fechado não tem como interagir

  // todos os eventos:
  // posição 0 = não inscrito, ao clicar deve se inscrever no evento
  // posição 1 = inscrito, ao clicar deve abrir dialog para se desiscrever

  const submit = (data: FormValues) => {
    console.log({ data })
    // if (showOnlyMyEvents && !data) return;
    // handleOnPress({
    //   event,
    //   type: showOnlyMyEvents ? "creator" : "user",
    //   options: {
    //     ...(showOnlyMyEvents && { reason: data.reason }),
    //     operation: isSubscribed ? "unsubscribe" : "subscribe",
    //   },
    // });
    // showAlertDialog && setShowAlertDialog(false);
  };

  const handleConfirmDialog = () => {
    console.log("handleConfirmDialog")
    // if (showOnlyMyEvents && !form.getValues("reason")) {
    //   form.setError("reason", { message: '"Motivo" é obrigatório' });
    //   return;
    // }
    // handleSubmit(submit)();
  };

  const handlePressEventCard = () => {
    console.log("Handle press event card")
    // (showOnlyMyEvents && !isEventClosed) || isSubscribed
    //   ? setShowAlertDialog(true)
    //   : handleSubmit(submit)();
  };

  console.log({ event: event.statusParticipacao });

  const showOnlyMyEvents = false;

  return (
    <Pressable onLongPress={() => alert("Socorro")}>
      {/*Pressione para ver os detalhes = onLongPress*/}
      <HStack
        alignItems="flex-start"
        gap={5}
        w="90%"
        bgColor="$lightBackground"
        borderRadius="$md"
        p="$1"
      >
        <AlertDialog
          isOpen={showAlertDialog}
          onClose={() => {
            setShowAlertDialog(false);
          }}
        >
          <AlertDialogBackdrop />
          <AlertDialogContent>
            <AlertDialogHeader>
              <Heading size="lg">
                Cencelar {showOnlyMyEvents ? "Evento" : "Inscrição"}
              </Heading>
              <AlertDialogCloseButton>
                <Icon as={CloseIcon} />
              </AlertDialogCloseButton>
            </AlertDialogHeader>
            <AlertDialogBody>
              <VStack gap={2}>
                <Text size="md">Evento: {event.nomeEvento}</Text>
                <Text size="sm">
                  Ao realizar essa ação seu{" "}
                  {showOnlyMyEvents ? "evento" : "ingresso"} será excluído{" "}
                  {showOnlyMyEvents
                    ? "e não poderá ser reativado."
                    : "e sua entrada não poderá ser validada."}
                </Text>
                {showOnlyMyEvents ? (
                  <Input
                    placeholder="Motivo do cancelamento"
                    label="Motivo"
                    inputName="reason"
                    control={control}
                    errorMessage={errors.reason?.message}
                  />
                ) : null}
              </VStack>
            </AlertDialogBody>
            <AlertDialogFooter>
              <ButtonGroup space="lg">
                <Button
                  variant="outline"
                  action="secondary"
                  text="Fechar"
                  flex={1}
                  onPress={() => {
                    setShowAlertDialog(false);
                  }}
                />
                <Button
                  action="negative"
                  text="Confirmar"
                  flex={1}
                  onPress={handleConfirmDialog}
                />
              </ButtonGroup>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <VStack flex={1}>
          <Box
            borderRadius="$lg"
            borderWidth="$0"
            display="flex"
            alignItems="center"
            p="$1"
            w="$full"
          >
            <Text
              fontSize="$xl"
              color="$background"
              fontWeight="$bold"
              numberOfLines={1}
              isTruncated={true}
            >
              {event.nomeEvento}
            </Text>
            <Divider my="$0.5" bgColor="#000000" w="$4/5" />
          </Box>
          <Box
            borderRadius="$lg"
            borderWidth="$0"
            display="flex"
            alignItems="center"
            w="$full"
          >
            <Text fontSize="$xl" color="$background" fontWeight="$extrabold">
              {formatDateToShow(event.dtInicio)}
            </Text>
            <Divider my="$0.5" bgColor="#000000" w="$4/5" />
          </Box>
          <Box
            borderRadius="$lg"
            borderWidth="$0"
            display="flex"
            alignItems="center"
            w="$full"
          >
            <Badge size="lg" variant="outline" borderRadius="$md" action="info">
              {/* Mudar cor e icone de acordo com o status do evento */}
              <BadgeText>status evento: {event.statusEvento}</BadgeText>
              <BadgeIcon as={GlobeIcon} ml="$1" />
            </Badge>
          </Box>
          <Box
            borderRadius="$lg"
            borderWidth="$0"
            display="flex"
            alignItems="center"
            w="$full"
          >
            <Badge size="lg" variant="outline" borderRadius="$md" action="info">
              {/* Mudar cor e icone de acordo com o status do evento */}
              <BadgeText>
                status inscrição: {event.statusParticipacao}
              </BadgeText>
              <BadgeIcon as={GlobeIcon} ml="$1" />
            </Badge>
          </Box>
        </VStack>
        <VStack gap={5}>
          <HStack
            gap={5}
            flex={1}
            justifyContent="center"
            alignItems="center"
            p="$1"
          >
            <Button
              h="$12"
              w="$20"
              action={getAction()}
              iconSize={24}
              rightIcon={getIcon()}
              isDisabled={isEventCanceled}
              onPress={handlePressEventCard}
            />
          </HStack>
        </VStack>
      </HStack>
    </Pressable>
  );
}
