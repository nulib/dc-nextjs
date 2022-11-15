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

  "&[data-level=h2]": {
    color: "$purple",
    fontFamily: "$displayBold",
    fontSize: "$gr7",
    fontWeight: "400",
    marginBottom: "$gr5",
  },

  "&[data-level=h3]": {
    color: "$black50",
    fontFamily: "$sansLight",
    fontSize: "$gr6",
    fontWeight: "400",
    marginBottom: "$gr3",
  },

  "&[data-level=h4]": {
    color: "$purple",
    fontFamily: "$sansLight",
    fontSize: "$gr5",
    fontWeight: "400",
    marginBottom: "$gr3",
  },

  "&[data-level=h5]": {
    color: "$black80",
    fontFamily: "$displayBold",
    fontSize: "$gr4",
    fontWeight: "400",
    marginBottom: "$gr3",
  },

  "&[data-level=h6]": {
    color: "$black50",
    fontFamily: "$displayBold",
    fontSize: "$gr3",
    fontWeight: "400",
    marginBottom: "$gr3",
  },
});

export { StyledHeading };
