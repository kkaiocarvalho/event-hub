import {
  Box,
  ButtonGroup,
  ChevronsLeftIcon,
  ChevronsRightIcon,
  Toast,
  ToastDescription,
  useToast,
  VStack,
} from "@gluestack-ui/themed";
import { Button } from "../components/Button";
import { AddressForm } from "./AddressForm";
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
import { formatDateToSave, removeMasks } from "../utils/helpers";
import type {
  InvalidDataSchemaResponse,
  RequestErrorSchema,
  RequestErrorWithMessage,
} from "../config/request";
import { EventStackProps } from "../routes/EventsStack";

export type EventFormValues = {
  eventForm: {
    // TODO: when back resolve ticket price and notification remove comments
    name: string;
    complement: string;
    startDate: Date;
    endDate: Date;
    maxParticipants?: number | null;
    // notifyParticipants: "S" | "N";
    // ticketPrice: number;
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
  // TODO: when back resolve ticket price and notification remove comments
  eventForm: yup.object({
    name: yup
      .string()
      .required("Nome do evento é obrigatório")
      .min(3, "Deve ter no mínimo 3 caracteres")
      .max(50, "Deve ter no máximo 50 caracteres"),
    complement: yup
      .string()
      .required("Complemento é obrigatório")
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
    // TODO: endDate is not valid when is below startDate
    //
    // notifyParticipants: yup
    //   .string()
    //   .oneOf(["S", "N"] as const)
    //   .defined(),
    // ticketPrice: yup.number().default(0),
    maxParticipants: yup.number().positive().integer().optional().nullable(),
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
      .max(255, "Cidade deve ter no máximo 255 caracteres"),
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

export function CreateEvent({ navigation }: EventStackProps) {
  const [step, setStep] = useState(1);
  const configToast = useToast();
  const insets = useSafeAreaInsets();

  const form = useForm<EventFormValues>({
    // TODO: when back resolve ticket price and notification remove comments
    // defaultValues: {
    //   eventForm: {
    //     notifyParticipants: "S",
    //     ticketPrice: 0,
    //   },
    // },
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
      if (data) {
        configToast.closeAll();
        configToast.show({
          placement: "top",
          render: () => {
            return (
              <Toast action="success" variant="accent" top={insets.top}>
                <VStack space="xs">
                  <ToastTitle>Sucesso</ToastTitle>
                  <ToastDescription>
                    Evento chamado: "{data.nomeEvento}" cadastrado com sucesso!
                  </ToastDescription>
                </VStack>
              </Toast>
            );
          },
        });
      }
      setTimeout(() => navigation.navigate("MyEvents"), 3000);
    },
    onError(error: RequestErrorSchema) {
      const message =
        (error as RequestErrorWithMessage)?.message ||
        (error as InvalidDataSchemaResponse)?.errors?.join(", ");

      if (message) {
        configToast.closeAll();
        configToast.show({
          placement: "top",
          render: () => {
            return (
              <Toast action="error" variant="accent" top={insets.top}>
                <VStack space="xs">
                  <ToastTitle>Erro ao cadastrar evento</ToastTitle>
                  <ToastDescription>{message}</ToastDescription>
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
      nomeEvento: data.eventForm.name.trim(),
      complementoEvento: data.eventForm.complement.trim(),
      dtInicio: formatDateToSave(data.eventForm.startDate),
      dtEncerramento: formatDateToSave(data.eventForm.endDate),
      numeroMaximoParticipantes: data.eventForm.maxParticipants ?? null,
      // TODO: when back resolve ticket price and notification remove comments
      notificarEntradaParticipantes: "N",
      valorIngresso: null,
      // notificarEntradaParticipantes: data.eventForm.notifyParticipants, // "S" | "N"
      // valorIngresso: data.eventForm.ticketPrice,
      endereco: {
        ...(data.addressForm.id && { cdEnderecoEvento: data.addressForm.id }),
        numeroCEP: removeMasks(data.addressForm.addressCode),
        siglaEstado: data.addressForm.uf,
        cidade: data.addressForm.city.trim(),
        numero: data.addressForm.number,
        logradouro: data.addressForm.address.trim(),
        complemento: data.addressForm.complement
          ? data.addressForm.complement.trim()
          : null,
      },
    };
    createEventMutation.mutate(body);
  };

  const isLoading = createEventMutation.isPending;

  return (
    <VStack justifyContent="space-between" flex={1} bgColor="$background">
      {step === 1 ? <EventForm form={form} /> : <AddressForm form={form} />}
      <Box w="$full" display="flex" pb="$1/5" px="$6">
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
