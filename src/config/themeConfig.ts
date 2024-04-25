import { createConfig } from "@gluestack-ui/themed";
import { config as defaultConfig } from "@gluestack-ui/config";

export const config = createConfig({
  ...defaultConfig,
  tokens: {
    ...defaultConfig.tokens,
    colors: {
      ...defaultConfig.tokens.colors,
      background: "#0B1726",
      backgroundLogo: "#038c8c66",
      textColor: "#F2F2F2",
      titleColor: "#ffffff",
      placeholderColor: "#c2c2c2",

      // passive to changes:

      primary50: "#2fffff",
      primary100: "#07ffff",
      primary200: "#00dede",
      primary300: "#04b3b3",
      primary400: "#038c8c",
      primary500: "#067171",
      primary600: "#085858",
      primary700: "#084040",
      primary800: "#072a2a",
      primary900: "#041515",

    },
  },
});
