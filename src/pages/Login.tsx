import { Center, VStack } from "@gluestack-ui/themed";
import { Background } from "../components/Background";
import { Title } from "../components/Title";
import { Subtitle } from "../components/Subtitle";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMutation } from "@tanstack/react-query";

import { loginUser, type LoginUserVariables } from "../api/requests/login";

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
  //TODO: improvement in input to pass password boolean props
  //TODO: add max and min for inputs
  const {
    formState: { errors },
    control,
    handleSubmit,
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const loginUserMutation = useMutation({
    mutationFn: loginUser,
    //TODO: create a hook to compile onSuccess and onError function toasts
    onSuccess(data) {
      //TODO: toast provider to inform user of success
      console.log({ data });
    },
    onError(error) {
      //TODO: toast provider to inform user of error
      console.log({ error });
    },
  });

  const submit = (data: FormValues) => {
    if (!data) return;
    const dataMock: FormValues = {
      email: "adamastor04@gmail.com",
      password: "senhaforte01",
    };

    const body: LoginUserVariables = {
      email: dataMock.email,
      senha: dataMock.password,
    };

    loginUserMutation.mutate(body);
  };

  return (
    <Background withScroll={true}>
      <VStack justifyContent="space-between" mt="$2/4">
        <VStack>
          <Title text="Login" />
        </VStack>
        <Center p="$5">
          <VStack w="$full">
            <VStack>
              <Input
                placeholder="Digite seu e-mail"
                label="E-mail"
                inputName="email"
                control={control}
                errorMessage={errors.email?.message}
              />
              <Input
                placeholder="Digite sua senha"
                label="Senha"
                inputName="password"
                control={control}
                errorMessage={errors.password?.message}
              />
            </VStack>
            <Button
              action="primary"
              variant="outline"
              text="Entrar"
              mt="$5"
              isDisabled={loginUserMutation.isPending}
              onPress={handleSubmit(submit)}
            />
          </VStack>
        </Center>
      </VStack>
    </Background>
  );
}
