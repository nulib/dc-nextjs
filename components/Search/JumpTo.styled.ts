import { styled } from "@/stitches.config";

/* eslint sort-keys: 0 */

const HelperStyled = styled("div", {
  position: "absolute",
  top: "11px",
  right: "$gr2",
  padding: "$gr1 $gr2",
  background: "transparent",
  borderRadius: "1rem",
  color: "$black50",
  display: "flex",
  alignItems: "center",
  transition: "$dcAll",
  fontFamily: "$northwesternSansRegular",
  fontSize: "$gr2",

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
  overflow: "hidden",
});

const JumpItem = styled("li", {
  position: "relative",
  transition: "$dcAll",

  label: {
    display: "block",
    width: "100%",
    padding: "$gr3",
    cursor: "pointer",
    fontFamily: "$northwesternSansRegular",
    fontSize: "$gr3",
    color: "$purple120",
    background: "transparent",
    borderTop: "1px solid $purple30",
  },

  input: {
    position: "absolute",
    opacity: 0,
    width: 0,
    height: 0,
    pointerEvents: "none",
  },

  "&[aria-selected='true']": {
    background: "$purple10",
    fontFamily: "$northwesternSansBold",

    label: {
      fontFamily: "$northwesternSansBold",
    },

    [`${HelperStyled}`]: {
      color: "$purple10",
      background: "$purple",
      fontFamily: "$northwesternSansRegular",

      svg: {
        width: "$gr3",
        color: "$purple30",
      },
    },
  },
});

export { HelperStyled, JumpItem, JumpToListStyled };
