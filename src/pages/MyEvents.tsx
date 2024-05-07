import { ArrowLeftIcon, HStack, Text, VStack } from "@gluestack-ui/themed";
import { Button } from "../components/Button";
import { navigateTo } from "../hook/NavigateTo";
import { Events } from "./Events";

export function MyEvents() {
  const { goBack } = navigateTo();

  return (
    <VStack justifyContent="space-between" flex={1} bgColor="$background">
      <HStack bgColor="$titleColor" alignItems="center">
        <Button
          leftIcon={ArrowLeftIcon}
          iconSize={25}
          text="Voltar"
          action="primary"
          variant="outline"
          borderWidth="$0"
          p="$0"
          onPress={() => goBack()}
        />
        <Text fontWeight="$bold" fontSize="$2xl">
          Meus Eventos
        </Text>
      </HStack>

      <Events showOnlyMyEvents />
    </VStack>
  );
}
