import colors from "@/styles/colors";
import { createStitches } from "@stitches/react";
import fonts from "@/styles/fonts";
import media from "@/styles/media";

export type { VariantProps } from "@stitches/react";

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
  media: media,
  theme: {
    colors: colors,
    fonts: fonts,
    transitions: {
      all: "all 500ms cubic-bezier(0.16, 1, 0.3, 1)",
    },
  },
  utils: {
    marginX: (value: number) => ({ marginLeft: value, marginRight: value }),
  },
});
