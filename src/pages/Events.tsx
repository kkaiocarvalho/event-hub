import {
  Center,
  VStack,
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
  Pressable,
  useToast,
  Toast,
  ToastTitle,
  ToastDescription,
} from "@gluestack-ui/themed";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  FilterEventField,
  QK_EVENT_LIST,
  FilterEventOperation,
  ParticipationStatus,
  EventStatus,
} from "../utils/constants";
import { useCallback, useEffect, useMemo, useState } from "react";
import { listEvents, ListEventsResponse } from "../api/requests/list-events";
import type { ListEventsVariables } from "../api/requests/list-events";
import { EventCard } from "../components/EventCard";
import { EventStackProps } from "../routes/EventsStack";
import { formatDateToSave } from "../utils/helpers";
import { useUser } from "../hook/useUser";
import { Event } from "../api/types";
import { InfiniteScroll } from "../components/InfiniteScroll";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const defaultFilter: ListEventsVariables = {
  filtros: [
    {
      operacao: FilterEventOperation.GREATER_THAN,
      campo: FilterEventField.START_DATE,
      valor: formatDateToSave(new Date()),
    },
    {
      operacao: FilterEventOperation.EQUAL,
      campo: FilterEventField.EVENT_STATUS,
      valor: EventStatus.OPEN,
    },
  ],
  apenasMeusEventos: "N",
  paginacao: {
    pagina: 0,
    qntItensPaginados: 15,
  },
};

const filterWithRegistered = {
  campo: FilterEventField.USER_STATUS,
  operacao: FilterEventOperation.EQUAL,
  valor: ParticipationStatus.REGISTERED,
};

export function Events({ navigation }: EventStackProps) {
  const { hasOrganizerPermission } = useUser();
  const queryClient = useQueryClient();
  const insets = useSafeAreaInsets();
  const configToast = useToast();
  const [events, setEvents] = useState<Event[]>([]);
  const [filters, setFilters] = useState<ListEventsVariables>(defaultFilter);
  const [isRefreshLoading, setIsRefreshLoading] = useState(false);
  const [withRegisteredFilter, setWithRegisteredFilter] = useState(false);
  const [filterLoading, setFilterLoading] = useState(false);

  const eventsQuery = useQuery({
    queryKey: [QK_EVENT_LIST, filters],
    queryFn: () => listEvents(filters),
  });

  const isLoading = eventsQuery.isLoading;
  const eventsData = eventsQuery?.data as ListEventsResponse;

  useEffect(() => {
    setFilterLoading(false);
    setFilterLoading(true);
    if (withRegisteredFilter) {
      setFilters((prev) => ({
        ...prev,
        filtros: [...prev.filtros, filterWithRegistered],
      }));
      setEvents([]);
    } else {
      setFilters((prev) => ({
        ...prev,
        filtros: prev.filtros.filter(
          (e) => e.campo !== FilterEventField.USER_STATUS
        ),
      }));
      setEvents([]);
    }
  }, [withRegisteredFilter]);

  useEffect(() => {
    if (eventsQuery.error?.message || eventsQuery.isError) {
      setIsRefreshLoading(false);
      setFilterLoading(false);
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
    setFilterLoading(false);
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
    queryClient.clear();
    setIsRefreshLoading(true);
    const defaultFilterWithRegistered: ListEventsVariables = {
      ...defaultFilter,
      filtros: [...defaultFilter.filtros, filterWithRegistered],
    };
    setFilters(
      withRegisteredFilter ? defaultFilterWithRegistered : defaultFilter
    );
    setEvents([]);
  }, [withRegisteredFilter]);

  const openEvent = (event: Event) => {
    navigation.navigate("EventDetails", { event });
  };

  return (
    <VStack bgColor="$background" flex={1} gap={10} px="$4" pt="$8">
      <Box w="$full" px="$8" h="$16" mb="$5">
        <Box flex={1} borderRadius="$2xl" bgColor="#FFF">
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
              bgColor={!withRegisteredFilter ? "$primary400" : "transparent"}
              borderRadius="$xl"
              onPress={() => setWithRegisteredFilter(false)}
            >
              <Text
                py="$3"
                fontWeight="$bold"
                color={!withRegisteredFilter ? "$textColor" : "$primary400"}
              >
                Todos
              </Text>
            </Pressable>
            <Pressable
              flex={1}
              display="flex"
              alignItems="center"
              bgColor={withRegisteredFilter ? "$primary400" : "transparent"}
              borderRadius="$xl"
              onPress={() => setWithRegisteredFilter(true)}
            >
              <Text
                py="$3"
                fontWeight="$bold"
                color={withRegisteredFilter ? "$textColor" : "$primary400"}
              >
                Inscritos
              </Text>
            </Pressable>
          </HStack>
        </Box>
      </Box>
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
        isLoading={isLoading || filterLoading}
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
