import * as TabsPrimitive from "@radix-ui/react-tabs";
import { styled } from "@/stitches.config";

/* eslint sort-keys: 0 */

const StyledTabs = styled(TabsPrimitive.Root, {
  display: "flex",
  flexDirection: "column",
  width: "100%",
});

const StyledList = styled(TabsPrimitive.List, {
  flexShrink: 0,
  display: "flex",
});

const StyledTrigger = styled(TabsPrimitive.Trigger, {
  background: "$black50",
  color: "$white",
  cursor: "pointer",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-end",
  height: "10rem",
  margin: "0",
  width: "100%",
});

const StyledContent = styled(TabsPrimitive.Content, {
  flexGrow: 1,
  padding: "$2 0",
  backgroundColor: "white",
  borderBottomLeftRadius: 6,
  borderBottomRightRadius: 6,
  outline: "none",
  "&:focus": { boxShadow: `0 0 0 2px black` },

  "& a": {
    color: "$purple",
    cursor: "pointer",
  },
});
const NavTab = styled(TabsPrimitive.Trigger, {
  background: "$black50",
  color: "$white",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-end",
  height: "10rem",
  width: "100%",
});

const NavTabTitle = styled("span", {
  display: "inline-block",
  padding: "1rem",
});

export {
  NavTab,
  NavTabTitle,
  StyledContent as TabsContent,
  StyledList as TabsList,
  StyledTabs as Tabs,
  StyledTrigger as TabsTrigger,
};
