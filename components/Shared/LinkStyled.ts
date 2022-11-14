import { styled } from "stitches.config";

/* eslint sort-keys: 0 */

const LinkStyled = styled("a", {
  color: "$purple",
  cursor: "pointer",
  fontFamily: "$sansBold",
  textDecoration: "none",
  borderBottom: "1px dashed $purple30",
  paddingBottom: "0.08rem",

  "&:hover": {
    borderBottom: "1px solid $purple",
  },
});

export { LinkStyled };
