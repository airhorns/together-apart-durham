import { LightTheme, createDarkTheme } from "baseui";
import { mapValues } from "lodash-es";
import { ThemePrimitives } from "baseui/theme";

// const primitives = {
//   accent: "#F127E4", // hot pink
//   accent50: "#FDEDFC",
//   accent100: "#FCD3F9",
//   accent200: "#F89FF3",
//   accent300: "#F45AEA",
//   accent400: "#F127E4",
//   accent500: "#B71DAD",
//   accent600: "#901788",
//   accent700: "#600F5B",
// };

const displayFamily = "'DM Serif Display', sans-serif";
const breakpoints = {
  small: 380,
  medium: 900,
  large: 1216,
};

const primitives: Partial<ThemePrimitives> = {
  primaryFontFamily:
    "'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;",
  accent: "#f2c94c",
};

export const theme = createDarkTheme(primitives, {
  breakpoints,
  mediaQuery: mapValues(breakpoints, (value) => `@media screen and (min-width: ${value}px)`),
  typography: {
    ParagraphMedium: {
      fontSize: "14px",
    },
    LabelMedium: {
      fontSize: "14px",
    },
    HeadingMedium: {
      fontFamily: displayFamily,
      fontSize: "20px",
    },
    HeadingLarge: {
      fontFamily: displayFamily,
    },
    HeadingXLarge: {
      fontFamily: displayFamily,
    },
    HeadingXXLarge: {
      fontFamily: displayFamily,
    },
    DisplayLarge: {
      fontFamily: displayFamily,
    },
    DisplayMedium: {
      fontFamily: displayFamily,
    },
    DisplaySmall: {
      fontFamily: displayFamily,
    },
  },
  colors: {
    borderFocus: primitives.accent,
  },
  borders: {
    useRoundedCorners: true,
    inputBorderRadius: LightTheme.borders.radius200,
    buttonBorderRadius: LightTheme.borders.radius400,
  },
});
