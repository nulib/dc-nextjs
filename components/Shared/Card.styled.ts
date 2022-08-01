import { styled } from "@/stitches.config";

/* eslint sort-keys: 0 */

const ImagePlaceholder = styled("div", {
  background: "$black10",
  height: "200px",
});

const LinkedAnchor = styled("a", {
  cursor: "pointer",
  display: "inline-block",
  transition: "transform .2s",

  "&:hover": {
    transform: "scale(1.05)",
  },
});

const CardStyled = styled("div", {
  p: {
    margin: "0 0 $4",
    fontFamily: "$sansRegular",
    fontSize: "$4",
    lineHeight: "1.47em",
  },
});

export { CardStyled, ImagePlaceholder, LinkedAnchor };
