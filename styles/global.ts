import { globalCss } from "@stitches/react";

/* eslint sort-keys: 0 */

const defaults = {
  [`*`]: {
    boxSizing: "border-box",
  },

  "a, a:visited": {
    color: "$purple",
    textDecoration: "underline",

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
    fontSize: "19px",
  },

  p: {
    lineHeight: "1.7em",
  },
};

const fonts = {
  "@font-face": [
    {
      fontFamily: "AkkuratProLight",
      src: `url("https://common.northwestern.edu/v8/css/fonts/AkkuratProLight.woff")
      format("woff")`,
    },
    {
      fontFamily: "AkkuratProLightItalic",
      src: `url("https://common.northwestern.edu/v8/css/fonts/AkkuratProLightItalic.woff")
      format("woff")`,
    },
    {
      fontFamily: "AkkuratProRegular",
      src: `url("https://common.northwestern.edu/v8/css/fonts/AkkuratProRegular.woff")
      format("woff")`,
    },
    {
      fontFamily: "AkkuratProItalic",
      src: `url("https://common.northwestern.edu/v8/css/fonts/AkkuratProItalic.woff")
      format("woff")`,
    },
    {
      fontFamily: "AkkuratProBold",
      src: `url("https://common.northwestern.edu/v8/css/fonts/AkkuratProBold.woff")
      format("woff")`,
    },
    {
      fontFamily: "AkkuratProBoldItalic",
      src: `url("https://common.northwestern.edu/v8/css/fonts/AkkuratProBoldItalic.woff")
      format("woff")`,
    },
    {
      fontFamily: "CamptonBook",
      src: `url("https://common.northwestern.edu/v8/css/fonts/CamptonBook.woff")
      format("woff")`,
    },
    {
      fontFamily: "CamptonBold",
      src: `url("https://common.northwestern.edu/v8/css/fonts/CamptonBold.woff")
      format("woff")`,
    },
    {
      fontFamily: "CamptonExtraBold",
      src: `url("https://common.northwestern.edu/v8/css/fonts/CamptonExtraBold.woff")
      format("woff")`,
    },
    {
      fontFamily: "CamptonExtraLight",
      src: `url("https://common.northwestern.edu/v8/css/fonts/CamptonExtraLight.woff")
      format("woff")`,
    },
  ],
};

const globalStyles = globalCss({
  ...defaults,
  ...fonts,
});

export default globalStyles;
