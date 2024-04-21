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

//TODO: regex in cpf and phone
//TODO: mask in cpf and phone
//const phoneRegex = /^\(\d{2}\)\s\d{5}-\d{4}$/;
//const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;

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
    //.matches(cpfRegex, "CPF inválido")
    .required("CPF é obrigatório"),
  phone: yup
    .string()
    //.matches(phoneRegex, "Telefone inválido")
    .required("Telefone é obrigatório"),
  password: yup
    .string()
    .min(6, "Senha deve conter mais de 6 caracteres")
    .max(12, "Senha deve conter no maximo 12 caracteres")
    .required('"Senha"  é um campo obrigatório'),
  confirmPassword: yup
    .string()
    .required("Confirme a senha")
    .oneOf(
      [yup.ref("password"), '"Senha"  é um campo obrigatório'],
      "As senhas não conferem"
    ),
});

export function Register() {
  //TODO: improvement in input to pass password boolean props
  //TODO: add max and min for inputs
  const {
    formState: { errors },
    control,
    handleSubmit,
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const createUserMutation = useMutation({
    mutationFn: createUser,
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
    const body: CreateUserVariables = {
      nome: data.name,
      cpf: data.cpf,
      email: data.email,
      telefone: data.phone,
      senha: data.password,
    };

    createUserMutation.mutate(body);
  };

  return (
    <Background withScroll={true}>
      <VStack justifyContent="space-between">
        <VStack>
          <Title text="Cadastro" />
          {/*<Subtitle text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." />*/}
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
                keyboardType="numeric"
              />
              <Input
                placeholder="(00) 00000-0000"
                label="Telefone"
                inputName="phone"
                control={control}
                errorMessage={errors.phone?.message}
                keyboardType="numeric"
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
