import { styled } from "@/stitches.config";

/* eslint sort-keys: 0 */

const FactsItemBig = styled("span", {
  fontSize: "$gr7",
  fontFamily: "$northwesternDisplayExtraBold",
});

const FactsItemSmall = styled("span", {
  fontSize: "$gr4",
  fontFamily: "$northwesternDisplayExtraLight",
});

const FactsItemStyled = styled("div", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  alignContent: "center",
  flexGrow: "1",
  padding: "$gr3",
  color: "$purple",
});

const FactsStyled = styled("div", {
  display: "flex",
  justifyContent: "space-between",
});

export { FactsItemBig, FactsItemSmall, FactsItemStyled, FactsStyled };
