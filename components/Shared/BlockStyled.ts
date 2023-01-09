import { StyledCopyText } from "@/components/Shared/CopyText.styled";
import { styled } from "stitches.config";

/* eslint sort-keys: 0 */

const BlockStyled = styled("div", {
  marginBottom: "$gr6",

  [`${StyledCopyText}`]: {
    fontSize: "inherit",
  },

  "@md": {
    marginBottom: "$gr5",
  },
});

export { BlockStyled };
