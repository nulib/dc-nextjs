import colors from "@/styles/colors";
import { createStitches } from "@stitches/react";
import media from "@/styles/media";

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
  media: {
    ...media,
  },
  theme: {
    colors: {
      ...colors,
    },
    transitions: {
      all: "all 500ms cubic-bezier(0.16, 1, 0.3, 1)",
    },
  },
  utils: {
    marginX: (value) => ({ marginLeft: value, marginRight: value }),
  },
});
