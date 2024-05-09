import {
  ArrowLeftIcon,
  Box,
  ButtonGroup,
  ChevronsLeftIcon,
  ChevronsRightIcon,
  HStack,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import { Button } from "../components/Button";
import { navigateTo } from "../hook/NavigateTo";
import { AddressForm } from "./AdressForm";
import { EventForm } from "./EventForm";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { isValidCEP } from "@brazilian-utils/brazilian-utils";
import { CheckIcon } from "@gluestack-ui/themed";

export type EventFormValues = {
  eventForm: {
    name: string;
    complement: string;
  };
  addressForm: {
    addressCode: string;
    uf: string;
    city: string;
    number: string;
    address: string;
    complement?: string | null;
  };
};

const schema = yup.object({
  eventForm: yup.object({
    name: yup
      .string()
      .required("Nome do evento é obrigatório")
      .min(3, "Deve ter no mínimo 3 caracteres")
      .max(50, "Deve ter no máximo 50 caracteres"),

    complement: yup
      .string()
      .required("Nome do evento é obrigatório")
      .min(3, "Deve ter no mínimo 3 caracteres")
      .max(50, "Deve ter no máximo 50 caracteres"),
  }),
  addressForm: yup.object({
    addressCode: yup
      .string()
      .required("CEP é obrigatório")
      .test("test-address-code", "CEP inválido", isValidCEP),
    uf: yup
      .string()
      .required("Sigla do estado é obrigatória")
      .max(2, "Sigla do estado deve ter no máximo 2 caracteres"),
    city: yup
      .string()
      .required("Cidade é obrigatória")
      .min(3, "Deve ter no mínimo 3 caracteres")
      .max(50, "Cidade deve ter no máximo 50 caracteres"),
    number: yup.string().required("Número é obrigatório"),
    address: yup
      .string()
      .required("Logradouro é obrigatório")
      .min(4, "Logradouro deve ter no mínimo 4 caracteres")
      .max(50, "Logradouro deve ter no máximo 50 caracteres"),
    complement: yup
      .string()
      .max(100, "Complemento deve ter no máximo 100 caracteres")
      .notRequired(),
  }),
});

export function CreateEvent() {
  const { goBack } = navigateTo();
  const [step, setStep] = useState(1);
  const form = useForm<EventFormValues>({
    resolver: yupResolver(schema),
  });

  const validate = () => {
    form.trigger().then(() => {
      if (!form.formState.errors.eventForm) setStep(2);
    });
  };

  const submit = (data: EventFormValues) => {
    console.log({ cadastrar_evento: data });
  };

  return (
    <VStack justifyContent="space-between" flex={1} bgColor="$background">
      <HStack bgColor="$titleColor" alignItems="center">
        <Button
          leftIcon={ArrowLeftIcon}
          iconSize={25}
          text="Voltar"
          action="primary"
          variant="outline"
          borderWidth="$0"
          p="$0"
          onPress={() => goBack()}
        />
        <Text fontWeight="$bold" fontSize="$2xl">
          Criar um evento
        </Text>
      </HStack>
      {step === 1 ? <EventForm form={form} /> : <AddressForm form={form} />}
      <Box w="$full" display="flex" pb="$1/5">
        {step === 1 ? (
          <Button
            text="Próximo"
            rightIcon={ChevronsRightIcon}
            iconSize={25}
            onPress={validate}
          />
        ) : (
          <ButtonGroup>
            <Button
              text="Voltar"
              leftIcon={ChevronsLeftIcon}
              iconSize={25}
              flex={1}
              onPress={() => setStep(1)}
            />
            <Button
              text="Cadastrar"
              rightIcon={CheckIcon}
              iconSize={25}
              flex={1}
              onPress={form.handleSubmit(submit)}
            />
          </ButtonGroup>
        )}
      </Box>
    </VStack>
  );
}
