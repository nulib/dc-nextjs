import { styled } from "@/stitches.config";

/* eslint sort-keys: 0 */

const HeadingSlashTitleStyled = styled("h1", {
  fontFamily: "$displayBold",
  fontSize: "$gr6",
  marginBottom: "$gr4",

  "&:before, &:after": {
    background: "url(images/icons/ltpurple-slash.svg) no-repeat 50%/17px 21px;",
    padding: " 0 20px",
    content: " ",
  },
});

export { HeadingSlashTitleStyled };
