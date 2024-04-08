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
      // primary-color
      primary50: "#39ffe8",
      primary100: "#11ffe3",
      primary200: "#00e9cd",
      primary300: "#00c1aa",
      primary400: "#009987",
      primary500: "#047e6f",
      primary600: "#066459",
      primary700: "#074b43",
      primary800: "#07342f",
      primary900: "#051e1b",
      // secondary-color
      secondary50: "#a76cff",
      secondary100: "#8f44ff",
      secondary200: "#771dff",
      secondary300: "#6200f4",
      secondary400: "#5200cc",
      secondary500: "#4905af",
      secondary600: "#410994",
      secondary700: "#380c79",
      secondary800: "#2f0d61",
      secondary900: "#250d49",
    },
  },
});
