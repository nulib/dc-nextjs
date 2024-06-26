import { VariantProps, styled } from "@/stitches.config";

import { ContainerStyled } from "@/components/Shared/Container";
import { NavStyled } from "@/components/Nav/Nav.styled";
import { SearchStyled } from "@/components/Search/Search.styled";

/* eslint sort-keys: 0 */

const Lockup = styled("div", {
  position: "relative",
  padding: "$gr4 0",
  fontSize: "$gr5",
  fontFamily: "$northwesternSansRegular",
  zIndex: "1",
  color: "$purple",

  a: {
    color: "inherit !important",
    textDecoration: "none",
  },
});

const Menu = styled("div", {
  "@sm": {
    position: "absolute",
    width: "100%",
    left: "0",
    top: "-2000px",
    transition: "$dcOpacity",
    zIndex: "0",
    backgroundColor: "$purple",
    opacity: "0",
    boxShadow: "5px 5px 13px #0006",
  },

  variants: {
    isExpanded: {
      true: {
        zIndex: "10",
        top: "$gr5",
        opacity: "1",
      },
    },
  },
});

const MenuToggle = styled("button", {
  display: "none",
  height: "$gr5",
  background: "none",
  border: "transparent",
  color: "$white",
  cursor: "pointer",

  "@sm": {
    display: "block",
  },
});

const PrimaryInner = styled("div", {
  display: "flex",
  flexGrow: "1",

  "@sm": {
    "& nav": {
      display: "none !important",
    },
  },
});

const Primary = styled("div", {
  color: "$black",
  display: "flex",
  alignItems: "flex-end",
  justifyContent: "center",
  margin: "0 auto",
  paddingBottom: "$gr4",
  zIndex: "1",
  transition: "$dcAll",
  position: "relative",
  top: "unset",

  [`& ${ContainerStyled}`]: {
    display: "flex",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "space-between",
    flexGrow: "1",
    transition: "$dcAll",

    [`& ${NavStyled}`]: {
      fontSize: "$gr3",
      fontFamily: "$northwesternSansRegular",
      display: "flex",
      height: "$gr5",

      a: {
        color: "$purple",
        display: "flex",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        padding: "0 $gr3",
      },
    },

    "> span": {
      display: "flex",
      opacity: "0",
      justifyContent: "center",
      textAlign: "center",
      alignItems: "center",
      height: "$gr5",
      flexGrow: "0",
      backgroundColor: "$purple",

      svg: {
        fill: "$white",
      },
    },
  },

  "&[data-search-fixed='true']": {
    zIndex: "2",

    form: {
      backgroundColor: "white",
      boxShadow: "0px 5px 19px #0002",
    },

    [`& ${ContainerStyled}`]: {
      position: "fixed",
      top: "0",
      maxWidth: "100%",
      padding: "0",
      transition: "$dcAll",

      "> span": {
        opacity: "1",
        width: "$gr5",

        svg: {
          height: "$gr3",
        },
      },

      [`& ${NavStyled}`]: {
        width: "0",
        opacity: "0",
      },

      [`& ${SearchStyled}`]: {
        marginRight: "0",
      },
    },
  },
});

const Super = styled("div", {
  position: "relative",
  backgroundColor: "$purple",
  color: "$purple10",
  zIndex: "10",

  [`& ${ContainerStyled}`]: {
    display: "flex",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "space-between",

    svg: {
      height: "$gr3",
      fill: "$white",
    },
  },

  [`& ${NavStyled}`]: {
    fontSize: "$gr2",
    height: "$gr5",

    a: {
      padding: "0 $gr2",
      color: "$white !important",
      textDecoration: "none",

      "&:last-child": {
        paddingRight: "0",
      },
    },
  },
});

const User = styled("span", {
  "&:before": {
    content: "-",
    display: "inline-block",
    paddingRight: "$gr2",
  },
});

const HeaderStyled = styled("header", {
  flexDirection: "column",

  variants: {
    isHero: {
      true: {
        backgroundColor: "$purple",

        [`& ${Super}`]: {
          boxShadow: "0px 5px 19px #0002",
        },

        [`& ${Lockup}`]: {
          color: "$white !important",
        },

        [`& ${SearchStyled}`]: {
          background: "$white",
        },

        [`& ${NavStyled} a`]: {
          color: "$white !important",
        },
      },
    },
  },
});

export type HeaderVariants = VariantProps<typeof HeaderStyled>;

export {
  Lockup,
  Menu,
  MenuToggle,
  Primary,
  PrimaryInner,
  HeaderStyled,
  Super,
  User,
};
