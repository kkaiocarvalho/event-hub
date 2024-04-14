import { Box, ScrollView } from "@gluestack-ui/themed";
import type { PropsWithChildren } from "react";

type BackgroundProp = {
  withScroll?: boolean;
} & PropsWithChildren;

export function Background({ children, withScroll = false }: BackgroundProp) {
  const primaryColor = "$primary200";

  return (
    <Box
      minHeight="$full"
      alignItems="center"
      justifyContent="center"
      bg={primaryColor}
      p="$3"
    >
      <Box w="$full" bg="$background" rounded="$2xl" flex={1} p="$3">
        {withScroll ? <ScrollView showsVerticalScrollIndicator={false} >{children}</ScrollView> : children}
      </Box>
    </Box>
  );
}
