import { keyframes, styled } from "@/stitches.config";

/* eslint sort-keys: 0 */

const CursorKeyframes = keyframes({
  "50%": {
    opacity: 0,
  },
});

const StyledResponse = styled("section", {
  display: "flex",
  position: "relative",
  flexDirection: "column",
  gap: "$gr3",
  zIndex: "0",
  minHeight: "50vh",

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

const StyledResponseWrapper = styled("div", {
  padding: "0",
});

const StyledImages = styled("div", {
  display: "grid",
  gap: "$gr4",
  gridTemplateColumns: "repeat(5, 1fr)",

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

      "> div": {
        boxShadow: "5px 5px 13px rgba(0, 0, 0, 0.25)",
      },

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

const StyledQuestion = styled("h3", {
  fontFamily: "$northwesternSansBold",
  fontWeight: "400",
  fontSize: "$gr7",
  letterSpacing: "-0.012em",
  lineHeight: "1.35em",
  margin: "0",
  padding: "0",
  color: "$black",
});

const StyledResponseMarkdown = styled("article", {
  fontSize: "$gr3",
  lineHeight: "1.47em",
  overflow: "hidden",

  p: {
    lineHeight: "inherit",
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
  fontFamily: "$northwesternSansLight",
  textAlign: "center",
  width: "61.8%",
  maxWidth: "61.8%",
  margin: "0 auto",
  padding: "$gr4 0",
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
  StyledResponseWrapper,
  StyledImages,
  StyledQuestion,
  StyledResponseMarkdown,
  StyledUnsubmitted,
};
