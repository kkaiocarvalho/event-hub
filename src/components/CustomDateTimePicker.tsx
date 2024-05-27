import { Controller } from "react-hook-form";
import type { FieldValues, Control, FieldPath } from "react-hook-form";
import { Subtitle } from "./Subtitle";
import {
  InputField,
  Input as GlueInput,
  HStack,
  VStack,
} from "@gluestack-ui/themed";
import { Button } from "./Button";
import { formatDateToShow } from "../utils/helpers";
import DateTimePicker from "@react-native-community/datetimepicker";

export type DateTimePickerMode = "date" | "time" | undefined;

export type DateTimePickerState = {
  show: boolean;
  mode: DateTimePickerMode;
};

type DateTimePickerProps<FormValues> = {
  dateTimePickerState: DateTimePickerState;
  changeModeDate: () => void;
  changeModeTime: () => void;
  onClose: () => void;
  placeholder?: string;
  errorMessage?: string;
  label: string;
  control?: Control<FormValues extends FieldValues ? FormValues : any, any>;
  datePickerName: FieldPath<FormValues extends FieldValues ? FormValues : any>;
};

export function CustomDateTimePicker<T>({
  dateTimePickerState,
  changeModeDate,
  changeModeTime,
  onClose,
  placeholder,
  errorMessage,
  label,
  control,
  datePickerName,
}: DateTimePickerProps<T>) {
  return (
    <Controller
      name={datePickerName}
      control={control}
      render={({ field }) => (
        <VStack h="$40">
          <Subtitle text={label} h="$5" pl="$0" mb="$2" fontSize="$sm" />
          <GlueInput
            h="$10"
            w="$1/2"
            variant="underlined"
            isReadOnly
            borderColor={errorMessage ? "$error700" : "$primary600"}
          >
            <InputField
              color="$textColor"
              placeholderTextColor="$placeholderColor"
              placeholder={placeholder}
              value={
                field.value
                  ? formatDateToShow((field.value as Date).toISOString(), {
                      withTime: true,
                    })
                  : undefined
              }
              blurOnSubmit={false}
              autoCapitalize="none"
            />
          </GlueInput>
          <HStack gap="$4" mt="$4">
            <Button
              flex={1}
              h="$12"
              onPress={changeModeDate}
              text="Alterar data"
            />
            <Button
              flex={1}
              h="$12"
              onPress={changeModeTime}
              text="Alterar hora"
            />
          </HStack>
          {errorMessage ? (
            <Subtitle
              color="$error400"
              text={errorMessage}
              h="$5"
              mt="$1"
              pl="$0"
              fontSize="$sm"
            />
          ) : null}
          {dateTimePickerState.show ? (
            <DateTimePicker
              minimumDate={new Date()}
              value={field.value || new Date()}
              mode={dateTimePickerState.mode}
              is24Hour={true}
              onChange={(_, value) => {
                onClose();
                return field.onChange(value);
              }}
            />
          ) : null}
        </VStack>
      )}
    />
  );
}
