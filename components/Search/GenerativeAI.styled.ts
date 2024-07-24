import * as Tooltip from "@radix-ui/react-tooltip";

import { styled } from "@/stitches.config";

/* eslint sort-keys: 0 */

const GenerativeAIToggleWrapper = styled("div", {
  color: "$black50",
  fontSize: "$gr2",
  display: "flex",
  position: "relative",
  flexDirection: "row",
  flexWrap: "nowrap",
  flexShrink: "0",
  height: "$gr5",
  alignItems: "center",
  marginRight: "$gr1",

  "& label": {
    cursor: "pointer",
    flexShrink: "0",
    marginLeft: "3px",
    marginRight: "4px",
  },

  "& svg": {
    position: "relative",
    padding: "1px 0",
    height: "$gr3",
    width: "$gr3",
    fill: "$black50",
  },
});

const TooltipTrigger = styled(Tooltip.Trigger, {
  background: "transparent",
  border: "none",
});

const TooltipContent = styled(Tooltip.Content, {
  zIndex: 2,
});

export { GenerativeAIToggleWrapper, TooltipContent, TooltipTrigger };
