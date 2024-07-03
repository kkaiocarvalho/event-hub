import {
  VStack,
  Text,
  ScrollView,
  Spinner,
  Center,
  Box,
  HStack,
} from "@gluestack-ui/themed";
import { Background } from "../components/Background";
import { EventStackProps } from "../routes/EventsStack";
import { formatDateToShow } from "../utils/helpers";
import { useUserAndEventRelationship } from "../hook/useUserAndEventRelationship";
import { ComponentProps } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useUser } from "../hook/useUser";
import { Button } from "../components/Button";
import { GenerateQrCodeButton } from "../components/GenerateQrCodeButton";
import { CancelEventButton } from "../components/CancelEventButton";
import { ManageSubscriptionButton } from "../components/ManageSubscriptionButton";
import { Event } from "../api/types";
import { useEvent } from "../hook/useEvent";

type EventInfo = {
  title: string;
  value: string;
} & ComponentProps<typeof Text>;

export function EventDetails({ route, navigation }: EventStackProps) {
  const paramsEvent = (route.params as { event: Event }).event as Event;
  const { hasOrganizerPermission } = useUser();
  const { userEventStatus } = useUserAndEventRelationship(paramsEvent);
  const { event } = useEvent(paramsEvent.cdRegistroEvento);
  const isEventCreator = hasOrganizerPermission && event?.meuEvento;

  const eventInfo: EventInfo[] = [
    {
      title: "- Nome do Evento",
      value: event?.nomeEvento ?? "-",
      pl: "$4",
      textAlign: "left",
    },
    {
      title: "- Complemento",
      verticalAlign: "top",
      textAlign: "left",
      pl: "$4",
      value: event?.complementoEvento ?? "-",
    },
    {
      title: "- Início",
      textAlign: "center",
      pl: "$4",
      value: event?.dtInicio
        ? formatDateToShow(event?.dtInicio, { withTime: true })
        : "-",
    },
    {
      title: "- Final",
      textAlign: "center",
      pl: "$4",
      value: event?.dtEncerramento
        ? formatDateToShow(event?.dtEncerramento, { withTime: true })
        : "-",
    },
    {
      title: "- Cidade",
      verticalAlign: "top",
      textAlign: "left",
      pl: "$4",
      value: event?.endereco.cidade ?? "-",
    },
    {
      title: "- Logradouro",
      verticalAlign: "top",
      textAlign: "left",
      pl: "$4",
      value: event?.endereco.logradouro ?? "-",
    },
    {
      title: "- Número ",
      verticalAlign: "top",
      textAlign: "left",
      pl: "$4",
      value: event?.endereco.numero ?? "-",
    },

    {
      title: "- Estado ",
      verticalAlign: "top",
      textAlign: "left",
      pl: "$4",
      value: event?.endereco.estado ?? "-",
    },
    {
      title: "- Status",
      textAlign: "left",
      pl: "$4",
      value: userEventStatus,
    },
  ];

  const RenderInfo = ({ title, value, ...props }: EventInfo) => (
    <VStack gap={4} key={title}>
      <Text color="#111D40" fontWeight="$bold" fontSize={15}>
        {title}
      </Text>
      <Box>
        <Text
          color="$background"
          pb="$5"
          borderRadius="$xl"
          lineHeight="$md"
          fontSize="$lg"
          textAlignVertical="center"
          {...props}
        >
          {value}
        </Text>
      </Box>
    </VStack>
  );

  return (
    <Background>
      {!event ? (
        <Center flex={1}>
          <Spinner size={45} />
        </Center>
      ) : (
        <VStack flex={1} pb="$12" gap={8}>
          <VStack flex={1} borderRadius="$2xl" p="$6" bgColor="$textColor">
            <ScrollView
              borderTopWidth="$2"
              borderBottomWidth="$2"
              borderStyle="dashed"
              borderColor="$background"
            >
              {eventInfo.map((info) => (
                <RenderInfo key={info.title} {...info} />
              ))}
            </ScrollView>
          </VStack>
          <VStack gap={8}>
            {isEventCreator ? (
              <HStack gap={4} justifyContent="space-between">
                <Button
                  h="$16"
                  action="positive"
                  iconSize={24}
                  onPress={() =>
                    navigation.navigate("EventParticipants", { event })
                  }
                  rightIcon={() => (
                    <MaterialCommunityIcons
                      name="account-group"
                      size={24}
                      color="#F2F2F2"
                    />
                  )}
                />
                <GenerateQrCodeButton event={event} />
                <CancelEventButton event={event} />
              </HStack>
            ) : (
              <HStack gap={4}>
                <ManageSubscriptionButton event={event} />
              </HStack>
            )}
          </VStack>
        </VStack>
      )}
    </Background>
  );
}
