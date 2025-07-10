import { styled } from "@/stitches.config";

/* eslint sort-keys: 0 */

const HelperStyled = styled("div", {
  position: "absolute",
  top: "10px",
  right: "$gr2",
  padding: "$gr1 $gr3",
  background: "transparent",
  borderRadius: "1rem",
  color: "$black50",
  display: "flex",
  alignItems: "center",
  transition: "$dcAll",
  fontFamily: "$northwesternSansRegular",

  "& > svg": {
    position: "relative",
    display: "inline-block",
    padding: "0",
    marginLeft: "$gr1",
    height: "$gr3",
    width: "0",
    color: "inherit",
    transition: "$dcAll",
  },
});

const JumpToListStyled = styled("ul", {
  display: "flex",
  flexDirection: "column",
  alignSelf: "flex-end",
  margin: "0",
  padding: "0",
  background: "$white",
  width: "100%",
  fontSize: "$gr2",
  listStyle: "none",
  top: "50px",
  borderRadius: "3px",
  boxShadow: "3px 3px 11px #0001",
});

const JumpItem = styled("div", {});

export { HelperStyled, JumpItem, JumpToListStyled };
