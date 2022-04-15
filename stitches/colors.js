import { slate } from "@radix-ui/colors";

const purple = {
  purple: "#4E2A84", // Northwestern Purple
  purple120: "#401f68",
};

const gray = {
  gray6: "#f0f0f0",
};

const basic = {
  black: "#000000",
  white: "#ffffff",
};

const colors = {
  ...basic,
  ...gray,
  ...purple,
  ...slate, // work this out and replace with brand colors.
};

export default colors;
