import {
  ButtonIcon,
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
} & ComponentProps<typeof GlueButton>;

export function Button({
  leftIcon,
  iconSize,
  rightIcon,
  text,
  ...props
}: ButtonProps) {
  const iconSizeDefault = iconSize ? iconSize : "$10";
  return (
    <GlueButton h="$16" rounded="$xl" {...props}>
      {leftIcon ? (
        <ButtonIcon
          h={iconSizeDefault}
          w={iconSizeDefault}
          as={leftIcon}
          mr={text || rightIcon ? "$2" : "$0"}
        />
      ) : null}
      {text ? <ButtonText>{text}</ButtonText> : null}
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
