import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/lazy";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { styled } from "@/stitches.config";

/* eslint sort-keys: 0 */

const HeroSlider = styled(Swiper, {});

const HeroSliderItem = styled(SwiperSlide, {});

const HeroStyled = styled("div", {
  position: "absolute",
  width: "100%",
  height: `calc(100% - $gr5)`,
  top: "$gr5",
  zIndex: "0",

  ".swiper": {
    backgroundColor: "transparent",
    width: "100%",
    height: "100%",

    ".swiper-wrapper": {
      "&::before": {
        content: "",
        display: "flex",
        width: "100%",
        height: "100%",
        background:
          "linear-gradient(173deg, $purple 0%, #4E2A84dd 12%, #0000 31%)",
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

        "&::after": {
          content: "",
          display: "flex",
          width: "100%",
          height: "100%",
          background:
            "linear-gradient(300deg, #000 0%, #0006 38.2%, #0000 100%)",
          position: "absolute",
          zIndex: "0",
          bottom: "0",
        },

        "&::before": {
          content: "",
          display: "flex",
          width: "100%",
          height: "100%",
          background: "linear-gradient(7deg, #000 0%, #0000 15%)",
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
        },

        ".slide-inner": {
          justifyContent: "flex-end",
        },

        figcaption: {
          position: "absolute",
          zIndex: "1",
          bottom: "$gr6",
          color: "$white",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          textShadow: "2px 2px 2px #000",
          maxWidth: "$gr11",
          marginRight: "$gr5",
          textAlign: "right",

          ".slide-label": {
            fontFamily: "$displayBold",
            fontSize: "$gr7",
            display: "block",
            margin: "0 0 $gr1",
            lineHeight: "1em",
          },

          ".slide-summary": {
            fontFamily: "$sansLightItalic",
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
export { HeroSlider, HeroSliderItem, HeroStyled };
