import {
  Box,
  HStack,
  Text,
  VStack,
  CloseIcon,
  CheckIcon,
  AddIcon,
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogContent,
  AlertDialogHeader,
  Heading,
  AlertDialogCloseButton,
  Icon,
  AlertDialogBody,
  AlertDialogFooter,
} from "@gluestack-ui/themed";
import { ListEventsResponse } from "../api/requests/list-events";
import { formatDateToShow } from "../utils/helpers";
import { Button } from "./Button";
import {} from "@gluestack-ui/themed";
import { ChevronsRightIcon } from "@gluestack-ui/themed";
import { useState } from "react";
import { ButtonGroup } from "@gluestack-ui/themed";

type EventCardType = {
  event: ListEventsResponse["eventos"][0];
};

export function EventCard({ event }: EventCardType) {
  const [subscribeStatus, setSubscribeStatus] = useState(0);
  const [showAlertDialog, setShowAlertDialog] = useState(false);
  const actionPrimaryButton = ["primary", "positive"];
  const iconPrimaryButton = [AddIcon, CheckIcon];

  const handlePressEventCard = () => {
    if (subscribeStatus === 0) {
      setSubscribeStatus(1);
    } else {
      setShowAlertDialog(true);
    }
  };

  return (
    <HStack
      alignItems="flex-start"
      gap={5}
      w="100%"
      bgColor="$lightBackground"
      borderRadius="$md"
      p="$5"
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
            <Heading size="lg">Cencelar Inscrição</Heading>
            <AlertDialogCloseButton>
              <Icon as={CloseIcon} />
            </AlertDialogCloseButton>
          </AlertDialogHeader>
          <AlertDialogBody>
            <VStack gap={2}>
              <Text size="md">Evento: {event.nomeEvento}</Text>
              <Text size="sm">
                Ao realizar essa ação seu ingresso será excluído e sua entrada
                ao não poderá ser validada.
              </Text>
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
                onPress={() => {
                  setShowAlertDialog(false);
                  setSubscribeStatus(0);
                }}
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
          alignItems="flex-start"
          p="$2"
          w="$full"
        >
          <Text
            fontSize="$2xl"
            color="$background"
            fontWeight="$bold"
            numberOfLines={1}
          >
            {event.nomeEvento}
          </Text>
        </Box>
        <Box
          borderRadius="$lg"
          borderWidth="$0"
          display="flex"
          alignItems="flex-start"
          p="$2"
          w="$full"
        >
          <Text fontSize="$xl" color="$background" fontWeight="$bold">
            Data: {formatDateToShow(event.dtInicio)}
          </Text>
        </Box>
      </VStack>
      <HStack gap={5}>
        <Button
          h="$24"
          w="$16"
          action={
            actionPrimaryButton[subscribeStatus] as
              | "primary"
              | "positive"
              | "negative"
          }
          iconSize={24}
          rightIcon={iconPrimaryButton[subscribeStatus]}
          onPress={handlePressEventCard}
        />
        <Button
          h="$24"
          w="$16"
          variant="link"
          bgColor="$background"
          iconSize={24}
          rightIcon={ChevronsRightIcon}
        />
      </HStack>
    </HStack>
  );
}
