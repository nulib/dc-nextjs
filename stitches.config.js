import { createStitches } from "@stitches/react";
import colors from "./stitches/colors";

export const {
  styled,
  css,
  globalCss,
  keyframes,
  getCssText,
  theme,
  createTheme,
  config,
} = createStitches({
  theme: {
    colors: {
      ...colors,
    },
    transitions: {
      all: "all 500ms cubic-bezier(0.16, 1, 0.3, 1)",
    },
  },
  media: {
    bp1: "(min-width: 480px)",
  },
  utils: {
    marginX: (value) => ({ marginLeft: value, marginRight: value }),
  },
});
