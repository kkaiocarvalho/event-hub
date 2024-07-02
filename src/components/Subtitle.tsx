import { Box, Text } from "@gluestack-ui/themed";
import type { ComponentProps } from "react";

type SubtitleProps = {
  text: string;
} & ComponentProps<typeof Text>;

export function Subtitle({ text, ...props }: SubtitleProps) {
  return (
    <Box w="100%">
      <Text
        px="$3"
        color="$textColor"
        fontWeight="$normal"
        fontSize="$md"
        {...props}
      >
        {text}
      </Text>
    </Box>
  );
}
