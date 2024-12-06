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
  margin: "$gr5 0 $gr6",

  [`> header`]: {
    display: "flex",
    flexDirection: "column",

    h1: {
      lineHeight: "1em",
      fontWeight: "400",
      fontFamily: "$northwesternDisplayBold",
      fontSize: "$gr7",
      letterSpacing: "-0.025em",
      margin: "0",
    },

    p: {
      fontSize: "$gr4",
      color: "$black50",
      lineHeight: "1.47em",
    },
  },
});

const TopInfoHeaderContent = styled("div", {
  display: "flex",
  justifyContent: "space-between",
  padding: "0 0 $gr3",
  gap: "$gr2",

  "@sm": {
    flexDirection: "column",
    gap: "0",
  },

  "> div:last-child": {
    flexShrink: 0,
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "flex-end",
    width: "38.2%",

    "@sm": {
      justifyContent: "center",
      width: "100%",
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

export {
  ActionButtons,
  TopInfoCollection,
  TopInfoContent,
  TopInfoHeaderContent,
  TopInfoWrapper,
};
