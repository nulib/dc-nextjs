import { styled } from "@/stitches.config";

/* eslint sort-keys: 0 */

const BlurredBgImageStyled = styled("div", {
  height: "$gr10",
  backgroundSize: "contain",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  filter: "blur(10px)",
  width: "auto",

  "@sm": {
    height: "$gr9",
  },
});

export { BlurredBgImageStyled };
