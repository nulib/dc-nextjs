import { styled } from "@/stitches.config";

/* eslint sort-keys: 0 */

const ActionButtons = styled("div", {
  display: "flex",
  flexDirection: "row",
  justifyContent: "flext-start",
  padding: "1rem 0",

  button: {
    marginRight: "$4",
    fontFamily: "$sansLight",
    paddingTop: "$3",

    "&:last-child": {
      marginRight: "0",
    },
  },

  "@sm": {
    flexDirection: "column",
  },
});

const TopInfoWrapper = styled("section", {
  margin: "$6 0",

  [`> header`]: {
    display: "flex",
    flexDirection: "column",

    h1: {
      lineHeight: "1em",
      fontFamily: "$displayBold",
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
      fontFamily: "$sansLight",
      lineHeight: "1.47em",
    },
  },

  [`> div`]: {
    display: "grid",
    gap: "$7",
    gridTemplateColumns: "618fr 382fr",
    margin: "$3 0",
  },

  "@md": {
    gridTemplateColumns: "1fr",
  },
});

const TopInfoCollection = styled("div", {
  padding: "1rem 0",

  h2: {
    fontFamily: "$displayBold",
    fontWeight: "400",
    fontSize: "$3",
  },
});

export { ActionButtons, TopInfoCollection, TopInfoWrapper };
