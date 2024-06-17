import { Controller } from "react-hook-form";
import type { FieldValues, Control, FieldPath } from "react-hook-form";
import { Subtitle } from "./Subtitle";
import {
  InputField,
  Input as GlueInput,
  HStack,
  VStack,
  Box,
} from "@gluestack-ui/themed";
import { Button } from "./Button";
import { formatDateToShow } from "../utils/helpers";
import DateTimePicker from "@react-native-community/datetimepicker";
import { FontAwesome } from "@expo/vector-icons";

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
        <VStack minHeight="$40" flex={1} justifyContent="center">
          <Subtitle text={label} h="$5" pl="$0" mb="$2" fontSize="$sm" />
          <Box>
            <GlueInput
              h="$10"
              w="$full"
              variant="underlined"
              isReadOnly
              borderColor={errorMessage ? "$error700" : "$primary600"}
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
          </Box>
          <HStack
            display="flex"
            h="$10"
            gap="$4"
            mt="$4"
            alignItems="center"
            justifyContent="center"
          >
            <Button
              h="$12"
              flex={1}
              onPress={changeModeDate}
              text="  Horário"
              leftIcon={() => (
                <FontAwesome name="clock-o" size={24} color="#F2F2F2" />
              )}
            />
          </HStack>
          {errorMessage ? (
            <Subtitle
              color="$error400"
              text={errorMessage}
              h="$10"
              mt="$1"
              pl="$1"
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
                dateTimePickerState.mode === "date"
                  ? changeModeTime()
                  : onClose();
                return field.onChange(value);
              }}
            />
          ) : null}
        </VStack>
      )}
    />
  );
}
