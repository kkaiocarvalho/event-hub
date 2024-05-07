import { Center, Text, VStack } from "@gluestack-ui/themed";
import { Background } from "../components/Background";
import { Button } from "../components/Button";
import { InteractiveLogo } from "../components/InteractiveLogo";
import { navigateTo } from "../hook/NavigateTo";

export function CreateEvent() {
  const { goBack } = navigateTo();

  return (
    <Background paddingBottomTab>
      <VStack justifyContent="space-between" flex={1}>
        <Center py="$10">
          <InteractiveLogo />
        </Center>
        <Center>
          <Center w="80%" gap="$7">
            <Text>Create Event</Text>
            <Button
              w="$full"
              text="Voltar"
              action="negative"
              onPress={() => goBack()}
            />
          </Center>
        </Center>
      </VStack>
    </Background>
  );
}
