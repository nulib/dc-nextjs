import { VariantProps, styled } from "@/stitches.config";
import { ContainerStyled } from "@/components/Shared/Container";
import { NavStyled } from "@/components/Nav/Nav.styled";
import { SearchStyled } from "@/components/Search/Search.styled";

/* eslint sort-keys: 0 */

const Lockup = styled("div", {
  position: "relative",
  padding: "$gr4 0 $gr5",
  fontSize: "$gr6",
  fontFamily: "$northwesternSansLight",
  zIndex: "1",

  a: {
    color: "$white !important",
    textDecoration: "none",
  },
});

const PrimaryInner = styled("div", {
  display: "flex",
  flexGrow: "1",
  alignItems: "center",
});

const Primary = styled("div", {
  color: "$black",
  display: "flex",
  margin: "0 auto",
  zIndex: "1",
  transition: "$dcAll",
  position: "relative",
  top: "unset",
  height: "$gr5",

  [`& ${ContainerStyled}`]: {
    display: "flex",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "space-between",
    flexGrow: "1",
    transition: "$dcAll",

    [`& ${NavStyled}`]: {
      backgroundColor: "$gray6",
      color: "$purple",
      fontSize: "$gr4",
      fontFamily: "$northwesternSansBold",
      paddingTop: "2px",
      display: "flex",
      height: "$gr5",

      a: {
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
    [`& ${ContainerStyled}`]: {
      position: "fixed",
      top: "0",
      maxWidth: "100%",
      backgroundColor: "white",
      boxShadow: "0px 3px 11px #0003",
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

      button: {
        backgroundColor: "$purple10",
      },

      [`& ${SearchStyled}`]: {
        marginRight: "0",
      },
    },
  },
});

const Super = styled("div", {
  position: "relative",
  backgroundColor: "$purple120",
  color: "$purple10",
  zIndex: "1",

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
  backgroundColor: "$purple",
  color: "$white",
  flexDirection: "column",

  variants: {
    isHero: {
      true: {
        [`& ${Lockup}`]: {
          textShadow: "1px 1px 3px #0003",
        },

        [`& ${Primary}`]: {
          [`& ${SearchStyled}, & ${NavStyled}`]: {
            boxShadow: "8px 8px 19px #0003",
          },
        },
      },
    },
  },
});

export type HeaderVariants = VariantProps<typeof HeaderStyled>;

export { Lockup, Primary, PrimaryInner, HeaderStyled, Super, User };
