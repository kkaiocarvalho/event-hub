import { Background } from "../components/Background";
import { Event } from "../api/requests/list-events";
import { EventStackProps } from "../routes/EventsStack";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { QK_EVENT_PARTICIPANTS } from "../utils/constants";
import {
  listSubscribedInEvent,
  ListSubscribedInEventResponse,
  SubscribedUser,
} from "../api/requests/list-subscribed-in-event";
import { Box, Center, FlatList } from "@gluestack-ui/themed";
import { Text } from "@gluestack-ui/themed";
import { RefreshControl } from "@gluestack-ui/themed";
import { UserCard } from "../components/UserCard";

const mockParticipants: SubscribedUser[] = [
  {
    nuRegistroParticipacao: 1,
    nomeParticipante: "Pedro",
    statusParticipacao: "REGISTRADO",
    formaEntrada: "MANUAL",
    formaSaida: "MANUAL",
    dtEntradaEvento: "2025-12-24 20:40:00",
    dtSaidaEvento: "2026-12-24 20:40:00",
    sorteado: "N",
  },
  {
    nuRegistroParticipacao: 2,
    nomeParticipante: "Maria",
    statusParticipacao: "REGISTRADO",
    formaEntrada: "MANUAL",
    formaSaida: "MANUAL",
    dtEntradaEvento: "2025-12-24 20:40:00",
    dtSaidaEvento: "2026-12-24 20:40:00",
    sorteado: "N",
  },
  {
    nuRegistroParticipacao: 3,
    nomeParticipante: "João",
    statusParticipacao: "REGISTRADO",
    formaEntrada: "MANUAL",
    formaSaida: "MANUAL",
    dtEntradaEvento: "2025-12-24 20:40:00",
    dtSaidaEvento: "2026-12-24 20:40:00",
    sorteado: "N",
  },
  {
    nuRegistroParticipacao: 4,
    nomeParticipante: "José",
    statusParticipacao: "REGISTRADO",
    formaEntrada: "MANUAL",
    formaSaida: "MANUAL",
    dtEntradaEvento: "2025-12-24 20:40:00",
    dtSaidaEvento: "2026-12-24 20:40:00",
    sorteado: "N",
  },
  {
    nuRegistroParticipacao: 5,
    nomeParticipante: "Maria",
    statusParticipacao: "REGISTRADO",
    formaEntrada: "MANUAL",
    formaSaida: "MANUAL",
    dtEntradaEvento: "2025-12-24 20:40:00",
    dtSaidaEvento: "2026-12-24 20:40:00",
    sorteado: "N",
  },
  {
    nuRegistroParticipacao: 6,
    nomeParticipante: "João",
    statusParticipacao: "REGISTRADO",
    formaEntrada: "MANUAL",
    formaSaida: "MANUAL",
    dtEntradaEvento: "2025-12-24 20:40:00",
    dtSaidaEvento: "2026-12-24 20:40:00",
    sorteado: "N",
  },
  {
    nuRegistroParticipacao: 7,
    nomeParticipante: "José",
    statusParticipacao: "REGISTRADO",
    formaEntrada: "MANUAL",
    formaSaida: "MANUAL",
    dtEntradaEvento: "2025-12-24 20:40:00",
    dtSaidaEvento: "2026-12-24 20:40:00",
    sorteado: "N",
  },
  {
    nuRegistroParticipacao: 8,
    nomeParticipante: "Maria",
    statusParticipacao: "REGISTRADO",
    formaEntrada: "MANUAL",
    formaSaida: "MANUAL",
    dtEntradaEvento: "2025-12-24 20:40:00",
    dtSaidaEvento: "2026-12-24 20:40:00",
    sorteado: "N",
  },
  {
    nuRegistroParticipacao: 9,
    nomeParticipante: "João",
    statusParticipacao: "REGISTRADO",
    formaEntrada: "MANUAL",
    formaSaida: "MANUAL",
    dtEntradaEvento: "2025-12-24 20:40:00",
    dtSaidaEvento: "2026-12-24 20:40:00",
    sorteado: "N",
  },
  {
    nuRegistroParticipacao: 10,
    nomeParticipante: "José",
    statusParticipacao: "REGISTRADO",
    formaEntrada: "MANUAL",
    formaSaida: "MANUAL",
    dtEntradaEvento: "2025-12-24 20:40:00",
    dtSaidaEvento: "2026-12-24 20:40:00",
    sorteado: "N",
  },
  {
    nuRegistroParticipacao: 11,
    nomeParticipante: "Maria",
    statusParticipacao: "REGISTRADO",
    formaEntrada: "MANUAL",
    formaSaida: "MANUAL",
    dtEntradaEvento: "2025-12-24 20:40:00",
    dtSaidaEvento: "2026-12-24 20:40:00",
    sorteado: "N",
  },
  {
    nuRegistroParticipacao: 12,
    nomeParticipante: "João",
    statusParticipacao: "REGISTRADO",
    formaEntrada: "MANUAL",
    formaSaida: "MANUAL",
    dtEntradaEvento: "2025-12-24 20:40:00",
    dtSaidaEvento: "2026-12-24 20:40:00",
    sorteado: "N",
  },
];

export function EventParticipants({ route }: EventStackProps) {
  const queryClient = useQueryClient();
  const event = (route.params as { event: Event }).event as Event;

  const participantsQuery = useQuery({
    queryKey: [QK_EVENT_PARTICIPANTS],
    queryFn: () =>
      listSubscribedInEvent({ cdRegistroEvento: event.cdRegistroEvento }),
  });

  const onRefresh = () => {
    queryClient.refetchQueries({ queryKey: [QK_EVENT_PARTICIPANTS] });
  };

  const participants =
    mockParticipants ??
    (participantsQuery.data as ListSubscribedInEventResponse).participantes ??
    [];

  const isLoading = participantsQuery.isLoading || participantsQuery.isFetching;

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
      </Box>
    </Background>
  );
}
