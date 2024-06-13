import React, { useState } from "react";
import {
  InputField,
  Input as GlueInput,
  VStack,
  Text,
} from "@gluestack-ui/themed";
import type { ComponentProps } from "react";
import { Subtitle } from "./Subtitle";
import { Keyboard, Pressable, TouchableOpacity } from "react-native";
import { Controller } from "react-hook-form";
import type { Control, FieldValues, FieldPath } from "react-hook-form";

export type InputProps<FormValues> = {
  label: string;
  placeholder?: string;
  color?: string;
  errorMessage?: string;
  keyboardType?: any;
  nextInput?: () => void;
  format?: (value: string, formatOptions: any) => string | number;
  formatToView?: (value: string | number, formatOptions: any) => string;
  formatOptions?: any;
  formatToViewOptions?: any;
  LeftIcon?: () => React.ReactNode;
  inputFieldProps?: ComponentProps<typeof InputField>;
  subtitleProps?: ComponentProps<typeof Text>;
  control?: Control<FormValues extends FieldValues ? FormValues : any, any>;
  inputName: FieldPath<FormValues extends FieldValues ? FormValues : any>;
  secureTextEntry?: boolean;
} & ComponentProps<typeof GlueInput>;

export function Input<T>(inputProps: InputProps<T>) {
  const {
    placeholder,
    color,
    LeftIcon,
    label,
    inputFieldProps,
    subtitleProps,
    control,
    inputName,
    errorMessage,
    keyboardType,
    nextInput,
    format,
    formatToView,
    formatOptions,
    formatToViewOptions,
    secureTextEntry,
    ...glueInputProps
  } = inputProps;

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <VStack h="$24">
      <Subtitle
        text={label}
        h="$5"
        pl="$0"
        mb="$2"
        fontSize="$sm"
        {...subtitleProps}
      />
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
              color={color ? color : "$textColor"}
              placeholderTextColor="$placeholderColor"
              placeholder={placeholder}
              keyboardType={keyboardType}
              secureTextEntry={!showPassword && secureTextEntry}
              {...inputFieldProps}
              onBlur={onBlur}
              onChangeText={(txt) => {
                format
                  ? onChange(format(txt, formatOptions))
                  : onChange(txt.trimStart());
              }}
              value={
                formatToView ? formatToView(value, formatToViewOptions) : value
              }
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
      {secureTextEntry ? (
        <Text onPress={toggleShowPassword} color="$textColor" fontSize="$md" mt={10} textAlign="right"  >
          {showPassword ? "Hide Password" : "Show Password"}
        </Text>

      ) : null}
    </VStack>
  );
}
