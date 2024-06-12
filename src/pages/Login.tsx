import { Center, VStack, HStack, Box } from "@gluestack-ui/themed";
import { Background } from "../components/Background";
import { Title } from "../components/Title";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAuth } from "../hook/useAuth";
import { AuthenticateVariables } from "../api/requests/authenticate";
import { Subtitle } from "../components/Subtitle";
import { InteractiveLogo } from "../components/InteractiveLogo";
import { SvgXml } from "react-native-svg";
import MiniLogo from "../components/MiniLogo";
import { LoopMiniLogo } from "../components/LoopMiniLogo";

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
    setFocus,
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const submit = (data: FormValues) => {
    if (!data) return;
    const body: AuthenticateVariables = {
      email: data.email.trim(),
      senha: data.password.trim(),
    };
    login(body);
  };

  return (
    <Background withScroll={true} withKeyboardDimiss>
      <VStack justifyContent="space-between" mt="$1/4">
        <HStack alignItems="center">
          <Box>
            <Title text="Login" />
          </Box>
          <LoopMiniLogo />
          
        </HStack>
        <Center p="$5">
          <VStack w="$full">
            <VStack>
              <Input
                placeholder="Digite seu e-mail"
                label="E-mail"
                inputName="email"
                control={control}
                errorMessage={errors.email?.message}
                nextInput={() => setFocus("password")}
              />
              <Input
                placeholder="Digite sua senha"
                label="Senha"
                inputName="password"
                control={control}
                secureTextEntry={true}
                errorMessage={errors.password?.message}
              />
            </VStack>
            <Button
              action="secondary"
              bgColor="#038C8C"
              variant="solid"
              text="Entrar"
              mt="$5"
              isLoading={loading}
              onPress={handleSubmit(submit)}
            />
          </VStack>
        </Center>
      </VStack>
    </Background>
  );
}
