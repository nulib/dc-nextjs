import { styled } from "@/stitches.config";

/* eslint sort-keys: 0 */

const CardMetadata = styled("div", {
  display: "flex",
  padding: "1rem 0",
  textTransform: "uppercase",
  "& span": {
    paddingRight: "0.5rem",
    "&:last-child": {
      paddingRight: "0",
    },
  },
});

const ImagePlaceholder = styled("div", {
  background: "$black10",
  height: "200px",
});

export { CardMetadata, ImagePlaceholder };
