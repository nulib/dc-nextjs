import { IconStyled } from "@/components/Shared/Icon";
import { styled } from "@/stitches.config";

/* eslint sort-keys: 0 */

export const SocialStyled = styled("div", {
  display: "flex",

  [`${IconStyled}`]: {
    width: "$gr5",
    height: "$gr5",
    backgroundColor: "$white",
    fill: "$purple",
    color: "$white",
    stroke: "$white",
    cursor: "pointer",
    borderRadius: "3px",
  },
});
