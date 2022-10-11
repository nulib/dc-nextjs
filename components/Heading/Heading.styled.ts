import { styled } from "@/stitches.config";

/* eslint sort-keys: 0 */

const StyledHeading = styled("h2", {
  variants: {
    isHidden: {
      true: {
        position: "absolute",
        visibility: "hidden",
      },
    },
  },

  "&[data-level=h1]": {
    lineHeight: "1em",
    fontFamily: "$displayBold",
    fontSize: "$gr8",
    letterSpacing: "-0.015em",
    margin: "$gr6 0 $gr4",

    "&::before": {
      height: "$gr1",
      width: "$gr7",
      display: "block",
      backgroundColor: "$purple10",
      content: "",
      position: "relative",
      top: "-$gr4",
    },
  },
});

export { StyledHeading };
