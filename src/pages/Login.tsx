import { Center, VStack } from "@gluestack-ui/themed";
import { Background } from "../components/Background";
import { Title } from "../components/Title";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAuth } from "../hook/useAuth";
import { AuthenticateVariables } from "../api/requests/authenticate";
import { Pressable, StyleSheet, useWindowDimensions } from "react-native";
import { MotiView, useAnimationState } from 'moti'
import { SvgXml } from "react-native-svg";
import Logo from "../components/Logo";
import { Subtitle } from "../components/Subtitle";
;

type FormValues = {
  email: string;
  password: string;
};

const schema = yup.object({
  email: yup
    .string()
    .email("E-mail inválido")
    .required('"E-mail"  é um campo obrigatório'),
  password: yup
    .string()
    .min(6, "Senha deve conter mais de 6 caracteres")
    .max(12, "Senha deve conter no maximo 12 caracteres")
    .required('"Senha"  é um campo obrigatório'),
});

export function Login() {
  const { login, loading } = useAuth();
  //TODO: improvement in input to pass password boolean props
  //TODO: add max and min for inputs
  const {
    formState: { errors },
    control,
    handleSubmit,
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const submit = (data: FormValues) => {
    if (!data) return;
    const body: AuthenticateVariables = {
      email: data.email,
      senha: data.password,
    };
    login(body);
  };

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

  return (
    <Background withScroll={true}>
      <VStack justifyContent="space-between" mt="$1/4">
        <VStack>
        
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

          <Subtitle text="Prossiga com seu "/>
          <Title text="Login" />
        </VStack>
        <Center p="$5">
          <VStack w="$full">
            <VStack>
              <Input style={styles.input}
                placeholder="Digite seu e-mail"
                label="E-mail"
                inputName="email"
                control={control}
                errorMessage={errors.email?.message}
              />
              <Input style={styles.input}
                placeholder="Digite sua senha"
                label="Senha"
                inputName="password"
                control={control}
                errorMessage={errors.password?.message}
              />
            </VStack>
            <Button
              action="secondary"
              bgColor="#038C8C"
              variant="solid"
              text="Entrar"
              mt="$5"
              isDisabled={loading}
              onPress={handleSubmit(submit)}
            />
          </VStack>
        </Center>
      </VStack>
    </Background>
  );
}

const styles = StyleSheet.create({
  input:{
    backgroundColor: "rgba(3, 140, 140, 0.5)",
    borderWidth: 0,
    color: "#F2F2F2",
  }
})
