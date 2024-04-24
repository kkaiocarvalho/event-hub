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

      /*
      antigas cores
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


            // primary-color
      primary: "#F20CB5",

      // secondary-color
      secondary: "#CA38F2",

      // tertiary-color
      tertiary: "#341959",

      // quaternary-color
      quaternary: "#0511F2",

      // quinary-color
      quinary: "#2793F2",
      */
    },
  },
});
