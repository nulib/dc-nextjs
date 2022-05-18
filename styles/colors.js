import { slate } from "@radix-ui/colors";

/* eslint sort-keys: 0 */

const purple = {
  purple: "#4E2A84",
  purple120: "#401f68",
  purple30: "B6ACD1",
  purple10: "E4E0EE",
};

const gray = {
  gray6: "#f0f0f0",
};

const black = {
  black: "#000000",
  black80: "#342F2E",
  black50: "#716C6B",
  black20: "#BBB8B8",
  black10: "#D8D6D6",
};

const basic = {
  white: "#ffffff",
};

const colors = {
  ...basic,
  ...black,
  ...gray,
  ...purple,
  ...slate, // work this out and replace with brand colors.
};

export default colors;
