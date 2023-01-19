import * as Dropdown from "@radix-ui/react-dropdown-menu";
import { styled } from "@/stitches.config";

/* eslint sort-keys: 0 */

const DropdownToggle = styled(Dropdown.Trigger, {
  display: "flex",
  padding: "0 $gr2",
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
    width: "$gr3",
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
    backgroundColor: "$darkBlueA",
    fontFamily: "$northwesternSansBold",
    fontWeight: "400",
    fontSize: "$gr1",
    color: "$white",
    width: "19px",
    height: "19px",
    borderRadius: "50%",
    marginTop: "-$gr4",
    marginRight: "-$gr3",
  },

  [`&:hover`]: {
    color: "$purple",

    svg: {
      transform: "rotate(0deg) !important",
      color: "$purple",
      marginBottom: "-$gr1",
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
  height: "$gr4",
  width: "$gr4",
  justifyContent: "center",
  textAlign: "center",
  alignItems: "center",
  cursor: "pointer",
  backgroundColor: "transparent",
  zIndex: "1",
  border: "1px solid $black10",
  borderRadius: "50%",
  marginRight: "$gr2",
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

  strong: {
    fontFamily: "$northwesternDisplayBold",
    fontWeight: "400",
  },

  span: {
    color: "$black50",
    fontSize: "12px",
    fontFamily: "$northwesternDisplayBook",
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
  fontFamily: "$northwesternSansRegular",

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

const DropdownContent = styled(Dropdown.Content, {
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

export {
  DropdownToggle,
  DropdownContent,
  Icon,
  StyledValue,
  Text,
  ValueWrapper,
};
