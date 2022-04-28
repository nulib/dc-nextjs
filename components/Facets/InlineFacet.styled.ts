import { styled } from "@/stitches.config";

const StyledInlineFacet = styled("ul", {
  display: "flex",
  justifyContent: "space-between",

  li: {
    listStyle: "none",
    marginLeft: "2rem",
  },
});

export { StyledInlineFacet };
