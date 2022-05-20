import { Button, Input, SearchStyled } from "../Search/Search.styled";
import { ContainerStyled } from "@/components/Shared/Container";
import { NavStyled } from "../Nav/Nav.styled";
import { styled } from "@/stitches.config";

/* eslint sort-keys: 0 */

const Lockup = styled("div", {
  padding: "31px 0 50px",
  fontSize: "25px",
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

  [`& ${ContainerStyled}`]: {
    display: "flex",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "space-between",
    flexGrow: "1",
    backgroundColor: "white",

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
});

const Super = styled("div", {
  backgroundColor: "$purple120",
  color: "$slate1",

  [`& ${ContainerStyled}`]: {
    display: "flex",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "space-between",
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
  marginBottom: "5px",

  ".sticky-primary": {
    zIndex: "1",

    [`& ${Primary}`]: {
      backgroundColor: "$slate12",
      color: "$slate1",
      width: "100vw",
      justifyContent: "space-between",

      "> span": {
        opacity: "1",
        width: "auto",
        padding: "0 1rem",
        transition: "$all",
      },

      "> div": {
        flexGrow: "0",
      },

      "&[data-search-active='true']": {
        "> span": {
          opacity: "0",
          padding: "0",
          width: "0",
        },

        "> div": {
          flexGrow: "1",
        },

        [`& ${NavStyled}`]: {
          width: "0",
          opacity: "0",
        },

        [`& ${Input}`]: {
          width: "100%",
          padding: "0 2.618rem",
          color: "$slate1",
          cursor: "unset",
          opacity: "1",
          marginRight: "0",
        },

        [`& ${Button}`]: {
          left: "0",
        },
      },
    },

    [`& ${Input}`]: {
      width: "50px",
      backgroundColor: "transparent",
      color: "$slate1",
      cursor: "pointer",
      padding: "0",
      opacity: "0",
      marginRight: "1rem",
    },

    [`& ${SearchStyled}`]: {
      backgroundColor: "unset",
    },
  },
});

export { Lockup, Primary, PrimaryInner, StyledHeader, Super };
