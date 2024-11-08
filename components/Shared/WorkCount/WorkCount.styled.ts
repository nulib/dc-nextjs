import { styled } from "@/stitches.config";

/* eslint sort-keys: 0 */

const WorkCountStyled = styled("div", {
  display: "inline-flex",
  color: "$white",
  fontSize: "$gr1",
  borderRadius: "1rem",
  margin: "0 0 $gr3",
  fontFamily: "$northwesternSansBold",
});

const WorkCountTotal = styled("span", {
  backgroundColor: "$purple120",
  borderRadius: "1rem",
  padding: "$gr1 $gr2",
});

const WorkCountType = styled("span", {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  paddingRight: "$gr2",
  backgroundColor: "transparent",

  svg: {
    height: "$gr3",
    width: "$gr3",
    fill: "$purple120",
    marginLeft: "3px",
  },

  "&:first-child": {
    paddingLeft: "$gr2",
  },

  "&:last-child": {
    paddingRight: "$gr2",
  },
});

const WorkCountTypes = styled("div", {
  color: "$purple120",
  display: "flex",
});

export { WorkCountStyled, WorkCountTotal, WorkCountTypes, WorkCountType };
