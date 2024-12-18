import { keyframes, styled } from "@/stitches.config";

const gradientAnimation = keyframes({
  to: {
    backgroundSize: "500%",
    backgroundPosition: "38.2%",
  },
});

const StyledInterstitialIcon = styled("div", {
  display: "flex",
  width: "1.5rem",
  height: "1.5rem",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "50%",
  background:
    "linear-gradient(73deg, $purple120 0%, $purple 38.2%, $brightBlueB 61.8%)",
  backgroundSize: "250%",
  backgroundPosition: "61.8%",
  animation: `${gradientAnimation} 5s infinite alternate`,
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
    fill: "$white",
    width: "0.85rem",
    height: "0.85rem",
  },
});

const StyledInterstitial = styled("div", {
  color: "$black",
  fontFamily: "$northwesternSansBold",
  fontSize: "$gr4",
  display: "flex",
  alignItems: "center",
  gap: "$gr2",

  em: {
    color: "$purple",
  },
});

export { StyledInterstitial, StyledInterstitialIcon };
