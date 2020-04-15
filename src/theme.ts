import { LightTheme, createDarkTheme } from "baseui";
import { mapValues } from "lodash";

const displayFamily = "'DM Serif Display', sans-serif";
const breakpoints = {
  small: 380,
  medium: 900,
  large: 1216,
};

export const theme = createDarkTheme(
  {
    primaryFontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;",
  },
  {
    breakpoints,
    mediaQuery: mapValues(
      breakpoints,
      (value) => `@media screen and (min-width: ${value}px)`
    ),
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
    borders: {
      useRoundedCorners: true,
      inputBorderRadius: LightTheme.borders.radius200,
      buttonBorderRadius: LightTheme.borders.radius400,
    },
  }
);

console.log(theme);
