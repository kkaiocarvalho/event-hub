import { Box, Text } from "@gluestack-ui/themed";

type TitleProps = {
  text: string;
};

export function Title({ text }: TitleProps) {
  return (
    <Box w="100%" p="$3">
      <Text color="$titleColor" fontWeight="$bold" fontSize="$3xl">
        {text}
      </Text>
    </Box>
  );
}
