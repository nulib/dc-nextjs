import * as Accordion from "@radix-ui/react-accordion";

import { AnswerTooltip } from "./Information";
import { styled } from "@/stitches.config";

/* eslint sort-keys: 0 */

const StyledActions = styled("div", {
  display: "flex",
  paddingLeft: "$gr5",
});

const StyledRemoveButton = styled("button", {
  background: "transparent",
  border: "none",
  cursor: "pointer",
  fontFamily: "$northwesternSansRegular",
  fontSize: "$gr2",
  padding: "0",

  svg: {
    fill: "$black50 !important",
    transition: "opacity 0.2s ease-in-out",
  },

  "&:active, &:hover": {
    svg: {
      opacity: "1 !important",
      fill: "$brightRed !important",
    },
  },
});

const StyledAnswerHeader = styled(Accordion.Header, {
  margin: "$gr2 0",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",

  button: {
    background: "transparent !important",
    border: "none",
    cursor: "pointer",
    margin: "0",
    padding: "0",
    color: "$black !important",
    fontSize: "$gr5 !important",
    fontFamily: "$northwesternSansBold !important",
    textAlign: "left",

    "&:hover": {
      color: "$brightBlueB !important",
    },
  },
});

const StyledAnswerItem = styled(Accordion.Item, {
  "&::after": {
    content: "",
    display: "block",
    height: "1px",
    margin: "$gr3 0",
    width: "100%",
    backgroundColor: "$gray6",
  },

  [`&[data-state=closed]  ${StyledAnswerHeader}`]: {
    [`button`]: {
      fontFamily: "$northwesternSansRegular !important",
      color: "$black50 !important",

      "&:hover": {
        color: "$brightBlueB !important",
      },
    },

    [`& ${AnswerTooltip}`]: {
      display: "none",
      cursor: "default",
    },
  },

  "&:hover button svg": {
    opacity: "1",
  },
});

export {
  StyledActions,
  StyledAnswerHeader,
  StyledAnswerItem,
  StyledRemoveButton,
};
