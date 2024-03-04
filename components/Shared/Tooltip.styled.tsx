import * as Tooltip from "@radix-ui/react-tooltip";

import { styled } from "@/stitches.config";

/* eslint sort-keys: 0 */

export const TooltipArrow = styled(Tooltip.Arrow, {
  fill: "$brightBlueB",
});

export const TooltipBody = styled("div", {
  background: "$white",
  boxShadow: "0 13px 21px 0 rgba(0, 0, 0, 0.13)",
  width: "450px",
  lineHeight: "1.5em",
  fontSize: "$gr2 !important",
  fontFamily: "$northwesternSansRegular",
  padding: "$gr3",
  borderRadius: "6px",
  borderTop: "2px solid $brightBlueB",

  em: {
    color: "$black50",
    marginTop: "$gr1",
    display: "block",
    fontSize: "$gr1",
  },
});
