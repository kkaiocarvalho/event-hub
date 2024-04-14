import { createConfig } from "@gluestack-ui/themed";
import { config as defaultConfig } from "@gluestack-ui/config";

export const config = createConfig({
  ...defaultConfig,
  tokens: {
    ...defaultConfig.tokens,
    colors: {
      ...defaultConfig.tokens.colors,
      background: "#181818",
      textColor: "#bdbdbd",
      titleColor: "#ffffff",
      // primary-color
      primary50: "#fff18b",
      primary100: "#ffed63",
      primary200: "#ffe83b",
      primary300: "#ffe413",
      primary400: "#ebcf00",
      primary500: "#cdb606",
      primary600: "#b09d0b",
      primary700: "#95860f",
      primary800: "#7c6f11",
      primary900: "#635a12",

      // secondary-color
      secondary50: "#c58bff",
      secondary100: "#b163ff",
      secondary200: "#9d3bff",
      secondary300: "#8913ff",
      secondary400: "#7500ea",
      secondary500: "#6a06cd",
      secondary600: "#5e0bb0",
      secondary700: "#520f95",
      secondary800: "#46117c",
      secondary900: "#3a1263",
    },
  },
});
