import {
  Box,
  HStack,
  Text,
  VStack,
  AddIcon,
  CloseCircleIcon,
  Divider,
  BadgeText,
  BadgeIcon,
  GlobeIcon,
  Toast,
  ToastTitle,
  ToastDescription,
  InfoIcon,
  ChevronRightIcon,
} from "@gluestack-ui/themed";
import { formatDateToShow } from "../utils/helpers";
import { Button } from "./Button";
import { Pressable } from "react-native";
import { useState } from "react";
import { EventStatus } from "../utils/constants";
import { Badge } from "@gluestack-ui/themed";
import type { Event } from "../api/requests/list-events";
import { useToast } from "@gluestack-ui/themed";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Icon } from "@gluestack-ui/themed";
import { LoopMiniLogo } from "./LoopMiniLogo";
import { ArrowLeftIcon } from "@gluestack-ui/themed";
import AntDesign from "@expo/vector-icons/AntDesign"

// type FormValues = {
//   reason?: string | undefined;
// };

// const schema = yup.object({
//   reason: yup
//     .string()
//     .min(4, "O motivo deve ter pelo menos 4 caracteres")
//     .max(255, "O motivo não pode ter mais de 255 caracteres")
//     .optional(),
// });

type EventCardProps = {
  event: Event;
  openEvent: (event: Event) => void;
};

export function EventCard({ event, openEvent }: EventCardProps) {
  const configToast = useToast();
  const insets = useSafeAreaInsets();
  // const {
  //   control,
  //   handleSubmit,
  //   formState: { errors },
  //   ...form
  // } = useForm<FormValues>({ resolver: yupResolver(schema) });

  const isEventActive = event.statusEvento === EventStatus.OPEN;

  const getAction = () => {
    if (!isEventActive) return "secondary";
    return "primary";
  };
  // showOnlyMyEvents ?
  // !isEventActive ? "secondary" : "negative";
  // : isSubscribed
  // ? "positive"
  // : "primary";

  const getIcon = () => {
    if (!isEventActive) return CloseCircleIcon;
    return AddIcon;
  };
  // showOnlyMyEvents ?
  // !isEventActive ? CloseCircleIcon : SlashIcon;
  // : isSubscribed
  // ? CheckIcon
  // : AddIcon;

  // const submit = (data: FormValues) => {
  //   console.log({ data });
  //   // if (showOnlyMyEvents && !data) return;
  //   // handleOnPress({
  //   //   event,
  //   //   type: showOnlyMyEvents ? "creator" : "user",
  //   //   options: {
  //   //     ...(showOnlyMyEvents && { reason: data.reason }),
  //   //     operation: isSubscribed ? "unsubscribe" : "subscribe",
  //   //   },
  //   // });
  //   // showAlertDialog && setShowAlertDialog(false);
  // };

  // const handleConfirmDialog = () => {
  //   console.log("handleConfirmDialog");
  //   // if (showOnlyMyEvents && !form.getValues("reason")) {
  //   //   form.setError("reason", { message: '"Motivo" é obrigatório' });
  //   //   return;
  //   // }
  //   // handleSubmit(submit)();
  // };

  // const handlePressEventCard = () => {
  //   console.log("Handle press event card");
  //   // (showOnlyMyEvents && !isEventClosed) || isSubscribed
  //   //   ? setShowAlertDialog(true)
  //   //   : handleSubmit(submit)();
  // };

  // console.log({ event: event.statusParticipacao });

  const showHelpMessage = () => {
    configToast.closeAll();
    configToast.show({
      placement: "top",
      render: () => {
        return (
          <Toast
            nativeID="toasts-show"
            action="info"
            variant="accent"
            top={insets.top}
          >
            <VStack space="xs">
              <HStack alignItems="center" gap="$2">
                <Icon as={InfoIcon} color="$background" />
                <ToastTitle>Dica</ToastTitle>
              </HStack>
              <ToastDescription>
                Pressione o card para abrir os detalhes do evento!
              </ToastDescription>
            </VStack>
          </Toast>
        );
      },
    });
  };

  return (
    <Pressable
      onLongPress={() => {
        configToast.closeAll();
        openEvent(event);
      }}
      onPress={() => showHelpMessage()}
    >

      <HStack
        alignItems="flex-start"
        gap={5}
        flex={1}
        bgColor="$lightBackground"
        borderRadius="$md"
        p="$2"
        borderLeftWidth={6}
        borderLeftColor="#038c8c" // você pode trocar a cor conforme necessário
      >
        <VStack flex={1}>
          <Box
            borderRadius="$lg"
            borderWidth="$0"
            display="flex"
            alignItems="baseline"
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
          </Box>

          <HStack>
            <Box flexDirection="row" flex={1} alignItems="center" justifyContent="space-between">
              <HStack  gap={4} >
              <Badge size="sm" variant="outline" borderRadius="$md" action="info" >
                <BadgeText>{event.statusEvento}</BadgeText>
              </Badge>
              <Badge size="sm" variant="outline" borderRadius="$md" action="info">
                <BadgeText>
                  {event.statusParticipacao}
                </BadgeText>
              </Badge>
              </HStack>
             
              <Text fontSize="$xl" color="$background" fontWeight="$extrabold">
                {formatDateToShow(event.dtInicio)}
              </Text>

              {/*<Box // box de um badge esquesito
            flex={1}
            borderRadius="$sm"
            borderWidth="$0"
            alignItems="baseline"
            w="$full"
          >
            <Badge size="sm" variant="outline" borderRadius="$md" action="info">
              <BadgeText>
                {event.statusParticipacao}
              </BadgeText>
            </Badge>
          </Box>*/}

              {/*<Box //box da data
            borderRadius="$lg"
            borderWidth="$0"
            display="flex"
            alignItems="flex-end"
            w="$full"
          ></Box>*/}

            </Box>
          </HStack>

        </VStack>
        <VStack >
          <Box
            ml="$2"
            pl="$2"
            flex={1}
            justifyContent="center"
            alignItems="center"
            p="$1"
            borderLeftWidth={2}
            borderLeftColor="black" // você pode trocar a cor conforme necessário7
            borderStyle="dashed"
          >
            <AntDesign name="right" size={24} color="black" />
          </Box>
        </VStack>


        {/*<VStack gap={5}>
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
              isDisabled={!isEventActive}
            />
          </HStack>
        </VStack>*/}
      </HStack>
    </Pressable>
  );
}

{/* <AlertDialog
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
        </AlertDialog> */}