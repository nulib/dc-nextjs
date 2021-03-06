import { StyledCopyText } from "@/components/Shared/CopyText.styled";
import { styled } from "@/stitches.config";

/* eslint sort-keys: 0 */

const EmbedViewer = styled("div", {
  border: "2px dashed $black10",
  width: "calc(100% - $4)",
  padding: "$3 $4",

  [`& ${StyledCopyText}`]: {
    display: "flex",
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
    color: "$purple",
    fontWeight: "700",
    fontSize: "$3",
  },

  pre: {
    margin: "$3 0",
    whiteSpace: "break-spaces",
    borderRadius: "3px",
    fontSize: "$3",
    lineHeight: "1.55em",
  },
});

const ItemActions = styled("ul", {
  display: "flex",
  padding: "0",
  margin: "$3 0",
  fontWeight: "400",

  li: {
    listStyle: "none",
    margin: "0 $3 0 0",
    fontSize: "$3",

    "a, a:visited": {
      color: "$black50",
      textDecoration: "underline",
    },

    "a:hover, a:focus": {
      color: "$purple",
      textDecoration: "none",
    },
  },
});

const ItemContent = styled("div", {
  display: "flex",
  flexDirection: "column",
  fontWeight: "700",
});

const ItemThumbnail = styled("div", {
  display: "flex",
  width: "100px",
  height: "100px",
  backgroundColor: "$black10",
  margin: "0 $4 0 0",
  objectFit: "cover",
  borderRadius: "3px",
  overflow: "hidden",

  img: {
    width: "100%",
    height: "100%",
  },
});

const ItemStyled = styled("div", {
  display: "flex",
  margin: "$4 0 0",
});

export { EmbedViewer, ItemActions, ItemContent, ItemStyled, ItemThumbnail };
