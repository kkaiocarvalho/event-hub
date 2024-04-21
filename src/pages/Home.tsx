import { Center, Text, VStack } from "@gluestack-ui/themed";
import { Background } from "../components/Background";
import { SvgXml } from "react-native-svg";
import Logo from "../components/Logo";
import { getStorageItem } from "../utils/storage";
import { AUTH_TOKEN } from "../utils/constants";
import { useState } from "react";

export function Home() {
  const [token, setToken] = useState<string | null>(null);
  (async () => await getStorageItem(AUTH_TOKEN))().then((value) => {
    setToken(value);
  });
  return (
    <Background>
      <VStack justifyContent="space-between" flex={1}>
        <Center py="$10">
          <SvgXml xml={Logo} />
        </Center>
        <Center>
          <Center w="80%" gap="$7">
            <Text>HOME</Text>
            <Text>{token}</Text>
          </Center>
        </Center>
      </VStack>
    </Background>
  );
}
