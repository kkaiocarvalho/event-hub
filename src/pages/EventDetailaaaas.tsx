import {
  VStack,
  Text,
  ScrollView,
  Spinner,
  Center,
} from "@gluestack-ui/themed";
import { Background } from "../components/Background";
import { EventStackProps } from "../routes/EventsStack";
import { formatDateToShow } from "../utils/helpers";
import { useUserAndEventRelationship } from "../hook/useUserAndEventRelationship";
import { useQueryClient } from "@tanstack/react-query";
import { ComponentProps } from "react";
import { QK_EVENT } from "../utils/constants";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { GetEventResponse } from "../api/requests/get-event";
import { useUser } from "../hook/useUser";
import { Button } from "../components/Button";
import { GenerateQrCodeButton } from "../components/GenerateQrCodeButton";
import { CancelEventButton } from "../components/CancelEventButton";
import { ManageSubscriptionButton } from "../components/ManageSubscriptionButton";
import { HStack } from "@gluestack-ui/themed";

type EventInfo = {
  title: string;
  value: string;
} & ComponentProps<typeof Text>;

export function EventDetails({ route, navigation }: EventStackProps) {
  const { eventId } = route.params as { eventId: number };
  const queryClient = useQueryClient();
  const { hasOrganizerPermission } = useUser();
  const { userEventStatus } = useUserAndEventRelationship(eventId);

  const event = queryClient.getQueryData<GetEventResponse>([QK_EVENT, eventId]);

  const isEventCreator = hasOrganizerPermission && event?.meuEvento;

  const eventInfo: EventInfo[] = [
    { title: "Nome do Evento:", value: event?.nomeEvento ?? "-", pl: "$4" },
    {
      title: "Complemento:",
      verticalAlign: "top",
      pl: "$4",
      value: event?.complementoEvento ?? "-",
    },
    {
      title: "Início:",
      textAlign: "center",
      value: event?.dtInicio
        ? formatDateToShow(event?.dtInicio, { withTime: true })
        : "-",
    },
    {
      title: "Final:",
      textAlign: "center",
      value: event?.dtEncerramento
        ? formatDateToShow(event?.dtEncerramento, { withTime: true })
        : "-",
    },
    {
      title: "Status",
      textAlign: "center",
      value: userEventStatus,
    },
  ];

  const RenderInfo = ({ title, value, ...props }: EventInfo) => (
    <VStack gap={4} key={title}>
      <Text color="black" fontWeight="$bold">
        {title}
      </Text>
      <Text
        color="$textColor"
        borderColor="$primary400"
        borderWidth="$4"
        bgColor="$background"
        p="$2"
        borderRadius="$xl"
        lineHeight="$sm"
        fontSize="$sm"
        textAlignVertical="center"
        {...props}
      >
        {value}
      </Text>
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
          <VStack
            flex={1}
            borderWidth="$4"
            borderColor="$primary400"
            borderRadius="$3xl"
            p="$4"
            bgColor="$textColor"
          >
            <ScrollView>{eventInfo.map((e) => RenderInfo(e))}</ScrollView>
          </VStack>
          <VStack gap={8}>
            {isEventCreator ? (
              <>
                <Button
                  h="$16"
                  text="Participantes"
                  action="positive"
                  iconSize={24}
                  onPress={() =>
                    navigation.navigate("EventParticipants", { eventId })
                  }
                  rightIcon={() => (
                    <MaterialCommunityIcons
                      name="account-group"
                      size={24}
                      color="#F2F2F2"
                      style={{ marginLeft: 8 }}
                    />
                  )}
                />
                <GenerateQrCodeButton eventId={eventId} />
              </>
            ) : null}
            <HStack gap={8}>
              {isEventCreator ? (
                <CancelEventButton eventId={eventId} />
              ) : (
                <ManageSubscriptionButton eventId={eventId} />
              )}
            </HStack>
          </VStack>
        </VStack>
      )}
    </Background>
  );
}
