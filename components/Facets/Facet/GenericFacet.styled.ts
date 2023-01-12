import * as Checkbox from "@radix-ui/react-checkbox";
import { StyledHeading } from "@/components/Heading/Heading.styled";
import { styled } from "@/stitches.config";

/* eslint sort-keys: 0 */

const StyledGenericFacet = styled("div", {
  marginBottom: "2rem",

  [`${StyledHeading}`]: {
    margin: "0 0 1rem",
    fontFamily: "$northwesternDisplayBold",
    fontWeight: "400",
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
    fontSize: "$gr3",
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
  width: "$gr3",
  height: "$gr3",
  backgroundColor: "$purple",
  margin: "-1px 0 0 -1px",
  borderRadius: "3px",
});

const OptionCount = styled("span", {
  color: "$black50",
  marginLeft: "4px",
  fontFamily: "$northwesternSansLight",
  position: "relative",
});

const OptionText = styled("span", {
  color: "$black",
  fontFamily: "$northwesternSansRegular",
});

const Options = styled("ul", {
  margin: "0",
  padding: "0",

  li: {
    margin: "$gr1 0",
    padding: "0",
    listStyle: "none",
    display: "flex",
    fontSize: "$gr3",

    label: {
      cursor: "pointer",
      color: "$black",
      fontFamily: "$northwesternSansRegular",
      lineHeight: "1.382em",
      flexShrink: "1",
      flexGrow: "0",

      "&:hover, &:focus": {
        color: "$black",
      },

      [`&[data-selected=true]`]: {
        color: "$black",
        fontFamily: "$northwesternSansBold",
        fontWeight: "700",

        [`${OptionCount}`]: {
          fontWeight: "400",
        },
      },
    },

    button: {
      display: "flex",
      marginRight: "$gr1",
      width: "calc(1rem)",
      height: "calc(1rem)",
      flexGrow: "0",
      flexShrink: "0",
      backgroundColor: "$white",
      border: "1px solid $black10",
      padding: "0",
      cursor: "pointer",
      borderRadius: "3px",
      color: "$purple30",

      svg: {
        padding: "1px",
      },

      "&:hover, &:focus": {
        borderColor: "$black20",
        boxShadow: "2px 2px 5px #0002",
        color: "$white",
      },
    },
  },
});

const SpinWrapper = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  paddingTop: "$gr2",
  paddingLeft: "$gr3",
});

export {
  Find,
  FindInput,
  Indicator,
  Options,
  OptionCount,
  OptionText,
  SpinWrapper,
  StyledGenericFacet,
};
