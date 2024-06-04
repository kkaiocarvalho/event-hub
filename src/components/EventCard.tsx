import {
  Box,
  HStack,
  Text,
  VStack,
  AddIcon,
  CloseCircleIcon,
  BadgeText,
  Toast,
  ToastTitle,
  ToastDescription,
  InfoIcon,
} from "@gluestack-ui/themed";
import { formatDateToShow } from "../utils/helpers";
import { Pressable } from "react-native";
import { Badge } from "@gluestack-ui/themed";
import { useToast } from "@gluestack-ui/themed";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Icon } from "@gluestack-ui/themed";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useUserAndEventRelationship } from "../hook/useUserAndEventRelationship";
import { Event } from "../api/types";

type EventCardProps = {
  event: Event;
  openEvent: (event: Event) => void;
};

export function EventCard({ event, openEvent }: EventCardProps) {
  const { userEventStatus } = useUserAndEventRelationship(
    event.cdRegistroEvento
  );
  const configToast = useToast();
  const insets = useSafeAreaInsets();

  const showHelpMessage = () => {
    configToast.closeAll();
    configToast.show({
      placement: "top",
      render: () => {
        return (
          <Toast action="info" variant="accent" top={insets.top}>
            <Pressable onPress={() => configToast.closeAll()}>
              <VStack space="xs">
                <HStack alignItems="center" gap="$2">
                  <Icon as={InfoIcon} color="$background" />
                  <ToastTitle>Dica</ToastTitle>
                </HStack>
                <ToastDescription>
                  Pressione o card para abrir os detalhes do evento!
                </ToastDescription>
              </VStack>
            </Pressable>
          </Toast>
        );
      },
    });
  };

  return (
    <Pressable
      onLongPress={() => {
        configToast.closeAll();
        openEvent(event);
      }}
      onPress={() => showHelpMessage()}
    >
      <HStack
        alignItems="flex-start"
        gap={5}
        flex={1}
        bgColor="$lightBackground"
        borderRadius="$md"
        p="$2"
        borderLeftWidth={6}
        borderLeftColor="#038c8c" // você pode trocar a cor conforme necessário
      >
        <VStack flex={1}>
          <Box
            borderRadius="$lg"
            borderWidth="$0"
            display="flex"
            alignItems="baseline"
            p="$1"
            w="$full"
          >
            <Text
              fontSize="$xl"
              color="$background"
              fontWeight="$bold"
              numberOfLines={1}
              isTruncated={true}
            >
              {event.nomeEvento}
            </Text>
          </Box>

          <HStack>
            <Box
              flexDirection="row"
              flex={1}
              alignItems="center"
              justifyContent="space-between"
            >
              <HStack gap={4}>
                <Badge
                  size="sm"
                  variant="outline"
                  borderRadius="$md"
                  action="info"
                >
                  <BadgeText textTransform="capitalize">
                    {event.statusEvento}
                  </BadgeText>
                </Badge>
                <Badge
                  size="sm"
                  variant="outline"
                  borderRadius="$md"
                  action="info"
                >
                  <BadgeText textTransform="capitalize">
                    {userEventStatus}
                  </BadgeText>
                </Badge>
              </HStack>
              <Text fontSize="$xl" color="$background" fontWeight="$extrabold">
                {formatDateToShow(event.dtInicio)}
              </Text>
            </Box>
          </HStack>
        </VStack>
        <VStack>
          <Box
            ml="$2"
            pl="$2"
            flex={1}
            justifyContent="center"
            alignItems="center"
            p="$1"
            borderLeftWidth={2}
            borderLeftColor="black" // você pode trocar a cor conforme necessário7
            borderStyle="dashed"
          >
            <AntDesign name="right" size={24} color="black" />
          </Box>
        </VStack>
      </HStack>
    </Pressable>
  );
}
