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
      title: "- Status",
      textAlign: "left",
      pl: "$4",
      value: userEventStatus,
    },
  ];

  const RenderInfo = ({ title, value, ...props }: EventInfo) => (
    <VStack gap={4} key={title}>
      <Text color="#111D40" fontWeight="$bold" fontSize={25} >
        {title}
      </Text>
      <Box>
        <Text
          color="$background"
          pb="$5"
          borderRadius="$xl"
          lineHeight="$md"
          fontSize="$2xl"
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
        <VStack flex={1} pb="$12" gap={8} >
          <VStack
            flex={1}
            borderRadius="$2xl"
            p="$6"
            bgColor="$textColor"
          >
            <ScrollView borderTopWidth="$2" borderBottomWidth="$2" borderStyle="dashed" paddingTop={20}
            borderColor="$background">
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
                  //text="Participantes"
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
                      //style={{ marginLeft: 8,}}
                    />
                  )}
                />
                <GenerateQrCodeButton eventId={eventId} />
                <CancelEventButton eventId={eventId} />
              </HStack>
            ) : (
              <HStack gap={4}>
                <ManageSubscriptionButton eventId={eventId} />
              </HStack>
            )}
          </VStack>
        </VStack>
      )}
    </Background>
  );
}
