import { StyledHeading } from "@/components/Heading/Heading.styled";
import { styled } from "@/stitches.config";

/* eslint sort-keys: 0 */

const ActionButtons = styled("div", {
  display: "flex",
  flexDirection: "row",
  justifyContent: "flext-start",
  padding: "1rem 0",

  button: {
    marginRight: "$4",
    fontFamily: "$northwesternSansLight",
    paddingTop: "$3",

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
  gap: "$7",
  gridTemplateColumns: "618fr 382fr",
  margin: "$3 0",

  "@md": {
    gap: "$gr5",
  },

  "@sm": {
    gridTemplateColumns: "1fr",
    gap: "$gr4",
  },
});

const TopInfoWrapper = styled("section", {
  margin: "$6 0",

  [`> header`]: {
    display: "flex",
    flexDirection: "column",

    h1: {
      lineHeight: "1em",
      fontFamily: "$northwesternDisplayBold",
      fontSize: "$8",
      letterSpacing: "-0.015em",
      margin: "0",

      "&::before": {
        height: "$1",
        width: "$7",
        display: "block",
        backgroundColor: "$purple10",
        content: "",
        position: "relative",
        top: "-$4",
      },
    },

    p: {
      fontSize: "$5",
      color: "$black50",
      fontFamily: "$northwesternSansLight",
      lineHeight: "1.47em",
    },
  },
});

const TopInfoCollection = styled("div", {
  padding: "1rem 0",

  [`& ${StyledHeading}`]: {
    color: "$black80",
    fontSize: "$gr5",
    marginBottom: "$gr2",
  },
});

export { ActionButtons, TopInfoCollection, TopInfoContent, TopInfoWrapper };
