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
  fontSize: "$3",

  "&:hover": {
    textDecoration: "underline",
  },
});

export { StyledCopyText, StyledStatus };
