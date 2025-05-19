import { StyledCopyText } from "@/components/Shared/CopyText.styled";
import { styled } from "@/stitches.config";

/* eslint sort-keys: 0 */

const EmbedViewer = styled("div", {
  pre: {
    margin: "0 0 $gr3",
    whiteSpace: "break-spaces",
    borderRadius: "3px",
    fontSize: "$gr2",
    lineHeight: "1.55em",
    wordBreak: "break-word",
    backgroundColor: "$gray6",
    padding: "$gr3",
  },
});

const EmbedHTML = styled(EmbedViewer, {
  marginTop: "$gr3",
  transition: "all 0.5s ease-in-out",
});

const EmbedHTMLActionRow = styled("div", {
  display: "flex",
  alignItems: "center",

  "& select": {
    marginLeft: "$gr3",
  },
});

const ItemActions = styled("ul", {
  display: "flex",
  padding: "0",
  margin: "$gr3 0",
  fontWeight: "400",

  li: {
    listStyle: "none",
    margin: "0 $gr3 0 0",
    fontSize: "$gr3",

    [`${StyledCopyText}`]: {
      color: "$black50",
      textDecoration: "underline",
      fontWeight: "400",
      padding: "0",

      "&:hover, &:focus": {
        textDecoration: "none",
      },
    },

    "a, a:visited": {
      color: "$black50 !important",
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

const ItemRow = styled("div", {
  display: "flex",
  flexDirection: "row",

  "@sm": {
    flexDirection: "column",
  },
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

  "@sm": {
    marginBottom: "$gr3",
  },
});

const ItemStyled = styled("div", {
  display: "flex",
  flexDirection: "column",
  margin: "$4 0 0",
});

const LayoutImg = styled("img", {
  width: "100%",
  opacity: "0.8",
  marginBottom: "$gr3",
});

const EmbedLayoutPreview = styled("div", {
  border: "1px solid $black10",
  height: "250px",
  position: "relative",
  display: "flex",
  width: "100%",
  flexDirection: "column",
  marginBottom: "$gr3",
});

const EmbedLayoutPreviewTitle = styled("div", {
  padding: "$gr2",
  display: "flex",
  width: "100%",
  alignItems: "center",
  justifyContent: "space-between",

  "& span:last-of-type": {
    borderRadius: "30px",
    width: "$gr5",
    height: "$gr3",
    backgroundColor: "$black20",
  },
});

const EmbedLayoutPreviewContent = styled("div", {
  flexGrow: "1",
  display: "flex",
  width: "100%",

  "& > span": {
    display: "block",
    backgroundSize: "cover",
    height: "100%",
    width: "100%",
  },
});

const EmbedLayoutPreviewInfoPanel = styled("div", {
  backgroundColor: "$black10",
  padding: "$gr3",
  width: "$gr9",
});

const StyledShareURL = styled("div", {
  background: "$gray6",
  borderRadius: "2em",
  padding: "$gr2 $gr4 $gr2 $gr3",
  marginBottom: "$gr2",
  width: "100%",
  display: "flex",
  justifyContent: "space-between",

  input: {
    background: "transparent",
    border: "none",
    flexGrow: 1,
    fontFamily: "$northwesternSansRegular",
    fontSize: "$gr3",
    paddingRight: "$gr2",
    color: "$black50",
    maskImage:
      "linear-gradient(to right, rgba(0, 0, 0, 1) 61.8%, rgba(0, 0, 0, 0))",
  },

  button: {
    fontFamily: "$northwesternSansBold",
    fontSize: "$gr2",
    fontWeight: "400",
  },
});

const ShareURL = styled(EmbedHTML, {
  "> a": {
    fontSize: "$gr3",
  },
});

const ShareURLActions = styled(EmbedHTMLActionRow, {
  marginTop: "$gr3",

  "> a, > button, > span": {
    marginLeft: "$gr3",
    color: "$black50",
    fontSize: "$gr3",
    textDecoration: "underline",
    fontWeight: "400",

    "&:first-child": {
      marginLeft: "0",
    },
  },
});

const EmbedResourcesWrapper = styled("section", {
  paddingBottom: "$gr3",
});

const AlternateFormatList = styled("ul", {
  listStyle: "none",
  marginBlockStart: "0px",
  paddingInlineStart: "0px",

  "> li": {
    paddingBottom: "$gr2",
  },

  "> li > a": {
    color: "$black80",
    textDecoration: "underline",

    "&:hover": {
      color: "$black80",
      textDecoration: "none",
    },
  },
});

const PdfLabel = styled("span", {
  paddingLeft: "$gr1",
  fontSize: "$gr2",
});

export {
  AlternateFormatList,
  EmbedHTML,
  EmbedHTMLActionRow,
  EmbedLayoutPreview,
  EmbedLayoutPreviewContent,
  EmbedLayoutPreviewTitle,
  EmbedLayoutPreviewInfoPanel,
  EmbedResourcesWrapper,
  EmbedViewer,
  ItemActions,
  ItemContent,
  ItemRow,
  ItemStyled,
  ItemThumbnail,
  LayoutImg,
  PdfLabel,
  ShareURL,
  ShareURLActions,
  StyledShareURL,
};
