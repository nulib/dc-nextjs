import { styled } from "@/stitches.config";

/* eslint sort-keys: 0 */

const SearchStyled = styled("form", {
  position: "relative",
  display: "flex",
  flexShrink: "0",
  flexGrow: "1",
  backgroundColor: "$gray6",
  height: "50px",
});

const Input = styled("input", {
  position: "relative",
  display: "flex",
  width: "100%",
  border: "none",
  backgroundColor: "transparent",
  padding: "0 2.618rem",
  fontSize: "15px",
  zIndex: "1",
});

const Button = styled("button", {
  position: "absolute",
  display: "flex",
  left: "0",
  height: "50px",
  width: "50px",
  justifyContent: "center",
  textAlign: "center",
  alignItems: "center",
  cursor: "pointer",
  border: "none",
  backgroundColor: "transparent",
  zIndex: "0",

  svg: {
    fill: "$slate9",
    padding: "10px",
  },
});

const Clear = styled("button", {
  position: "absolute",
  display: "flex",
  right: "0",
  height: "50px",
  width: "50px",
  justifyContent: "center",
  textAlign: "center",
  alignItems: "center",
  cursor: "pointer",
  border: "none",
  backgroundColor: "transparent",
  zIndex: "1",

  svg: {
    fill: "$slate9",
    padding: "10px",
  },
});

export { Button, Clear, Input, SearchStyled };
