import { Background } from "../components/Background";
import { EventStackProps } from "../routes/EventsStack";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { QK_EVENT, QK_EVENT_PARTICIPANTS } from "../utils/constants";
import {
  listSubscribedInEvent,
  ListSubscribedInEventResponse,
  SubscribedUser,
} from "../api/requests/list-subscribed-in-event";
import { Box, Center, FlatList } from "@gluestack-ui/themed";
import { Text } from "@gluestack-ui/themed";
import { RefreshControl } from "@gluestack-ui/themed";
import { UserCard } from "../components/UserCard";
import { GetEventResponse } from "../api/requests/get-event";
import { Button } from "../components/Button";

export function EventParticipants({ route }: EventStackProps) {
  const queryClient = useQueryClient();
  const eventId = (route.params as { eventId: number }).eventId as number;
  const event = queryClient.getQueryData<GetEventResponse>([QK_EVENT, eventId]);

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

  const isLoading = participantsQuery.isLoading;

  return (
    <Background>
      <Box mb="$1/6" flex={1}>
        <FlatList
          data={participants}
          keyExtractor={(item) =>
            (item as SubscribedUser).nuRegistroParticipacao.toString()
          }
          extraData={participants}
          renderItem={({ item }) => <UserCard user={item as SubscribedUser} />}
          ItemSeparatorComponent={() => <Box h="$5" />}
          ListEmptyComponent={
            <Center flex={1} pt="$full">
              <Text maxWidth="60%" textAlign="center" color="$textColor">
                {isLoading
                  ? "Carregando participantes."
                  : "Nenhum participante inscrito até o momento :/"}
              </Text>
            </Center>
          }
          refreshControl={
            <RefreshControl
              colors={["#13F2F2"]}
              progressBackgroundColor="#111D40"
              refreshing={isLoading}
              onRefresh={onRefresh}
            />
          }
        />
        <Center>
          <Button text="Sortear" width="$full" />
        </Center>
      </Box>
    </Background>
  );
}
