import { globalCss } from "@stitches/react";
import { northwesternFonts } from "@/styles/fonts";

/* eslint sort-keys: 0 */

export const rem = 19;

const defaults = {
  [`*`]: {
    boxSizing: "border-box",
  },

  "a, a:visited": {
    color: "$purple",
    textDecoration: "none",

    "&:active, &:hover": {
      color: "$purple120",
    },
  },

  body: {
    margin: 0,
    padding: 0,
  },

  html: {
    color: "$black80",
    fontFamily: "$northwesternSansRegular",
    fontSize: `${rem}px`,
  },

  p: {
    lineHeight: "1.7em",
  },
};

const fonts = {
  "@font-face": northwesternFonts.map((font) => ({
    fontFamily: `${font.name}`,
    src: `url(${font.value}) format("woff")`,
    fontWeight: "normal",
    fontStyle: "normal",
  })),
};

const globalStyles = globalCss({
  ...defaults,
  ...fonts,
});

export default globalStyles;
