import { FlatList, RefreshControl, Spinner, Text } from "@gluestack-ui/themed";
import { Center, HStack, VStack } from "@gluestack-ui/themed";
import { EventCard } from "../components/EventCard";
import { QK_EVENT_LIST } from "../utils/constants";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import {
  listEvents,
  ListEventsResponse,
  ListEventsVariables,
} from "../api/requests/list-events";
import { useCallback, useMemo, useState } from "react";
import { Box } from "@gluestack-ui/themed";
import { EventStackProps } from "../routes/EventsStack";
import { Event } from "../api/types";

const defaultFilter: ListEventsVariables = {
  filtros: [],
  apenasMeusEventos: "S",
  paginacao: {
    pagina: 0,
    qntItensPaginados: 15,
  },
};

export function MyEvents({ navigation }: EventStackProps) {
  const [events, setEvents] = useState<Event[]>([]);
  const [filters, setFilters] = useState<ListEventsVariables>(defaultFilter);

  const eventsQuery = useQuery({
    queryKey: [QK_EVENT_LIST, filters],
    queryFn: () => listEvents(filters),
    placeholderData: keepPreviousData,
  });

  const isLoading = eventsQuery.isLoading || eventsQuery.isFetching;
  const eventsData = eventsQuery.data as ListEventsResponse;

  useMemo(() => {
    const newEvents = eventsData?.eventos ?? [];
    const filteredEvents = newEvents.filter(
      (newEvent) =>
        !events?.some(
          (event) => event.cdRegistroEvento === newEvent.cdRegistroEvento
        )
    );
    setEvents((prev) => [...prev, ...filteredEvents]);
  }, [eventsData?.eventos]);

  const loadMoreEvents = () => {
    if (!eventsData?.paginacao?.temProximaPagina) return;
    setFilters((prev) => ({
      ...prev,
      paginacao: {
        ...prev.paginacao,
        pagina: prev.paginacao.pagina + 1,
      },
    }));
  };

  const onRefresh = useCallback(() => {
    setFilters(defaultFilter);
    setEvents([]);
    //TODO: on reload not interact with react memo, fix this;
  }, []);

  const openEvent = (event: Event) => {
    navigation.navigate("EventDetails", { eventId: event.cdRegistroEvento });
  };

  return (
    <VStack bgColor="$background" flex={1} gap={10} px="$4" pt="$8">
      <FlatList
        data={events}
        keyExtractor={(item) => (item as Event).cdRegistroEvento.toString()}
        extraData={events}
        renderItem={({ item }) => (
          <EventCard event={item as Event} openEvent={openEvent} />
        )}
        ItemSeparatorComponent={() => <Box h="$5" />}
        ListEmptyComponent={
          <Center flex={1} pt="$full">
            <Text maxWidth="60%" textAlign="center" color="$textColor">
              {isLoading
                ? "Carregando eventos."
                : "Você ainda não cadastrou nenhum evento :/"}
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
        onEndReached={loadMoreEvents}
        onEndReachedThreshold={0.1}
        ListFooterComponent={
          <>
            {isLoading ? (
              <Box py="$5">
                <Spinner size={45} />
              </Box>
            ) : null}
          </>
        }
      />
      <Center pb="$1/5">
        <HStack gap={10}></HStack>
      </Center>
    </VStack>
  );
}
