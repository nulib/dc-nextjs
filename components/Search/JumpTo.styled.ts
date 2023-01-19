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
  position: "absolute",
  left: "0px",
  display: "block",
  margin: "0",
  padding: "0",
  background: "$white",
  width: "100%",
  fontSize: "$gr2",
  listStyle: "none",
  top: "50px",
  border: "1px solid $black10",
  boxShadow: "3px 3px 8px #0003",
});

const JumpItem = styled("li", {
  position: "relative",
  backgroundColor: "$gray6",
  transition: "$dcAll",

  "& a": {
    display: "block",
    padding: "$gr3",
    borderTopWidth: "1px",
    borderTopColor: "$black20",
    borderTopStyle: "solid",
    cursor: "pointer",
    color: "$purple120",
  },

  "&[aria-selected='true']": {
    background: "$purple10",

    [`${HelperStyled}`]: {
      color: "$purple10",
      background: "$purple",
      boxShadow: "2px 2px 5px #0001",

      svg: {
        width: "$gr3",
      },
    },
  },
});

export { HelperStyled, JumpItem, JumpToListStyled };
