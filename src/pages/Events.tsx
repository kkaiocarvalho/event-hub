import {
  Center,
  VStack,
  RefreshControl,
  HStack,
  Box,
  ButtonText,
  Text,
  Button as GlueButton,
  MenuItem,
  MenuItemLabel,
  AddIcon,
  Menu,
  MenuIcon,
  Icon,
  ButtonIcon,
  PaperclipIcon,
  Spinner,
} from "@gluestack-ui/themed";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import {
  FilterEventField,
  QK_EVENT_LIST,
  FilterEventOperation,
} from "../utils/constants";
import { useCallback, useMemo, useState } from "react";
import { listEvents, ListEventsResponse } from "../api/requests/list-events";
import type { ListEventsVariables } from "../api/requests/list-events";
import { EventCard } from "../components/EventCard";
import { EventStackProps } from "../routes/EventsStack";
import { FlatList } from "@gluestack-ui/themed";
import { formatDateToSave } from "../utils/helpers";
import { useUser } from "../hook/useUser";
import { Event } from "../api/types";

const defaultFilter: ListEventsVariables = {
  filtros: [
    {
      operacao: FilterEventOperation.GREATER_THAN,
      campo: FilterEventField.START_DATE,
      valor: formatDateToSave(new Date()),
    },
  ],
  apenasMeusEventos: "N",
  paginacao: {
    pagina: 0,
    qntItensPaginados: 15,
  },
};

export function Events({ navigation }: EventStackProps) {
  const { hasOrganizerPermission } = useUser();
  const [refreshLoading, setRefreshLoading] = useState(false);
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
    setRefreshLoading(false);
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
    if (!eventsData?.paginacao.temProximaPagina) return;
    setFilters((prev) => ({
      ...prev,
      paginacao: {
        ...prev.paginacao,
        pagina: prev.paginacao.pagina + 1,
      },
    }));
  };

  const onRefresh = useCallback(() => {
    setRefreshLoading(true);
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
                : "Nenhum evento cadastrado até o momento :/"}
            </Text>
          </Center>
        }
        refreshControl={
          <RefreshControl
            colors={["#13F2F2"]}
            progressBackgroundColor="#111D40"
            refreshing={refreshLoading}
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
      {hasOrganizerPermission ? (
        <Box
          display="flex"
          alignItems="flex-end"
          position="absolute"
          right="$4"
          bottom="$20"
          mb="$2"
        >
          <Menu
            placement="top right"
            bgColor="$background"
            borderColor="$primary400"
            borderWidth="$2"
            mb="$1"
            trigger={({ ...triggerProps }) => {
              return (
                <GlueButton {...triggerProps} gap="$2" borderRadius="$3xl">
                  <ButtonText>Options</ButtonText>
                  <ButtonIcon as={MenuIcon} />
                </GlueButton>
              );
            }}
          >
            <MenuItem
              key="my-events"
              textValue="my-events"
              onPress={() => navigation.navigate("MyEvents")}
            >
              <Icon as={PaperclipIcon} size="sm" mr="$2" color="$primary400" />
              <MenuItemLabel size="sm" color="$primary400">
                Meus eventos criados
              </MenuItemLabel>
            </MenuItem>
            <MenuItem
              key="add-event"
              textValue="add-event"
              onPress={() => navigation.navigate("CreateEvent")}
            >
              <Icon as={AddIcon} size="sm" mr="$2" color="$primary400" />
              <MenuItemLabel size="sm" color="$primary400">
                Adicionar um evento
              </MenuItemLabel>
            </MenuItem>
          </Menu>
        </Box>
      ) : null}
      <Center pb="$1/5">
        <HStack gap={10}></HStack>
      </Center>
    </VStack>
  );
}
