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
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ToastDescription } from "@gluestack-ui/themed";
import { MotiView } from "moti";
import { InteractiveLogo } from "../components/InteractiveLogo";
import { RootStackProps } from "../routes/routes";

export function StartScreen({ navigation }: RootStackProps) {
  const configToast = useToast();
  const insets = useSafeAreaInsets();
  const hasIntegration = false;

  const showToast = () => {
    configToast.closeAll();
    configToast.show({
      placement: "top",
      render: () => {
        return (
          <Toast action="error" variant="accent" top={insets.top}>
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
          <InteractiveLogo withBackgrund />
        </Center>
        <MotiView
          from={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ type: "timing", duration: 2300 }}
        >
          <Center>
            <VStack w="80%" gap="$7" mb="$1/4">
              <Button
                w="$full"
                action="primary"
                variant="solid"
                onPress={() => navigation.navigate("Register")}
                text="Cadastrar"
              />
              <Button
                w="$full"
                action="primary"
                variant="solid"
                onPress={() => navigation.navigate("Login")}
                text="Entrar"
              />
            </VStack>
          </Center>
        </MotiView>
        {hasIntegration ? (
          <Center mt="$5">
            <Text color="$textColor">Entrar com</Text>
            <HStack gap="$8" my="$8" borderRadius="$lg">
              <Button
                leftIcon={FacebookIcon}
                variant="link"
                action="primary"
                p="$0"
                h="$full"
                onPress={() => showToast()}
              />
              <Button
                leftIcon={GoogleIcon}
                variant="link"
                action="primary"
                p="$0"
                h="$full"
                onPress={() => showToast()}
              />
              <Button
                leftIcon={LinkedinIcon}
                variant="link"
                action="primary"
                p="$0"
                h="$full"
                onPress={() => showToast()}
              />
            </HStack>
          </Center>
        ) : null}
      </VStack>
    </Background>
  );
}
