import { Background } from "../components/Background";
import { EventStackProps } from "../routes/EventsStack";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { EventStatus, QK_EVENT_PARTICIPANTS } from "../utils/constants";
import {
  listSubscribedInEvent,
  ListSubscribedInEventResponse,
  SubscribedUser,
} from "../api/requests/list-subscribed-in-event";
import {
  Box,
  Center,
  Toast,
  ToastDescription,
  ToastTitle,
  useToast,
  VStack,
} from "@gluestack-ui/themed";
import { UserCard } from "../components/UserCard";
import { Button } from "../components/Button";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import {
  drawParticipant,
  DrawParticipantResponse,
} from "../api/requests/draw-participant";
import type {
  InvalidDataSchemaResponse,
  RequestErrorWithMessage,
  RequestErrorSchema,
} from "../config/request";
import { useEvent } from "../hook/useEvent";
import { Event } from "../api/types";
import { InfiniteScroll } from "../components/InfiniteScroll";

export function EventParticipants({ route }: EventStackProps) {
  const queryClient = useQueryClient();
  const paramsEvent = (route.params as { event: Event }).event as Event;
  const configToast = useToast();
  const insets = useSafeAreaInsets();
  const { event } = useEvent(paramsEvent.cdRegistroEvento);

  const participantsQuery = useQuery({
    queryKey: [QK_EVENT_PARTICIPANTS, event],
    queryFn: () =>
      listSubscribedInEvent({ cdRegistroEvento: event!.cdRegistroEvento }),
    enabled: !!event,
  });

  const onRefresh = () => {
    queryClient.refetchQueries({ queryKey: [QK_EVENT_PARTICIPANTS, event] });
  };

  const participants =
    (participantsQuery.data as ListSubscribedInEventResponse)?.participantes ??
    [];

  const drawParticipantsMutation = useMutation({
    mutationFn: drawParticipant,
    onSuccess(response) {
        console.log({response})
      configToast.closeAll();
      if(typeof response === "string") return;
      configToast.show({
        placement: "top",
        render: () => {
          console.log({ response });
          return (
            <Toast action="success" variant="accent" top={insets.top}>
              <VStack space="xs">
                <ToastTitle>Sucesso</ToastTitle>
                <ToastDescription>
                  O Participante sorteado foi:{" "}
                  {(response as DrawParticipantResponse).nomeParticipante}!
                </ToastDescription>
              </VStack>
            </Toast>
          );
        },
      });
      queryClient.refetchQueries({ queryKey: [QK_EVENT_PARTICIPANTS, event] });
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
                  {message ?? "Erro ao sortear um parcitipante"}
                </ToastDescription>
              </VStack>
            </Toast>
          );
        },
      });
    },
  });

  const handleDrawParticipant = () => {
    if (!event) return;
    drawParticipantsMutation.mutate({
      cdRegistroEvento: event.cdRegistroEvento,
    });
  };

  const isLoading = participantsQuery.isLoading;

  const isEventOpen = event?.statusEvento === EventStatus.OPEN;

  return (
    <Background>
      <Box mb="$1/6" flex={1}>
        <InfiniteScroll
          data={participants}
          keyExtractor={(item) =>
            (item as SubscribedUser).nuRegistroParticipacao.toString()
          }
          extraData={participants}
          renderItem={({ item }) => (
            <UserCard user={item as SubscribedUser} event={paramsEvent} />
          )}
          hasNextPage={false}
          isRefreshLoading={isLoading}
          onRefresh={onRefresh}
          loadMoreEvents={() => {}}
          isLoading={isLoading}
        />
        <Center pt="$5">
          {isEventOpen ? (
            <Button
              text="Sortear"
              width="$full"
              rightIcon={() => (
                <Box sx={{ paddingLeft: "$2" }}>
                  <Ionicons name="dice" size={24} color="#FFF" />
                </Box>
              )}
              onPress={() => handleDrawParticipant()}
            />
          ) : null}
        </Center>
      </Box>
    </Background>
  );
}
