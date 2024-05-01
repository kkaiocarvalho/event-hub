import {
  Text,
  Center,
  VStack,
  ScrollView,
  RefreshControl,
  Spinner,
  HStack,
} from "@gluestack-ui/themed";
import { Feather } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { QK_EVENT_LIST } from "../utils/constants";
import { useCallback, useState } from "react";
import {
  listEvents,
  ListEventsResponse,
  type ListEventsVariables,
} from "../api/requests/list-events";
import { EventCard } from "../components/EventCard";
import { Button } from "../components/Button";

type EventsProps = {
  showOnlyMyEvents?: boolean;
};

export function Events(props: EventsProps) {
  const defaultFilter: ListEventsVariables = {
    filtros: [],
    apenasMeusEventos: props.showOnlyMyEvents ? "S" : "N",
    paginacao: {
      pagina: 0,
      qntItensPaginados: 10,
    },
  };

  const defaultPagination: ListEventsResponse["paginacao"] = {
    qntItensRetornados: 0,
    paginaAtual: 0,
    proximaPagina: 0,
    temProximaPagina: false,
  };

  const [filters, setFilters] = useState<ListEventsVariables>(defaultFilter);

  const eventsQuery = useQuery({
    queryKey: [QK_EVENT_LIST, filters],
    queryFn: () => listEvents(filters),
  });

  const eventsData = eventsQuery.data as ListEventsResponse;

  const pagination = eventsData?.paginacao ?? defaultPagination;
  const events = eventsData?.eventos ?? [];

  const onRefresh = useCallback(() => {
    setFilters(defaultFilter);
  }, []);

  return (
    <VStack bgColor="$background" flex={1} gap={10}>
      <ScrollView
        refreshControl={
          <RefreshControl
            colors={["#038c8c66"]}
            progressBackgroundColor="#084040"
            refreshing={eventsQuery.isLoading}
            onRefresh={onRefresh}
          />
        }
        contentContainerStyle={{
          alignItems: "center",
          justifyContent: "center",
          padding: 15,
          paddingBottom: 0,
          gap: 15,
        }}
      >
        {
          eventsQuery.isLoading ? (
            <Spinner size={55} />
          ) : events.length > 0 ? (
            events.map((event) => (
              <EventCard key={event.cdRegistroEvento} event={event} />
            ))
          ) : (
            <Center flex={1}>
              <Text maxWidth="60%" textAlign="center">
                Ainda não temos nenhum evento cadastrado :/
              </Text>
            </Center>
          )
          // FLAT LIST WITHOUT STYLE
          // <FlatList
          //   data={events}
          //   keyExtractor={(item) => item.cdRegistroEvento.toString()}
          //   extraData={events}
          //   renderItem={({ item }) => <EventCard event={item} />}
          //   ListEmptyComponent={
          //     <Center flex={1}>
          //       <Text maxWidth="60%" textAlign="center">
          //         Ainda não temos nenhum evento cadastrado :/
          //       </Text>
          //     </Center>
          //   }
          // />
        }
      </ScrollView>
      <Center pb="$20">
        <HStack gap={10}>
          {pagination.paginaAtual > 0 ? (
            <Button
              icon={<Feather name="chevron-left" size={24} color="#0B1726" />}
              text="Página anterior"
              borderRadius="$full"
              onPress={() =>
                setFilters((prev) => ({
                  ...prev,
                  paginacao: {
                    ...prev.paginacao,
                    pagina: prev.paginacao.pagina - 1,
                  },
                }))
              }
            />
          ) : null}
          {pagination.temProximaPagina ? (
            <Button
              icon={<Feather name="chevron-right" size={24} color="#0B1726" />}
              text="Próxima página"
              borderRadius="$full"
              onPress={() =>
                setFilters((prev) => ({
                  ...prev,
                  paginacao: {
                    ...prev.paginacao,
                    pagina: prev.paginacao.pagina + 1,
                  },
                }))
              }
            />
          ) : null}
        </HStack>
      </Center>
    </VStack>
  );
}
