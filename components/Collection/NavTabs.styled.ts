import * as TabsPrimitive from "@radix-ui/react-tabs";
import { styled } from "@/stitches.config";

/* eslint sort-keys: 0 */

const StyledTabs = styled(TabsPrimitive.Root, {});

const StyledList = styled(TabsPrimitive.List, {
  display: "flex",
  margin: "$gr4 0",
  borderBottom: "4px solid $gray6",
  flexGrow: "0",
  flexShrink: "1",
});

const StyledTrigger = styled(TabsPrimitive.Trigger, {
  background: "$white",
  border: "none",
  color: "$black80",
  cursor: "pointer",
  display: "flex",
  fontSize: "$gr4",
  fontFamily: "$northwesternDisplayBook",
  flexDirection: "column",
  justifyContent: "center",
  margin: "0",
  height: "$gr5",
  padding: "0 1rem",
  flexGrow: "0",
  flexShrink: "1",
  position: "relative",

  "&::before": {
    content: "",
    height: "4px",
    width: "0 ",
    backgroundColor: "$gray6",
    position: "absolute",
    bottom: "-4px",
    left: "0",
    transition: "$dcAll",
  },

  "&[data-state='active']": {
    fontFamily: "$northwesternDisplayBold",
    color: "$purple",

    "&::before": {
      width: "100% ",
      backgroundColor: "$purple",
    },
  },

  "@sm": {
    fontSize: "$gr3",
  },
});

const StyledContent = styled(TabsPrimitive.Content, {
  flexGrow: 1,
  padding: "$2 $1",
  backgroundColor: "white",
  borderBottomLeftRadius: 6,
  borderBottomRightRadius: 6,
  outline: "none",
  "&:focus": { boxShadow: `0 0 0 2px #f0f0f0` },

  "& a": {
    color: "$purple",
    cursor: "pointer",
  },
});

export {
  StyledContent as TabsContent,
  StyledList as TabsList,
  StyledTabs as Tabs,
  StyledTrigger as TabsTrigger,
};
