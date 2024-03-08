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
  margin: "0 $gr4",

  "@xl": {
    margin: "0 $gr4",
  },

  "@lg": {
    margin: "0",
  },
});

const StyledResponseAside = styled("aside", {
  // background: "linear-gradient(7deg, $white 0%, $gray6 100%)",
  width: "38.2%",
  flexShrink: 0,
  borderRadius: "inherit",
  borderTopLeftRadius: "unset",
  borderBottomLeftRadius: "unset",
});

const StyledResponseContent = styled("div", {
  width: "61.8%",
  flexGrow: 0,
});

const StyledResponseWrapper = styled("div", {
  background:
    "linear-gradient(0deg, $white calc(100% - 100px), $brightBlueB calc(100% + 100px))",
  padding: "$gr6 0 $gr4",
});

const StyledImages = styled("div", {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  gap: "$gr4",

  "> div": {
    width: "calc(33% - 20px)",

    "&:nth-child(1)": {
      width: "calc(66% - 10px)",
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
  fontFamily: "$northwesternDisplayBold",
  fontWeight: "400",
  fontSize: "$gr6",
  lineHeight: "1.35em",
  margin: "0",
  padding: "0 0 $gr3 0",
  color: "$black",
});

const StyledStreamedAnswer = styled("article", {
  fontSize: "$gr3",
  lineHeight: "1.7em",

  strong: {
    fontWeight: "400",
    fontFamily: "$northwesternSansBold",
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

export {
  StyledResponse,
  StyledResponseAside,
  StyledResponseContent,
  StyledResponseWrapper,
  StyledImages,
  StyledQuestion,
  StyledStreamedAnswer,
};
