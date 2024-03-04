import * as Tooltip from "@radix-ui/react-tooltip";

import { styled } from "@/stitches.config";

/* eslint sort-keys: 0 */

const GenerativeAIToggleWrapper = styled("div", {
  color: "$black50",
  fontSize: "$gr2",
  display: "flex",
  flexShrink: "0",
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
    padding: "0 0 1px",
    height: "$gr3",
    width: "$gr3",
    fill: "$black50",
  },
});

const GenerativeAIDialogMessage = styled("p", {});

const FlexBody = styled("div", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  width: "100%",
});

const DialogButtonRow = styled("div", {
  display: "flex",
  justifyContent: "flex-end",
});

const TooltipTrigger = styled(Tooltip.Trigger, {
  background: "transparent",
  border: "none",
});

const TooltipContent = styled(Tooltip.Content, {
  zIndex: 2,
});

export {
  DialogButtonRow,
  FlexBody,
  GenerativeAIDialogMessage,
  GenerativeAIToggleWrapper,
  TooltipContent,
  TooltipTrigger,
};
