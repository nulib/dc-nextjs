import * as Popover from "@radix-ui/react-popover";
import { styled } from "@/stitches.config";

/* eslint sort-keys: 0 */

const PopoverToggle = styled(Popover.Trigger, {
  display: "flex",
  padding: "0 1rem",
  border: "none",
  position: "relative",
  backgroundColor: "transparent",
  color: "$black",
  borderRadius: "50px",
  borderTopLeftRadius: "0",
  borderBottomLeftRadius: "0",
  justifyContent: "center",
  alignItems: "center",
  fontWeight: "700",
  cursor: "pointer",
  transition: "all 200ms ease-in-out",

  svg: {
    width: "16px",
    marginRight: "0.25rem",
    marginBottom: "-2px",
    color: "$black50",
    transform: "rotate(0deg)",
    transition: "all 200ms ease-in-out",
  },

  span: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "11px",
    backgroundColor: "$darkBlueA",
    color: "$white",
    width: "19px",
    height: "19px",
    borderRadius: "50%",
    marginTop: "-1.5rem",
    marginRight: "-1.25rem",
  },

  [`&:hover`]: {
    color: "$purple",

    svg: {
      transform: "rotate(0deg) !important",
      color: "$purple",
      marginBottom: "-7px",
    },
  },

  [`&[aria-expanded="true"]`]: {
    svg: {
      transform: "rotate(180deg) !important",
      marginBottom: "-3px",
    },
  },
});

const Icon = styled("span", {
  display: "flex",
  right: "0",
  height: "31px",
  width: "31px",
  justifyContent: "center",
  textAlign: "center",
  alignItems: "center",
  cursor: "pointer",
  backgroundColor: "transparent",
  zIndex: "1",
  border: "2px solid $black10",
  borderRadius: "50%",
  marginRight: "0.5rem",
  fill: "$black50",
  stroke: "$black50",
  transition: "all 200ms ease-in-out",
  flexShrink: "0",

  svg: {
    transition: "all 200ms ease-in-out",
    fill: "inherit",
    stroke: "inherit",
    padding: "4px",
  },
});

const Text = styled("div", {
  display: "flex",
  flexDirection: "column",
  textAlign: "left",
  color: "$black",
  paddingRight: "1rem",
  fontSize: "15px",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",

  span: {
    color: "$black50",
    fontSize: "12px",
  },
});

const StyledValue = styled("button", {
  display: "flex",
  padding: "0",
  margin: "0",
  border: "none",
  background: "transparent",
  alignItems: "center",
  cursor: "pointer",

  [`&:hover`]: {
    [`& ${Icon}`]: {
      borderColor: "$brightRed",
      fill: "$white",
      backgroundColor: "$brightRed",
    },
  },
});

const ValueWrapper = styled("div", {
  display: "flex",
  flexWrap: "wrap",
  [`& ${StyledValue}`]: {
    margin: "0 1rem 1rem 0",
  },
});

const PopoverContent = styled(Popover.Content, {
  [`& ${StyledValue}`]: {
    padding: "0.35rem 0.5rem",
    backgroundColor: "$white",
    boxShadow: "3px 3px 8px #0002",
    borderRadius: "25px",
    minWidth: "147px",
    maxWidth: "80vw",
    transition: "all 200ms ease-in-out",
    marginTop: "5px",

    [`&:hover`]: {
      boxShadow: "3px 3px 8px #0004",

      [`& ${Icon}`]: {
        boxShadow: "3px 3px 8px #0002",
      },
    },
  },
});

export { PopoverToggle, PopoverContent, Icon, StyledValue, Text, ValueWrapper };
