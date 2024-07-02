import {
  Box,
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
import { QK_ME } from "../utils/constants";
import { useQuery } from "@tanstack/react-query";
import { getMe, GetMeResponse } from "../api/requests/get-me";
import { formatDateToShow } from "../utils/helpers";
import { FontAwesome5, AntDesign, Entypo } from "@expo/vector-icons";
import { MotiView } from "moti";
import { Pressable, useWindowDimensions } from "react-native";
import { useTouchAnimation } from "../hook/useTouchAnimation";

export function Profile() {
  const { height } = useWindowDimensions();
  const { touchAnimation, animationState } = useTouchAnimation();
  const getMeQuery = useQuery({ queryKey: [QK_ME], queryFn: getMe });
  const userData: GetMeResponse | undefined =
    (getMeQuery.data as GetMeResponse) || undefined;

  return (
    <Background paddingBottomTab>
      <VStack justifyContent="space-between" flex={1}>
        <VStack flex={1}>
          <HStack alignItems="center"></HStack>
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
              <MotiView
                from={{
                  opacity: 0.5,
                  translateY: -height,
                  rotateZ: "50deg",
                  rotateY: "30deg",
                  rotateX: "30deg",
                }}
                animate={{
                  opacity: 1,
                  translateY: 0,
                  rotateZ: "0deg",
                  rotateY: "0deg",
                  rotateX: "0deg",
                }}
                transition={{
                  type: "spring",
                  damping: 20,
                  rotateZ: { damping: 15, mass: 3 },
                }}
              >
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
                  <HStack p={5} gap={10} alignItems="center" height={250}>
                    <Pressable onPress={touchAnimation}>
                      <MotiView state={animationState}>
                        <FontAwesome5
                          name="user-astronaut"
                          size={150}
                          color="white"
                        />
                      </MotiView>
                    </Pressable>
                  </HStack>
                  <Divider my="$0.5" bgColor="#f2f2f2" w="$4/5" />
                  <Box>
                    <Box alignItems="center" justifyContent="center">
                      <HStack p={10}>
                        <AntDesign name="idcard" size={20} color="white" />
                        <Text color="$textColor" fontSize={20} marginLeft={10}>
                          {userData.nome}
                        </Text>
                      </HStack>
                    </Box>
                    <Box alignItems="center" justifyContent="center">
                      <HStack p={10}>
                        <Entypo name="email" size={20} color="white" />
                        <Text color="$textColor" fontSize={20} marginLeft={10}>
                          {userData.email}
                        </Text>
                      </HStack>
                    </Box>
                    <Box alignItems="center" justifyContent="center">
                      <HStack p={10}>
                        <Entypo name="phone" size={20} color="white" />
                        <Text color="$textColor" fontSize={20} marginLeft={10}>
                          {userData.telefone}
                        </Text>
                      </HStack>
                    </Box>

                    <Box alignItems="center" padding={10}>
                      <Badge
                        size="lg"
                        variant="outline"
                        borderRadius="$md"
                        action="info"
                      >
                        <BadgeText fontSize={15}>
                          Cargo: {userData.permissao}
                        </BadgeText>
                        <BadgeIcon as={GlobeIcon} ml="$1" />
                      </Badge>
                      <Text
                        color="$textColorOpacity"
                        fontSize={15}
                        p={5}
                        paddingTop={15}
                      >
                        Entrou em:{" "}
                        {formatDateToShow(userData.dataInclusao, {
                          withTime: true,
                        })}
                      </Text>
                    </Box>
                  </Box>
                </Box>
              </MotiView>
            </>
          )}
        </VStack>
      </VStack>
    </Background>
  );
}
