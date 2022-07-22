import { IconStyled } from "@/components/Shared/Icon";
import { styled } from "@/stitches.config";

/* eslint sort-keys: 0 */

export const SocialStyled = styled("div", {
  display: "flex",

  [`${IconStyled}`]: {
    width: "$5",
    height: "$5",
    margin: "0 $2 0 0",
    backgroundColor: "$purple",
    fill: "$white",
    color: "$white",
    stroke: "$white",
    cursor: "pointer",
    borderRadius: "3px",
  },
});
