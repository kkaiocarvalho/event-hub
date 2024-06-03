import {
  HStack,
  VStack,
  Text,
  ScrollView,
  useToast,
  Toast,
  ToastTitle,
  ToastDescription,
  CloseCircleIcon,
} from "@gluestack-ui/themed";
import { Background } from "../components/Background";
import {
  Event,
  listEvents,
  ListEventsResponse,
  ListEventsVariables,
} from "../api/requests/list-events";
import { EventStackProps } from "../routes/EventsStack";
import { Button } from "../components/Button";
import { formatDateToShow } from "../utils/helpers";
import { useUser } from "../hook/useUser";
import { useUserDndEventRelationship } from "../hook/useUserDndEventRelationship";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  manageSubscriptionEvent,
  ManageSubscriptionEventResponse,
} from "../api/requests/manage-subscription-event";
import {
  InvalidDataSchemaResponse,
  RequestErrorWithMessage,
  RequestErrorSchema,
} from "../config/request";
import { ComponentProps, useEffect, useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  FilterEventField,
  FilterEventOperation,
  QK_EVENT,
} from "../utils/constants";

type EventInfo = {
  title: string;
  value: string;
} & ComponentProps<typeof Text>;

export function EventDetails({ route, navigation }: EventStackProps) {
  //TODO: multiple render because params and set event data,
  // must be fixed when event get endpoint is finished.
  const queryClient = useQueryClient();
  const routeEvent = (route.params as { event: Event }).event as Event;
  const [event, setEvent] = useState(routeEvent);
  const { hasOrganizerPermission, userData } = useUser();
  const configToast = useToast();
  const insets = useSafeAreaInsets();
  const { cdRegistroEvento } = routeEvent;

  const defaultFilter: ListEventsVariables = {
    filtros: [
      {
        operacao: FilterEventOperation.EQUAL,
        campo: FilterEventField.ID,
        valor: cdRegistroEvento.toString(),
      },
    ],
    apenasMeusEventos: "N",
    paginacao: {
      pagina: 0,
      qntItensPaginados: 10,
    },
  };

  const eventsQuery = useQuery({
    queryKey: [QK_EVENT, defaultFilter],
    queryFn: () => listEvents(defaultFilter),
  });

  const eventData = eventsQuery.data as ListEventsResponse;

  useEffect(() => {
    if (!eventData?.eventos.length) return setEvent(routeEvent);
    if (event !== eventData.eventos[0]) return setEvent(eventData.eventos[0]);
  }, [eventData, routeEvent]);

  const {
    userEventStatus,
    interactionButtonTitle,
    interactionButtonAction,
    interactionButtonIcon,
    canInteractWithButton,
    interactWithEventBody,
  } = useUserDndEventRelationship(event);

  const manageSubscriptionEventMutation = useMutation({
    mutationFn: manageSubscriptionEvent,
    onSuccess(response) {
      configToast.close("toasts-show");
      configToast.show({
        placement: "top",
        render: () => {
          return (
            <Toast
              nativeID="toasts-show"
              action="success"
              variant="accent"
              top={insets.top}
            >
              <VStack space="xs">
                <ToastTitle>Sucesso</ToastTitle>
                <ToastDescription>
                  {
                    (response as ManageSubscriptionEventResponse)
                      .statusInscricaoEvento
                  }
                  com sucesso!
                </ToastDescription>
              </VStack>
            </Toast>
          );
        },
      });
      queryClient.refetchQueries({ queryKey: [QK_EVENT] });
    },
    onError(error: RequestErrorSchema) {
      const message =
        (error as RequestErrorWithMessage)?.message ||
        (error as InvalidDataSchemaResponse)?.errors.join(", ");

      if (message) {
        configToast.close("toasts-show");
        configToast.show({
          placement: "top",
          render: () => {
            return (
              <Toast
                nativeID="toasts-show"
                action="error"
                variant="accent"
                top={insets.top}
              >
                <VStack space="xs">
                  <ToastTitle>Erro ao interagir com evento</ToastTitle>
                  <ToastDescription>{message}</ToastDescription>
                </VStack>
              </Toast>
            );
          },
        });
      }
    },
  });

  const handleEventInteract = () => {
    const body = interactWithEventBody();
    if (!body) return;
    manageSubscriptionEventMutation.mutate(body);
  };

  const isEventCreator =
    hasOrganizerPermission && event.nomeResponsavel === userData?.nome;

  const eventInfo: EventInfo[] = [
    { title: "Nome do Evento:", value: event?.nomeEvento ?? "-", pl: "$4" },
    {
      title: "Complemento:",
      verticalAlign: "top",
      pl: "$4",
      value: event?.complementoEvento ?? "-",
    },
    {
      title: "Início:",
      textAlign: "center",
      value: event?.dtInicio
        ? formatDateToShow(event?.dtInicio, { withTime: true })
        : "-",
    },
    {
      title: "Final:",
      textAlign: "center",
      value: event?.dtEncerramento
        ? formatDateToShow(event?.dtEncerramento, { withTime: true })
        : "-",
    },
    {
      title: "Status",
      textAlign: "center",
      value: userEventStatus,
    },
  ];

  const isLoading =
    manageSubscriptionEventMutation.isPending || eventsQuery.isLoading;

  const RenderInfo = ({ title, value, ...props }: EventInfo) => (
    <VStack gap={4} key={title}>
      <Text color="black" fontWeight="$bold">
        {title}
      </Text>
      <Text
        color="$textColor"
        borderColor="$primary400"
        borderWidth="$4"
        bgColor="$background"
        p="$2"
        borderRadius="$xl"
        lineHeight="$sm"
        fontSize="$sm"
        textAlignVertical="center"
        {...props}
      >
        {value}
      </Text>
    </VStack>
  );

  return (
    <Background>
      <VStack flex={1} pb="$12" gap={8}>
        <VStack
          flex={1}
          borderWidth="$4"
          borderColor="$primary400"
          borderRadius="$3xl"
          p="$4"
          bgColor="$textColor"
        >
          <ScrollView>{eventInfo.map((e) => RenderInfo(e))}</ScrollView>
        </VStack>
        <VStack gap={8}>
          {isEventCreator ? (
            <>
              <Button
                h="$16"
                text="Participantes"
                action="positive"
                iconSize={24}
                onPress={() =>
                  navigation.navigate("EventParticipants", { event: event })
                }
                rightIcon={() => (
                  <MaterialCommunityIcons
                    name="account-group"
                    size={24}
                    color="#F2F2F2"
                    style={{ marginLeft: 8 }}
                  />
                )}
              />
              <Button
                h="$16"
                text="Gerar QR code"
                iconSize={24}
                rightIcon={() => (
                  <MaterialCommunityIcons
                    name="qrcode"
                    size={24}
                    color="#F2F2F2"
                    style={{ marginLeft: 8 }}
                  />
                )}
              />
            </>
          ) : null}
          <HStack gap={8}>
            {isEventCreator ? (
              <Button
                flex={1}
                text="Cancelar"
                iconSize={24}
                rightIcon={CloseCircleIcon}
                action="negative"
              />
            ) : (
              <Button
                flex={1}
                text={interactionButtonTitle}
                iconSize={24}
                action={interactionButtonAction}
                rightIcon={interactionButtonIcon}
                isDisabled={!canInteractWithButton}
                isLoading={isLoading}
                onPress={() => handleEventInteract()}
              />
            )}
          </HStack>
        </VStack>
      </VStack>
    </Background>
  );
}
