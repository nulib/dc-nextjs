import { Image } from "@/components/Figure/Figure.styled";
import { StyledHeading } from "@/components/Heading/Heading.styled";
import { styled } from "@/stitches.config";

/* eslint sort-keys: 0 */

const PreviewItem = styled("li", {
  margin: "0",
  padding: "0",
  listStyle: "none",

  [`& ${Image}`]: {
    width: "81px",
    height: "81px",
    flexShrink: "0",
    flexGrow: "0",
    objectFit: "cover",
  },

  figcaption: {
    marginLeft: "1rem",
    overflowWrap: "anywhere",
    whiteSpace: "break-spaces",
  },
});

const PreviewList = styled("ul", {
  display: "flex",
  flexDirection: "column",
  margin: "0",
  padding: "0",
});

const StyledPreview = styled("div", {
  padding: "1rem 2rem",

  [`& ${StyledHeading}`]: {
    margin: "0.5rem 0 1rem",
  },
});

export { PreviewItem, PreviewList, StyledPreview };
