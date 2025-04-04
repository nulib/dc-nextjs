import { styled } from "@/stitches.config";
import { gr } from "@/styles/sizes";
import { IconClear } from "@/components/Shared/SVG/Icons";

const StyledStack = styled("div", {
  width: "fit-content",
  display: "grid",
  "> *": {
    gridArea: "1 / 1",
  },

  ["&[data-isdismissed=true]"]: {
    display: "none",
  },
});

const StyledStackItem = styled("div", {
  // resets for the Tooltip
  "*": {
    width: "100%",
    height: "100%",
    padding: 0,
    margin: 0,
  },

  img: {
    borderRadius: gr(2),
    objectFit: "cover",
  },
});

const StyledStackFillerItem = styled(StyledStackItem, {
  borderBottom: "1px solid $black50",
  borderRight: "1px solid $black50",
  borderRadius: `0 0 ${gr(2)}px 0`,
});

const StyledStackContent = styled(StyledStack, {
  display: "grid",
  placeContent: "center",

  "> *": {
    gridArea: "1 / 1",
  },

  ["& > :first-child"]: {
    // this is the first child of the stack
    // ensures the Tooltip is hoverable
    zIndex: 1,
  },

  [`& ${StyledStackItem}`]: {
    width: "2rem",
    height: "2rem",
    boxShadow: "2px 2px 5px -1px #0002",
  },

  [`${StyledStackItem}:nth-child(1 of ${StyledStackFillerItem})`]: {
    transform: "translateX(3px) translateY(3px)",
  },

  [`${StyledStackItem}:nth-child(2 of ${StyledStackFillerItem})`]: {
    transform: "translateX(6px) translateY(6px)",
  },
});

const StyledStackDismiss = styled("button", {
  borderRadius: "100%",
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: "$black50",
  padding: "calc($gr1 / 4)",
  display: "flex",
  backgroundColor: "$gray6",
  cursor: "pointer",
  width: "$gr3",
  height: "$gr3",
  transform: "translateX(calc(100% + 10px)) translateY(calc(100% + 10px))",
  transition: "all 200ms ease-in-out",
  fill: "$black50",
  // ensure dismiss is above the first child of the stack
  zIndex: 2,

  svg: {
    width: "100%",
    height: "100%",
    fill: "inherit",
    stroke: "inherit",
  },

  [`&:hover`]: {
    borderColor: "$brightRed",
    fill: "$white",
    backgroundColor: "$brightRed",
    boxShadow: "3px 3px 8px #0002",
  },
});

export {
  StyledStack,
  StyledStackContent,
  StyledStackItem,
  StyledStackFillerItem,
  StyledStackDismiss,
};
