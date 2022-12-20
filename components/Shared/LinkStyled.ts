import { styled } from "@/stitches.config";

/* eslint sort-keys: 0 */

const linkStyling = {
  color: "$purple",
  cursor: "pointer",
  fontFamily: "$northwesternSansBold",
  textDecoration: "none",
  borderBottom: "1px dashed $purple30",
  paddingBottom: "0.08rem",

  "&:hover": {
    borderBottom: "1px solid $purple",
  },
};

const LinkStyled = styled("a", linkStyling);

export { linkStyling, LinkStyled };
