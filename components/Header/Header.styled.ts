import { VariantProps, styled } from "@/stitches.config";
import { ContainerStyled } from "@/components/Shared/Container";
import { HeroStyled } from "@/components/Hero/Hero.styled";
import { NavStyled } from "@/components/Nav/Nav.styled";
import { SearchStyled } from "@/components/Search/Search.styled";

/* eslint sort-keys: 0 */

const Lockup = styled("div", {
  position: "relative",
  padding: "$gr4 0 $gr5",
  fontSize: "$gr6",
  fontFamily: "$sansLight",
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
        padding: "0 $gr3",
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

        [`& ${HeroStyled}`]: {
          height: `calc(100% - 50px) !important`,
          top: "50px !important",
          marginTop: "0 !important",

          ".swiper": {
            ".swiper-wrapper::before": {
              background:
                "linear-gradient(173deg, $purple 0%, #4E2A84dd 12%, #0000 31%)",
            },

            ".slide-inner": {
              justifyContent: "flex-end",
            },

            ".swiper-slide": {
              figure: {
                "img, video": {
                  opacity: "1 !important",
                },

                figcaption: {
                  bottom: "$gr6",
                  alignItems: "flex-end",
                  marginRight: "$gr5",
                  textAlign: "right",
                },
              },
            },
          },
        },
      },
    },
  },
});

export type HeaderVariants = VariantProps<typeof HeaderStyled>;

export { Lockup, Primary, PrimaryInner, HeaderStyled, Super, User };
