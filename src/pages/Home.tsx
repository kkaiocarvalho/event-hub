import { Center, Text, VStack } from "@gluestack-ui/themed";
import { Background } from "../components/Background";
import { SvgXml } from "react-native-svg";
import Logo from "../components/Logo";
import { getStorageItem } from "../utils/storage";
import { AUTH_TOKEN } from "../utils/constants";
import { useState } from "react";
import { Button } from "../components/Button";
import { useAuth } from "../hook/useAuth";
import { InteractiveLogo } from "../components/InteractiveLogo";

export function Home() {
  const { logout } = useAuth();
  const [token, setToken] = useState<string | null>(null);
  (async () => await getStorageItem(AUTH_TOKEN))().then((value) => {
    setToken(value);
  });
  return (
    <Background>
      <VStack justifyContent="space-between" flex={1}>
        <Center py="$10">
          <InteractiveLogo />
        </Center>
        <Center>
          <Center w="80%" gap="$7">
            <Text>HOME</Text>
            <Text textAlign="center">{token}</Text>
            <Button text="Sair" action="negative" onPress={() => logout()} />
          </Center>
        </Center>
      </VStack>
    </Background>
  );
}
