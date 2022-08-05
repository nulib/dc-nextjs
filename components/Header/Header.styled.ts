import { VariantProps, styled } from "@/stitches.config";
import { ContainerStyled } from "@/components/Shared/Container";
import { NavStyled } from "@/components/Nav/Nav.styled";
import { SearchStyled } from "@/components/Search/Search.styled";

/* eslint sort-keys: 0 */

const Lockup = styled("div", {
  position: "relative",
  padding: "$4 0 $5",
  fontSize: "$6",
  fontFamily: "$sansLight",
  zIndex: "1",
});

const PrimaryInner = styled("div", {
  display: "flex",
  flexGrow: "1",
});

const Primary = styled("div", {
  color: "$black",
  display: "flex",
  margin: "0 auto",
  zIndex: "1",
  transition: "$all",
  position: "relative",
  top: "unset",
  height: "$5",

  [`& ${ContainerStyled}`]: {
    display: "flex",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "space-between",
    flexGrow: "1",
    backgroundColor: "$white",
    transition: "$all",

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
        width: "$5",
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
      height: "$3",
      fill: "$white",
    },
  },

  [`& ${NavStyled}`]: {
    fontSize: "$3",
    height: "$5",

    a: {
      padding: "0 $3",

      "&:last-child": {
        paddingRight: "0",
      },
    },
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

        [`& ${PrimaryInner}`]: {
          boxShadow: "12px 12px 19px #0003",
        },
      },
    },
  },
});

export type HeaderVariants = VariantProps<typeof HeaderStyled>;

export { Lockup, Primary, PrimaryInner, HeaderStyled, Super };
