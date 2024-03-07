import { styled } from "@/stitches.config";

/* eslint sort-keys: 0 */

const SearchStyled = styled("form", {
  position: "relative",
  display: "flex",
  flexShrink: "0",
  flexGrow: "1",
  backgroundColor: "$white",
  height: "$gr5",
  marginRight: "$gr5",
  boxShadow: "3px -3px 19px #fff1",
  transition: "$dcAll",

  "@sm": {
    width: "100%",
    marginRight: "0",
  },

  "@lg": {
    marginRight: "$gr3",
  },

  svg: {
    position: "absolute",
    display: "flex",
    left: "0",
    height: "$gr5",
    width: "$gr5",
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
    border: "none",
    backgroundColor: "transparent",
    zIndex: "0",
    fill: "$black80",
    padding: "$gr2",
  },
});

const Input = styled("input", {
  position: "relative",
  display: "flex",
  width: "100%",
  border: "none",
  backgroundColor: "transparent",
  padding: "1px $gr3 0 $gr5",
  fontSize: "$gr3",
  zIndex: "1",
  fontFamily: "$northwesternSansRegular",
  whiteSpace: "nowrap",

  "&::placeholder": {
    overflow: "hidden",
    color: "$black80",
    textOverflow: "ellipsis",
    marginRight: "$gr5",
  },
});

const Button = styled("button", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  border: "none",
  backgroundColor: "$purple120",
  padding: "0 $gr3 ",
  color: "$white",
  fontSize: "$gr4",
  fontFamily: "$northwesternSansRegular",
  cursor: "pointer",
  textRendering: "optimizeLegibility",
});

const Clear = styled("button", {
  position: "absolute",
  display: "flex",
  right: "5rem",
  height: "$gr5",
  width: "calc($gr5 + $gr2)",
  justifyContent: "center",
  textAlign: "center",
  alignItems: "center",
  cursor: "pointer",
  border: "none",
  background: "linear-gradient(90deg, #fff0 0, #fff  38.2%)",
  zIndex: "1",
  fill: "$black80",

  "&:focus, &:hover": {
    fill: "$purple30",
  },

  svg: {
    fill: "inherit",
    padding: "$gr2",
    marginLeft: "$gr2",
    transition: "$dcAll",
  },
});

const ResultsMessage = styled("span", {
  color: "$black50",
  padding: "0 $gr4 $gr4",
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

export {
  Button,
  Clear,
  Input,
  NoResultsMessage,
  ResultsMessage,
  ResultsWrapper,
  SearchStyled,
};
