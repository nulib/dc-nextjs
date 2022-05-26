import * as Checkbox from "@radix-ui/react-checkbox";
import { StyledHeading } from "@/components/Heading/Heading.styled";
import { styled } from "@/stitches.config";

/* eslint sort-keys: 0 */

const StyledGenericFacet = styled("div", {
  marginBottom: "2rem",

  [`${StyledHeading}`]: {
    margin: "0 0 1rem",
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

const Indicator = styled(Checkbox.Indicator, {
  display: "flex",
  width: "calc(0.9rem)",
  height: "calc(0.9rem)",
  backgroundColor: "$purple",
  margin: "-1px 0 0 -1px",
  borderRadius: "2px",
});

const Options = styled("ul", {
  margin: "0",
  padding: "0",

  li: {
    margin: "0",
    padding: "0",
    listStyle: "none",
    marginBottom: "0.35rem",
    display: "flex",

    "> span": {
      display: "block",
      color: "$black50",
      marginLeft: "0.25em",
    },

    label: {
      cursor: "pointer",
      color: "$black50",

      "&:hover, &:focus": {
        color: "$black",
      },

      [`&[data-selected=true]`]: {
        color: "$black",
        fontWeight: "700",
      },
    },

    button: {
      display: "flex",
      marginRight: "0.382rem",
      width: "0.9rem",
      height: "0.9rem",
      flexGrow: "0",
      flexShrink: "0",
      backgroundColor: "$white",
      border: "1px solid $black20",
      marginTop: "3px",
      padding: "0",
      cursor: "pointer",
      borderRadius: "2px",
      color: "$purple30",

      svg: {
        padding: "1px",
      },

      "&:hover, &:focus": {
        borderColor: "$black50",
        boxShadow: "2px 2px 5px #0002",
        color: "$white",
      },
    },
  },
});

export { Find, FindInput, Indicator, Options, StyledGenericFacet };
