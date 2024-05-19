import { Box, Text } from "@gluestack-ui/themed";
import { ComponentProps } from "react";

type TitleProps = {
  text: string;
} & ComponentProps<typeof Text>;

export function Title({ text }: TitleProps) {
  return (
    <Box w="100%" p="$3">
      <Text color="$titleColor" fontWeight="$bold" fontSize="$3xl">
        {text}
      </Text>
    </Box>
  );
}
