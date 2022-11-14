import { styled } from "@/stitches.config";

/* eslint sort-keys: 0 */

const CollectionGridStyled = styled("div", {
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: "$gr3",
  justifyItems: "center",
  justifyContent: "center",
  maxWidth: "1440px",
  margin: "0 auto",

  "@sm": {
    gridTemplateColumns: "1fr",
  },
});

export { CollectionGridStyled };
