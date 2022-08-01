import { ContainerStyled } from "@/components/Shared/Container";
import { NavStyled } from "../Nav/Nav.styled";
import { SearchStyled } from "../Search/Search.styled";
import { styled } from "@/stitches.config";

/* eslint sort-keys: 0 */

const Lockup = styled("div", {
  padding: "$4 0 $5",
  fontSize: "$6",
  fontFamily: "$sansLight",
});

const PrimaryInner = styled("div", {
  display: "flex",
  flexGrow: "1",
});

const Primary = styled("div", {
  color: "$slate12",
  display: "flex",
  margin: "0 auto",
  zIndex: "1",
  transition: "$all",
  position: "relative",
  top: "unset",
  height: "50px",

  [`& ${ContainerStyled}`]: {
    display: "flex",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "space-between",
    flexGrow: "1",
    backgroundColor: "white",
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
        width: "auto",
        padding: "0 1rem",
      },

      [`& ${NavStyled}`]: {
        width: "0",
        opacity: "0",
      },
    },
  },
});

const Super = styled("div", {
  backgroundColor: "$purple120",
  color: "$slate1",

  [`& ${ContainerStyled}`]: {
    display: "flex",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "space-between",

    svg: {
      height: "21px",
      fill: "$white",
    },
  },

  [`& ${NavStyled}`]: {
    fontSize: "12px",
    height: "50px",

    a: {
      padding: "0 1rem",

      "&:last-child": {
        paddingRight: "0",
      },
    },
  },
});

const StyledHeader = styled("header", {
  backgroundColor: "$purple",
  color: "$white",
  flexDirection: "column",
});

export { Lockup, Primary, PrimaryInner, StyledHeader, Super };
