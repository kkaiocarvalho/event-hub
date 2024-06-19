import {
  Center,
  Toast,
  ToastDescription,
  ToastTitle,
  useToast,
  VStack,
  HStack,
  Box,
} from "@gluestack-ui/themed";
import { Background } from "../components/Background";
import { Title } from "../components/Title";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMutation } from "@tanstack/react-query";
import {
  createUser,
  type CreateUserVariables,
} from "../api/requests/create-user";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { formatPhone, removeMasks } from "../utils/helpers";
import {
  formatCPF,
  isValidCPF,
  isValidPhone,
} from "@brazilian-utils/brazilian-utils";
import type {
  RequestErrorSchema,
  InvalidDataSchemaResponse,
  RequestErrorWithMessage,
} from "../config/request";
import { RootStackProps } from "../routes/routes";
import { ArrowLeftIcon } from "@gluestack-ui/themed";
import { LoopMiniLogoV2 } from "../components/MiniLogoV2";

type FormValues = {
  name: string;
  cpf: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
};

const schema = yup.object({
  name: yup
    .string()
    .min(4, "O nome deve ter pelo menos 4 caracteres")
    .max(255, "O nome não pode ter mais de 255 caracteres")
    .required('"Nome" é um campo obrigatório'),
  email: yup
    .string()
    .email("E-mail inválido")
    .required('"E-mail"  é um campo obrigatório'),
  cpf: yup
    .string()
    .required("CPF é obrigatório")
    .test("test-cpf", "CPF inválido", isValidCPF),
  phone: yup
    .string()
    .required("Telefone é obrigatório")
    .test("test-phone", "Telefone inválido", isValidPhone),
  password: yup
    .string()
    .min(6, "Senha deve conter mais de 6 caracteres")
    .required('"Senha"  é um campo obrigatório'),
  confirmPassword: yup
    .string()
    .required("Confirme a senha")
    .oneOf(
      [yup.ref("password"), '"Senha"  é um campo obrigatório'],
      "As senhas não conferem"
    ),
});

export function Register({ navigation }: RootStackProps) {
  const configToast = useToast();
  const insets = useSafeAreaInsets();
  const {
    formState: { errors },
    control,
    handleSubmit,
    setFocus,
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const createUserMutation = useMutation({
    mutationFn: createUser,
    onSuccess() {
      configToast.closeAll();
      configToast.show({
        placement: "top",
        render: () => (
          <Toast action="success" variant="accent" top={insets.top}>
            <VStack space="xs">
              <ToastTitle>Cadastro realizado com sucesso. </ToastTitle>
              <ToastDescription>Seja bem vindo ao Event Hub!</ToastDescription>
            </VStack>
          </Toast>
        ),
      });
      navigation.navigate("Login");
    },
    onError(error: RequestErrorSchema) {
      const message =
        (error as RequestErrorWithMessage)?.message ||
        (error as InvalidDataSchemaResponse)?.errors.join(", ");

      if (message) {
        configToast.closeAll();
        configToast.show({
          placement: "top",
          render: () => (
            <Toast action="error" variant="accent" top={insets.top}>
              <VStack space="xs">
                <ToastTitle>Erro durante o Cadastro </ToastTitle>
                <ToastDescription>{message}</ToastDescription>
              </VStack>
            </Toast>
          ),
        });
      }
    },
  });

  const submit = (data: FormValues) => {
    if (!data) return;
    const body: CreateUserVariables = {
      nome: data.name,
      cpf: removeMasks(data.cpf),
      email: data.email,
      telefone: removeMasks(data.phone),
      senha: data.password,
    };

    createUserMutation.mutate(body);
  };

  return (
    <Background withScroll={true} withKeyboardDimiss>
      <VStack justifyContent="space-between">
        <HStack alignItems="center">
          <Button
            leftIcon={ArrowLeftIcon}
            iconSize={24}
            borderRadius="$full"
            w="$6"
            sx={{ backgroundColor: "transparent" }}
            onPress={() => navigation.goBack()}
          />
          <Box>
            <Title text="Cadastrar" />
          </Box>
          <LoopMiniLogoV2 />
        </HStack>
        <Center p="$5">
          <VStack w="$full">
            <VStack>
              <Input
                placeholder="Digite seu nome"
                label="Nome"
                inputName="name"
                control={control}
                errorMessage={errors.name?.message}
                nextInput={() => setFocus("email")}
              />
              <Input
                placeholder="Digite seu e-mail"
                label="E-mail"
                inputName="email"
                control={control}
                errorMessage={errors.email?.message}
                nextInput={() => setFocus("cpf")}
              />
              <Input
                placeholder="000.000.000-00"
                format={formatCPF}
                label="CPF"
                inputName="cpf"
                control={control}
                errorMessage={errors.cpf?.message}
                nextInput={() => setFocus("phone")}
                keyboardType="numeric"
              />
              <Input
                placeholder="(00) 00000-0000"
                format={formatPhone}
                label="Telefone"
                inputName="phone"
                control={control}
                errorMessage={errors.phone?.message}
                nextInput={() => setFocus("password")}
                keyboardType="numeric"
              />
              <Input
                placeholder="Digite sua senha"
                label="Senha"
                inputName="password"
                control={control}
                secureTextEntry={true}
                errorMessage={errors.password?.message}
                nextInput={() => setFocus("confirmPassword")}
              />
              <Input
                placeholder="Confirme sua senha"
                label="Confirmar Senha"
                inputName="confirmPassword"
                control={control}
                secureTextEntry={true}
                errorMessage={errors.confirmPassword?.message}
              />
            </VStack>
            <Button
              action="primary"
              variant="solid"
              text="Cadastrar"
              mt="$5"
              isLoading={createUserMutation.isPending}
              onPress={handleSubmit(submit)}
            />
          </VStack>
        </Center>
      </VStack>
    </Background>
  );
}
