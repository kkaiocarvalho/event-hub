import {
  InputIcon,
  InputField,
  Input as GlueInput,
  VStack,
} from "@gluestack-ui/themed";
import type { ComponentProps } from "react";
import { Subtitle } from "./Subtitle";
import { type Control, Controller } from "react-hook-form";

export type InputProps = {
  label: string;
  //TODO: type dinamic Control and others anys types
  control: Control<any, any>;
  inputName: string;
  placeholder?: string;
  errorMessage?: string;
  inputFieldProps?: ComponentProps<typeof InputField>;
  iconProps?: {
    iconSize?: any;
    leftIcon: any;
  };
} & ComponentProps<typeof GlueInput>;

export function Input(inputProps: InputProps) {
  const {
    iconProps,
    placeholder,
    label,
    inputFieldProps,
    control,
    inputName,
    errorMessage,
    ...glueInputProps
  } = inputProps;
  const iconSizeDefault = iconProps?.iconSize ? iconProps?.iconSize : "$10";

  return (
    <VStack h="$24">
      <Subtitle text={label} h="$5" pl="$0" fontSize="$sm" />
      <GlueInput h="$10" variant="underlined" {...glueInputProps}>
        {iconProps?.leftIcon ? (
          <InputIcon
            h={iconSizeDefault}
            w={iconSizeDefault}
            as={iconProps.leftIcon}
            mr={placeholder ? "$2" : "$0"}
          />
        ) : null}
        <Controller
          control={control}
          name={inputName}
          render={({ field: { onBlur, onChange, value } }) => (
            <InputField
              color="$textColor"
              placeholder={placeholder}
              {...inputFieldProps}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
      </GlueInput>
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
    </VStack>
  );
}
