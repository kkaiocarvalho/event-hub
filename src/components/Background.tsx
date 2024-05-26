import { Box, ScrollView, Pressable } from "@gluestack-ui/themed";
import type { PropsWithChildren } from "react";
import { Keyboard } from "react-native";

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
    <Box w="$full" bg="$background" rounded="$none" flex={1}>
      <Pressable
        flex={1}
        onPress={() => Keyboard.dismiss()}
        p="$6"
        pb={paddingBottomTab ? "$20" : "$6"}
      >
        {withScroll ? (
          <ScrollView showsVerticalScrollIndicator={false}>
            {children}
          </ScrollView>
        ) : (
          children
        )}
      </Pressable>
    </Box>
  );
}
