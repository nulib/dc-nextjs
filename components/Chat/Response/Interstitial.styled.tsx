import { keyframes, styled } from "@/stitches.config";

const gradientAnimation = keyframes({
  to: {
    backgroundSize: "500%",
    backgroundPosition: "38.2%",
  },
});

const StyledInterstitialIcon = styled("div", {
  display: "flex",
  width: "0.75rem",
  height: "0.75rem",
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
    width: "0.75rem",
    height: "0.75rem",
  },
});

const StyledInterstitial = styled("div", {
  fontFamily: "$northwesternSansRegular",
  fontWeight: "400",
  fontSize: "$gr2",
  display: "inline-flex",
  alignItems: "center",
  gap: "$gr1",
  // marginLeft: "calc(-1.5rem - $gr2)",
  width: "fit-content",
  color: "$purple120",
  borderRadius: "1em",
  paddingRight: "$gr2",
  backgroundSize: "250%",
  backgroundPosition: "61.8%",
  animation: `${gradientAnimation} 5s infinite alternate`,

  strong: {
    fontFamily: "$northwesternSansBold",
    fontWeight: "400",
  },
});

export { StyledInterstitial, StyledInterstitialIcon };
