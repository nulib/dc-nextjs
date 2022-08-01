import { styled } from "@/stitches.config";

/* eslint sort-keys: 0 */

const DefinitionListWrapper = styled("div", {
  lineHeight: "1.47em",

  "& dt": {
    fontSize: "$3",
    color: "$black",
    fontFamily: "$displayBold",
    paddingBottom: "$1",
  },
  "& dd": {
    marginInlineStart: "0",
    paddingBottom: "$3",
  },
});

export { DefinitionListWrapper };
