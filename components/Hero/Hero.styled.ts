import { styled } from "@/stitches.config";

/* eslint sort-keys: 0 */

const HeroActions = styled("div", {
  marginTop: "$gr4",

  a: {
    textTransform: "uppercase",
    padding: "calc($gr2 + 3px) $gr3 $gr2",
    marginRight: "$gr3",
    fontSize: "$gr3",
    textShadow: "none",
    backgroundColor: "$purple",
  },

  "@sm": {
    display: "flex",
    flexDirection: "column",

    "& a:first-child": {
      marginBottom: "$gr2",
    },
  },
});

const HeroStyled = styled("div", {
  position: "absolute",
  width: "100%",
  height: "calc(100% + 161px)",
  marginTop: "-161px",
  zIndex: "0",
  backgroundColor: "$black",

  ".swiper": {
    backgroundColor: "transparent",
    width: "100%",
    height: "100%",
    position: "relative",
    zIndex: "1",

    ".swiper-wrapper": {
      "&::before": {
        content: "",
        display: "flex",
        width: "100%",
        height: "300px",
        background:
          "linear-gradient(180deg, $purple 0%, #4E2A84cc 19%, #0000 61.8%)",
        position: "absolute",
        zIndex: "1",
      },
    },

    ".swiper-button-prev, .swiper-button-next": {
      color: "$white",
    },

    ".swiper-pagination-bullet": {
      backgroundColor: "$white",
    },

    ".swiper-pagination-bullet-active": {
      backgroundColor: "$white",
    },

    ".swiper-slide": {
      display: "flex",

      figure: {
        width: "100%",
        position: "relative",
        margin: "0",
        padding: "0",
        backgroundColor: "$black",

        "&::after": {
          content: "",
          display: "flex",
          width: "100%",
          height: "100%",
          background:
            "linear-gradient(300deg, #000e 0%, #0006 38.2%, #0000 100%)",
          position: "absolute",
          zIndex: "0",
          bottom: "0",
        },

        "&::before": {
          content: "",
          display: "flex",
          width: "100%",
          height: "100%",
          background: "linear-gradient(0deg, #000a 0%, #000a 19%, #0000 50%)",
          position: "absolute",
          zIndex: "1",
          bottom: "0",
        },

        "img, video": {
          width: "100%",
          height: "100%",
          position: "absolute",
          zIndex: "0",
          top: "0",
          left: "0",
          objectFit: "cover",
          opacity: "0.618",
        },

        figcaption: {
          position: "absolute",
          zIndex: "1",
          bottom: "$gr6",
          color: "$white",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          textShadow: "3px 3px 8px #0006",
          maxWidth: "$gr11",
          textAlign: "left",

          "@sm": {
            textAlign: "center !important",
            maxWidth: "100%",
            width: "100%",
            left: "0",
            marginRight: "0 !important",
            alignItems: "center !important",
          },

          a: {
            color: "$white !important",
            textDecoration: "none",
          },

          ".slide-label": {
            fontFamily: "$northwesternDisplayBold",
            fontWeight: "400",
            fontSize: "$gr7",
            display: "block",
            margin: "0 0 $gr2",
            lineHeight: "1em",
            letterSpacing: "-0.015em",

            "@sm": {
              fontSize: "$gr7",
            },
          },

          ".slide-summary": {
            fontFamily: "$northwesternSansRegular",
            fontSize: "$gr4",
            display: "block",
            color: "$black20",
            lineHeight: "1.15em",
          },
        },
      },
    },
  },
});

export { HeroActions, HeroStyled };
