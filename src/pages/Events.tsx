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

import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";
import { QK_EVENT_LIST, QK_REGISTERED_EVENT_LIST } from "../utils/constants";
import { useCallback, useState } from "react";
import {
  listEvents,
  ListEventsResponse,
  type ListEventsVariables,
} from "../api/requests/list-events";
import { EventCard } from "../components/EventCard";
import { Button } from "../components/Button";
import {
  cancelEvent,
  CancelEventVariables,
} from "../api/requests/cancel-events";
import {
  inscriptionEvent,
  InscriptionEventVariables,
} from "../api/requests/inscription-event";
import { Event } from "../types/event";
import {
  unsubscriptionEvent,
  UnsubscriptionEventVariables,
} from "../api/requests/unsubscription-event";
import {
  listSubscribedEvents,
  ListSubscribedEventsResponse,
} from "../api/requests/list-subscribed-events";

type EventsProps = {
  showOnlyMyEvents?: boolean;
};

export type EventOnChangeType = {
  event: Event;
  type: "creator" | "user";
  options: {
    reason?: string;
    operation?: "subscribe" | "unsubscribe";
  };
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
    placeholderData: keepPreviousData,
  });

  const listSubscribedEventsQuery = useQuery({
    queryKey: [QK_REGISTERED_EVENT_LIST],
    queryFn: () => listSubscribedEvents(filters),
    placeholderData: keepPreviousData,
  });

  const cancelEventMutation = useMutation({
    mutationFn: cancelEvent,
    onSettled(data, error, variables) {
      console.log(
        "========================CANCEL MUTATION===================="
      );
      console.log({ data, error, variables });
    },
  });

  const inscriptionEventEventMutation = useMutation({
    mutationFn: inscriptionEvent,
    onSettled(data, error, variables) {
      console.log(
        "========================SUBSCRIBE MUTATION===================="
      );
      console.log({ data, error, variables });
    },
  });

  const unsubscriptionEventMutation = useMutation({
    mutationFn: unsubscriptionEvent,
    onSettled(data, error, variables) {
      console.log(
        "========================UNSUBSCRIBE MUTATION===================="
      );
      console.log({ data, error, variables });
    },
  });

  const handleOnPress = ({ event, type, options }: EventOnChangeType) => {
    if (type === "creator") {
      if (!options.reason) return;
      cancelEventMutation.mutate({
        motivoCancelamentoEvento: options.reason,
      } as CancelEventVariables);
    }
    if (type === "user") {
      options.operation === "subscribe"
        ? inscriptionEventEventMutation.mutate({
            cdRegistroEvento: event.cdRegistroEvento,
          } as InscriptionEventVariables)
        : unsubscriptionEventMutation.mutate({
            cdRegistroEvento: event.cdRegistroEvento,
          } as UnsubscriptionEventVariables);
    }
  };

  const eventsData = eventsQuery.data as ListEventsResponse;
  const subscribedEventsData =
    listSubscribedEventsQuery.data as ListSubscribedEventsResponse;
  const pagination = eventsData?.paginacao ?? defaultPagination;
  const events = eventsData?.eventos ?? [];
  // const subscibedEvents = subscribedEventsData?.eventos ?? [];
  const subscibedEvents =
    events.filter((e) => e.cdRegistroEvento % 2 === 0) ?? [];
  const idSubscribedEvents = subscibedEvents.map((e) => e.cdRegistroEvento);

  const onRefresh = useCallback(() => {
    setFilters(defaultFilter);
  }, []);

  return (
    <VStack bgColor="$background" flex={1} gap={10}>
      <ScrollView
        refreshControl={
          <RefreshControl
            colors={["#038c8c"]}
            progressBackgroundColor="#13F2F2"
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
              <EventCard
                key={event.cdRegistroEvento}
                event={event}
                isSubscribed={idSubscribedEvents.includes(
                  event.cdRegistroEvento
                )}
                showOnlyMyEvents={!!props.showOnlyMyEvents}
                handleOnPress={handleOnPress}
              />
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
      <Center pb="$1/5">
        <HStack gap={10}>
          {pagination.paginaAtual > 0 ? (
            <Button
              icon={<Feather name="chevron-left" size={30} color="#0B1726" />}
              text="Página anterior"
              borderRadius="$md"
              h="$10"
              bgColor="$actionColor"
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
              icon={<Feather name="chevron-right" size={30} color="#0B1726" />}
              text="Próxima página"
              borderRadius="$md"
              h="$10"
              bgColor="$actionColor"
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
