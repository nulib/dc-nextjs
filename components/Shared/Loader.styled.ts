import { keyframes, styled } from "@/stitches.config";

/* eslint sort-keys: 0 */

const rotation = keyframes({
  "0%": { transform: "rotate(0deg)" },
  "100%": { transform: "rotate(360deg)" },
});

const SpinLoader = styled("span", {
  border: "3px solid $black10",
  borderBottomColor: "transparent",
  borderRadius: "50%",
  display: "inline-block",
  boxSizing: "border-box",
  animation: `${rotation} 1s linear infinite`,

  variants: {
    size: {
      small: {
        width: "24px",
        height: "24px",
      },
      default: {
        width: "48px",
        height: "48px",
      },
    },
  },
});

export { SpinLoader };
