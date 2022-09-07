import { VariantProps, styled } from "@/stitches.config";
import { ContainerStyled } from "@/components/Shared/Container";
import { NavStyled } from "@/components/Nav/Nav.styled";
import { SearchStyled } from "@/components/Search/Search.styled";

/* eslint sort-keys: 0 */

const Lockup = styled("div", {
  position: "relative",
  padding: "$gr4 0 $gr5",
  fontSize: "$gr6",
  fontFamily: "$sansLight",
  zIndex: "1",
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
  transition: "$all",
  position: "relative",
  top: "unset",
  height: "$gr5",

  [`& ${ContainerStyled}`]: {
    display: "flex",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "space-between",
    flexGrow: "1",
    transition: "$all",

    [`& ${NavStyled}`]: {
      backgroundColor: "$gray6",
      color: "$purple",
      fontSize: "$gr4",
      fontFamily: "$sansBold",
      paddingTop: "2px",
      display: "flex",
      height: "$gr5",

      a: {
        display: "flex",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
      },
    },

    "> span": {
      display: "flex",
      width: "0",
      opacity: "0",
      justifyContent: "center",
      textAlign: "center",
      alignItems: "center",
      flexGrow: "0",
    },

    [`& ${SearchStyled}`]: {},
  },

  "&[data-search-fixed='true']": {
    [`& ${ContainerStyled}`]: {
      position: "fixed",
      top: "0",
      maxWidth: "100%",
      backgroundColor: "white",
      boxShadow: "0px 3px 11px #0003",

      "> span": {
        opacity: "1",
        width: "$gr5",
      },

      [`& ${NavStyled}`]: {
        width: "0",
        opacity: "0",
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
        height: "100vh",
        minHeight: "500px",
        maxHeight: "800px",
        backgroundColor: "$black",
        position: "relative",
        zIndex: "1",

        [`& ${Lockup}`]: {
          textShadow: "1px 1px 3px #0003",
        },

        [`& ${Primary}`]: {
          [`& ${SearchStyled}, & ${NavStyled}`]: {
            boxShadow: "3px 8px 19px #0003",
          },
        },
      },
    },
  },
});

export type HeaderVariants = VariantProps<typeof HeaderStyled>;

export { Lockup, Primary, PrimaryInner, HeaderStyled, Super, User };
