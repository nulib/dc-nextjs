import { styled } from "@/stitches.config";

/* eslint sort-keys: 0 */

const DefinitionListWrapper = styled("div", {
  lineHeight: "1.47em",
  fontSize: "$gr3",

  "& dt": {
    color: "$black",
    fontFamily: "$northwesternSansBold",
  },
  "& dd": {
    marginInlineStart: "0",
    paddingBottom: "$gr3",
  },
});

export { DefinitionListWrapper };
