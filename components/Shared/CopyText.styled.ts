import { styled } from "@/stitches.config";

/* eslint sort-keys: 0 */

const StyledStatus = styled("span", {
  display: "flex",
  alignContent: "center",
  alignItems: "center",
  padding: "0 $gr1",
  marginLeft: "$gr1",
  backgroundColor: "$darkBlueA",
  color: "$white",
  borderRadius: "3px",
  fontSize: "$gr1",
  textTransform: "uppercase",
});

const StyledCopyText = styled("button", {
  display: "inline-flex",
  alignItems: "center",
  backgroundColor: "transparent",
  border: "none",
  cursor: "pointer",
  color: "$purple",
  fontWeight: "700",
  fontFamily: "$northwesternSans",
  fontSize: "$gr3",
  whiteSpace: "nowrap",
  textDecoration: "underline",
  textDecorationThickness: "min(2px,max(1px,.05em))",
  textUnderlineOffset: "calc(.05em + 2px)",
  textDecorationColor: "$purple10",

  svg: {
    height: "calc($gr3 - 3px)",
    marginRight: "$gr1",
  },
});

export { StyledCopyText, StyledStatus };
