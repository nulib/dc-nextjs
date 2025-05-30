import { slate } from "@radix-ui/colors";

/* eslint sort-keys: 0 */

export const black = {
  black: "#000000",
  black80: "#342F2E",
  black50: "#716C6B",
  black20: "#BBB8B8",
  black10: "#D8D6D6",
};

export const purple = {
  purple: "#4E2A84",
  purple120: "#401f68",
  purple60: "#836EAA",
  purple30: "#B6ACD1",
  purple10: "#E4E0EE",
  purple5: "#E4E0EE80", // not a brand color but useful for UI
};
export const secondary = {
  brightGreen: "#58B947",
  brightBlueA: "#7FCECD",
  brightBlueB: "#5091CD",
  brightYellowA: "#EDE93B",
  brightYellowB: "#FFC520",
  brightRed: "#EF553F",
  darkGreen: "#008656",
  darkBlueA: "#007FA4",
  darkBlueB: "#0D2D6C",
  darkYellowA: "#D9C826",
  darkYellowB: "#CA7C1B",
  darkOrange: "#D85820",
};

export const basic = {
  white: "#ffffff",
  gray6: "#f0f0f0",
};

/**
 * influence bloom-iiif color tokens
 */
export const bloom = {
  accent: `${purple.purple} !important`,
  accentAlt: `${purple.purple60} !important`,
  secondary: `${basic.white} !important`,
};

const colors = {
  ...basic,
  ...black,
  ...bloom,
  ...purple,
  ...secondary,
  ...slate, // work this out and replace with brand colors.
};

export default colors;
