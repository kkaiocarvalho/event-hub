import { Badge, BadgeText, HStack, Text, VStack } from "@gluestack-ui/themed";
import { SubscribedUser } from "../api/requests/list-subscribed-in-event";

type UserCardProps = {
  user: SubscribedUser;
};
export function UserCard({ user }: UserCardProps) {
  return (
    <HStack bgColor="$primary400" alignItems="center" borderRadius="$md" p="$2">
      <VStack flex={1}>
        <HStack gap={4}>
          <Text color="#D1D1D1" fontSize="$sm" textAlignVertical="bottom">
            Nome:
          </Text>
          <Text color="$textColor" fontSize="$md">
            {user.nomeParticipante}
          </Text>
        </HStack>

        <HStack gap={4}>
          <Text color="#D1D1D1" fontSize="$xs">
            E-mail:
          </Text>
          <Text fontSize="$xs" color="$textColor">
            {user.nomeParticipante}
          </Text>
        </HStack>
        <HStack gap={8} py="$1">
          <Badge size="md" variant="outline" borderRadius="$md" action="info">
            <BadgeText textTransform="capitalize">
              {user.statusParticipacao}
            </BadgeText>
          </Badge>
          {user.sorteado === "S" ? (
            <Badge size="md" variant="outline" borderRadius="$md" action="info">
              <BadgeText textTransform="capitalize">Sorteado</BadgeText>
            </Badge>
          ) : null}
        </HStack>
      </VStack>
      <Text
        color="$primary700"
        fontSize="$5xl"
        fontWeight="$bold"
        style={{ letterSpacing: -2 }}
      >
        #{user.nuRegistroParticipacao.toString().padStart(2, "0")}
      </Text>
    </HStack>
  );
}
