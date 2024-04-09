import {
  Center,
  HStack,
  Text,
  VStack,
  Box,
  useToast,
  Toast,
  ToastTitle,
  ToastDescription,
} from "@gluestack-ui/themed";
import { Button } from "../components/Button";
import { FacebookIcon } from "../icons/Facebook";
import { useState } from "react";
import { GoogleIcon } from "../icons/Google";
import { LinkedinIcon } from "../icons/Linkedin";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { navigateTo } from "../hook/NavigateTo";
import { SvgXml } from "react-native-svg";
import Logo from "../components/Logo";

export function StartScreen() {
  const { navigate } = navigateTo();
  const [toastId, setToastId] = useState();
  const toast = useToast();
  const insets = useSafeAreaInsets();
  const primaryColor = "$primary200";

  const showNotImplementedYet = () => {
    toast.close(toastId);
    toast.show({
      placement: "top",
      render: ({ id }) => {
        setToastId(id);
        const toastId = "toast-" + id;
        return (
          <Toast
            nativeID={toastId}
            action="info"
            variant="accent"
            top={insets.top}
          >
            <VStack space="xs">
              <ToastTitle>👷 Em andamento </ToastTitle>
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
    <Box
      h="$full"
      alignItems="center"
      justifyContent="center"
      bg={primaryColor}
    >
      <VStack
        h="95%"
        w="90%"
        justifyContent="space-between"
        bg="$background"
        rounded="$2xl"
        m="auto"
      >
        <Center h="$2/4">
          <SvgXml xml={Logo}/>
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
        <Center>
          <Text color="$textColor">Entrar com</Text>
          <HStack gap="$8" my="$8" bg="$primary200" borderRadius="$lg">
            <Button
              leftIcon={FacebookIcon}
              variant="link"
              action="secondary"
              p="$0"
              h="$full"
              onPress={() => showNotImplementedYet()}
            />
            <Button
              leftIcon={GoogleIcon}
              variant="link"
              action="secondary"
              p="$0"
              h="$full"
              onPress={() => showNotImplementedYet()}
            />
            <Button
              leftIcon={LinkedinIcon}
              variant="link"
              action="secondary"
              p="$0"
              h="$full"
              onPress={() => showNotImplementedYet()}
            />
          </HStack>
        </Center>
      </VStack>
    </Box>
  );
}
