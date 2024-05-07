import { Center, Text, VStack } from "@gluestack-ui/themed";
import { Background } from "../components/Background";
import { Button } from "../components/Button";
import { useAuth } from "../hook/useAuth";
import { InteractiveLogo } from "../components/InteractiveLogo";
import { HomeStackProps } from "../routes/HomeStack";

export function Home({ navigation }: HomeStackProps) {
  const { logout } = useAuth();

  return (
    <Background paddingBottomTab>
      <VStack justifyContent="space-between" flex={1}>
        <Center py="$10">
          <InteractiveLogo />
        </Center>
        <Center>
          <Center w="80%" gap="$7">
            <Text>HOME</Text>
            <Button
              w="$full"
              text="Criar evento"
              action="positive"
              onPress={() => navigation.navigate("CreateEvent")}
            />
            <Button
              w="$full"
              text="Meus eventos"
              action="primary"
              onPress={() => navigation.navigate("MyEvents")}
            />
            <Button
              w="$full"
              text="Sair"
              action="negative"
              onPress={() => logout()}
            />
          </Center>
        </Center>
      </VStack>
    </Background>
  );
}
