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
import {
  createUser,
  type CreateUserVariables,
} from "../api/requests/create-user";

type FormValues = {
  name: string;
  cpf: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
};

const schema = yup.object({
  name: yup.string().required('"Nome" é um campo obrigatório'),
  cpf: yup.string().required('"CPF"  é um campo obrigatório'),
  email: yup
    .string()
    .email("E-mail inválido")
    .required('"E-mail"  é um campo obrigatório'),
  phone: yup.string().required('"Telefone"  é um campo obrigatório'),
  password: yup.string().required('"Senha"  é um campo obrigatório'),
  confirmPassword: yup
    .string()
    .required("Confirme a senha")
    .oneOf(
      [yup.ref("password"), '"Senha"  é um campo obrigatório'],
      "As senhas não conferem"
    ),
});

export function Register() {
  //TODO: regex in cpf and phone
  //TODO: improvement in input to pass password boolean props
  //TODO: add max and min for inputs
  const {
    formState: { errors },
    control,
    handleSubmit,
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const createUserMutation = useMutation({ mutationFn: createUser });

  const submit = (data: FormValues) => {
    if (!data) return;
    const dataMock: FormValues = {
      name: "Adamastores",
      cpf: "44566878914",
      email: "adamastor04@gmail.com",
      phone: "34988776655",
      password: "senhaforte01",
      confirmPassword: "senhaforte01",
    };

    const body: CreateUserVariables = {
      nome: dataMock.name,
      cpf: dataMock.cpf,
      email: dataMock.email,
      telefone: dataMock.phone,
      senha: dataMock.password,
    };

    createUserMutation.mutate(body);
  };

  return (
    <Background withScroll={true}>
      <VStack justifyContent="space-between">
        <VStack>
          <Title text="Cadastro:" />
          <Subtitle text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." />
        </VStack>
        <Center p="$5">
          <VStack w="$full">
            <VStack>
              <Input
                placeholder="Digite seu nome"
                label="Nome"
                inputName="name"
                control={control}
                errorMessage={errors.name?.message}
              />
              <Input
                placeholder="Digite seu e-mail"
                label="E-mail"
                inputName="email"
                control={control}
                errorMessage={errors.email?.message}
              />
              <Input
                placeholder="000.000.000-00"
                label="CPF"
                inputName="cpf"
                control={control}
                errorMessage={errors.cpf?.message}
              />
              <Input
                placeholder="(00) 00000-0000"
                label="Telefone"
                inputName="phone"
                control={control}
                errorMessage={errors.phone?.message}
              />
              <Input
                placeholder="Digite sua senha"
                label="Senha"
                inputName="password"
                control={control}
                errorMessage={errors.password?.message}
              />
              <Input
                placeholder="Confirme sua senha"
                label="Confirmar Senha"
                inputName="confirmPassword"
                control={control}
                errorMessage={errors.confirmPassword?.message}
              />
            </VStack>
            <Button
              action="primary"
              variant="outline"
              text="Cadastrar"
              mt="$5"
              isDisabled={createUserMutation.isPending}
              onPress={handleSubmit(submit)}
            />
          </VStack>
        </Center>
      </VStack>
    </Background>
  );
}
