import { IconClear } from "@/components/Shared/SVG/Icons";
import { gr } from "@/styles/sizes";
import { styled } from "@/stitches.config";

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
    borderRadius: "2px",
    marginLeft: "-2px",
    objectFit: "cover",
  },
});

const StyledStackFillerItem = styled(StyledStackItem, {
  // radial gradient to fill the stack
  background: `radial-gradient(circle at 25% 25%, $white, $gray6 100%)`,
  width: "2rem",
  borderBottom: "1px solid #0003",
  borderRight: "1px solid #0003",
  borderRadius: "3px",
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
    zIndex: 2,
  },

  [`& ${StyledStackItem}`]: {
    width: "2rem",
    height: "2rem",
    boxShadow: "2px 2px 5px #0002",
  },

  [`${StyledStackItem}:nth-child(1 of ${StyledStackFillerItem})`]: {
    transform: "translateX(2px) translateY(2px)",
    zIndex: 1,
  },

  [`${StyledStackItem}:nth-child(2 of ${StyledStackFillerItem})`]: {
    transform: "translateX(4px) translateY(4px)",
    zIndex: 0,
  },
});

const StyledStackDismiss = styled("button", {
  borderRadius: "100%",
  border: "none",
  padding: "calc($gr1 / 4)",
  display: "flex",
  backgroundColor: "$white",
  cursor: "pointer",
  width: "$gr3",
  height: "$gr3",
  transform: "translateX(calc(100% + 7px)) translateY(calc(100% + 7px))",
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
