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

/**
 * Clover IIIF reads its palette from `--clover-color-*` custom properties, so
 * declaring them once here themes the Viewer and the Slider from the same
 * tokens. The Slider can only be themed this way, having no theme prop of its
 * own, and the Viewer must not be handed one, or its inline styles outrank
 * these declarations.
 *
 * These need the scale-qualified `$colors$token` form. A custom property gives
 * Stitches no CSS property to infer a scale from, so a bare `$purple` compiles
 * to `var(--purple)`, which is not a variable the theme defines.
 */
const clover = {
  ":root": {
    "--clover-color-primary": "$colors$black",
    "--clover-color-primary-alt": "$colors$black80",
    "--clover-color-primary-muted": "$colors$black50",

    "--clover-color-accent": "$colors$purple",
    "--clover-color-accent-alt": "$colors$purple120",
    "--clover-color-accent-muted": "$colors$purple30",

    "--clover-color-secondary": "$colors$white",
    "--clover-color-secondary-alt": "$colors$black10",
    "--clover-color-secondary-muted": "$colors$gray6",
  },
};

const globalStyles = globalCss({
  ...defaults,
  ...fonts,
  ...clover,
});

export default globalStyles;
