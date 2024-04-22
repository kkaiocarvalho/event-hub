import { Box, ScrollView } from "@gluestack-ui/themed";
import type { PropsWithChildren } from "react";

type BackgroundProp = {
  withScroll?: boolean;
} & PropsWithChildren;

export function Background({ children, withScroll = false }: BackgroundProp) {
  const primaryColor = "$secondary";

  return (
    <Box
      minHeight="$full"
      alignItems="center"
      justifyContent="center"
      bg={primaryColor}
      p="$0"
    >
      <Box w="$full" bg="$background" rounded="$none" flex={1} p="$10">
        {withScroll ? <ScrollView showsVerticalScrollIndicator={false} >{children}</ScrollView> : children}
      </Box>
    </Box>
  );
}
