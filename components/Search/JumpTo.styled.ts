import { styled } from "@/stitches.config";

/* eslint sort-keys: 0 */

const SearchJumpToStyled = styled("ul", {
  position: "absolute",
  left: "0px",
  display: "block",
  margin: "0",
  padding: "0",
  background: "white",
  width: "calc(100% - $gr5)",
  fontSize: "$gr3",
  listStyle: "none",
  top: "50px",
});

const JumpItem = styled("li", {
  position: "relative",

  "& a": {
    display: "block",
    padding: "$gr3",
    borderTopWidth: "1px",
    borderTopColor: "$black20",
    borderTopStyle: "solid",
    cursor: "pointer",

    "&:hover": {
      background: "$black10",
    },
  },
});

const HelperStyled = styled("div", {
  position: "absolute",
  top: "$gr2",
  right: "$gr2",
  padding: "0 $gr2",
  background: "$black50",
  color: "$white",
  display: "flex",
  alignItems: "center",

  "& svg": {
    position: "relative",
    display: "inline-block",
    padding: "0",
    marginLeft: "$gr1",
    height: "$gr4",
    width: "auto",
  },
});

export { HelperStyled, JumpItem, SearchJumpToStyled };
