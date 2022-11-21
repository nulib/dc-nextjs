import * as Accordion from "@radix-ui/react-accordion";
import { styled } from "@/stitches.config";

/* eslint sort-keys: 0 */

const ExpandableListItemIndicator = styled("span", {
  display: "flex",
  backgroundColor: "transparent",
  color: "$black50",
  fontSize: "$gr1",
  fontFamily: "$northwesternSansRegular",
  borderRadius: "3px",
  height: "$gr3",
  padding: "3px",
  marginLeft: "$gr2",
  marginTop: "3px",
  whiteSpace: "nowrap",
  border: "1px solid $black10",
});

const ExpandableListItemHeading = styled("span", {
  color: "$purple",
  fontFamily: "$northwesternSansRegular",
  fontSize: "$gr4",
  lineHeight: "1.55em",
});

const ExpandableListItemTrigger = styled(Accordion.Trigger, {
  display: "flex",
  textAlign: "left",
  background: "transparent",
  border: "none",
  padding: "$gr2 0",
  cursor: "pointer",

  svg: {
    display: "flex",
    fill: "$purple",
    color: "$purple",
    height: "$gr3",
    width: "$gr3",
    marginRight: "$gr1",
    marginTop: "2px",
    transform: "rotate(-90deg)",
    transition: "$all",
    flexShrink: "0",
    flexGrow: "1",
  },

  "&:hover, &:focus": {
    [`& ${ExpandableListItemHeading}`]: {
      textDecoration: "underline",
    },
  },

  [`&[data-state=open]`]: {
    svg: {
      transform: "rotate(0)",
    },
  },
});

const ExpandableListItemStyled = styled(Accordion.Item, {
  background: "transparent",
  borderTop: "1px solid #f0f0f0",

  "&:last-child": {
    borderBottom: "1px solid #f0f0f0",
  },
});

export {
  ExpandableListItemHeading,
  ExpandableListItemIndicator,
  ExpandableListItemStyled,
  ExpandableListItemTrigger,
};
