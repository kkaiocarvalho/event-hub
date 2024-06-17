import {
  Box,
  Center,
  CircleIcon,
  HStack,
  Radio,
  RadioGroup,
  RadioIcon,
  RadioIndicator,
  RadioLabel,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import { Background } from "../components/Background";
import { Title } from "../components/Title";
import { Input } from "../components/Input";
import { UseFormReturn } from "react-hook-form";
import { EventFormValues } from "./CreateEvent";
import { Subtitle } from "../components/Subtitle";
import { useState } from "react";
import {
  formatCurrency,
  parseCurrency,
} from "@brazilian-utils/brazilian-utils";
import { Feather } from "@expo/vector-icons";
import { Platform } from "react-native";
import { CustomDateTimePicker } from "../components/CustomDateTimePicker";
import type { DateTimePickerState } from "../components/CustomDateTimePicker";

type EventFormProps = {
  form: UseFormReturn<EventFormValues>;
};

export function EventForm({ form }: EventFormProps) {
  const [advancedOptions, setAdvancedOptions] = useState<"true" | "false">(
    "false"
  );
  // const [isFreeEntrance, setIsFreeEntrance] = useState<"S" | "N">(
  //   form.getValues("eventForm.ticketPrice") <= 0 ? "S" : "N"
  // );
  const [dateTimePickerStart, setDateTimePickerStart] =
    useState<DateTimePickerState>({
      show: false,
      mode: "date",
    });

  const [dateTimePickerEnd, setDateTimePickerEnd] =
    useState<DateTimePickerState>({
      show: false,
      mode: "date",
    });

  const isIos = Platform.OS === "ios";
  const {
    setFocus,
    formState: { errors },
    control,
    watch,
  } = form;

  // const value = watch("eventForm.notifyParticipants");
  // const changeNotifyParticipants = (e: "S" | "N") =>
  //   form.setValue("eventForm.notifyParticipants", e);

  return (
    <Background withScroll={true} withKeyboardDimiss>
      <VStack justifyContent="space-between">
        <Title text="Dados do Evento" />
        <Center p="$3">
          <VStack w="$full">
            <Input
              placeholder="Semana Acadêmica"
              label="Nome do evento"
              inputName="eventForm.name"
              control={control}
              variant="outline"
              errorMessage={errors.eventForm?.name?.message}
              nextInput={() => setFocus("eventForm.complement")}
            />
            <Input
              placeholder="Mercado de TI e Inovações"
              label="Complemento do evento"
              inputName="eventForm.complement"
              control={control}
              variant="outline"
              errorMessage={errors.eventForm?.complement?.message}
            />
            {isIos ? (
              <Text>Virá em breve</Text>
            ) : (
              <>
                <HStack gap="$4" w="$full" mb="$10">
                <CustomDateTimePicker
                  dateTimePickerState={dateTimePickerStart}
                  label="Início do evento"
                  placeholder="12/12/2024 às 14:27"
                  datePickerName="eventForm.startDate"
                  errorMessage={errors.eventForm?.startDate?.message}
                  control={control}
                  changeModeDate={() =>
                    setDateTimePickerStart({ show: true, mode: "date" })
                  }
                  changeModeTime={() =>
                    setDateTimePickerStart({ show: true, mode: "time" })
                  }
                  onClose={() =>
                    setDateTimePickerStart({
                      show: false,
                      mode: undefined,
                    })
                  }
                />
                <CustomDateTimePicker
                  dateTimePickerState={dateTimePickerEnd}
                  label="Fim do evento"
                  placeholder="12/12/2024 às 18:53"
                  datePickerName="eventForm.endDate"
                  errorMessage={errors.eventForm?.endDate?.message}
                  control={control}
                  changeModeDate={() =>
                    setDateTimePickerEnd({ show: true, mode: "date" })
                  }
                  changeModeTime={() =>
                    setDateTimePickerEnd({ show: true, mode: "time" })
                  }
                  onClose={() =>
                    setDateTimePickerEnd({
                      show: false,
                      mode: undefined,
                    })
                  }
                />
                </HStack>
              </>
            )}
            <Input
              placeholder="1000"
              LeftIcon={() => (
                <Box display="flex" justifyContent="center" pl="$2">
                  <Feather name="user" size={24} color="#F2F2F2" />
                </Box>
              )}
              label="Nº Max. de Participantes"
              inputName="eventForm.maxParticipants"
              control={control}
              variant="outline"
              keyboardType="numeric"
              errorMessage={errors.eventForm?.maxParticipants?.message}
            />
            <Subtitle
              // TODO: when back resolve ticket price and notification remove display: "none"
              display="none"
              text="Opções avançadas?"
              h="$5"
              pl="$0"
              mb="$2"
              fontSize="$sm"
            />
            <RadioGroup
              // TODO: when back resolve ticket price and notification remove display: "none"
              display="none"
              mb="$4"
              value={advancedOptions}
              onChange={(e: "true" | "false") => setAdvancedOptions(e)}
            >
              <HStack space="md">
                <Radio value="true" flex={1}>
                  <RadioIndicator mr="$2">
                    <RadioIcon as={CircleIcon} />
                  </RadioIndicator>
                  <RadioLabel
                    color={
                      advancedOptions === "true"
                        ? "$textColor"
                        : "$textColorOpacity"
                    }
                  >
                    Sim
                  </RadioLabel>
                </Radio>
                <Radio value="false" flex={1}>
                  <RadioIndicator mr="$2">
                    <RadioIcon as={CircleIcon} />
                  </RadioIndicator>
                  <RadioLabel
                    color={
                      advancedOptions === "false"
                        ? "$textColor"
                        : "$textColorOpacity"
                    }
                  >
                    Não
                  </RadioLabel>
                </Radio>
              </HStack>
            </RadioGroup>
            {advancedOptions === "true" ? (
              // <>
              //   <Subtitle
              //     text="Entrada gratuita?"
              //     h="$5"
              //     pl="$0"
              //     mb="$2"
              //     fontSize="$sm"
              //   />
              //   <RadioGroup
              //     mb="$4"
              //     value={isFreeEntrance}
              //     onChange={(e: "S" | "N") => {
              //       setIsFreeEntrance(e);
              //       // e === "N" &&
              //       //   setTimeout(() => setFocus("eventForm.ticketPrice"), 100);
              //     }}
              //   >
              //     <HStack space="md">
              //       <Radio value="S" flex={1}>
              //         <RadioIndicator mr="$2">
              //           <RadioIcon as={CircleIcon} />
              //         </RadioIndicator>
              //         <RadioLabel
              //           color={
              //             isFreeEntrance === "S"
              //               ? "$textColor"
              //               : "$textColorOpacity"
              //           }
              //         >
              //           Sim
              //         </RadioLabel>
              //       </Radio>
              //       <Radio value="N" flex={1}>
              //         <RadioIndicator mr="$2">
              //           <RadioIcon as={CircleIcon} />
              //         </RadioIndicator>
              //         <RadioLabel
              //           color={
              //             isFreeEntrance === "N"
              //               ? "$textColor"
              //               : "$textColorOpacity"
              //           }
              //         >
              //           Não
              //         </RadioLabel>
              //       </Radio>
              //     </HStack>
              //   </RadioGroup>
              //   {isFreeEntrance === "N" ? (
              //     <Input
              //       placeholder="R$150,00"
              //       label="Valor do ingresso"
              //       // inputName="eventForm.ticketPrice"
              //       control={control}
              //       formatToView={(value) =>
              //         R$ ${formatCurrency(parseCurrency(value.toString()))}
              //       }
              //       format={(value: string) => parseCurrency(value)}
              //       variant="outline"
              //       keyboardType="numeric"
              //       // errorMessage={errors.eventForm?.ticketPrice?.message}
              //     />
              //   ) : null}
              //   <Subtitle
              //     text="Notificar Participantes?"
              //     h="$5"
              //     pl="$0"
              //     mb="$2"
              //     fontSize="$sm"
              //   />
              //   <RadioGroup value={value} onChange={changeNotifyParticipants}>
              //     <HStack space="md">
              //       <Radio value="S" flex={1}>
              //         <RadioIndicator mr="$2">
              //           <RadioIcon as={CircleIcon} />
              //         </RadioIndicator>
              //         <RadioLabel
              //           color={
              //             value === "S" ? "$textColor" : "$textColorOpacity"
              //           }
              //         >
              //           Sim
              //         </RadioLabel>
              //       </Radio>
              //       <Radio value="N" flex={1}>
              //         <RadioIndicator mr="$2">
              //           <RadioIcon as={CircleIcon} />
              //         </RadioIndicator>
              //         <RadioLabel
              //           color={
              //             value === "N" ? "$textColor" : "$textColorOpacity"
              //           }
              //         >
              //           Não
              //         </RadioLabel>
              //       </Radio>
              //     </HStack>
              //   </RadioGroup>
              // </>
              <></>
            ) : null}
          </VStack>
        </Center>
      </VStack>
    </Background>
  );
}