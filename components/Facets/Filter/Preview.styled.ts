import {
  FigureCaption,
  FigureImageWrapper,
  FigureStyled,
} from "@/components/Figure/Figure.styled";
import { StyledHeading } from "@/components/Heading/Heading.styled";
import { styled } from "@/stitches.config";

/* eslint sort-keys: 0 */

const PreviewItem = styled("li", {
  margin: "0",
  padding: "0 $gr4",
  listStyle: "none",

  a: {
    textDecoration: "none",

    "&:hover, &:focus": {
      [`& ${FigureImageWrapper}`]: {
        backgroundColor: "$purple10",
        outline: "2px solid $purple60",
        boxShadow: "2px 2px 5px #0003",
      },
    },
  },

  [`& ${FigureStyled}`]: {
    paddingBottom: "$gr3",
  },

  [`& ${FigureImageWrapper}`]: {
    width: "$gr6",
    height: "$gr6",
    flexShrink: "0",
  },

  [`& ${FigureCaption}`]: {
    flexGrow: "1",
    marginLeft: "$gr3",
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
  [`& ${StyledHeading}`]: {
    fontFamily: "$northwesternDisplayBold",
    fontSize: "$gr5",
    fontWeight: "400",
    padding: "0 $gr4",
  },
});

export { PreviewItem, PreviewList, StyledPreview };
