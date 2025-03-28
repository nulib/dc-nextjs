import * as Tooltip from "@radix-ui/react-tooltip";

import { styled } from "@/stitches.config";

/* eslint sort-keys: 0 */

export const TooltipArrow = styled(Tooltip.Arrow, {
  fill: "$white",
});

export const TooltipBody = styled("div", {
  background: "$white",
  boxShadow: "5px 5px 19px 0 #0002",
  maxWidth: "450px",
  lineHeight: "1.5em",
  fontSize: "$gr2 !important",
  fontFamily: "$northwesternSansRegular",
  padding: "$gr3",
  borderRadius: "3px",

  em: {
    color: "$black50",
    marginTop: "$gr1",
    display: "block",
    fontSize: "$gr1",
  },
});
