import { keyframes, styled } from "@/stitches.config";

const gradientAnimation = keyframes({
  to: {
    backgroundSize: "500%",
    backgroundPosition: "38.2%",
  },
});

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
  backgroundSize: "250%",
  backgroundPosition: "61.8%",
  animation: `${gradientAnimation} 5s infinite alternate`,

  strong: {
    fontFamily: "$northwesternSansBold",
    fontWeight: "400",
    color: "$purple",
  },
});

export { StyledInterstitial, StyledInterstitialIcon };
