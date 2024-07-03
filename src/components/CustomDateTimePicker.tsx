import { Controller } from "react-hook-form";
import type { FieldValues, Control, FieldPath } from "react-hook-form";
import { Subtitle } from "./Subtitle";
import {
  InputField,
  Input as GlueInput,
  VStack,
  Pressable,
} from "@gluestack-ui/themed";
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
        <VStack h="$24">
          <Subtitle text={label} h="$5" pl="$0" mb="$2" fontSize="$sm" />
          <Pressable onPress={changeModeDate}>
            <GlueInput
              h="$12"
              w="$full"
              isReadOnly
              borderColor={errorMessage ? "$error700" : "$primary600"}
              backgroundColor="$primary600"
            >
              <InputField
                color="$textColor"
                placeholderTextColor="$placeholderColor"
                placeholder={placeholder}
                fontSize="$sm"
                textAlign="center"
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
          </Pressable>
          {errorMessage ? (
            <Subtitle
              color="$error400"
              text={errorMessage}
              h="$5"
              mt="$0.5"
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
              onChange={({ type }, value) => {
                if (type === "dismissed") return onClose();
                if (type === "set") {
                  dateTimePickerState.mode === "date"
                    ? changeModeTime()
                    : onClose();
                  field.onChange(value);
                }
              }}
            />
          ) : null}
        </VStack>
      )}
    />
  );
}
