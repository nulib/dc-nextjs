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
  gap: "$gr5",
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

const StyledResponseAside = styled("aside", {
  width: "38.2%",
  flexShrink: 0,
  borderRadius: "inherit",
  borderTopLeftRadius: "unset",
  borderBottomLeftRadius: "unset",

  "@sm": {
    width: "unset",
  },
});

const StyledResponseContent = styled("div", {
  width: "61.8%",
  flexGrow: 0,

  "@sm": {
    width: "unset",
  },
});

const StyledResponseWrapper = styled("div", {
  padding: "0",
});

const StyledImages = styled("div", {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  gap: "$gr4",

  "> div": {
    width: "calc(33% - 20px)",

    "@md": {
      width: "calc(50% - 20px)",
    },

    "@sm": {
      width: "calc(33% - 20px)",
    },

    "&:nth-child(1)": {
      width: "calc(66% - 10px)",

      "@md": {
        width: "100%",
      },

      "@sm": {
        width: "calc(33% - 20px)",
      },
    },

    figure: {
      padding: "0",

      "> div": {
        boxShadow: "5px 5px 13px rgba(0, 0, 0, 0.25)",
      },

      figcaption: {
        "span:first-of-type": {
          textOverflow: "ellipsis",
          display: "-webkit-box",
          WebkitLineClamp: "3",
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
  fontSize: "$gr6",
  letterSpacing: "-0.012em",
  lineHeight: "1.35em",
  margin: "0",
  padding: "0 0 $gr4 0",
  color: "$black",
});

const StyledStreamedAnswer = styled("article", {
  fontSize: "$gr3",
  lineHeight: "162.8%",
  overflow: "hidden",

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
  StyledStreamedAnswer,
  StyledUnsubmitted,
};
