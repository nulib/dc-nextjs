import { styled } from "@/stitches.config";

/* eslint sort-keys: 0 */

const SearchStyled = styled("form", {
  position: "relative",
  display: "flex",
  flexShrink: "0",
  flexGrow: "1",
  backgroundColor: "$gray6",
  height: "$5",
});

const Input = styled("input", {
  position: "relative",
  display: "flex",
  width: "100%",
  border: "none",
  backgroundColor: "transparent",
  padding: "0 $5",
  fontSize: "$3",
  zIndex: "1",
});

const Button = styled("button", {
  position: "absolute",
  display: "flex",
  left: "0",
  height: "$5",
  width: "$5",
  justifyContent: "center",
  textAlign: "center",
  alignItems: "center",
  cursor: "pointer",
  border: "none",
  backgroundColor: "transparent",
  zIndex: "0",

  svg: {
    fill: "$black50",
    padding: "$1",
  },
});

const Clear = styled("button", {
  position: "absolute",
  display: "flex",
  right: "0",
  height: "$5",
  width: "$5",
  justifyContent: "center",
  textAlign: "center",
  alignItems: "center",
  cursor: "pointer",
  border: "none",
  backgroundColor: "transparent",
  zIndex: "1",

  svg: {
    fill: "$black50",
    padding: "$1",
  },
});

export { Button, Clear, Input, SearchStyled };
