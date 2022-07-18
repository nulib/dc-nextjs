import { styled } from "@/stitches.config";

/* eslint sort-keys: 0 */

const CiteStyled = styled("div", {
  display: "flex",
  flexDirection: "row",

  "@sm": {
    flexDirection: "column",
  },
});

const ContentCol = styled("div", {
  paddingLeft: "$3",
  "@sm": {
    paddingLeft: "0",
  },
});

export { CiteStyled, ContentCol };
