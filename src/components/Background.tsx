import { Box, ScrollView } from "@gluestack-ui/themed";
import type { PropsWithChildren } from "react";

type BackgroundProp = {
  withScroll?: boolean;
  paddingBottomTab?: boolean;
} & PropsWithChildren;

export function Background({
  children,
  paddingBottomTab = false,
  withScroll = false,
}: BackgroundProp) {
  return (
    <Box
      w="$full"
      bg="$background"
      rounded="$none"
      flex={1}
      p="$10"
      pb={paddingBottomTab ? "$20" : "$10"}
    >
      {withScroll ? (
        <ScrollView showsVerticalScrollIndicator={false}>{children}</ScrollView>
      ) : (
        children
      )}
    </Box>
  );
}
