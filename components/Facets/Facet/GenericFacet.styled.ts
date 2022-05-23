import { StyledHeading } from "@/components/Heading/Heading.styled";
import { styled } from "@/stitches.config";

/* eslint sort-keys: 0 */

const StyledGenericFacet = styled("div", {
  marginBottom: "2rem",

  [`${StyledHeading}`]: {
    margin: "1rem 0",
  },
});

const FindInput = styled("input", {
  display: "flex",
  width: "100%",
  padding: "0 2.382rem",
  fontSize: "1rem",
});

const Find = styled("div", {
  position: "relative",
  display: "flex",
  flexShrink: "0",
  flexGrow: "1",
  backgroundColor: "$gray6",
  height: "40px",
  marginBottom: "1rem",
  borderRadius: "3px",

  [`& ${FindInput}`]: {
    position: "relative",
    border: "none",
    backgroundColor: "transparent",
    zIndex: "1",
  },

  svg: {
    position: "absolute",
    display: "flex",
    left: "0",
    height: "40px",
    width: "40px",
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
    cursor: "pointer",
    backgroundColor: "transparent",
    zIndex: "0",
    fill: "$slate9",
    padding: "11px",
  },
});

const Options = styled("ul", {
  margin: "0",
  padding: "0",

  li: {
    margin: "0",
    padding: "0",
    listStyle: "none",
    marginBottom: "0.25rem",
    display: "flex",

    input: {
      marginRight: "0.382rem",
    },
  },
});

export { Find, FindInput, Options, StyledGenericFacet };
