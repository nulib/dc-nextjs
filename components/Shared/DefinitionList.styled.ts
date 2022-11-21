import { styled } from "@/stitches.config";

/* eslint sort-keys: 0 */

const DefinitionListWrapper = styled("div", {
  lineHeight: "1.47em",

  "& dt": {
    fontSize: "$gr3",
    color: "$black",
    fontFamily: "$northwesternDisplayBold",
  },
  "& dd": {
    marginInlineStart: "0",
    paddingBottom: "$gr2",
  },
});

export { DefinitionListWrapper };
