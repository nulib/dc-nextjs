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

export { ImagePlaceholder, LinkedAnchor };
