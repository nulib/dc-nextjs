import * as Dialog from "@radix-ui/react-dialog";
import { IconStyled } from "@/components/Shared/Icon";
import { ValueWrapper } from "@/components/Facets/UserFacets/UserFacets.styled";
import { styled } from "@/stitches.config";

/* eslint sort-keys: 0 */

const FilterActivate = styled(Dialog.Trigger, {
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  alignContent: "center",
  cursor: "pointer",
  backgroundColor: "$purple",
  border: "0",
  color: "$white",
  fontFamily: "$northwesternSansBold",
  fontSize: "$gr3",
  borderRadius: "50px",
  transition: "$dcAll",
  padding: "0 $gr3 0 $gr1",

  [`& ${IconStyled}`]: {
    color: "$purple60",
    fill: "$purple60",
  },

  "&:hover": {
    backgroundColor: "$purple120",
    color: "$white",
    boxShadow: "2px 2px 2px #0002",

    [`& ${IconStyled}`]: {
      color: "$white",
      fill: "$white",
    },
  },
});

const FilterFloating = styled("div", {
  height: `calc($gr3 * 2)`,
  display: "flex",
  backgroundColor: "$purple30",
  position: "relative",
  boxShadow: "2px 2px 5px #0002",
  borderRadius: "50px",
  transition: "$dcAll",
  alignSelf: "flex-start",

  [`& ${FilterActivate}`]: {
    boxShadow: "2px 2px 5px #0002",
  },

  "&:hover": {
    boxShadow: "2px 2px 5px #0004",
  },
});

const FilterClose = styled(Dialog.Close, {});

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
});

const FilterFooter = styled("footer", {
  position: "absolute",
  bottom: "0",
  padding: "1rem",
  backgroundColor: "$black10",
  width: "100%",
  display: "flex",
  justifyContent: "space-between",

  button: {
    display: "flex",
    alignItems: "center",
    margin: "0",
    fontSize: "$gr4",
    padding: "$gr2 $gr3",
    marginRight: "$gr2",
    cursor: "pointer",
    fontFamily: "$northwesternSansRegular",

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
    fontSize: "$gr4",
    lineHeight: "1.5rem",
    padding: "0",
    margin: "0",
    color: "$black50",
    fontFamily: "$northwesternDisplayRegular",
    fontWeight: "400",
  },

  em: {
    color: "$black80",
    lineHeight: "1.5rem",
    fontSize: "0.8333rem",
  },

  [`& ${FilterClose}`]: {
    display: "flex",
    height: "$gr4",
    width: "$gr4",
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
    cursor: "pointer",
    backgroundColor: "$gray6",
    boxShadow: "inset 1px 1px 2px #0002",
    zIndex: "1",
    border: "none",
    borderRadius: "50%",
    marginRight: "0.5rem",
    fill: "$black50",
    stroke: "$black50",
    transition: "all 200ms ease-in-out",
    flexShrink: "0",
    padding: "$gr1",

    "&:hover": {
      backgroundColor: "$brightRed",
      boxShadow: "3px 3px 8px #0002",
      fill: "$white",
      stroke: "$white",
    },

    svg: {
      width: "100%",
      height: "100%",
      fill: "inherit",
      stroke: "inherit",
    },
  },
});

const FilterContent = styled(Dialog.Content, {
  width: "calc(100vw - ($gr6 * 2))",
  height: "calc(100vh - ($gr6 * 2))",
  background: "white",
  position: "fixed",
  top: "$gr6",
  left: "$gr6",
  right: 0,
  bottom: 0,
  overflowY: "auto",
  zIndex: "2",
  borderRadius: "3px",
  boxShadow: "5px 5px 11px #0003",

  "@lg": {
    width: "calc(100vw - ($gr5 * 2))",
    height: "calc(100vh - ($gr5 * 2))",
    top: "$gr5",
    left: "$gr5",
  },

  "@md": {
    width: "calc(100vw - ($gr3 * 2))",
    height: "calc(100vh - ($gr3 * 2))",
    top: "$gr3",
    left: "$gr3",
  },

  "@sm": {
    width: "100vw",
    height: "100vh",
    top: "0",
    left: "0",
    borderRadius: "0",
  },
});

const FilterWrapper = styled("div", {
  display: "flex",
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
  FilterWrapper,
};
