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
  Pressable,
} from "@gluestack-ui/themed";
import {
  keepPreviousData,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
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
  const queryClient = useQueryClient();
  const [events, setEvents] = useState<Event[]>([]);
  const [filters, setFilters] = useState<ListEventsVariables>(defaultFilter);
  const [isFilterAll, setIsFilterAll] = useState(true);

  const eventsQuery = useQuery({
    queryKey: [QK_EVENT_LIST, filters],
    queryFn: () => listEvents(filters),
    placeholderData: keepPreviousData,
  });
  console.log({ eventsQuery });
  const isLoading = eventsQuery.isLoading || eventsQuery.isFetching;
  const eventsData = eventsQuery.data as ListEventsResponse;

  useMemo(() => {
    console.log("USE MEMO");
    const newEvents = eventsData?.eventos ?? [];
    console.log({ newEvents });
    const filteredEvents = newEvents.filter(
      (newEvent) =>
        !events?.some(
          (event) => event.cdRegistroEvento === newEvent.cdRegistroEvento
        )
    );
    console.log({ newEvents });
    setEvents((prev) => [...prev, ...filteredEvents]);
  }, [eventsData?.eventos, filters]);

  console.log({ events });

  const loadMoreEvents = () => {
    console.log("LOAD MORE");
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
    console.log("REFRESH");
    queryClient.cancelQueries({ queryKey: [QK_EVENT_LIST, filters] });
    setFilters(defaultFilter);
    setEvents([]);
    //TODO: on reload not interact with react memo, fix this;
  }, []);

  const openEvent = (event: Event) => {
    navigation.navigate("EventDetails", { eventId: event.cdRegistroEvento });
  };

  return (
    <VStack bgColor="$background" flex={1} gap={10} px="$4" pt="$8">
      {/* FILTER */}
      <Box w="$full" px="$8" h="$16" mb="$5">
        <Box flex={1} borderRadius="$2xl" bgColor="#FFF">
          {/* <Box bgColor="$primary400" zIndex={10} position="absolute" /> */}
          <HStack
            display="flex"
            alignItems="center"
            justifyContent="center"
            gap="$3"
            px="$2"
            flex={1}
          >
            <Pressable
              flex={1}
              display="flex"
              alignItems="center"
              justifyContent="center"
              bgColor={isFilterAll ? "$primary400" : "transparent"}
              borderRadius="$xl"
              onPress={() => setIsFilterAll(true)}
            >
              <Text
                py="$3"
                fontWeight="$bold"
                color={isFilterAll ? "$textColor" : "$primary400"}
              >
                Todos
              </Text>
            </Pressable>
            <Pressable
              flex={1}
              display="flex"
              alignItems="center"
              bgColor={!isFilterAll ? "$primary400" : "transparent"}
              borderRadius="$xl"
              onPress={() => setIsFilterAll(false)}
            >
              <Text
                py="$3"
                fontWeight="$bold"
                color={!isFilterAll ? "$textColor" : "$primary400"}
              >
                Inscritos
              </Text>
            </Pressable>
          </HStack>
        </Box>
      </Box>
      <FlatList
        data={events}
        keyExtractor={(item) => (item as Event).cdRegistroEvento.toString()}
        extraData={events}
        renderItem={({ item }) => (
          <EventCard event={item as Event} openEvent={openEvent} />
        )}
        ItemSeparatorComponent={() => <Box h="$5" />}
        ListEmptyComponent={
          <Center flex={1} pt="$2/3">
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
            borderRadius="$xl"
            mb="$1"
            shadowColor="$primary400"
            trigger={({ ...triggerProps }) => {
              return (
                <GlueButton {...triggerProps} gap="$2" borderRadius="$xl">
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
