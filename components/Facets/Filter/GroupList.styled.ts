import * as Accordion from "@radix-ui/react-accordion";
import * as Tabs from "@radix-ui/react-tabs";
import { styled } from "@/stitches.config";

/* eslint sort-keys: 0 */

const Group = styled(Accordion.Item, {});

const GroupContent = styled(Accordion.Content, {
  marginBottom: "$gr2",
});

const GroupHeader = styled(Accordion.Header, {
  margin: "0",
  fontSize: "1rem",
});

const GroupToggleIcon = styled("span", {
  position: "absolute",
  right: "$gr3",
  marginTop: "-1px",
  opacity: "0.5",
  transition: "$dcAll",

  svg: {
    height: "$gr3",
    transform: "rotate(-90deg)",
    transition: "$dcAll",
  },
});

const GroupToggle = styled(Accordion.Trigger, {
  position: "relative",
  width: "100%",
  fontSize: "$gr3",
  textAlign: "left",
  padding: "0 $gr5 0 $gr3",
  height: "$gr5",
  marginBottom: "$gr1",
  backgroundColor: "transparent",
  border: "none",
  borderLeft: "0",
  color: "$black50",
  cursor: "pointer",
  transition: "$dcAll",
  borderRadius: "3px",
  borderTopLeftRadius: "0",
  borderBottomLeftRadius: "0",
  whiteSpace: "nowrap",
  fontFamily: "$northwesternSansRegular",
  fontWeight: "400",

  ["&[aria-expanded=true]"]: {
    backgroundColor: "$purple120",
    color: "$purple10",

    [`${GroupToggleIcon}`]: {
      svg: { transform: "none" },
    },

    "&:hover, &:focus": {
      backgroundColor: "$purple120",
      color: "$purple30",

      [`${GroupToggleIcon}`]: {
        right: "$gr3",
        opacity: "0.5",
      },
    },
  },

  "&:hover, &:focus": {
    color: "$purple",
    backgroundColor: "$purple10",

    [`${GroupToggleIcon}`]: {
      right: "$gr2",
      opacity: "1",
    },
  },

  "@sm": {
    height: "$gr4",
  },
});

const ItemList = styled(Tabs.List, {
  display: "flex",
  flexDirection: "column",
});

const ItemToggle = styled(Tabs.Trigger, {
  position: "relative",
  width: "100%",
  height: "$gr5",
  padding: "0 $gr3",
  fontSize: "$gr3",
  border: "none",
  textAlign: "left",
  background: "transparent",
  color: "$black",
  cursor: "pointer",
  transition: "background 100ms ease-in-out",
  borderRadius: "3px",
  borderTopLeftRadius: "0",
  borderBottomLeftRadius: "0",
  fontFamily: "$northwesternSansRegular",

  ["&[aria-selected=true]"]: {
    fontFamily: "$northwesternSansBold",

    "&:hover, &:focus": {
      color: "$black",
    },

    "&::before": {
      width: "$gr3",
      height: "$gr3",
      backgroundColor: "$brightBlueB",
      borderRadius: "3px",
      position: "absolute",
      left: "-$gr2",
      marginTop: "0",
      content: "",
      transform: "rotate(45deg)",
    },
  },

  "&:hover, &:focus": {
    color: "$purple",
  },

  "@sm": {
    height: "$gr4",
  },
});

const ItemContent = styled(Tabs.Content, {
  padding: "0.5rem 2rem",

  "@md": {
    padding: "0.5rem $gr3 0.5rem $gr3",
  },
});

const TabsRoot = styled(Tabs.Root, {
  display: "flex",
  padding: "1rem 0",

  "@sm": {
    flexDirection: "column",
  },
});

export {
  Group,
  GroupContent,
  GroupHeader,
  GroupToggle,
  GroupToggleIcon,
  ItemContent,
  ItemList,
  ItemToggle,
  TabsRoot,
};
