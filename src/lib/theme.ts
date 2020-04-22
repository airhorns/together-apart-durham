import { LightTheme, createDarkTheme } from "baseui";
import { mapValues } from "lodash-es";
import { ThemePrimitives } from "baseui/theme";

const displayFamily = "'DM Serif Display', sans-serif";
const breakpoints = {
  small: 380,
  medium: 900,
  large: 1216,
};

const primitives: Partial<ThemePrimitives> = {
  primaryFontFamily:
    "'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;",
  primary: "#f2c94c",
  primary50: "#fff1d3",
  primary100: "#fee3a7",
  primary200: "#fcde96",
  primary300: "#f8d372",
  primary400: "#f7d26c",
  primary500: "#b49206",
  primary600: "#795e00",
  primary700: "#462f00",
  accent: "#F127E4",
  accent50: "#FDEDFC",
  accent100: "#FCD3F9",
  accent200: "#F89FF3",
  accent300: "#F45AEA",
  accent400: "#F127E4",
  accent500: "#B71DAD",
  accent600: "#901788",
  accent700: "#600F5B",
};

export const theme = createDarkTheme(primitives, {
  breakpoints,
  mediaQuery: mapValues(breakpoints, (value) => `@media screen and (min-width: ${value}px)`),
  typography: {
    ParagraphSmall: {
      fontSize: "14px",
    },
    ParagraphMedium: {
      fontSize: "16px",
    },
    LabelSmall: {
      fontSize: "14px",
    },
    LabelMedium: {
      fontSize: "16px",
    },
    HeadingMedium: {
      fontFamily: displayFamily,
      fontSize: "20px",
      fontWeight: 700,
    },
    HeadingLarge: {
      fontFamily: displayFamily,
      fontWeight: 700,
      fontSize: "24px",
    },
    HeadingXLarge: {
      fontFamily: displayFamily,
      fontWeight: 700,
      fontSize: "30px",
      lineHeight: "36px",
    },
    HeadingXXLarge: {
      fontFamily: displayFamily,
      fontWeight: 700,
    },
    DisplayLarge: {
      fontFamily: displayFamily,
      fontWeight: 700,
    },
    DisplayMedium: {
      fontFamily: displayFamily,
      fontWeight: 700,
    },
    DisplaySmall: {
      fontFamily: displayFamily,
      fontWeight: 700,
    },
  },
  colors: {
    borderFocus: primitives.primary,
    contentPrimary: "#FFF",
  },
  borders: {
    useRoundedCorners: true,
    inputBorderRadius: LightTheme.borders.radius200,
    buttonBorderRadius: LightTheme.borders.radius400,
  },
});
