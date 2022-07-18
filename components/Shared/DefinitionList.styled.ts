import { styled } from "@/stitches.config";

/* eslint sort-keys: 0 */

const DefinitionListWrapper = styled("div", {
  "& dt": {
    fontSize: "0.75rem",
    fontWeight: "bold",
    paddingBottom: "0.5rem",
    textTransform: "uppercase",
  },
  "& dd": {
    marginInlineStart: "0",
    paddingBottom: "1.25rem",
  },
});

export { DefinitionListWrapper };
