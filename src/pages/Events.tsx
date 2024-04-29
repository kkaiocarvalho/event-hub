import {
  Text,
  Center,
  useToast,
  Toast,
  VStack,
  ToastTitle,
  ToastDescription,
} from "@gluestack-ui/themed";
import { useQuery } from "@tanstack/react-query";
import { QK_EVENT_LIST } from "../utils/constants";
import { useEffect, useState } from "react";
import {
  listEvents,
  type ListEventsVariables,
} from "../api/requests/list-events";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const defaultFilter: ListEventsVariables = {
  filtros: [],
  apenasMeusEventos: "N",
  paginacao: {
    pagina: 0,
    qntItensPaginados: 10,
  },
};

export function Events() {
  const [toastId, setToastId] = useState<string | null>(null);
  const [filters, setFilters] = useState<ListEventsVariables>(defaultFilter);
  const configToast = useToast();
  const insets = useSafeAreaInsets();

  const eventsQuery = useQuery({
    queryKey: [QK_EVENT_LIST, filters],
    queryFn: () => listEvents(filters),
  });

  const showErrorToast = () => {
    configToast.close(toastId);
    configToast.show({
      placement: "top",
      render: ({ id }) => {
        setToastId("toast-" + id);
        return (
          <Toast
            nativeID={"toast-" + id}
            action="error"
            variant="accent"
            top={insets.top}
          >
            <VStack space="xs">
              <ToastTitle>Erro na listagem de eventos</ToastTitle>
              <ToastDescription>{eventsQuery.error?.message}</ToastDescription>
            </VStack>
          </Toast>
        );
      },
    });
    return null;
  };

  const showSuccessToast = () => {
    configToast.close(toastId);
    configToast.show({
      placement: "top",
      render: ({ id }) => {
        setToastId("toast-" + id);
        return (
          <Toast
            nativeID={"toast-" + id}
            action="success"
            variant="accent"
            top={insets.top}
          >
            <VStack space="xs">
              <ToastTitle>Listagem realizada com sucesso!</ToastTitle>
              <ToastDescription>
                Estes são os eventos disponíveis atualmente
              </ToastDescription>
            </VStack>
          </Toast>
        );
      },
    });
    return null;
  };

  useEffect(() => console.log({ eventsQuery }), [eventsQuery]);
  return (
    <Center flex={1}>
      <Text>Listagem de eventos</Text>
    </Center>
  );
}
