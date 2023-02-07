import { styled } from "@/stitches.config";

/* eslint sort-keys: 0 */

const NavResponsiveOnly = styled("div", {
  display: "none",

  "@sm": {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "$gr5 0 0",
    fontFamily: "$northwesternSansBook",

    "a, a:visited ": {
      fontSize: "$gr4",
      display: "flex",
      marginBottom: "$gr3",
      color: "$white",

      "&:last-child": {
        marginBottom: "0",
      },
    },
  },
});

const NavStyled = styled("nav", {
  display: "flex",
  alignItems: "center",
  flexShrink: "1",
  flexGrow: "0",

  "@sm": {
    flexDirection: "column",
    padding: "$gr5 0",
    height: "unset !important",
  },

  "a, a:visited ": {
    textDecoration: "none",

    "@sm": {
      fontFamily: "$northwesternSansLight",
      fontSize: "$gr3",
      display: "flex",
      marginBottom: "$gr3",
      padding: "0 !important",
      color: "$purple10",

      "&:last-child": {
        marginBottom: "0",
      },
    },
  },
});

export { NavResponsiveOnly, NavStyled };
