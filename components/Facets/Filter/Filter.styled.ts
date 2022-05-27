import * as Dialog from "@radix-ui/react-dialog";
import {
  PopoverToggle,
  ValueWrapper,
} from "@/components/Facets/UserFacets/UserFacets.styled";
import { IconStyled } from "@/components/Shared/Icon";
import { styled } from "@/stitches.config";

/* eslint sort-keys: 0 */

const FilterActivate = styled(Dialog.Trigger, {
  height: "38px",
  cursor: "pointer",
  backgroundColor: "$white",
  border: "0",
  color: "$black",
  fontWeight: "700",
  fontSize: "1rem",
  borderRadius: "50px",
  transition: "all 200ms ease-in-out",
  display: "flex",
  alignItems: "center",
  padding: "0 1rem 0 0.5rem",

  [`& ${IconStyled}`]: {
    fill: "$black50",
    marginBottom: "-1px",
  },

  "&:hover": {
    backgroundColor: "$purple",
    color: "$white",
    boxShadow: "2px 2px 5px #0002",

    [`& ${IconStyled}`]: {
      fill: "$purple30",
    },
  },
});

const FilterFloating = styled("div", {
  display: "flex",
  backgroundColor: "$white",
  position: "relative",
  borderRadius: "50px",
  boxShadow: "2px 2px 5px #0002",
  transition: "all 200ms ease-in-out",

  [`& ${FilterActivate}`]: {
    boxShadow: "1px 1px 2px #0002",
  },

  "&:hover": {
    backgroundColor: "$purple10",
    boxShadow: "2px 2px 5px #0004",

    [`& ${PopoverToggle}`]: {
      fill: "$purple",

      svg: {
        color: "$purple",
        fill: "$purple",
        marginTop: "-2px",
        transform: "rotate(-90deg)",
      },
    },
  },
});

const FilterClose = styled(Dialog.Close, {});

const FilterOverlay = styled(Dialog.Overlay, {
  background: "rgba(0 0 0 / 0.618)",
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  display: "grid",
  placeItems: "center",
  overflowY: "auto",
  zIndex: "1",
});

const FilterBodyInner = styled("div", {
  display: "flex",
  flexGrow: "1",
  justifyContent: "space-between",
  flexDirection: "row",
  borderTop: "1px solid $black10",

  "> div": {
    "&:first-child": {
      flexGrow: "1",
    },

    "&:last-child": {
      width: "360px",
      minWidth: "240px",

      "@sm": { display: "none" },
    },
    borderRight: "1px solid $black10",
  },

  "@sm": {
    flexDirection: "column",
  },
});

const FilterBody = styled("div", {
  display: "flex",
  flexDirection: "column",
  margin: "3.5rem 0 4.5rem",
  maxHeight: "calc(100% - 8rem)",
  minHeight: "calc(100% - 8rem)",
  overflow: "scroll",

  [`& ${ValueWrapper}`]: {
    padding: "0 1rem",
  },

  "&:before": {
    position: "absolute",
    display: "block",
    width: "100%",
    height: "1px",
    backgroundColor: "$black10",
    // content: "",
    margin: "-1rem 0 0 -1rem",
  },
});

const FilterFooter = styled("footer", {
  position: "absolute",
  bottom: "0",
  padding: "1rem",
  backgroundColor: "$black10",
  width: "100%",
  boxShadow: "inset 3px 3px 8px #0001",
  display: "flex",
  justifyContent: "flex-end",

  button: {
    margin: "0",
    fontSize: "1rem",
    lineHeight: "1rem",
    padding: "0.75rem 1rem",
    marginRight: "1rem",
    cursor: "pointer",
    textTransform: "uppercase",

    [`&${FilterClose}`]: {
      backgroundColor: "white",
      color: "$black50",
      border: "none",

      "&:hover": {
        opacity: "0.75",
      },
    },

    "&:last-child": {
      marginRight: "0",
    },
  },
});

const FilterHeader = styled("header", {
  position: "absolute",
  top: "0",
  padding: "1rem",
  display: "flex",
  width: "100%",
  justifyContent: "space-between",
  backgroundColor: "$white",

  h2: {
    fontSize: "1rem",
    lineHeight: "1.5rem",
    padding: "0",
    margin: "0",
    color: "$black50",
  },

  em: {
    color: "$black80",
    lineHeight: "1.5rem",
    fontSize: "0.8333rem",
  },

  [`& ${FilterClose}`]: {
    display: "flex",
    height: "1.5rem",
    width: "1.5rem",
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
    cursor: "pointer",
    backgroundColor: "transparent",
    zIndex: "1",
    border: "none",
    borderRadius: "50%",
    marginRight: "0.5rem",
    fill: "$black50",
    stroke: "$black50",
    transition: "all 200ms ease-in-out",
    flexShrink: "0",

    "&:hover": {
      backgroundColor: "$brightRed",
      fill: "$white",
      stroke: "$white",
    },

    svg: {
      transition: "all 200ms ease-in-out",
      fill: "inherit",
      stroke: "inherit",
    },
  },
});

const FilterContent = styled(Dialog.Content, {
  width: "calc(100vw - 8rem)",
  height: "calc(100vh - 8rem)",
  background: "white",
  position: "fixed",
  top: "4rem",
  left: "4rem",
  right: 0,
  bottom: 0,
  overflowY: "auto",
  zIndex: "2",
  borderRadius: "3px",
  boxShadow: "5px 5px 11px #0002",

  "@sm": {
    width: "calc(100vw - 1rem)",
    height: "calc(100vh - 1rem)",
    top: "0.5rem",
    left: "0.5rem",
  },
});

export {
  FilterActivate,
  FilterBody,
  FilterBodyInner,
  FilterClose,
  FilterContent,
  FilterFloating,
  FilterFooter,
  FilterHeader,
  FilterOverlay,
};
