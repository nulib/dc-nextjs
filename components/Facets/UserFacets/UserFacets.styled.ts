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
  transition: "$dcAll",

  svg: {
    width: "$gr4",
    marginBottom: "-3px",
    color: "$purple120",
    transform: "rotate(0deg)",
    transition: "$dcAll",
    padding: "$gr1",
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
    marginRight: "calc(-$gr3 + 4px)",
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
      marginBottom: "-1px",
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
  backgroundColor: "$gray6",
  boxShadow: "inset 1px 1px 2px #0002",
  zIndex: "1",
  borderRadius: "50%",
  marginRight: "$gr2",
  fill: "$black50",
  color: "$black50",
  stroke: "$black50",
  transition: "$dcAll",
  flexShrink: "0",
  objectFit: "contain",

  svg: {
    widht: "100%",
    height: "100%",
    fill: "inherit",
    stroke: "inherit",
    padding: "$gr1",
  },
});

const Text = styled("div", {
  display: "flex",
  flexDirection: "column",
  textAlign: "left",
  color: "$black",
  paddingRight: "$gr2",
  fontSize: "$gr3",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",

  strong: {
    fontFamily: "$northwesternSansBold",
    fontWeight: "400",
  },

  span: {
    display: "block",
    color: "$black50",
    marginTop: "2px",
    fontSize: "$gr2",
    fontWeight: "400",
    fontFamily: "$northwesternSansRegular",
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

  variants: {
    isModal: {
      true: {
        marginBottom: "$gr3",

        [`& ${StyledValue}`]: {
          marginBottom: "$gr2",
        },
      },
    },
  },

  [`& ${StyledValue}`]: {
    marginBottom: "$gr1",
  },
});

const DropdownContent = styled(Dropdown.Content, {
  [`& ${StyledValue}`]: {
    padding: "0.35rem 0.5rem",
    backgroundColor: "$white",
    boxShadow: "3px 3px 8px #0002",
    borderRadius: "25px",
    minWidth: "154px",
    maxWidth: "80vw",
    transition: "all 200ms ease-in-out",
    marginTop: "$gr1",

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
