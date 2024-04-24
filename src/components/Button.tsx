import {
  ButtonIcon,
  ButtonSpinner,
  ButtonText,
  Button as GlueButton,
} from "@gluestack-ui/themed";
import { ComponentProps } from "react";

//TODO: type ButtonProps appropriately
export type ButtonProps = {
  iconSize?: any;
  leftIcon?: any;
  rightIcon?: any;
  text?: string;
  isLoading?: boolean;
  isDisabled?: boolean;
} & ComponentProps<typeof GlueButton>;

export function Button({
  leftIcon,
  iconSize,
  rightIcon,
  isLoading,
  isDisabled,
  text,
  ...props
}: ButtonProps) {
  const iconSizeDefault = iconSize ? iconSize : "$10";
  return (
    <GlueButton
      h="$16"
      rounded="$xl"
      {...props}
      isDisabled={isDisabled || isLoading}
    >
      {leftIcon ? (
        <ButtonIcon
          h={iconSizeDefault}
          w={iconSizeDefault}
          as={leftIcon}
          mr={text || rightIcon ? "$2" : "$0"}
        />
      ) : null}
      {isLoading ? (
        <ButtonSpinner size={50} />
      ) : text ? (
        <ButtonText>{text}</ButtonText>
      ) : null}
      {rightIcon ? (
        <ButtonIcon
          h={iconSizeDefault}
          w={iconSizeDefault}
          as={rightIcon}
          ml={text || leftIcon ? "$2" : "$0"}
        />
      ) : null}
    </GlueButton>
  );
}
