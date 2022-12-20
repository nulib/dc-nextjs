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
  boxShadow: "inset 0 -1px 0 #f0f0f0",

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
  padding: "2px $gr5 0",
  fontSize: "$gr3",
  zIndex: "1",
  fontFamily: "$northwesternSansRegular",
});

const Button = styled("button", {
  border: "none",
  backgroundColor: "$gray6",
  padding: "2px $3 0",
  color: "$purple",
  fontSize: "$gr4",
  fontFamily: "$northwesternSansBold",
  cursor: "pointer",
  textRendering: "optimizeLegibility",
});

const Clear = styled("button", {
  position: "absolute",
  display: "flex",
  right: "5rem",
  height: "$gr5",
  width: "$gr5",
  justifyContent: "center",
  textAlign: "center",
  alignItems: "center",
  cursor: "pointer",
  border: "none",
  backgroundColor: "transparent",
  zIndex: "1",

  svg: {
    fill: "$black50",
    padding: "$gr1",
  },
});

export { Button, Clear, Input, SearchStyled };
