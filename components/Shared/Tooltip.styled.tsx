import * as Tooltip from "@radix-ui/react-tooltip";

import { styled } from "@/stitches.config";

/* eslint sort-keys: 0 */

export const TooltipArrow = styled(Tooltip.Arrow, {
  fill: "$white",
});

export const TooltipBody = styled("div", {
  background: "$white",
  boxShadow: "5px 5px 19px #0002",
  maxWidth: "350px",
  lineHeight: "1.47em",
  fontSize: "$gr2 !important",
  fontFamily: "$northwesternSansRegular",
  padding: "$gr3",
  borderRadius: "3px",
  color: "$black50",

  strong: {
    fontFamily: "$northwesternSansBold",
    fontWeight: "400",
    color: "$black80",
  },

  em: {
    fontStyle: "italic",
    color: "$black80",
  },
});
