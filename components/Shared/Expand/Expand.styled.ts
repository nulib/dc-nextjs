import { VariantProps, styled } from "@/stitches.config";

import { Button } from "@nulib/design-system";

/* eslint sort-keys: 0 */

const ExpandButton = styled(Button, {
  opacity: "1",
  transition: "$dcAll",
});

const ExpandEdge = styled("div", {
  position: "absolute",
  width: "100%",
  bottom: "0",
  display: "flex",
  backgroundColor: "$white",
  justifyContent: "flex-start",
  paddingTop: "$gr7",
  background: "linear-gradient(to bottom, #fff0 0%, #fff 61.8%)",
  transition: "$dcAll",
  overflow: "hidden",
});

const ExpandContent = styled("div", {
  backgroundColor: "transparent",
});

const ExpandStyled = styled("div", {
  position: "relative",
  overflow: "hidden",
  transition: "$dcAll",
  backgroundColor: "transparent",

  variants: {
    isExpanded: {
      true: {
        [`& ${ExpandEdge}`]: {
          background: "transparent",
          height: "0",
          padding: "0",
        },

        [`& ${ExpandButton}`]: {
          opacity: "0",
        },
      },
    },
  },
});

export type ExpandVariants = VariantProps<typeof ExpandStyled>;

export { ExpandButton, ExpandContent, ExpandEdge, ExpandStyled };
