import {
  InputIcon,
  InputField,
  Input as GlueInput,
  VStack,
} from "@gluestack-ui/themed";
import type { ComponentProps } from "react";
import { Subtitle } from "./Subtitle";
import { Keyboard } from "react-native";
import { Controller } from "react-hook-form";
import type { Control, FieldValues, FieldPath } from "react-hook-form";
import React from "react";

export type InputProps<FormValues> = {
  label: string;
  placeholder?: string;
  prefix?: string;
  errorMessage?: string;
  keyboardType?: any;
  nextInput?: () => void;
  format?: (value: string, formatOptions: any) => string;
  formatOptions?: any;
  LeftIcon?: () => React.ReactNode;
  inputFieldProps?: ComponentProps<typeof InputField>;
  control?: Control<FormValues extends FieldValues ? FormValues : any, any>;
  inputName: FieldPath<FormValues extends FieldValues ? FormValues : any>;
} & ComponentProps<typeof GlueInput>;

export function Input<T>(inputProps: InputProps<T>) {
  const {
    placeholder,
    LeftIcon,
    prefix,
    label,
    inputFieldProps,
    control,
    inputName,
    errorMessage,
    keyboardType,
    nextInput,
    format,
    formatOptions,
    ...glueInputProps
  } = inputProps;

  return (
    <VStack h="$24">
      <Subtitle text={label} h="$5" pl="$0" mb="$2" fontSize="$sm" />
      <GlueInput
        h="$10"
        variant="outline"
        bgColor="$primary600"
        borderColor={errorMessage ? "$error700" : "$primary600"}
        {...glueInputProps}
      >
        {LeftIcon ? <LeftIcon /> : null}
        <Controller
          control={control}
          name={inputName}
          render={({ field: { onBlur, onChange, value, ref } }) => (
            <InputField
              color="$textColor"
              placeholderTextColor="$placeholderColor"
              placeholder={placeholder}
              keyboardType={keyboardType}
              {...inputFieldProps}
              onBlur={onBlur}
              onChangeText={(txt) =>
                format
                  ? onChange(format(txt, formatOptions))
                  : onChange(txt.trimStart())
              }
              value={prefix ? `${prefix} ${value}` : value}
              ref={ref}
              onSubmitEditing={() =>
                nextInput ? nextInput() : Keyboard.dismiss()
              }
              blurOnSubmit={false}
              autoCapitalize="none"
            />
          )}
        />
      </GlueInput>
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
    </VStack>
  );
}
