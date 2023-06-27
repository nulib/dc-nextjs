import {
  akkurat,
  akkuratBold,
  akkuratLight,
  campton,
  camptonBold,
  camptonExtraBold,
  camptonExtraLight,
} from "./fonts";
import { globalCss } from "@stitches/react";

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
  "@font-face": [
    {
      fontFamily: akkuratLight.style.fontFamily,
    },
    {
      fontFamily: akkurat.style.fontFamily,
    },
    {
      fontFamily: akkuratBold.style.fontFamily,
    },
    {
      fontFamily: campton.style.fontFamily,
    },
    {
      fontFamily: camptonBold.style.fontFamily,
    },
    {
      fontFamily: camptonExtraBold.style.fontFamily,
    },
    {
      fontFamily: camptonExtraLight.style.fontFamily,
    },
  ],
};

const globalStyles = globalCss({
  ...defaults,
  ...fonts,
});

export default globalStyles;
