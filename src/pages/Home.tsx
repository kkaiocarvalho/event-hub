import {
  Box,
  Center,
  HStack,
  Spinner,
  Text,
  VStack,
  Divider,
  Badge,
  BadgeText,
  BadgeIcon,
  GlobeIcon,
} from "@gluestack-ui/themed";
import { Background } from "../components/Background";
import { Button } from "../components/Button";
import { useAuth } from "../hook/useAuth";
import { QK_ME } from "../utils/constants";
import { useQuery } from "@tanstack/react-query";
import { getMe, GetMeResponse } from "../api/requests/get-me";
import { formatDateToShow } from "../utils/helpers";
import { SvgXml } from "react-native-svg";
import { Title } from "../components/Title";
import MiniLogo from "../components/MiniLogo";
import { FontAwesome5 } from "@expo/vector-icons";

export function Home() {
  const { logout } = useAuth();
  const getMeQuery = useQuery({ queryKey: [QK_ME], queryFn: getMe });
  const userData: GetMeResponse | undefined =
    (getMeQuery.data as GetMeResponse) || undefined;

  return (
    <Background paddingBottomTab>
      <VStack justifyContent="space-between" flex={1}>
        <VStack flex={1}>
          <HStack alignItems="center">
            <Box>
              <Title text="Home" />
            </Box>
            <Box>
              <SvgXml xml={MiniLogo} />
            </Box>
          </HStack>
          {getMeQuery.isLoading ? (
            <Box
              flex={1}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Spinner size={50} />
            </Box>
          ) : (
            <>
              <Box
                backgroundColor="$backgroundLogo"
                p="$5"
                borderTopRightRadius={30}
                borderBottomRightRadius={10}
                borderBottomLeftRadius={30}
                borderTopLeftRadius={10}
                alignItems="center"
                justifyContent="center"
              >
                <HStack p={5} gap={10} alignItems="center">
                  <FontAwesome5 name="user-astronaut" size={24} color="white" />
                  <Text color="$textColor" fontSize={30}>
                    Meu Perfil
                  </Text>
                </HStack>
                <Divider my="$0.5" bgColor="#f2f2f2" w="$4/5" />
                <Text color="$textColor" p={5}>
                  Usuário: {userData.nome}
                </Text>
                <Text color="$textColor" p={5}>
                  Email: {userData.email}
                </Text>
                <Text color="$textColor" p={5}>
                  Telefone: {userData.telefone}
                </Text>
                <Badge
                  size="lg"
                  variant="outline"
                  borderRadius="$md"
                  action="info"
                >
                  <BadgeText>Cargo: {userData.permissao}</BadgeText>
                  <BadgeIcon as={GlobeIcon} ml="$1" />
                </Badge>
                <Text color="$textColorOpacity" p={5}>
                  Entrou em:{" "}
                  {formatDateToShow(userData.dataInclusao, { withTime: true })}
                </Text>
              </Box>
            </>
          )}
        </VStack>
        <Center gap="$7">
          <Button
            w="$full"
            text="Sair"
            action="negative"
            onPress={() => logout()}
          />
        </Center>
      </VStack>
    </Background>
  );
}
