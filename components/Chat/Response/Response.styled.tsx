import { keyframes, styled } from "@/stitches.config";

import { purple } from "@/styles/colors";

/* eslint sort-keys: 0 */

const CursorKeyframes = keyframes({
  "50%": {
    opacity: 0,
  },
});

const StyledResponse = styled("article", {
  display: "flex",
  position: "relative",
  flexDirection: "column",
  gap: "$gr3",
  zIndex: "0",
  marginBottom: "$gr4",

  "> div:not(.response-images)": {
    display: "flex",
    flexDirection: "column",
    gap: "$gr3",
  },

  "h1, h2, h3, h4, h5, h6, strong": {
    fontFamily: "$northwesternSansBold",
  },

  "@sm": {
    flexDirection: "column",
    gap: "$gr3",
    marginBottom: "$gr4",
  },
});

const StyledResponseAside = styled("aside", {});

const StyledResponseContent = styled("div", {});

const StyledImages = styled("div", {
  display: "grid",
  gap: "$gr4",
  gridTemplateColumns: "repeat(5, 1fr)",
  marginBottom: "$gr3",

  "@md": {
    gridTemplateColumns: "repeat(4, 1fr)",
  },

  "@sm": {
    gridTemplateColumns: "repeat(3, 1fr)",
  },

  "@xs": {
    gridTemplateColumns: "repeat(2, 1fr)",
  },

  "> div": {
    figure: {
      padding: "0",

      figcaption: {
        "span:first-of-type": {
          textOverflow: "ellipsis",
          display: "-webkit-box",
          WebkitLineClamp: "2",
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        },
      },
    },
  },
});

const StyledQuestion = styled("header", {
  fontFamily: "$northwesternSansRegular",
  fontWeight: "400",
  fontSize: "$gr3",
  lineHeight: "1.35em",
  padding: "$gr2 $gr3",
  marginBottom: "$gr6",
  margin: "0 0 $gr2",
  color: "$purple120",
  alignSelf: "flex-end",
  borderRadius: "1rem",
  background: "$purple10",
  display: "flex",
  alignItems: "center",
  gap: "$gr3",
});

const StyledResponseMarkdown = styled("div", {
  fontSize: "$gr3",
  lineHeight: "1.47em",

  ".table-wrapper": {
    overflowX: "auto",
    width: "100%",
    "-webkit-overflow-scrolling": "touch",
    margin: "$gr4 0",
  },

  "p, li": {
    lineHeight: "inherit",
  },

  li: {
    marginBottom: "$gr1",
  },

  "h1, h2, h3, h4, h5, h6, strong": {
    fontWeight: "400",
    fontFamily: "$northwesternSansBold",
    fontSizeAdjust: "none",
  },

  a: {
    textDecoration: "underline",
    textDecorationThickness: "min(2px,max(1px,.05em))",
    textUnderlineOffset: "calc(.05em + 2px)",
    textDecorationColor: "$purple10",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
    borderSpacing: "0",
    marginBottom: "$gr4",
    borderLeft: "1px solid $gray6",
    borderRight: "1px solid $gray6",
    borderTop: "1px solid $gray6",
    margin: "0",

    th: {
      padding: "$gr2",
      textAlign: "left",
      fontWeight: "400",
      fontFamily: "$northwesternSansBold",
      borderBottom: "1px solid $gray6",
    },

    td: {
      padding: "$gr2",
      borderBottom: "1px solid $gray6",
    },
  },

  img: {
    maxWidth: "$gr7",
    maxHeight: "$gr7",
    borderRadius: "3px",
  },

  "span.markdown-cursor": {
    position: "relative",
    marginLeft: "$gr1",

    "&::before": {
      content: '""',
      position: "absolute",
      top: "-5px",
      width: "9px",
      height: "1.38em",
      backgroundColor: "$black20",
      animation: `${CursorKeyframes} 1s linear infinite`,
    },
  },
});

const StyledResponseActions = styled("div", {
  display: "flex",
  gap: "$gr2",
  padding: "$gr4 0",
});

const StyledUnsubmitted = styled("p", {
  color: "$black50",
  fontSize: "$gr3",
  fontFamily: "$northwesternSansRegular",
  textAlign: "center",
  width: "61.8%",
  maxWidth: "61.8%",
  margin: "0 auto",
  padding: "$gr5 0",
  minHeight: "38.2vh",
});

const StyledResponseDisclaimer = styled("p", {
  color: "$black50",
  fontSize: "$gr2",
  fontFamily: "$northwesternSansLight",
  margin: "0 0 $gr4",
});

export {
  StyledResponse,
  StyledResponseActions,
  StyledResponseAside,
  StyledResponseContent,
  StyledResponseDisclaimer,
  StyledImages,
  StyledQuestion,
  StyledResponseMarkdown,
  StyledUnsubmitted,
};
