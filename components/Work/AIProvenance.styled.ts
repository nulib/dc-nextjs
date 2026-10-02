import { styled } from "@/stitches.config";

/* eslint sort-keys: 0 */

const AIProvenanceStyled = styled("div", {
  display: "inline-flex",
  flexDirection: "row",
  alignItems: "center",
  alignSelf: "flex-start",
  gap: "$gr1",
  marginBottom: "$gr3",
  padding: "$gr1 $gr2",
  borderRadius: "50px",
  backgroundColor: "$purple10",
  color: "$purple",
  fontFamily: "$northwesternSansRegular",
  fontSize: "$gr2",
  lineHeight: "1",

  "> svg": {
    height: "$gr2",
    width: "$gr2",
    fill: "$purple",
    flexShrink: "0",
  },

  button: {
    display: "flex",
    alignItems: "center",
    padding: "0",
    cursor: "pointer",

    svg: {
      height: "$gr2",
      width: "$gr2",
      fill: "$purple60",
      transition: "fill 200ms ease-in-out",
    },

    "&:hover svg, &:focus-visible svg": {
      fill: "$purple",
    },
  },
});

const AIProvenanceFieldList = styled("ul", {
  margin: "0 0 $gr2",
  paddingLeft: "$gr3",
  listStyle: "disc",
});

/* The status reads as secondary to the field it qualifies. */
const AIProvenanceStatus = styled("span", {
  opacity: "0.8",
});

export { AIProvenanceFieldList, AIProvenanceStatus, AIProvenanceStyled };
