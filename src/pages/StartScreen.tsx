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

import { MotiView, useAnimationState } from 'moti'
import { Pressable, useWindowDimensions, View, StyleSheet } from "react-native";

export function StartScreen() {
  const { navigate } = navigateTo();
  const configToast = useToast();
  const insets = useSafeAreaInsets();

  const { height } = useWindowDimensions()

  const animationState = useAnimationState({
    from: {
      opacity: 0.5, 
      translateY: -height, 
      rotateZ: "50deg", 
      rotateY: "30deg", 
      rotateX: "30deg"
    },
    intermediate: {
      opacity: 0.75,
      translateY: -height / 2,
      rotateZ: "-50deg", 
      rotateY: "-30deg", 
      rotateX: "-30deg"
    },
    to: {
      opacity: 1, 
      translateY: 0, 
      rotateZ: "0deg", 
      rotateY: "0deg", 
      rotateX: "0deg" 
    },
  });
  

  const handlePress = () => {
    animationState.transitionTo('from');
    animationState.transitionTo('intermediate');
    setTimeout(() => {
      animationState.transitionTo('to');
    }, 10);
  };

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
        <View style={styles.fundo}>
        <Pressable onPress={handlePress}>
            <MotiView 
              state={animationState}
              transition={{  
                type: "spring", 
                damping: 20, 
                rotateZ:{damping: 15, mass: 3}  
              }}
              >
              <SvgXml xml={Logo} />
            </MotiView>
          </Pressable>
        </View>
        </Center>
        
        <MotiView
        from={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ type: 'timing', duration: 2300}}
        >

        <Center>
          <VStack w="80%" gap="$7">
            <Button
              w="$full"
              action="secondary"
              bgColor="#038C8C"
              variant="solid"
              onPress={() => navigate("Register")}
              text="Cadastrar"
              />
            <Button
              w="$full"
              action="secondary"
              bgColor="#038C8C"
              variant="solid"
              onPress={() => navigate("Login")}
              text="Entrar"
              
            />
          </VStack>
        </Center>
        </MotiView>
        <Center mt="$5">
          <Text color="$textColor">Entrar com</Text>
          <HStack gap="$8" my="$8" /*bg="$secondary200"*/ borderRadius="$lg">
            <Button
              leftIcon={FacebookIcon}
              variant="link"
              action="positive"
              p="$0"
              h="$full"
              onPress={() => showToast()}
            />
            <Button
              leftIcon={GoogleIcon}
              variant="link"
              action="positive"
              p="$0"
              h="$full"
              onPress={() => showToast()}
            />
            <Button
              leftIcon={LinkedinIcon}
              variant="link"
              action="positive"
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

const styles = StyleSheet.create({
  fundo:{
    backgroundColor: "rgba(3, 140, 140, 0.4)",
    borderWidth: 0,
    width: 250,
    height: 300,
    zIndex: -1,
    justifyContent: "center",
    alignItems: "center",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 10,
  }
})
