import { styled } from "@/stitches.config";

/* eslint sort-keys: 0 */

const ImagePlaceholder = styled("div", {
  background: "$black10",
  height: "200px",
});

const LinkedAnchor = styled("a", {
  cursor: "pointer",
  display: "inline-block",
});

const CardStyled = styled("div", {
  p: {
    margin: "0 0 $gr4",
    fontFamily: "$northwesternSansRegular",
    fontSize: "$gr3",
    lineHeight: "1.47em",
  },
});

export { CardStyled, ImagePlaceholder, LinkedAnchor };
