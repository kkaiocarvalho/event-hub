import { MotiView } from "moti";
import { Pressable } from "react-native";
import { SvgXml } from "react-native-svg";
import { useTouchAnimation } from "../hook/useTouchAnimation";
import Logo from "../components/Logo";
import { Box } from "@gluestack-ui/themed";

type InteractiveLogoProps = {
  withBackgrund?: boolean;
};

export function InteractiveLogo({ withBackgrund }: InteractiveLogoProps) {
  const { touchAnimation, animationState } = useTouchAnimation();

  return withBackgrund ? (
    <Box
      bgColor="$backgroundLogo"
      borderWidth={0}
      width="80%"
      py="$8"
      display="flex"
      justifyContent="center"
      alignItems="center"
      borderBottomLeftRadius={10}
      borderBottomRightRadius={30}
      borderTopLeftRadius={30}
      borderTopRightRadius={10}
    >
      <Pressable onPress={touchAnimation}>
        <MotiView
          state={animationState}
          transition={{
            type: "spring",
            damping: 20,
            rotateZ: { damping: 15, mass: 3 },
          }}
        >
          <SvgXml xml={Logo} />
        </MotiView>
      </Pressable>
    </Box>
  ) : (
    <Pressable onPress={touchAnimation}>
      <MotiView
        state={animationState}
        transition={{
          type: "spring",
          damping: 20,
          rotateZ: { damping: 15, mass: 3 },
        }}
      >
        <SvgXml xml={Logo} />
      </MotiView>
    </Pressable>
  );
}
