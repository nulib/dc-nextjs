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
    fontFamily: "$northwesternDisplayBold",
    fontSize: "$gr8",
    letterSpacing: "-0.015em",
    margin: "$gr6 0 $gr4",

    "@sm": {
      fontSize: "$gr7 !important",
    },

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
    fontFamily: "$northwesternDisplayBold",
    fontSize: "$gr7",
    fontWeight: "400",
    marginBottom: "$gr5",
  },

  "&[data-level=h3]": {
    color: "$black50",
    fontFamily: "$northwesternSansLight",
    fontSize: "$gr6",
    fontWeight: "400",
    marginBottom: "$gr3",
  },

  "&[data-level=h4]": {
    color: "$purple",
    fontFamily: "$northwesternSansLight",
    fontSize: "$gr5",
    fontWeight: "400",
    marginBottom: "$gr3",
  },

  "&[data-level=h5]": {
    color: "$black80",
    fontFamily: "$northwesternDisplayBold",
    fontSize: "$gr4",
    fontWeight: "400",
    marginBottom: "$gr3",
  },

  "&[data-level=h6]": {
    color: "$black50",
    fontFamily: "$northwesternDisplayBold",
    fontSize: "$gr3",
    fontWeight: "400",
    marginBottom: "$gr3",
  },
});

export { StyledHeading };
