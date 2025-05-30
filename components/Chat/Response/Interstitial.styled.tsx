import { keyframes, styled } from "@/stitches.config";

const StyledInterstitialIcon = styled("div", {
  display: "flex",
  width: "1rem",
  height: "1rem",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "50%",
  transition: "$dcAll",
  content: "",

  variants: {
    isActive: {
      true: {
        backgroundPosition: "61.8%",
      },
      false: {
        backgroundPosition: "0%",
      },
    },
  },

  svg: {
    fill: "$purple",
    width: "1rem",
    height: "1rem",
  },
});

const StyledInterstitialWrapper = styled("div", {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

const StyledInterstitial = styled("div", {
  fontFamily: "$northwesternSansRegular",
  fontWeight: "400",
  fontSize: "$gr3",
  display: "inline-flex",
  alignItems: "center",
  gap: "$gr2",
  marginBottom: "$gr1",
  width: "fit-content",
  color: "$purple60",
  borderRadius: "1em",
  paddingRight: "$gr2",
  backgroundPosition: "61.8%",

  strong: {
    fontFamily: "$northwesternSansBold",
    fontWeight: "400",
    color: "$purple",
  },
});

const StyledInterstitialAction = styled("button", {
  display: "inline-flex",
  padding: "0 $gr2",
  height: "38px",
  alignItems: "center",
  gap: "$gr1",
  color: "$purple",
  background: "transparent",
  fontFamily: "$northwesternSansBold",
  fontSize: "$gr3",
  border: "none",
  cursor: "pointer",
  whiteSpace: "nowrap",

  svg: {
    height: "1rem",
    width: "1rem",
    stroke: "$purple30",
    transition: "$dcAll",
    margin: "-2px 0 0",

    path: {
      stroke: "inherit",
      strokeWidth: "48px",
    },
  },

  "&:hover": {
    svg: {
      marginLeft: "3px",
      marginRight: "-3px",
      stroke: "$purple",
    },
  },
});

export {
  StyledInterstitial,
  StyledInterstitialAction,
  StyledInterstitialIcon,
  StyledInterstitialWrapper,
};
