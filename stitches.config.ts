import sizes, { gr } from "@/styles/sizes";
import colors from "@/styles/colors";
import { createStitches } from "@stitches/react";
import fonts from "@/styles/fonts";
import media from "@/styles/media";

export type { VariantProps } from "@stitches/react";

export const {
  styled,
  css,
  keyframes,
  getCssText,
  theme,
  createTheme,
  config,
} = createStitches({
  media: media,
  theme: {
    colors: { ...colors },
    fontSizes: {
      1: "0.611rem",
      2: "0.722rem",
      3: "0.833rem",
      4: "1rem",
      5: `1.177rem`,
      6: `1.318rem`,
      7: `calc(1rem * ${gr(1)})`,
      8: `calc(1rem * ${gr(2)})`,
      9: `calc(1rem * ${gr(3)})`,
    },
    fonts: { ...fonts },
    sizes: { ...sizes },
    space: { ...sizes },
    transitions: {
      all: "all 500ms cubic-bezier(0.16, 1, 0.3, 1)",
    },
  },
  utils: {
    marginX: (value: number) => ({ marginLeft: value, marginRight: value }),
  },
});
