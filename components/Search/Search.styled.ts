import { styled } from "@/stitches.config";

/* eslint sort-keys: 0 */

const SearchStyled = styled("form", {
  position: "relative",
  display: "flex",
  flexShrink: "0",
  flexGrow: "1",
  transition: "$dcAll",
  borderRadius: "3px",
  flexWrap: "wrap",

  variants: {
    isFocused: {
      true: {
        backgroundColor: "$white !important",
        boxShadow: "3px 3px 11px #0001",
        outline: "2px solid $purple60",
      },
      false: {
        backgroundColor: "#f0f0f0",
        boxShadow: "none",
        outline: "2px solid transparent",
      },
    },
  },

  "> div": {
    display: "flex",
    justifyContent: "flex-end",

    "&:first-child": {
      flexGrow: "1",
    },
  },

  "@sm": {
    width: "100%",
    marginRight: "0",
    flexDirection: "column",
  },

  "> svg": {
    position: "absolute",
    display: "flex",
    left: "0",
    top: "3px",
    height: "$gr5",
    width: "$gr5",
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
    border: "none",
    backgroundColor: "transparent",
    zIndex: "0",
    fill: "$black50",
    padding: "15px",
  },
});

const Button = styled("button", {
  display: "flex",
  border: "none",
  backgroundColor: "$purple",
  alignItems: "center",
  padding: "0 $gr2",
  margin: "7px",
  height: "38px",
  color: "$white",
  fontSize: "$gr3",
  borderRadius: "3px",
  fontFamily: "$northwesternSansRegular",
  cursor: "pointer",
  textRendering: "optimizeLegibility",
  gap: "$gr1",
  position: "relative",

  "> svg": {
    width: "$gr3",
    height: "$gr3",
    marginTop: "-2px",
    fontFamily: "Times !important",
    color: "$purple60",
  },
});

const ResultsMessage = styled("span", {
  color: "$black50",
  fontSize: "$gr3",

  "@lg": {
    padding: "0 0 $gr3",
  },
});

const NoResultsMessage = styled("span", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  height: "100%",
  alignItems: "center",
  alignSelf: "center",
  color: "$black50",
  padding: "0 0 $gr8",
  margin: "0 auto",
  fontSize: "$gr3",
  fontFamily: "$northwesternSansLight",
  textAlign: "center",
  flexGrow: "1",

  strong: {
    color: "$black",
    fontFamily: "$northwesternSansBold",
    fontWeight: "400",
    display: "block",
    margin: "0 0 $gr2",
    fontSize: "$gr4",
  },
});

const ResultsWrapper = styled("div", {
  display: "flex",
  flexDirection: "column",
  minHeight: "80vh",
});

const ResultsWrapperHeader = styled("header", {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "0 $gr4 $gr4",
});

const StyledResponseWrapper = styled("div", {
  padding: "0 0 $gr6",
});

export {
  Button,
  NoResultsMessage,
  ResultsMessage,
  ResultsWrapper,
  ResultsWrapperHeader,
  SearchStyled,
  StyledResponseWrapper,
};
