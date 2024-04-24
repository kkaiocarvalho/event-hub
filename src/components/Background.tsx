import { Box, ScrollView } from "@gluestack-ui/themed";
import type { PropsWithChildren } from "react";

type BackgroundProp = {
  withScroll?: boolean;
} & PropsWithChildren;

export function Background({ children, withScroll = false }: BackgroundProp) {
  return (
    <Box w="$full" bg="$background" rounded="$none" flex={1} p="$10">
      {withScroll ? (
        <ScrollView showsVerticalScrollIndicator={false}>{children}</ScrollView>
      ) : (
        children
      )}
    </Box>
  );
}
