import { styled } from "@/stitches.config";

/* eslint sort-keys: 0 */

const StyledStatus = styled("span", {
  display: "flex",
  alignContent: "center",
  alignItems: "center",
  padding: "0 $1",
  marginLeft: "$2",
  backgroundColor: "$darkBlueA",
  color: "$white",
  borderRadius: "3px",
  fontSize: "$1",
  textTransform: "uppercase",
});

const StyledCopyText = styled("button", {});

export { StyledCopyText, StyledStatus };
