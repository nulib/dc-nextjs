// import * as Dialog from "@radix-ui/react-dialog";
// import { IconStyled } from "@/components/Shared/Icon";
// import { PopoverToggle } from "@/components/Facets/UserFacets/UserFacets.styled";
import * as Accordion from "@radix-ui/react-accordion";
import * as Tabs from "@radix-ui/react-tabs";
import { styled } from "@/stitches.config";

/* eslint sort-keys: 0 */

const GroupContent = styled(Accordion.Content, {});

const GroupHeader = styled(Accordion.Header, {
  margin: "0",
  fontSize: "1rem",
});

const GroupToggle = styled(Accordion.Trigger, {
  width: "100%",
  fontSize: "0.8333rem",
  border: "none",
  textAlign: "left",
  padding: "0.75rem 1rem",
  background: "transparent",
  color: "$black50",
  cursor: "pointer",
  transition: "background 100ms ease-in-out",
  borderRadius: "3px",
  borderTopLeftRadius: "0",
  borderBottomLeftRadius: "0",
  whiteSpace: "nowrap",

  ["&[aria-expanded=true]"]: {
    backgroundColor: "$purple120",
    color: "$purple30",

    "&:hover, &:focus": {
      backgroundColor: "$purple120",
      color: "$purple30",
    },
  },

  "&:hover, &:focus": {
    color: "$purple",
    backgroundColor: "$purple10",
  },
});

const ItemList = styled(Tabs.List, {
  display: "flex",
  flexDirection: "column",
  margin: "0.5rem",
});

const ItemToggle = styled(Tabs.Trigger, {
  width: "100%",
  fontSize: "1rem",
  border: "none",
  textAlign: "left",
  padding: "0.75rem 1rem",
  background: "transparent",
  color: "$black",
  cursor: "pointer",
  transition: "background 100ms ease-in-out",
  borderRadius: "3px",
  borderTopLeftRadius: "0",
  borderBottomLeftRadius: "0",

  ["&[aria-selected=true]"]: {
    fontWeight: "700",
  },
  "&:hover, &:focus": {
    color: "$purple",
  },
});

const ItemContent = styled(Tabs.Content, {
  padding: "0.5rem 2rem",
});

const Group = styled(Accordion.Item, {});

export {
  Group,
  GroupContent,
  GroupHeader,
  GroupToggle,
  ItemContent,
  ItemList,
  ItemToggle,
};
