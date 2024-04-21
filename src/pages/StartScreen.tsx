import {
  Center,
  HStack,
  Text,
  Toast,
  ToastTitle,
  useToast,
  VStack,
} from "@gluestack-ui/themed";
import { Background } from "../components/Background";
import { Button } from "../components/Button";
import { FacebookIcon } from "../icons/Facebook";
import { GoogleIcon } from "../icons/Google";
import { LinkedinIcon } from "../icons/Linkedin";
import { navigateTo } from "../hook/NavigateTo";
import { SvgXml } from "react-native-svg";
import Logo from "../components/Logo";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ToastDescription } from "@gluestack-ui/themed";

export function StartScreen() {
  const { navigate } = navigateTo();
  const configToast = useToast();
  const insets = useSafeAreaInsets();

  const showToast = () => {
    configToast.close("toasts-show");
    configToast.show({
      placement: "top",
      render: () => {
        return (
          <Toast
            nativeID="toasts-show"
            action="error"
            variant="accent"
            top={insets.top}
          >
            <VStack space="xs">
              <ToastTitle>👷 Em andamento</ToastTitle>
              <ToastDescription>
                Ainda estamos trabalhando nisso. Esta funcionalidade virá em
                breve!
              </ToastDescription>
            </VStack>
          </Toast>
        );
      },
    });
  };

  return (
    <Background>
      <VStack justifyContent="space-between" flex={1}>
        <Center py="$10">
          <SvgXml xml={Logo} />
        </Center>
        <Center>
          <VStack w="80%" gap="$7">
            <Button
              w="$full"
              action="primary"
              variant="outline"
              onPress={() => navigate("Register")}
              text="Cadastrar"
            />
            <Button
              w="$full"
              action="primary"
              variant="outline"
              onPress={() => navigate("Login")}
              text="Entrar"
            />
          </VStack>
        </Center>
        <Center mt="$5">
          <Text color="$textColor">Entrar com</Text>
          <HStack gap="$8" my="$8" bg="$primary200" borderRadius="$lg">
            <Button
              leftIcon={FacebookIcon}
              variant="link"
              action="secondary"
              p="$0"
              h="$full"
              onPress={() => showToast()}
            />
            <Button
              leftIcon={GoogleIcon}
              variant="link"
              action="secondary"
              p="$0"
              h="$full"
              onPress={() => showToast()}
            />
            <Button
              leftIcon={LinkedinIcon}
              variant="link"
              action="secondary"
              p="$0"
              h="$full"
              onPress={() => showToast()}
            />
          </HStack>
        </Center>
      </VStack>
    </Background>
  );
}
