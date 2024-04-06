import { Text } from "@gluestack-ui/themed";
import {
  ArrowRightIcon,
  Box,
  Button,
  ButtonIcon,
  ButtonText,
  Center,
  EditIcon,
  HStack,
  Icon,
  RemoveIcon,
  VStack,
} from "@gluestack-ui/themed";
import { Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigation } from "../routes/routes";

export function StartScreen() {
  const navigation = useNavigation<StackNavigation>();

  return (
    <Box h="$full" justifyContent="space-between" bg="$background">
      <Center h="$2/3">
        <Image
          source={require("../assets/cup_and_text.png")}
          resizeMode="cover"
        />
      </Center>
      <Center>
        <VStack w="80%" pb="$10" gap="$5">
          <Button
            w="$full"
            h="$16"
            action="secondary"
            onPress={() => navigation.navigate("Register")}
          >
            <ButtonText>Registrar</ButtonText>
            <ButtonIcon as={EditIcon} ml="$2"></ButtonIcon>
          </Button>
          <Center>
            <HStack alignItems="center" gap="$2">
              <Icon as={RemoveIcon} color="$primary0" />
              <Text color="$primary0" textTransform="uppercase">
                Or
              </Text>
              <Icon as={RemoveIcon} color="$primary0" />
            </HStack>
          </Center>
          <Button
            w="$full"
            h="$16"
            action="secondary"
            onPress={() => navigation.navigate("Login")}
          >
            <ButtonText>Login</ButtonText>
            <ButtonIcon as={ArrowRightIcon} ml="$2"></ButtonIcon>
          </Button>
        </VStack>
      </Center>
    </Box>
  );
}
