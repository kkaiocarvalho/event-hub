import { ToastTitle } from "@gluestack-ui/themed";
import { Center, HStack, VStack } from "@gluestack-ui/themed";
import { EventCard } from "../components/EventCard";
import { QK_EVENT_LIST } from "../utils/constants";
import {
  keepPreviousData,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  listEvents,
  ListEventsResponse,
  ListEventsVariables,
} from "../api/requests/list-events";
import { useCallback, useEffect, useMemo, useState } from "react";
import { EventStackProps } from "../routes/EventsStack";
import { Event } from "../api/types";
import { InfiniteScroll } from "../components/InfiniteScroll";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useToast } from "@gluestack-ui/themed";
import { Pressable } from "react-native";
import { Toast } from "@gluestack-ui/themed";
import { ToastDescription } from "@gluestack-ui/themed";

const defaultFilter: ListEventsVariables = {
  filtros: [],
  apenasMeusEventos: "S",
  paginacao: {
    pagina: 0,
    qntItensPaginados: 15,
  },
};

export function MyEvents({ navigation }: EventStackProps) {
  const insets = useSafeAreaInsets();
  const configToast = useToast();
  const [events, setEvents] = useState<Event[]>([]);
  const [filters, setFilters] = useState<ListEventsVariables>(defaultFilter);
  const [isRefreshLoading, setIsRefreshLoading] = useState(false);

  const queryClient = useQueryClient();
  const eventsQuery = useQuery({
    queryKey: [QK_EVENT_LIST, filters],
    queryFn: () => listEvents(filters),
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (eventsQuery.error?.message || eventsQuery.isError) {
      setIsRefreshLoading(false);
      configToast.closeAll();
      configToast.show({
        placement: "top",
        render: () => {
          return (
            <Pressable onPress={() => configToast.closeAll()}>
              <Toast action="error" variant="accent" top={insets.top}>
                <VStack space="xs">
                  <ToastTitle>Erro</ToastTitle>
                  <ToastDescription>
                    {eventsQuery.error?.message ??
                      "Ocorreu um erro inesperado."}
                  </ToastDescription>
                </VStack>
              </Toast>
            </Pressable>
          );
        },
      });
      return;
    }
  }, [eventsQuery.error?.message, eventsQuery.isError]);

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
    setIsRefreshLoading(false);
  }, [eventsData]);

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
    setIsRefreshLoading(true);
    queryClient.clear();
    setFilters(defaultFilter);
    setEvents([]);
  }, []);

  const openEvent = (event: Event) => {
    navigation.navigate("EventDetails", { event });
  };

  return (
    <VStack bgColor="$background" flex={1} gap={10} px="$4" pt="$8">
      <InfiniteScroll
        data={events}
        keyExtractor={(item) => (item as Event).cdRegistroEvento.toString()}
        extraData={events}
        renderItem={({ item }) => (
          <EventCard event={item as Event} openEvent={openEvent} />
        )}
        hasNextPage={!!eventsData?.paginacao?.temProximaPagina}
        isRefreshLoading={isRefreshLoading}
        onRefresh={onRefresh}
        loadMoreEvents={loadMoreEvents}
        isLoading={isLoading}
      />
      <Center pb="$1/5">
        <HStack gap={10}></HStack>
      </Center>
    </VStack>
  );
}
