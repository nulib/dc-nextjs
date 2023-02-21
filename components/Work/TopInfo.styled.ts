import { StyledHeading } from "@/components/Heading/Heading.styled";
import { styled } from "@/stitches.config";

/* eslint sort-keys: 0 */

const ActionButtons = styled("div", {
  display: "flex",
  flexDirection: "row",
  justifyContent: "flext-start",
  padding: "$gr2 0",

  button: {
    marginRight: "$gr3",
    fontFamily: "$northwesternSansLight",
    paddingTop: "$gr3",

    "&:last-child": {
      marginRight: "0",
    },

    "@sm": {
      marginRight: "0px",
    },
  },

  "@sm": {
    flexDirection: "column",
  },
});

const TopInfoContent = styled("div", {
  display: "grid",
  gap: "$gr7",
  gridTemplateColumns: "618fr 382fr",
  margin: "$gr3 0",

  "@md": {
    gap: "$gr5",
  },

  "@sm": {
    gridTemplateColumns: "1fr",
    gap: "$gr4",
  },
});

const TopInfoWrapper = styled("section", {
  margin: "$gr5 0",

  [`> header`]: {
    display: "flex",
    flexDirection: "column",

    h1: {
      lineHeight: "1em",
      fontFamily: "$northwesternDisplayBold",
      fontSize: "$8",
      letterSpacing: "-0.015em",
      margin: "0",

      "@sm": {
        fontSize: "$gr7",
      },
    },

    p: {
      fontSize: "$gr5",
      color: "$black50",
      fontFamily: "$northwesternSansLight",
      lineHeight: "1.47em",

      "@sm": {
        fontSize: "$gr4",
      },
    },
  },
});

const TopInfoCollection = styled("div", {
  padding: "$gr4 0",

  [`& ${StyledHeading}`]: {
    color: "$black80",
    fontSize: "$gr5",
    marginBottom: "$gr2",
  },
});

export { ActionButtons, TopInfoCollection, TopInfoContent, TopInfoWrapper };
