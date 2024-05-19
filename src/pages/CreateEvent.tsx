import {
  ArrowLeftIcon,
  Box,
  ButtonGroup,
  ChevronsLeftIcon,
  ChevronsRightIcon,
  HStack,
  Text,
  Toast,
  ToastDescription,
  useToast,
  VStack,
} from "@gluestack-ui/themed";
import { Button } from "../components/Button";
import { navigateTo } from "../hook/NavigateTo";
import { AddressForm } from "./AdressForm";
import { EventForm } from "./EventForm";
import { useState } from "react";
import { useForm } from "react-hook-form";
import type { FieldPath } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { isValidCEP } from "@brazilian-utils/brazilian-utils";
import { CheckIcon } from "@gluestack-ui/themed";
import {
  createEvent,
  CreateEventResponse,
  CreateEventVariables,
} from "../api/requests/create-event";
import { useMutation } from "@tanstack/react-query";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ToastTitle } from "@gluestack-ui/themed";
import { formatDateToSave } from "../utils/helpers";

export type EventFormValues = {
  eventForm: {
    name: string;
    complement: string;
    startDate: Date;
    endDate: Date;
    notifyParticipants: "S" | "N";
    maxParticipants: number;
    ticketPrice: number;
  };
  addressForm: {
    id?: number;
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
    startDate: yup
      .date()
      .required("Data de início é obrigatório")
      .min(new Date()),
    endDate: yup
      .date()
      .required("Data de finalização é obrigatório")
      .min(yup.ref("startDate"), "Data de finalização menor que inicio"),
    notifyParticipants: yup
      .string()
      .oneOf(["S", "N"] as const)
      .defined(),
    maxParticipants: yup
      .number()
      .positive()
      .integer()
      .required("Número máximo é obrigatório"),
    ticketPrice: yup.number().default(0),
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
  const configToast = useToast();
  const insets = useSafeAreaInsets();

  const form = useForm<EventFormValues>({
    defaultValues: {
      eventForm: {
        notifyParticipants: "S",
        ticketPrice: 0,
      },
    },
    resolver: yupResolver(schema),
  });

  const validate = () => {
    form.trigger().then(() => {
      if (!form.formState.errors.eventForm) {
        setStep(2);
        form.clearErrors();
        return;
      }

      const errorFields = Object.keys(form.formState?.errors?.eventForm);
      const fieldError = errorFields.length && errorFields[0];
      if (fieldError)
        form.setFocus(`eventForm.${fieldError}` as FieldPath<EventFormValues>);
    });
  };

  const createEventMutation = useMutation({
    mutationFn: createEvent,
    onSuccess(response) {
      const data = response as CreateEventResponse;
      configToast.show({
        placement: "top",
        render: () => {
          return (
            <Toast
              nativeID="toasts-show"
              action="success"
              variant="accent"
              top={insets.top}
            >
              <VStack space="xs">
                <ToastTitle>Sucesso</ToastTitle>
                <ToastDescription>
                  Evento {data.nomeEvento} cadastrado com sucesso!
                </ToastDescription>
              </VStack>
            </Toast>
          );
        },
      });
    },
    onError(error) {
      if (error.message) {
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
                  <ToastTitle>Erro ao cadastrar evento</ToastTitle>
                  <ToastDescription>{error.message}</ToastDescription>
                </VStack>
              </Toast>
            );
          },
        });
      }
    },
  });

  const submit = (data: EventFormValues) => {
    if (!data) return;

    const body: CreateEventVariables = {
      nomeEvento: data.eventForm.name,
      complementoEvento: data.eventForm.complement,
      dtInicio: formatDateToSave(data.eventForm.startDate),
      dtEncerramento: formatDateToSave(data.eventForm.endDate),
      notificarEntradaParticipantes: data.eventForm.notifyParticipants, // "S" | "N"
      numeroMaximoParticipantes: data.eventForm.maxParticipants,
      valorIngresso: data.eventForm.ticketPrice,
      endereco: {
        ...(data.addressForm.id && { cdEnderecoEvento: data.addressForm.id }),
        numeroCEP: data.addressForm.addressCode,
        siglaEstado: data.addressForm.uf,
        cidade: data.addressForm.city,
        numero: data.addressForm.number,
        logradouro: data.addressForm.address,
        complemento: data.addressForm.complement ?? "",
      },
    };

    createEventMutation.mutate(body);
  };

  const isLoading = createEventMutation.isPending;

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
              isDisabled={isLoading}
              onPress={() => setStep(1)}
            />
            <Button
              text="Cadastrar"
              rightIcon={CheckIcon}
              iconSize={25}
              flex={1}
              isDisabled={isLoading}
              onPress={form.handleSubmit(submit)}
            />
          </ButtonGroup>
        )}
      </Box>
    </VStack>
  );
}
